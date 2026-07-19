function normalizeClientId(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "store-client";
}

function normalizeOrderPrefix(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 5) || "LOJA";
}

const clientId = normalizeClientId(
  process.env.NEXT_PUBLIC_CLIENT_ID ?? "autentica",
);

const defaultLogoUrl =
  process.env.NEXT_PUBLIC_DEFAULT_LOGO_URL?.trim() || "/assets/logo-autentica-original.webp";

const deployedHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  (deployedHost ? `https://${deployedHost}` : "http://localhost:3000");

export const platformConfig = {
  clientId,
  siteUrl,
  storeName: process.env.NEXT_PUBLIC_STORE_NAME?.trim() || "Autêntica Professional",
  orderPrefix: normalizeOrderPrefix(
    process.env.NEXT_PUBLIC_ORDER_PREFIX ?? "AUT",
  ),
  defaultCheckoutMode:
    process.env.NEXT_PUBLIC_DEFAULT_CHECKOUT_MODE === "demo" ? "demo" : "whatsapp",
  defaultLogoUrl,
  defaultFaviconUrl:
    process.env.NEXT_PUBLIC_DEFAULT_FAVICON_URL?.trim() || "/client-brand.svg",
  socialImageUrl:
    process.env.NEXT_PUBLIC_SOCIAL_IMAGE_URL?.trim() || defaultLogoUrl,
  demoNotice:
    process.env.NEXT_PUBLIC_DEMO_NOTICE?.trim() ||
    "CATÁLOGO DIGITAL · SOLICITAÇÕES E CONDIÇÕES CONFIRMADAS PELO WHATSAPP",
  metadataDescription:
    process.env.NEXT_PUBLIC_METADATA_DESCRIPTION?.trim() ||
    "Catálogo digital com produtos organizados, pedido estruturado e atendimento pelo WhatsApp.",
  contact: {
    whatsapp:
      process.env.NEXT_PUBLIC_STORE_WHATSAPP?.trim() || "5531985674049",
    email:
      process.env.NEXT_PUBLIC_STORE_EMAIL?.trim() ||
      "contato@autenticaprofessional.com.br",
  },
  theme: {
    primaryColor:
      process.env.NEXT_PUBLIC_PRIMARY_COLOR?.trim() || "#D51F32",
    secondaryColor:
      process.env.NEXT_PUBLIC_SECONDARY_COLOR?.trim() || "#A90F20",
  },
  demoAdmin: {
    email:
      process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL?.trim() ||
      "admin@autentica.demo",
    fullName:
      process.env.NEXT_PUBLIC_DEMO_ADMIN_NAME?.trim() || "Administrador Demo",
  },
} as const;

export const platformRuntimeKeys = {
  adminCookie: `${clientId}-demo-admin`,
  storeData: `${clientId}:store-data:v1`,
  cart: `${clientId}:cart:v1`,
  favorites: `${clientId}:favorites:v1`,
} as const;

export { normalizeClientId, normalizeOrderPrefix };
