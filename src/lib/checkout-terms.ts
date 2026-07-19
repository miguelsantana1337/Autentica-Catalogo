export const CHECKOUT_TERMS_VERSION = "2026-07-17";

export const checkoutTerms = {
  title: "ATENDIMENTO E SOLICITAÇÃO",
  videoRequirement:
    "O envio deste formulário registra uma solicitação de orçamento e atendimento.",
  noVideoWarning: "A solicitação não confirma preço, disponibilidade, pagamento ou entrega.",
  agreement:
    "A equipe Autêntica confirmará as condições comerciais diretamente pelo WhatsApp.",
  sellerResponsibility:
    "Produtos de uso profissional devem seguir diagnóstico, orientação e protocolo adequados.",
  exclusions: [
    "Valores ainda não confirmados",
    "Reserva automática de estoque",
    "Cobrança automática",
    "Promessas de resultado sem avaliação profissional",
  ],
  declaration: "Declaro que li e compreendi que esta é uma solicitação de atendimento.",
} as const;

export const checkoutTermsConfirmation =
  `Termos e condições aceitos no checkout (versão ${CHECKOUT_TERMS_VERSION}).`;
