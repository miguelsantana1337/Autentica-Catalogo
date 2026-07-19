import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = resolve(root, "src/data/autentica-products.json");
const seedPath = resolve(root, "supabase/seed.sql");
const tenantId = "00000000-0000-4000-8000-000000000100";
const products = JSON.parse(readFileSync(sourcePath, "utf8"));
const featured = new Set([
  "sos-premium-elixir-repair",
  "terra-acai",
  "ouro-argan",
  "morango-champagne-mascara-500g",
  "super-cachos",
  "inspira-parfum",
]);
const needLabels = {
  volume: "Redução de volume",
  recovery: "Cronograma capilar",
  blond: "Loiros e descoloração",
  scalp: "Terapia capilar",
  finish: "Finalizadores",
  lavatory: "Uso profissional no lavatório",
};
const audienceMap = { b2b: "b2b", b2c: "b2c", revenda: "resale" };

function quote(value) {
  return `'${String(value ?? "").replaceAll("'", "''")}'`;
}

function slugify(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function contentText(value) {
  if (typeof value === "string") return value;
  return [value?.title, value?.subtitle].filter(Boolean).join(" — ");
}

const categoryNames = [...new Set(products.map((product) => product.category))];
const categories = categoryNames.map((name, index) => ({
  id: `cat-${String(index + 1).padStart(2, "0")}`,
  name,
  slug: slugify(name),
}));
const categoryByName = new Map(categories.map((category) => [category.name, category]));

const categoryValues = categories.map((category, index) =>
  `  (${quote(tenantId)}, ${quote(category.id)}, ${quote(category.name)}, ${quote(category.slug)}, true, ${index + 1})`,
).join(",\n");

const productValues = products.map((product, index) => {
  const category = categoryByName.get(product.category);
  const imageUrl = product.image.replace("https://autentica-professional-catalogo.netlify.app", "");
  const audiences = product.audiences.map((audience) => quote(audienceMap[audience])).join(", ");
  return `  (${[
    quote(tenantId),
    quote(`aut-${String(index + 1).padStart(3, "0")}`),
    quote(product.slug),
    quote(product.name),
    quote(category.id),
    quote("Autêntica Professional"),
    "0", "0", "0", "0", "999", "0",
    quote(featured.has(product.slug) ? "Destaque" : ""),
    quote("#D51F32"),
    quote(product.description),
    quote(product.tagline),
    quote(needLabels[product.pain]),
    `array[${audiences}]::text[]`,
    quote(product.indication),
    quote(product.result),
    quote(`AUT-${String(index + 1).padStart(3, "0")}`),
    "5", "0",
    featured.has(product.slug) ? "true" : "false",
    "true",
    String(index + 1),
    quote(imageUrl),
    `${quote(JSON.stringify([imageUrl]))}::jsonb`,
    quote("non_medicine"),
    quote("approved"),
    quote(contentText(product.actives)),
    quote(""),
    quote(product.packshotLabel ? contentText(product.packshotLabel) : "Consulte as apresentações disponíveis"),
    quote("Uso profissional conforme indicação do fabricante."),
    "false",
  ].join(", ")})`;
}).join(",\n");

const generated = `-- AUTENTICA_CATALOG_START
delete from public.products where tenant_id = ${quote(tenantId)};
delete from public.categories where tenant_id = ${quote(tenantId)};

insert into public.categories (tenant_id, id, name, slug, active, order_index) values
${categoryValues};

insert into public.products (
  tenant_id, id, slug, name, category_id, brand, price, compare_at, cashback,
  cost_price, stock, min_stock, badge, accent, description, tagline, need,
  audiences, indication, result, sku, rating, reviews, featured, active,
  order_index, image_url, image_urls, product_type, regulatory_status,
  active_ingredient, anvisa_registration, presentation, regulatory_warning,
  pharmacist_reviewed
) values
${productValues};
-- AUTENTICA_CATALOG_END`;

const currentSeed = readFileSync(seedPath, "utf8");
const nextSeed = currentSeed.replace(
  /-- AUTENTICA_CATALOG_START[\s\S]*?-- AUTENTICA_CATALOG_END/,
  generated,
);
if (nextSeed === currentSeed) throw new Error("Marcadores do catálogo não encontrados em supabase/seed.sql");
writeFileSync(seedPath, nextSeed);
console.log(`Seed atualizado com ${categories.length} categorias e ${products.length} produtos.`);
