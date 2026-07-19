import { describe, expect, it } from "vitest";
import {
  createUniqueProductSlug,
  ensureUniqueProductSlugs,
  ProductSaveConflictError,
  toProductSaveError,
} from "./product-slug";

describe("endereços de produtos", () => {
  it("acrescenta um sufixo quando o nome gera um slug já usado", () => {
    const products = [
      { id: "one", slug: "produto-demo" },
      { id: "two", slug: "produto-demo-2" },
    ];

    expect(createUniqueProductSlug("Produto Demo", products, "three")).toBe("produto-demo-3");
  });

  it("preserva o endereço do próprio produto durante uma edição", () => {
    const products = [{ id: "one", slug: "produto-demo" }];
    expect(createUniqueProductSlug("produto-demo", products, "one")).toBe("produto-demo");
  });

  it("elimina colisões entre produtos do mesmo lote", () => {
    const products = ensureUniqueProductSlugs([
      { id: "one", slug: "produto-teste", name: "Produto teste", sku: "MV3-001" },
      { id: "two", slug: "produto-teste", name: "Produto teste", sku: "MV3-002" },
    ], []);

    expect(products.map((product) => product.slug)).toEqual(["produto-teste", "produto-teste-2"]);
  });

  it("traduz o conflito de slug do Supabase em uma orientação clara", () => {
    const error = toProductSaveError({
      code: "23505",
      message: 'duplicate key value violates unique constraint "products_tenant_slug_key"',
    });

    expect(error).toBeInstanceOf(ProductSaveConflictError);
    expect(error.message).toContain("Procure o produto na lista");
    expect(error.message).toContain("ocultos");
  });
});
