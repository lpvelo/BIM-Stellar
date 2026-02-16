import { Toaster } from "@/components/ui/sonner";
import StellarWalletProvider from "@/components/stellar/StellarWalletProvider";
import StellarSwapTab from "@/components/stellar/StellarSwapTab";

export default function StellarPocPage() {
  return (
    <StellarWalletProvider>
      <div className="min-h-screen flex flex-col max-w-7xl mx-auto">
        <main className="flex-1">
          <div className="space-y-6 md:space-y-10 py-8">
            <div className="flex flex-col items-center space-y-2 w-full max-w-xl mx-auto px-4">
              <div className="w-full">
                <StellarSwapTab />
              </div>
            </div>
          </div>
        </main>
      </div>
      <Toaster />
    </StellarWalletProvider>
  );
}
