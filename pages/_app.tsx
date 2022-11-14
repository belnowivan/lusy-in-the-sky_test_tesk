import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import { StoreProvider } from '../store/StoreProvider';
import Script from 'next/script';
import '../styles/globals.css';


const App = ({ Component, pageProps }: AppProps) => {

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-VWVMMKCCWK"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-VWVMMKCCWK');
        `}
      </Script>
      <StoreProvider {...pageProps}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </>
  );
};

export default App;