"use client";

import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useStellarWallet } from "./StellarWalletProvider";
import { useStellarPrices } from "./useStellarPrices";
import StellarSwapTabView from "./StellarSwapTabView";

function computeOutput(input: string, rate: number): string {
  const value = parseFloat(input);
  if (!input || isNaN(value) || value <= 0) return "";
  return (value * rate).toFixed(7);
}

export default function StellarSwapTab() {
  const t = useTranslations("StellarPoc");
  const { isConnected } = useStellarWallet();
  const { data: prices, isLoading: pricesLoading } = useStellarPrices();

  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const tokenIn = isReversed ? "USDC" : "XLM";
  const tokenOut = isReversed ? "XLM" : "USDC";

  const rate = isReversed
    ? (prices?.usdcToXlm ?? 0)
    : (prices?.xlmToUsdc ?? 0);

  const priceInUsd = isReversed
    ? (prices?.usdcUsd ?? 0)
    : (prices?.xlmUsd ?? 0);

  const priceOutUsd = isReversed
    ? (prices?.xlmUsd ?? 0)
    : (prices?.usdcUsd ?? 0);

  const amountInNum = parseFloat(amountIn) || 0;
  const amountOutNum = parseFloat(amountOut) || 0;
  const usdValueIn = amountInNum * priceInUsd;
  const usdValueOut = amountOutNum * priceOutUsd;

  const handleAmountInChange = useCallback(
    (value: string) => {
      setAmountIn(value);

      if (debounceRef.current) clearTimeout(debounceRef.current);

      if (!value || parseFloat(value) <= 0) {
        setAmountOut("");
        setIsCalculating(false);
        return;
      }

      if (!rate) {
        setIsCalculating(true);
        return;
      }

      setIsCalculating(true);

      debounceRef.current = setTimeout(() => {
        setAmountOut(computeOutput(value, rate));
        setIsCalculating(false);
      }, 500);
    },
    [rate]
  );

  const handleSwitchDirection = useCallback(() => {
    const newReversed = !isReversed;
    setIsReversed(newReversed);

    const previousOut = amountOut;
    setAmountIn(previousOut);
    setAmountOut("");

    if (debounceRef.current) clearTimeout(debounceRef.current);

    const newRate = newReversed
      ? (prices?.usdcToXlm ?? 0)
      : (prices?.xlmToUsdc ?? 0);

    if (!previousOut || parseFloat(previousOut) <= 0 || !newRate) {
      setIsCalculating(false);
      return;
    }

    setIsCalculating(true);
    debounceRef.current = setTimeout(() => {
      setAmountOut(computeOutput(previousOut, newRate));
      setIsCalculating(false);
    }, 500);
  }, [amountOut, isReversed, prices]);

  const handleSwap = useCallback(() => {
    if (!isConnected) return;

    toast.success(t("SwapSuccess"), {
      description: `${amountIn} ${tokenIn} → ${amountOut} ${tokenOut}`,
    });
  }, [isConnected, amountIn, amountOut, tokenIn, tokenOut, t]);

  return (
    <StellarSwapTabView
      amountIn={amountIn}
      amountOut={amountOut}
      onAmountInChange={handleAmountInChange}
      isCalculating={isCalculating || pricesLoading}
      onSwap={handleSwap}
      onSwitchDirection={handleSwitchDirection}
      tokenIn={tokenIn}
      tokenOut={tokenOut}
      usdValueIn={usdValueIn}
      usdValueOut={usdValueOut}
      rate={rate}
      pricesLoading={pricesLoading}
    />
  );
}
