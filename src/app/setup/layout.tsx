import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setup - Egenkap",
  description: "Set up your Egenkap account",
};

export default function SetupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}