import { TonConnectUIProvider } from "@tonconnect/ui-react";
import '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <TonConnectUIProvider manifestUrl="http://127.0.0.1:3000/tonconnect-manifest.json">
      <Component {...pageProps} />
    </TonConnectUIProvider>
  );
}

export default MyApp;
