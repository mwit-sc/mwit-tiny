"use client";

import { motion } from 'framer-motion';
import { signIn, useSession } from 'next-auth/react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { useEffect } from 'react';

const inter = Inter({ weight: ['400', '700'], style: 'normal', subsets: ['latin'] });

const SignInPage = () => {
    const { data: session } = useSession();

    useEffect(() => {
        if (session && session.user) {
            const callback = new URLSearchParams(window.location.search).get('callback');
            window.location.href = callback || '/';
        }
    }, [session]);

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen bg-white text-[#4169E1] overflow-hidden relative ${inter.className}`}>
            {/* Colored circles background */}
            <div className="absolute inset-0 -z-10">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        suppressHydrationWarning
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="absolute rounded-full"
                        style={{
                            width: `${Math.random() * 300 + 100}px`,
                            height: `${Math.random() * 300 + 100}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            background: `rgba(65, 105, 225, ${Math.random() * 0.1 + 0.05})`,
                            animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8"
            >
                <motion.h1 
                    className="text-6xl font-bold mb-4 inline-block"
                    style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    animate={{
                        backgroundImage: [
                            'linear-gradient(45deg, #4169E1, #FF69B4)',
                            'linear-gradient(45deg, #FF69B4, #4169E1)',
                            'linear-gradient(45deg, #4169E1, #FF69B4)',
                        ]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                >
                    URL Shortener
                </motion.h1>
                <p className="text-lg text-[#4169E1]/70">
                    a tool that converts your link to the format tiny.mwit.link
                </p>
            </motion.div>

            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="px-8 py-3 bg-[#4169E1] text-white rounded-xl text-lg font-medium shadow-lg hover:bg-[#4169E1]/90 transition-all duration-300 flex items-center justify-center"
                onClick={() => signIn('google')}
            >
                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
                <span className='font-medium font-IBMPlex'>
                    Login with Google
                </span>
            </motion.button>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute bottom-2 h-12 w-auto opacity-80 flex"
            >
                <motion.p className="text-[#4169E1]/70 text-sm">
                    Student Committee @ Mahidol Wittayanusorn School
                </motion.p>
            </motion.div>
        </div>
    );
};

export default SignInPage;

