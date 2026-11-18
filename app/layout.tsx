import './globals.css';
import type { Metadata } from 'next';
export const metadata:Metadata={title:'JARVIS | Stariuxe Enterprises',description:'Personal AI command centre',manifest:'/manifest.json'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}