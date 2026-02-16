"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { StellarWalletsKit as StellarWalletsKitType } from "@creit.tech/stellar-wallets-kit";

interface StellarWalletContextValue {
  address: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const StellarWalletContext = createContext<StellarWalletContextValue | null>(
  null
);

export function useStellarWallet() {
  const ctx = useContext(StellarWalletContext);
  if (!ctx) {
    throw new Error("useStellarWallet must be used within StellarWalletProvider");
  }
  return ctx;
}

export default function StellarWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const kitRef = useRef<StellarWalletsKitType | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    async function initKit() {
      const { StellarWalletsKit, WalletNetwork, allowAllModules } =
        await import("@creit.tech/stellar-wallets-kit");

      const kit = new StellarWalletsKit({
        network: WalletNetwork.PUBLIC,
        modules: allowAllModules(),
      });

      kitRef.current = kit;
    }

    initKit();
  }, []);

  const connect = useCallback(async () => {
    const kit = kitRef.current;
    if (!kit) return;

    await kit.openModal({
      onWalletSelected: async (option) => {
        kit.setWallet(option.id);
        const { address: addr } = await kit.getAddress();
        setAddress(addr);
      },
    });

    requestAnimationFrame(() => {
      const modal = document.querySelector("stellar-wallets-modal");
      const dialog = modal?.shadowRoot?.querySelector(".dialog-modal") as HTMLElement | null;
      if (dialog) {
        dialog.style.overflowY = "auto";
      }
    });
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
  }, []);

  return (
    <StellarWalletContext.Provider
      value={{
        address,
        isConnected: !!address,
        connect,
        disconnect,
      }}
    >
      {children}
    </StellarWalletContext.Provider>
  );
}
