import { platformConfig } from "@/config/platform";
import { slugify } from "@/lib/format";
import type { ProductAudience, StoreData } from "@/types/store";
import productSource from "./autentica-products.json";

type SourceProduct = {
  slug: string;
  name: string;
  category: string;
  pain: keyof typeof needLabels;
  audiences: Array<"b2b" | "b2c" | "revenda">;
  image: string;
  tagline: string;
  actives: string | { title?: string; subtitle?: string };
  indication: string;
  result: string;
  description: string;
  packshotLabel?: string | { title?: string; subtitle?: string };
};

const needLabels = {
  volume: "Redução de volume",
  recovery: "Cronograma capilar",
  blond: "Loiros e descoloração",
  scalp: "Terapia capilar",
  finish: "Finalizadores",
  lavatory: "Uso profissional no lavatório",
} as const;

const featuredSlugs = new Set([
  "sos-premium-elixir-repair",
  "terra-acai",
  "ouro-argan",
  "morango-champagne-mascara-500g",
  "super-cachos",
  "inspira-parfum",
]);

const audienceMap: Record<SourceProduct["audiences"][number], ProductAudience> = {
  b2b: "b2b",
  b2c: "b2c",
  revenda: "resale",
};

function contentText(value: SourceProduct["actives"]) {
  if (typeof value === "string") return value;
  return [value.title, value.subtitle].filter(Boolean).join(" — ");
}

const sourceProducts = productSource as SourceProduct[];
const categoryNames = [...new Set(sourceProducts.map((product) => product.category))];
const categories = categoryNames.map((name, index) => ({
  id: `cat-${String(index + 1).padStart(2, "0")}`,
  name,
  slug: slugify(name),
  active: true,
  order: index + 1,
}));

const products = sourceProducts.map((source, index) => {
  const category = categories.find((item) => item.name === source.category)!;
  const imageUrl = source.image.replace("https://autentica-professional-catalogo.netlify.app", "");
  return {
    id: `aut-${String(index + 1).padStart(3, "0")}`,
    slug: source.slug,
    name: source.name,
    categoryId: category.id,
    category: category.name,
    brand: "Autêntica Professional",
    price: 0,
    compareAt: 0,
    cashback: 0,
    costPrice: 0,
    stock: 999,
    minStock: 0,
    badge: featuredSlugs.has(source.slug) ? "Destaque" : "",
    accent: platformConfig.theme.primaryColor,
    description: source.description,
    tagline: source.tagline,
    need: needLabels[source.pain],
    audiences: source.audiences.map((audience) => audienceMap[audience]),
    indication: source.indication,
    result: source.result,
    sku: `${platformConfig.orderPrefix}-${String(index + 1).padStart(3, "0")}`,
    rating: 5,
    reviews: 0,
    featured: featuredSlugs.has(source.slug),
    active: true,
    order: index + 1,
    imageUrl,
    imageUrls: [imageUrl],
    productType: "non_medicine" as const,
    regulatoryStatus: "approved" as const,
    activeIngredient: contentText(source.actives),
    anvisaRegistration: "",
    presentation: source.packshotLabel ? contentText(source.packshotLabel) : "Consulte as apresentações disponíveis",
    regulatoryWarning: "Uso profissional conforme indicação do fabricante.",
    pharmacistReviewed: false,
  };
});

