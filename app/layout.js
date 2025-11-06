import "./globals.css";

export const metadata = {
  title: "MediBook | Smart Healthcare SaaS",
  description: "Modern and responsive medical booking platform built with Next.js and TailwindCSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
