import { formatMoney } from "@/lib/format";
import type { Order, StoreSettings } from "@/types/store";
import { checkoutTermsConfirmation } from "@/lib/checkout-terms";

export const defaultWhatsappOrderMessage = `🛒 *Novo pedido – {{loja}}*

Olá! Gostaria de finalizar o seguinte pedido:

📦 *Pedido:* {{pedido}}

*Produtos:*
{{itens}}

💰 *Total do pedido:* {{total}}
💳 *Forma de pagamento:* {{pagamento}}
🎟️ *Cupom utilizado:* {{cupom}}

👤 *Cliente:* {{cliente}}

Aguardo a confirmação. Obrigado!`;

function paymentLabel(payment: Order["payment"]) {
  return payment === "Cartao" ? "Cartão" : payment;
}

function resolveMessageTemplate(message: string) {
  const normalized = message.replace(/\\n/g, "\n").trim();
  const isLegacyDefault = normalized.startsWith("Olá! Quero finalizar o pedido {{pedido}} da {{loja}}.");
  return !normalized || isLegacyDefault ? defaultWhatsappOrderMessage : normalized;
}

export function renderWhatsappOrderMessage(order: Order, settings: StoreSettings) {
  const items = order.items
    .map((item) => settings.showPrices
      ? `• ${item.quantity}x ${item.name} — ${formatMoney(item.quantity * item.unitPrice)}`
      : `• ${item.quantity}x ${item.name}`)
    .join("\n");

  const customerDetails = [
    order.customer.name,
    order.customer.profile && `Perfil: ${order.customer.profile}`,
    order.customer.business && `Salão/negócio: ${order.customer.business}`,
    order.customer.document && `CNPJ: ${order.customer.document}`,
    `WhatsApp: ${order.customer.phone}`,
    `${order.customer.city}/${order.customer.state}`,
    order.customer.notes && `Observações: ${order.customer.notes}`,
  ].filter(Boolean).join("\n");

  const values: Record<string, string> = {
    "{{loja}}": settings.storeName,
    "{{pedido}}": order.code,
    "{{cliente}}": customerDetails,
    "{{itens}}": items,
    "{{total}}": settings.showPrices ? formatMoney(order.total) : "Condições sob consulta",
    "{{pagamento}}": settings.showPrices ? paymentLabel(order.payment) : "Confirmado no atendimento",
    "{{cupom}}": order.couponCode || "Nenhum",
  };

  const rendered = Object.entries(values).reduce(
    (message, [placeholder, value]) => message.replaceAll(placeholder, value),
    resolveMessageTemplate(settings.whatsappMessage),
  );
  const cashbackNotice = order.cashbackTotal > 0
    ? `\n\n🟢 *Cashback previsto:* ${formatMoney(order.cashbackTotal)} (após a confirmação do pedido)`
    : "";

  return `${rendered}${cashbackNotice}\n\n✅ *${checkoutTermsConfirmation}*`;
}
