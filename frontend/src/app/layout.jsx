'use client';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col">
                <AuthProvider>
                    <Header />
                    <main className="flex-grow mt-16">
                        {children}
                    </main>
                    <Footer />
                    <Toaster position="top-right" />
                </AuthProvider>
            </body>
        </html>
    );
}
