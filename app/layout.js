export const metadata = {
  title: "MediBook",
  description: "Modern Healthcare Appointment SaaS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
