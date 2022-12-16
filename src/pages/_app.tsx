import type { AppProps } from 'next/app'

import { createClient, configureChains, defaultChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Header from "@/root/components/Header";

import { trpc } from "../utils/trpc";
import "../styles/globals.css";

const {provider, webSocketProvider} = configureChains(defaultChains, [publicProvider()]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

function MyApp({Component, pageProps}: AppProps) {
  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session}>
        <>
          <style jsx global>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600;700;900&display=swap');
            `}
          </style>
          <Header/>
          <Component {...pageProps} />
        </>
        <ReactQueryDevtools />
      </SessionProvider>
    </WagmiConfig>
  );
}

export default trpc.withTRPC(MyApp);
