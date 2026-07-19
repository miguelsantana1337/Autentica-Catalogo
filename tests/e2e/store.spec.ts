import { expect, test } from "@playwright/test";
import { seedData } from "../../src/data/seed";

const product = seedData.products[0];
const coupon = seedData.coupons[0];

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.localStorage.clear());
});

test("mantém o catálogo fora dos buscadores e compartilhável", async ({ page, request }) => {
  const navigation = await page.goto("/");
  expect(navigation?.headers()["x-robots-tag"]).toBe("noindex, nofollow");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /MV3 Catalog/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /^https?:\/\//);

  const response = await request.get("/robots.txt");
  expect(response.ok()).toBe(true);
  const body = await response.text();
  expect(body).toMatch(/User-Agent:\s*WhatsApp[\s\S]*Allow:\s*\//i);
  expect(body).toMatch(/User-Agent:\s*facebookexternalhit[\s\S]*Allow:\s*\//i);
  expect(body).toMatch(/User-Agent:\s*\*/i);
  expect(body).toMatch(/Disallow:\s*\//i);
});

test("abre uma pagina individual de produto", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("PEDIDOS FINALIZADOS PELO WHATSAPP").first()).toBeVisible();
  await page.getByTestId(`product-${product.slug}`).first().getByRole("link", { name: product.name, exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`/produtos/${product.slug}$`));
  await expect(page.getByRole("heading", { name: product.name })).toBeVisible();
  await expect(page.getByRole("button", { name: /Adicionar ao carrinho/ })).toBeVisible();
});

test("organiza o catálogo em carrosséis por categoria", async ({ page }) => {
  await page.goto("/");
  const catalog = page.locator("#catalogo");
  const categories = catalog.locator(".catalog-category");

  expect(await categories.count()).toBeGreaterThan(1);
  await expect(categories.first().locator(".catalog-category-header h3")).toBeVisible();
  await expect(categories.first().locator(".product-carousel-viewport")).toBeVisible();
  await expect(categories.first().locator(".product-card").first()).toBeVisible();
  await expect(catalog.locator(".product-grid")).toHaveCount(0);
});

test("permite adicionar ao carrinho um item disponível pelo WhatsApp", async ({ page }) => {
  await page.goto(`/produtos/${product.slug}`);
  await expect(page.locator(".product-facts").getByText("Disponível", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Adicionar ao carrinho", exact: true }).click();
  const cart = page.getByRole("dialog", { name: "Carrinho" });
  await expect(cart).toBeVisible();
  await expect(cart.getByRole("heading", { name: product.name })).toBeVisible();
  const browserStorage = await page.evaluate(() => ({
    localSensitiveKeys: Object.keys(window.localStorage).filter((key) =>
      /:cart:v1$|:favorites:v1$|:store-data:v1$|product-draft:|auth-token/i.test(key),
    ),
    sessionCart: Object.keys(window.sessionStorage)
      .filter((key) => key.endsWith(":cart:v1"))
      .map((key) => window.sessionStorage.getItem(key)),
  }));
  expect(browserStorage.localSensitiveKeys).toEqual([]);
  expect(browserStorage.sessionCart.some((value) => value?.includes("productId"))).toBe(true);
});

test("conclui carrinho, cupom e envia o pedido para o WhatsApp", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: `Adicionar ${product.name} ao carrinho` }).first().click();
  const cart = page.getByRole("dialog", { name: "Carrinho" });
  await expect(cart).toBeVisible();
  const couponInput = cart.getByLabel("Cupom de desconto");
  await couponInput.fill(coupon.code);
  await cart.getByRole("button", { name: "Aplicar" }).click();
  await expect(cart.getByText(`Cupom ${coupon.code} aplicado.`)).toBeVisible();
  await cart.getByRole("link", { name: "Ir para o checkout" }).click();

  await page.getByLabel("Nome completo").fill("Cliente Demonstracao");
  await page.getByRole("textbox", { name: "WhatsApp", exact: true }).fill("(31) 99999-9999");
  await page.getByLabel("E-mail").fill("cliente@exemplo.com");
  await page.getByLabel("CEP").fill("35160-000");
  await page.getByLabel("Cidade").fill("Ipatinga");
  await page.getByLabel("Estado").selectOption("MG");
  await page.getByLabel("Endereço").fill("Rua Exemplo");
  await page.getByLabel("Número").fill("100");
  await page.getByRole("checkbox", { name: /Declaro que li/ }).check();
  await page.getByRole("checkbox", { name: /Autorizo o envio/ }).check();
  await page.route("https://wa.me/**", (route) => route.abort());
  const whatsappRequest = page.waitForRequest((request) => request.url().startsWith("https://wa.me/"));
  await page.getByRole("button", { name: "Enviar pedido pelo WhatsApp" }).click();
  const request = await whatsappRequest;
  const message = new URL(request.url()).searchParams.get("text") ?? "";
  expect(message).toContain("Cliente Demonstracao");
  expect(message).toContain(product.name);
  expect(message).toContain(`${seedData.settings.orderPrefix}-`);
  expect(message).toContain("Forma de pagamento");
  expect(message).toContain("Cupom utilizado");
  expect(message).not.toContain("\\n");
});
