"use client";

import { Check, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/components/providers/store-provider";
import { formatMoney, whatsappUrl } from "@/lib/format";
import { withStorefrontPath } from "@/lib/storefront-path";

export function OrderSuccess({ code }: { code: string }) {
  const { data } = useStore();
  const homeHref = withStorefrontPath(data.tenant.storefrontPath, "/");
  const order = data.orders.find((item) => item.code === code);
  if (!order) return <section className="page-state container"><h1>Pedido não encontrado.</h1><p>Pedidos do modo local ficam salvos apenas neste navegador.</p><Link className="button button-primary" href={homeHref}>Voltar para a loja</Link></section>;
  const whatsappMode = data.settings.checkoutMode === "whatsapp";
  return <section className="success-page container"><div className="success-icon"><Check /></div><span className="section-kicker">SOLICITAÇÃO REGISTRADA</span><h1>{whatsappMode ? "Solicitação pronta para atendimento." : "Solicitação demonstrativa criada."}</h1><p>A equipe confirmará disponibilidade, valores e entrega diretamente com você.</p><div className="order-code">{order.code}</div>{data.settings.showPrices && <div className="success-total"><span>{whatsappMode ? "Total estimado" : "Total demonstrativo"}</span><strong>{formatMoney(order.total)}</strong>{order.cashbackTotal > 0 && <em>Cashback previsto: {formatMoney(order.cashbackTotal)}</em>}</div>}<div className="success-actions"><a className="button button-primary button-large" href={whatsappUrl(data.settings.whatsapp, `Olá! Quero continuar o atendimento da solicitação ${order.code}.`)} target="_blank" rel="noreferrer"><MessageCircle /> Continuar no WhatsApp</a><Link className="button button-ghost button-large" href={homeHref}>Voltar ao catálogo</Link></div></section>;
}
