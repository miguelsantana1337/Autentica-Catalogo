"use client";

import { platformConfig } from "@/config/platform";
import { useStore } from "@/components/providers/store-provider";

export function StoreModeNotice() {
  const { data } = useStore();
  return (
    <div className="demo-notice">
      {data.settings.checkoutMode === "whatsapp"
        ? "CATÁLOGO CONSULTIVO · PREÇOS, DISPONIBILIDADE E ENTREGA CONFIRMADOS PELO WHATSAPP"
        : platformConfig.demoNotice}
    </div>
  );
}
