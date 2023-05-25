'use client';

import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
//import "../styles/globals.css";
//import "../../assets/css/globals.css";

import '@rainbow-me/rainbowkit/styles.css';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { PaperEmbeddedWalletProvider } from '@paperxyz/embedded-wallet-service-rainbowkit';

const inter = Inter({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const clientId =
    process.env.NEXT_PUBLIC_CLIENT_ID === undefined
      ? ''
      : process.env.NEXT_PUBLIC_CLIENT_ID;

  console.log('clientId=', clientId);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <html lang="en">
        <body className={`${inter.className} bg-dark-main text-light-main`}>
          <div>Loading...</div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark-main text-light-main`}>
        <PaperEmbeddedWalletProvider
          appName="Paper RainbowKit Provider"
          walletOptions={{
            clientId: clientId,
            chain: 'Mumbai',
          }}
        >
          <ThirdwebProvider activeChain="mumbai">
            {/*  */}
            {children}
          </ThirdwebProvider>
        </PaperEmbeddedWalletProvider>
      </body>
    </html>
  );
};

export default RootLayout;
