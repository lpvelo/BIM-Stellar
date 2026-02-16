"use client";

import { useQuery } from "@tanstack/react-query";

interface PricesResponse {
  stellar: { usd: number };
  "usd-coin": { usd: number };
}

async function fetchStellarPrices(): Promise<PricesResponse> {
  const res = await fetch(
    "/api/coingecko/prices?ids=stellar,usd-coin&vs_currencies=usd"
  );
  if (!res.ok) throw new Error("Failed to fetch prices");
  return res.json();
}

export interface StellarPrices {
  xlmUsd: number;
  usdcUsd: number;
  xlmToUsdc: number;
  usdcToXlm: number;
}

export function useStellarPrices() {
  return useQuery<StellarPrices>({
    queryKey: ["stellar-prices"],
    queryFn: async () => {
      const data = await fetchStellarPrices();
      const xlmUsd = data.stellar.usd;
      const usdcUsd = data["usd-coin"].usd;
      return {
        xlmUsd,
        usdcUsd,
        xlmToUsdc: xlmUsd / usdcUsd,
        usdcToXlm: usdcUsd / xlmUsd,
      };
    },
    refetchInterval: 30_000,
    staleTime: 15_000,
  });
}
