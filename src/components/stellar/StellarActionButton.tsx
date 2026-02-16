"use client";

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useStellarWallet } from "./StellarWalletProvider";

interface StellarActionButtonProps {
  isLoading: boolean;
  disabled: boolean;
  onClick: () => void;
}

export default function StellarActionButton({
  isLoading,
  disabled,
  onClick,
}: StellarActionButtonProps) {
  const t = useTranslations("StellarPoc");
  const { isConnected, connect } = useStellarWallet();

  const handleClick = () => {
    if (!isConnected) {
      connect();
    } else {
      onClick();
    }
  };

  const isDisabled = isConnected && (isLoading || disabled);

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className="w-full h-12 bg-button hover:bg-button/80 disabled:bg-button disabled:cursor-not-allowed text-text-primary font-semibold py-3 px-4 rounded-lg transition-colors cursor-pointer"
    >
      {isLoading ? (
        <Loader2 className="w-full h-full animate-spin text-text-primary" />
      ) : !isConnected ? (
        t("ConnectWallet")
      ) : (
        t("SwapButton")
      )}
    </button>
  );
}
