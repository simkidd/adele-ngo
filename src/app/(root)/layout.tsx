import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import ScrollProgress from "@/components/shared/ScrollProgress";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
