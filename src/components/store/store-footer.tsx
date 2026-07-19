"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useStore } from "@/components/providers/store-provider";
import { Logo } from "@/components/ui/logo";
import { whatsappUrl } from "@/lib/format";
import { withStorefrontPath } from "@/lib/storefront-path";

export function StoreFooter() {
  const { data } = useStore();
  const message = `Olá! Vim pela loja da ${data.settings.storeName} e gostaria de tirar uma dúvida.`;
  const navigationPages = data.pages.filter((page) => page.active && page.showInNavigation && !page.isHome).sort((a, b) => a.order - b.order);
  const storeHref = (href: string) => withStorefrontPath(data.tenant.storefrontPath, href);

  return (
    <>
      <footer className="store-footer">
        <div className="container footer-grid">
          <div>
            <Logo />
            <p>{data.settings.footerDescription}</p>
          </div>
          <div>
            <strong>Loja</strong>
            <Link href={storeHref("/#destaques")}>Destaques</Link>
            <Link href={storeHref("/#catalogo")}>Produtos</Link>
            <Link href={storeHref("/#duvidas")}>Dúvidas</Link>
            {navigationPages.map((page) => <Link href={storeHref(`/paginas/${page.slug}`)} key={page.id}>{page.name}</Link>)}
          </div>
          <div>
            <strong>Atendimento</strong>
            <a href={whatsappUrl(data.settings.whatsapp, message)} target="_blank" rel="noreferrer">WhatsApp</a>
            <span>{data.settings.hours}</span>
            <span>{data.settings.email}</span>
          </div>
          <div>
            <strong>{data.settings.showPrices ? "Como comprar" : "Como solicitar"}</strong>
            <Link href={storeHref("/#catalogo")}>Escolher produtos</Link>
            <Link href={storeHref("/#duvidas")}>{data.settings.showPrices ? "Pagamento e envio" : "Orçamento e atendimento"}</Link>
            <span>{data.settings.showPrices ? "Pedido confirmado pelo WhatsApp" : "Condições confirmadas pelo WhatsApp"}</span>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 {data.settings.storeName}</span>
          <span>{data.settings.showPrices ? "Atendimento, pagamento e envio confirmados pela nossa equipe." : "Valores, disponibilidade e entrega confirmados pela nossa equipe."}</span>
        </div>
      </footer>
      <a
        className="whatsapp-float"
        href={whatsappUrl(data.settings.whatsapp, message)}
        target="_blank"
        rel="noreferrer"
        aria-label="Atendimento pelo WhatsApp"
      >
        <MessageCircle />
      </a>
    </>
  );
}
