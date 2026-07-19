import { describe, expect, it } from "vitest";
import { getPrimaryStorefrontRedirectPath } from "./canonical-storefront-path";

describe("URL canônica da loja principal", () => {
  it("redireciona a vitrine duplicada para a raiz", () => {
    expect(
      getPrimaryStorefrontRedirectPath(
        "/loja/mv3-catalog",
        "mv3-catalog",
      ),
    ).toBe("/");
    expect(
      getPrimaryStorefrontRedirectPath(
        "/loja/mv3-catalog/",
        "mv3-catalog",
      ),
    ).toBe("/");
  });

  it("preserva o restante do caminho em produtos, checkout e pedidos", () => {
    expect(
      getPrimaryStorefrontRedirectPath(
        "/loja/mv3-catalog/produtos/produto-demo-md",
        "mv3-catalog",
      ),
    ).toBe("/produtos/produto-demo-md");
    expect(
      getPrimaryStorefrontRedirectPath(
        "/loja/mv3-catalog/checkout",
        "mv3-catalog",
      ),
    ).toBe("/checkout");
    expect(
      getPrimaryStorefrontRedirectPath(
        "/loja/mv3-catalog/pedidos/MV3-1006",
        "mv3-catalog",
      ),
    ).toBe("/pedidos/MV3-1006");
  });

  it("mantém disponíveis as rotas de outros tenants", () => {
    expect(
      getPrimaryStorefrontRedirectPath(
        "/loja/outra-loja",
        "mv3-catalog",
      ),
    ).toBeNull();
    expect(
      getPrimaryStorefrontRedirectPath(
        "/loja/mv3-catalog-atacado",
        "mv3-catalog",
      ),
    ).toBeNull();
  });
});
