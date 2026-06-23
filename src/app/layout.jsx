import { ThemeProvider } from "@/context/ThemeContext";
import "@/app/globals.css"; // Ensure Tailwind v4 is imported here
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "PromptHub | AI Prompt Sharing & Marketplace",
  description: "Buy & Sell Premium AI Prompts Instantly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 dark:bg-[#0B0F19] dark:text-slate-100 transition-colors duration-300 antialiased">
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}