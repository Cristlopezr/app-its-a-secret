import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { AudioPlayer } from '@/app/_components/audio-player';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: "It's a Secret",
    description: 'A game where you can reveal your secrets secretly.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased container mx-auto`}>
                <AudioPlayer className='absolute right-10 top-10 xl:right-32' />
                {children}
            </body>
        </html>
    );
}
