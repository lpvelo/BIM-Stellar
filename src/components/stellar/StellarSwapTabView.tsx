"use client";

import AssetAmountFieldUI from "@/components/ui/AssetAmountFieldUI";
import BimPoweredBy from "@/components/icons/BimPoweredBy";
import { useTranslations } from "next-intl";
import StellarConnectButton from "./StellarConnectButton";
import StellarActionButton from "./StellarActionButton";
import Image from "next/image";
import exchangeLogoLight from "@public/assets/images/logos/exchangeLogo_light.png";

const XLM_LOGO_URL = "https://cryptologos.cc/logos/stellar-xlm-logo.svg";
const USDC_LOGO_URL = "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg";

const TOKEN_LOGOS: Record<string, string> = {
  XLM: XLM_LOGO_URL,
  USDC: USDC_LOGO_URL,
};

function TokenDisplay({ symbol }: { symbol: string }) {
  return (
    <div className="flex items-center gap-2 bg-background-secondary rounded-lg px-3 py-2">
      <Image
        src={TOKEN_LOGOS[symbol] ?? XLM_LOGO_URL}
        alt={symbol}
        width={24}
        height={24}
        className="rounded-full"
      />
      <span className="text-text-primary font-medium text-sm">{symbol}</span>
    </div>
  );
}

interface StellarSwapTabViewProps {
  amountIn: string;
  amountOut: string;
  onAmountInChange: (value: string) => void;
  isCalculating: boolean;
  onSwap: () => void;
  onSwitchDirection: () => void;
  tokenIn: string;
  tokenOut: string;
  usdValueIn: number;
  usdValueOut: number;
  rate: number;
  pricesLoading: boolean;
}

export default function StellarSwapTabView({
  amountIn,
  amountOut,
  onAmountInChange,
  isCalculating,
  onSwap,
  onSwitchDirection,
  tokenIn,
  tokenOut,
  usdValueIn,
  usdValueOut,
  rate,
  pricesLoading,
}: StellarSwapTabViewProps) {
  const t = useTranslations("StellarPoc");

  return (
    <div className="w-full space-y-4">
      {/* Header: BIM logo left, connect button right */}
      <div className="flex items-center justify-between">
        <div className="max-w-[160px] md:max-w-[200px]">
          <Image
            src={exchangeLogoLight}
            alt="BIM Exchange"
            width={200}
            height={100}
            className="h-auto w-auto"
          />
        </div>
        <StellarConnectButton />
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-text-primary text-center">
        POC Stellar
      </h1>

      {/* Swap Card */}
      <div className="bg-background-secondary p-6 rounded-xl border-2 border-background-tertiary">
        <div className="space-y-4">
          {/* Stellar chain indicator */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2 bg-background-tertiary rounded-full px-4 py-1.5">
              <Image
                src={XLM_LOGO_URL}
                alt="Stellar"
                width={18}
                height={18}
                className="rounded-full"
              />
              <span className="text-text-primary text-sm font-medium">
                Stellar Network
              </span>
            </div>
          </div>

          {/* Input: You send */}
          <AssetAmountFieldUI
            label={t("YouSend")}
            value={amountIn}
            onChange={onAmountInChange}
            disabled={false}
            isLoading={false}
            showUsd={true}
            usdText={`${usdValueIn.toFixed(2)} $US`}
            selector={<TokenDisplay symbol={tokenIn} />}
          />

          {/* Switch direction button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={onSwitchDirection}
              className="bg-button hover:bg-button/80 rounded-full p-2 transition-colors cursor-pointer"
            >
              <svg
                className="w-5 h-5 text-text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </button>
          </div>

          {/* Output: You receive */}
          <AssetAmountFieldUI
            label={t("YouReceive")}
            value={amountOut}
            onChange={() => {}}
            disabled={true}
            isLoading={isCalculating}
            showUsd={true}
            usdText={`${usdValueOut.toFixed(2)} $US`}
            selector={<TokenDisplay symbol={tokenOut} />}
          />

          {/* Exchange rate info */}
          {rate > 0 && !pricesLoading && (
            <div className="text-center text-sm text-text-secondary">
              1 {tokenIn} ≈ {rate.toFixed(6)} {tokenOut}
            </div>
          )}

          {/* Action Button */}
          <StellarActionButton
            isLoading={isCalculating}
            disabled={!amountIn || amountIn === "0"}
            onClick={onSwap}
          />

          <div className="text-center mt-2 flex justify-center">
            <BimPoweredBy />
          </div>
        </div>
      </div>
    </div>
  );
}
