import { NextRequest, NextResponse } from "next/server";

const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

export async function GET(request: NextRequest) {
  const ids = request.nextUrl.searchParams.get("ids");
  const vsCurrencies = request.nextUrl.searchParams.get("vs_currencies") || "usd";

  if (!ids) {
    return NextResponse.json(
      { error: "Missing 'ids' parameter" },
      { status: 400 }
    );
  }

  const url = `${COINGECKO_BASE_URL}/simple/price?ids=${ids}&vs_currencies=${vsCurrencies}`;

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "CoinGecko API error", status: response.status },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("[api/coingecko/prices] Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch prices" },
      { status: 500 }
    );
  }
}
