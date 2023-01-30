
import Header from './components/Header';
import './global.css';

import { Inconsolata } from '@next/font/google';

const inconsolata = Inconsolata({
  subsets:['latin'],
  display: 'optional'
});


export default function RootLayout({
 children,
}: {
 children: React.ReactNode,
}) {

 return (
  <html lang="en" className={inconsolata.className}>
   <head>
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