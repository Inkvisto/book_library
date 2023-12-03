
import Header from './components/Header';
import './global.css';

import { Inconsolata } from '@next/font/google';

const inconsolata = Inconsolata({
  subsets:['latin'],
  display: 'optional'
});


const APP_NAME = "next-pwa example";
const APP_DESCRIPTION = "This is an example of using next-pwa";

export default function RootLayout({
 children,
}: {
 children: React.ReactNode,
}) {

 return (
  <html lang="en" className={inconsolata.className}>
   <head>
   <meta name="application-name" content={APP_NAME} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={APP_NAME} />
        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <style>{`
            html, body, #__next {
              height: 100%;
            }
            #__next {
              margin: 0 auto;
            }
            h1 {
              text-align: center;
            }
            `}</style>
    <title>Next Layout Example</title>
   </head>
   <body>
    
    <header>
    <Header />
          </header>
    <div>{children}</div>
   </body>
  </html>
 );
}