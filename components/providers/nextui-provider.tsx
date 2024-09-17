import { NextUIProvider } from "@nextui-org/system";

export function NextuiProvider({ children }: { children: React.ReactNode }) {
  return <NextUIProvider className="h-full">{children}</NextUIProvider>;
}
