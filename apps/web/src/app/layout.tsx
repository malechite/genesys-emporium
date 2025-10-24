import type { Metadata } from 'next';
import {
  Bebas_Neue,
  Nunito_Sans,
  EB_Garamond,
  Righteous,
  Archivo,
  Merriweather,
  Playfair_Display,
  Cormorant_Garamond,
  Khand
} from 'next/font/google';
import { ReduxProvider } from './ReduxProvider';
import { ClientGlobalStyles } from './ClientGlobalStyles';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'sw-rpg-icons/css/sw-rpg-icons.min.css';
import 'sw-rpg-icons/css/sw-rpg-colors.min.css';
import './globals.css';

// Google Fonts setup
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
});

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  display: 'swap',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  display: 'swap',
});

const righteous = Righteous({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-righteous',
  display: 'swap',
});

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
});

const khand = Khand({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-khand',
  display: 'swap',
});

export const metadata: Metadata = {
    title: 'Genesys Emporium',
    description: 'Character manager for Genesys RPG'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`antialiased ${bebasNeue.variable} ${nunitoSans.variable} ${ebGaramond.variable} ${righteous.variable} ${archivo.variable} ${merriweather.variable} ${playfairDisplay.variable} ${cormorantGaramond.variable} ${khand.variable}`}>
                <ClientGlobalStyles />
                <ReduxProvider>{children}</ReduxProvider>
            </body>
        </html>
    );
}