export const seedData: StoreData = {
  tenant: {
    id: "00000000-0000-4000-8000-000000000100",
    slug: platformConfig.clientId,
    name: platformConfig.storeName,
    status: "active",
    plan: "pro",
    primaryDomain: "",
    storefrontPath: "",
  },
  settings: {
    storeName: platformConfig.storeName,
    logoUrl: "/assets/logo-autentica-original.webp",
    faviconUrl: "/client-brand.svg",
    whatsapp: platformConfig.contact.whatsapp,
    orderPrefix: platformConfig.orderPrefix,
    email: platformConfig.contact.email,
    hours: "Segunda a sexta · 8h às 18h",
    announcement: "Catálogo profissional para salão, revenda e cliente final",
    footerDescription: "Beleza profissional com produtos para transformação, tratamento e finalização. Solicite condições diretamente com a nossa equipe.",
    primaryColor: platformConfig.theme.primaryColor,
    secondaryColor: platformConfig.theme.secondaryColor,
    backgroundColor: "#07090D",
    textColor: "#F5F7FB",
    fontFamily: "Manrope",
    headerLayout: "left",
    contentWidth: 1240,
    borderRadius: 18,
    freeShippingThreshold: 0,
    shippingFlat: 0,
    freeShippingEnabled: false,
    freeShippingBannerEnabled: false,
    freeShippingBannerEyebrow: "ATENDIMENTO ESPECIALIZADO",
    freeShippingBannerTitle: "Condições personalizadas para cada perfil.",
    freeShippingBannerSubtitle: "Fale com a equipe Autêntica e receba uma proposta adequada ao seu negócio.",
    freeShippingBannerButtonText: "Solicitar orçamento",
    freeShippingBannerButtonLink: "#catalogo",
    pixDiscount: 0,
    autoBannerSeconds: 7,
    checkoutMode: "whatsapp",
    showPrices: false,
    whatsappMessage: "✨ *Nova solicitação de orçamento — {{loja}}*\n\n📦 *Solicitação:* {{pedido}}\n\n*Produtos de interesse:*\n{{itens}}\n\n👤 *Dados para atendimento:*\n{{cliente}}\n\nPor favor, envie disponibilidade, valores e condições comerciais.",
  },
  categories,
  products,
  banners: [
    {
      id: "banner-1",
      kicker: "AUTÊNTICA PROFESSIONAL",
      title: "Beleza profissional com identidade e resultado.",
      highlight: "identidade e resultado.",
      subtitle: "Soluções para transformação, tratamento e finalização — do salão ao cuidado em casa.",
      buttonText: "Explorar catálogo",
      buttonLink: "#catalogo",
      startColor: "#171513",
      endColor: "#A90F20",
      imageUrl: "/assets/institucional/sos-premium-linha-bancada.webp",
      mobileImageUrl: "/assets/institucional/sos-premium-linha-bancada.webp",
      altText: "Linha profissional Autêntica",
      imageOnly: false,
      active: true,
      order: 1,
    },
    {
      id: "banner-2",
      kicker: "DESTAQUE AUTÊNTICA",
      title: "S.O.S Premium Elixir Repair.",
      highlight: "Elixir Repair.",
      subtitle: "Reparação premium com foco em anti-quebra, cuidado das pontas e acabamento profissional.",
      buttonText: "Conhecer produto",
      buttonLink: "/produtos/sos-premium-elixir-repair",
      startColor: "#4B0C15",
      endColor: "#D51F32",
      imageUrl: "/assets/lancamentos/sos-premium-elixir-repair-foto-produtos.webp",
      mobileImageUrl: "/assets/lancamentos/sos-premium-elixir-repair-foto-produtos.webp",
      altText: "S.O.S Premium Elixir Repair",
      imageOnly: false,
      active: true,
      order: 2,
    },
  ],
  trustItems: [
    { id: "trust-1", title: "Atendimento especializado", subtitle: "Orientação para escolher a linha ideal", order: 1 },
    { id: "trust-2", title: "Três perfis de compra", subtitle: "Salão, revenda e cliente final", order: 2 },
    { id: "trust-3", title: "Catálogo sempre atualizado", subtitle: "Produtos e conteúdos gerenciados no painel", order: 3 },
    { id: "trust-4", title: "Orçamento direto", subtitle: "Condições confirmadas pelo WhatsApp", order: 4 },
  ],
  sections: [
    { id: "section-featured", kind: "featured", name: "Produtos em destaque", eyebrow: "SELEÇÃO AUTÊNTICA", title: "Linhas que entregam resultado.", subtitle: "Destaques para profissionais, revendedores e consumidores.", active: true, order: 1 },
    { id: "section-catalog", kind: "catalog", name: "Catálogo completo", eyebrow: "CATÁLOGO PROFISSIONAL", title: "Encontre a solução certa para cada necessidade.", subtitle: "Filtre por categoria, objetivo e perfil de atendimento.", active: true, order: 2 },
    { id: "section-promo", kind: "promo", name: "Atendimento comercial", eyebrow: "FALE COM A AUTÊNTICA", title: "Condições sob medida para o seu perfil.", subtitle: "Monte sua seleção e solicite um orçamento pelo WhatsApp.", buttonText: "Ver produtos", buttonLink: "#catalogo", active: false, order: 3 },
    { id: "section-benefits", kind: "benefits", name: "Por que Autêntica", eyebrow: "PARCERIA PROFISSIONAL", title: "Produtos e atendimento para fazer seu negócio evoluir.", subtitle: "Uma jornada simples, consultiva e conectada à equipe comercial.", active: true, order: 4 },
    { id: "section-faq", kind: "faq", name: "Dúvidas frequentes", eyebrow: "PRECISA DE AJUDA?", title: "Tudo o que você precisa antes de solicitar.", subtitle: "", active: true, order: 5 },
  ],
  pages: [
    { id: "home", name: "Página inicial", slug: "inicio", title: platformConfig.storeName, description: "Catálogo profissional da Autêntica Professional.", active: true, showInNavigation: false, isHome: true, order: 1 },
    { id: "page-about", name: "Sobre a Autêntica", slug: "sobre", title: "Sobre a Autêntica Professional", description: "Conheça a marca e nossa forma de atender.", active: true, showInNavigation: true, isHome: false, order: 2 },
  ],
  pageBlocks: [
    { id: "block-home-hero", pageId: "home", kind: "hero", name: "Banners principais", eyebrow: "", title: "", body: "", buttonText: "", buttonLink: "", imageUrl: "", backgroundColor: "", textColor: "", containerWidth: "full", padding: "none", columns: 1, active: true, order: 1 },
    { id: "block-home-trust", pageId: "home", kind: "trust", name: "Faixa de confiança", eyebrow: "", title: "", body: "", buttonText: "", buttonLink: "", imageUrl: "", backgroundColor: "", textColor: "", containerWidth: "full", padding: "none", columns: 4, active: true, order: 2 },
    { id: "block-home-featured", pageId: "home", kind: "featured", name: "Produtos em destaque", eyebrow: "", title: "", body: "", buttonText: "", buttonLink: "", imageUrl: "", backgroundColor: "", textColor: "", containerWidth: "normal", padding: "large", columns: 4, active: true, order: 3 },
    { id: "block-home-catalog", pageId: "home", kind: "catalog", name: "Catálogo completo", eyebrow: "", title: "", body: "", buttonText: "", buttonLink: "", imageUrl: "", backgroundColor: "", textColor: "", containerWidth: "normal", padding: "large", columns: 4, active: true, order: 4 },
    { id: "block-home-promo", pageId: "home", kind: "promo", name: "Atendimento comercial", eyebrow: "", title: "", body: "", buttonText: "", buttonLink: "", imageUrl: "", backgroundColor: "", textColor: "", containerWidth: "normal", padding: "large", columns: 1, active: false, order: 5 },
    { id: "block-home-benefits", pageId: "home", kind: "benefits", name: "Benefícios", eyebrow: "", title: "", body: "", buttonText: "", buttonLink: "", imageUrl: "", backgroundColor: "", textColor: "", containerWidth: "normal", padding: "large", columns: 4, active: true, order: 6 },
    { id: "block-home-faq", pageId: "home", kind: "faq", name: "Dúvidas frequentes", eyebrow: "", title: "", body: "", buttonText: "", buttonLink: "", imageUrl: "", backgroundColor: "", textColor: "", containerWidth: "normal", padding: "large", columns: 1, active: true, order: 7 },
    { id: "block-about-text", pageId: "page-about", kind: "text", name: "Apresentação", eyebrow: "AUTÊNTICA PROFESSIONAL", title: "Beleza profissional com propósito.", body: "A Autêntica Professional desenvolve soluções para transformação, tratamento e finalização, conectando performance profissional, identidade e cuidado em cada etapa.", buttonText: "Ver catálogo", buttonLink: "/#catalogo", imageUrl: "/assets/logo-autentica-original.webp", backgroundColor: "#F4EFE8", textColor: "#171513", containerWidth: "narrow", padding: "large", columns: 1, active: true, order: 1 },
    { id: "block-about-cta", pageId: "page-about", kind: "cta", name: "Chamada para atendimento", eyebrow: "FALE COM NOSSA EQUIPE", title: "Encontre a linha ideal para você ou para o seu negócio.", body: "Selecione os produtos do catálogo e envie sua solicitação. A equipe Autêntica retorna com disponibilidade, valores e condições.", buttonText: "Explorar catálogo", buttonLink: "/#catalogo", imageUrl: "", backgroundColor: "#A90F20", textColor: "#FFFFFF", containerWidth: "normal", padding: "medium", columns: 1, active: true, order: 2 },
  ],
  benefits: [
    { id: "benefit-1", title: "Portfólio completo", text: "Soluções para transformação, cronograma capilar, loiros, terapia e finalização.", order: 1 },
    { id: "benefit-2", title: "Escolha orientada", text: "Filtros por necessidade e perfil ajudam você a encontrar os produtos adequados.", order: 2 },
    { id: "benefit-3", title: "Condições personalizadas", text: "Valores, disponibilidade e condições são confirmados conforme o perfil do cliente.", order: 3 },
    { id: "benefit-4", title: "Contato sem intermediários", text: "A solicitação chega estruturada diretamente à equipe Autêntica pelo WhatsApp.", order: 4 },
  ],
  faqs: [
    { id: "faq-1", question: "O catálogo atende profissionais e consumidores?", answer: "Sim. Identifique seu perfil como salão/profissional, revenda ou cliente final para receber o atendimento adequado.", order: 1 },
    { id: "faq-2", question: "Por que os preços não aparecem?", answer: "As condições variam conforme perfil, quantidade e disponibilidade. Monte sua seleção e solicite um orçamento sem compromisso.", order: 2 },
    { id: "faq-3", question: "Como solicito um orçamento?", answer: "Adicione os produtos de interesse, preencha seus dados e envie a solicitação pelo WhatsApp. Nenhum pagamento é realizado no site.", order: 3 },
    { id: "faq-4", question: "Posso comprar para revender?", answer: "Sim. Selecione o perfil Revenda no formulário para que a equipe comercial apresente as condições correspondentes.", order: 4 },
  ],
  coupons: [],
  customers: [],
  customerTasks: [],
  customerContacts: [],
  cashbackCampaigns: [],
  cashbackEntries: [],
  couponRedemptions: [],
  catalogImports: [],
  orders: [],
  financialTransactions: [],
  inventoryMovements: [],
  productLots: [],
  suppliers: [],
  purchaseOrders: [],
  savedReports: [],
  exportRuns: [],
  marketingPublications: [],
  marketingPublicationVersions: [],
  messageAutomations: [],
  messageLogs: [],
  automationRuns: [],
  auditLogs: [],
  teamMembers: [
    { id: "00000000-0000-4000-8000-000000000001", fullName: platformConfig.demoAdmin.fullName, email: platformConfig.demoAdmin.email, role: "owner", permissions: ["dashboard", "crm", "customers", "orders", "finance", "inventory", "purchasing", "reports", "collaboration", "copilot", "catalog", "store", "marketing", "settings", "data", "users"], active: true, createdAt: "2026-07-19T00:00:00-03:00", lastSignInAt: "", isCurrent: true },
  ],
};

export function cloneSeedData(): StoreData {
  return structuredClone(seedData);
}
