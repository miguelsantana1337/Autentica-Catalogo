"use client";
/* eslint-disable @next/next/no-img-element */

import { ChevronLeft, Heart, MessageCircle, Minus, Plus, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/components/providers/cart-provider";
import { useStore } from "@/components/providers/store-provider";
import { useToast } from "@/components/providers/toast-provider";
import { ProductArt } from "@/components/ui/product-art";
import { stockLabel } from "@/lib/commerce";
import { formatMoney, whatsappUrl } from "@/lib/format";
import { canAddProductToCart, isProductPubliclySellable } from "@/lib/product-compliance";
import { normalizeProductImages } from "@/lib/product-images";
import { withStorefrontPath } from "@/lib/storefront-path";
import { ProductCard } from "./product-card";

export function ProductDetail({ slug }: { slug: string }) {
  const { data } = useStore();
  const { addItem, favorites, toggleFavorite, setDrawerOpen, ready: cartReady } = useCart();
  const toast = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const product = data.products.find((item) => item.slug === slug && item.active);
  const storeHref = (href: string) => withStorefrontPath(data.tenant.storefrontPath, href);
  const related = useMemo(
    () => data.products.filter((item) => item.active && item.categoryId === product?.categoryId && item.id !== product?.id).slice(0, 4),
    [data.products, product],
  );
  const gallery = useMemo(() => product ? normalizeProductImages(product) : [], [product]);

  if (!product) {
    return <section className="page-state container"><span className="section-kicker">PRODUTO</span><h1>Produto não encontrado.</h1><p>Ele pode ter sido ocultado ou removido do catálogo.</p><Link className="button button-primary" href={storeHref("/#catalogo")}>Voltar ao catálogo</Link></section>;
  }

  const stock = stockLabel(product);
  const favorite = favorites.includes(product.id);
  const orderable = isProductPubliclySellable(product);
  const cartEligible = canAddProductToCart(product, data.settings.checkoutMode);
  const visibleImage = selectedImage && gallery.includes(selectedImage) ? selectedImage : product.imageUrl || gallery[0] || "";
  const addToCart = () => {
    addItem(product.id, quantity);
    toast(`${product.name} adicionado à ${data.settings.showPrices ? "sacola" : "solicitação"}.`);
    setDrawerOpen(true);
  };

  return (
    <>
      <section className="product-page container">
        <Link className="back-link" href={storeHref("/#catalogo")}><ChevronLeft /> Voltar ao catálogo</Link>
        <div className="product-detail-grid">
          <div className="product-detail-gallery" style={{ "--product-accent": product.accent } as React.CSSProperties}>
            {gallery.length > 1 && <div className="product-detail-thumbnails" aria-label="Fotos do produto">{gallery.map((image, index) => <button className={image === visibleImage ? "active" : ""} type="button" onClick={() => setSelectedImage(image)} key={image} aria-label={`Ver foto ${index + 1}`} aria-pressed={image === visibleImage}><img src={image} alt="" /></button>)}</div>}
            <div className="product-detail-visual">{visibleImage ? <img className="product-detail-main-image" src={visibleImage} alt={product.name} /> : <ProductArt product={product} large />}</div>
          </div>
          <div className="product-detail-copy">
            <span className="section-kicker">{product.category} · {product.brand}</span>
            <div className="product-title-row"><h1>{product.name}</h1><button className={`favorite-button detail-favorite ${favorite ? "active" : ""}`} onClick={() => toggleFavorite(product.id)} aria-label="Alternar favorito"><Heart fill={favorite ? "currentColor" : "none"} /></button></div>
            {product.reviews > 0 && <div className="rating">★★★★★ <span>{product.rating} · {product.reviews} avaliações</span></div>}
            {product.tagline && <h2 className="product-tagline">{product.tagline}</h2>}
            <p className="product-long-description">{product.description}</p>
            {data.settings.showPrices ? <div className="detail-price price-stack">{product.compareAt > product.price && <del>{formatMoney(product.compareAt)}</del>}<strong>{formatMoney(product.price)}</strong><small>{data.settings.pixDiscount}% OFF no Pix</small></div> : <div className="detail-price price-stack quote-price"><strong>Preço sob consulta</strong><small>Atendimento para profissionais, revenda e cliente final</small></div>}
            {data.settings.showPrices && product.cashback > 0 && <div className="product-detail-cashback"><strong>Ganhe {formatMoney(product.cashback * quantity)} de cashback</strong><span>{formatMoney(product.cashback)} por unidade · liberado após a confirmação do pedido</span></div>}
            <dl className="product-facts"><div><dt>Marca</dt><dd>{product.brand || data.settings.storeName}</dd></div><div><dt>Necessidade</dt><dd>{product.need || product.category}</dd></div><div><dt>Disponibilidade</dt><dd className={`stock-${stock.tone}`}>{data.settings.showPrices ? stock.label : "Confirmada no atendimento"}</dd></div><div><dt>Condições</dt><dd>{data.settings.showPrices ? "Confirmadas no atendimento" : "Orçamento pelo WhatsApp"}</dd></div></dl>
            {(product.activeIngredient || product.indication || product.result) && <dl className="product-professional-details">{product.activeIngredient && <div><dt>Ativos</dt><dd>{product.activeIngredient}</dd></div>}{product.indication && <div><dt>Indicação</dt><dd>{product.indication}</dd></div>}{product.result && <div><dt>Resultado</dt><dd>{product.result}</dd></div>}</dl>}
            {cartEligible ? <div className="product-order-stack">
              {!orderable && <div className="catalog-validation-notice compact"><ShieldCheck /><div><strong>Solicitação sujeita a confirmação</strong><p>Adicione ao carrinho normalmente. A loja confirma disponibilidade, condições e entrega no WhatsApp.</p></div></div>}
              <div className="quantity-buy">
                <div className="quantity-picker"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Diminuir quantidade"><Minus /></button><span>{quantity}</span><button onClick={() => setQuantity((value) => Math.min(product.stock, value + 1))} aria-label="Aumentar quantidade"><Plus /></button></div>
                <button className="button button-primary button-large" disabled={!cartReady} onClick={addToCart}><ShoppingCart /> {cartReady ? (data.settings.showPrices ? "Adicionar ao carrinho" : "Adicionar à solicitação") : "Preparando seleção..."}</button>
              </div></div>
              : <div className="catalog-validation-notice"><div><strong>{product.stock <= 0 ? "Produto esgotado" : "Produto visível para consulta"}</strong><p>{product.stock <= 0 ? "Consulte a loja para saber quando haverá reposição." : "A liberação para pedido depende da validação das informações no painel."}</p></div><a className="button button-primary" href={whatsappUrl(data.settings.whatsapp, `Olá! Gostaria de consultar a disponibilidade de ${product.name}.`)} target="_blank" rel="noreferrer"><MessageCircle /> Consultar no WhatsApp</a></div>}
            <div className="detail-assurances"><span><ShieldCheck /> {data.settings.checkoutMode === "whatsapp" ? "Pedido enviado direto para a loja" : "Pedido 100% demonstrativo"}</span><span><Truck /> Frete confirmado no atendimento</span></div>
          </div>
        </div>
      </section>
      {cartEligible && <div className="product-mobile-purchase" aria-label="Seleção rápida"><div><small>{quantity} {quantity === 1 ? "unidade" : "unidades"}{data.settings.showPrices && product.cashback > 0 ? ` · +${formatMoney(product.cashback * quantity)} cashback` : ""}</small><strong>{data.settings.showPrices ? formatMoney(product.price * quantity) : "Orçamento"}</strong></div><button className="button button-primary" disabled={!cartReady} onClick={addToCart} aria-label={`Adicionar ${product.name} à solicitação`}><ShoppingCart /> Adicionar</button></div>}
      {related.length > 0 && <section className="section related-section"><div className="container"><h2>Produtos relacionados.</h2><div className="product-grid">{related.map((item) => <ProductCard product={item} key={item.id} />)}</div></div></section>}
    </>
  );
}
