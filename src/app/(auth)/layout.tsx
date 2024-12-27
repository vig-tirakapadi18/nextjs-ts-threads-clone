import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import "../globals.css";

export const metadata = {
  title: "Threads",
  description: "NextJs Threads App",
};

interface IRootLayoutProps {
  children: ReactNode;
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const RootLayout = ({ children }: IRootLayoutProps) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.className} bg-dark-1`}>
          <div className="flex justify-center items-center w-full min-h-screen">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
