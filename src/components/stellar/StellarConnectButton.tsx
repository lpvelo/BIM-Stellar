"use client";

import { useStellarWallet } from "./StellarWalletProvider";
import { useTranslations } from "next-intl";

function formatAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export default function StellarConnectButton() {
  const { address, isConnected, connect, disconnect } = useStellarWallet();
  const t = useTranslations("StellarPoc");

  if (isConnected && address) {
    return (
      <button
        onClick={disconnect}
        className="bg-background-tertiary hover:bg-background-tertiary/80 text-text-primary font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer text-sm"
      >
        {formatAddress(address)}
      </button>
    );
  }

  return (
    <button
      onClick={connect}
      className="bg-button hover:bg-button/80 text-text-primary font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer text-sm"
    >
      {t("ConnectWallet")}
    </button>
  );
}
