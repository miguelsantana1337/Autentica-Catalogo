import type { Metadata, Viewport } from "next";
import { AdminDataProvider } from "@/components/admin/admin-data-provider";
import { AdminShell } from "@/components/admin/admin-shell";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { requireAdmin } from "@/lib/require-admin";
import { getStoreData } from "@/lib/store-data";
import { hasAdminPermission } from "@/lib/admin-permissions";

export const metadata: Metadata = {
  applicationName: "Autêntica Professional — Painel de Controle",
  manifest: "/admin-manifest.webmanifest",
  icons: {
    icon: "/pwa/admin-icon-192.png",
    apple: "/pwa/admin-apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Autêntica Admin",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#D51F32",
};

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();
  const data = await getStoreData({
    admin: true,
    tenantSlug: user.tenantSlug,
    includeAudit: hasAdminPermission(user.role, user.permissions, "audit"),
  });
  return <AdminDataProvider initialData={data} currentUser={user}><AdminShell user={user} demoMode={!isSupabaseConfigured()}>{children}</AdminShell></AdminDataProvider>;
}
