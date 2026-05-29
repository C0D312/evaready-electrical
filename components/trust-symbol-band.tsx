import { TrustGraphics } from "@/components/trust-graphics";

type TrustSymbolBandProps = {
  className?: string;
  tone?: "dark" | "light";
};

export function TrustSymbolBand({
  className = "",
  tone = "dark",
}: TrustSymbolBandProps) {
  return <TrustGraphics className={className} tone={tone} />;
}
