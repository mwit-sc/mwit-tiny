"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';

const inter = Inter({ weight: ['400', '700'], style: 'normal', subsets: ['latin'] });

const AuthErrorPage = () => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("An error occurred during authentication.");

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const error = searchParams.get('error');
        if (error) {
            setErrorMessage(decodeURIComponent(error));
        }
    }, []);

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen bg-white text-[#e14141] overflow-hidden relative ${inter.className}`}>
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
                            'linear-gradient(45deg, #ff6464, #ffcb64)',
                            'linear-gradient(45deg, #ffcb64, #ff6464)',
                            'linear-gradient(45deg, #ff6464, #ffcb64)',
                        ]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                >
                    Authentication Error
                </motion.h1>
                <p className="text-lg text-[#ef4b4b]/70 mb-6">
                    {errorMessage}
                </p>
            </motion.div>

            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="px-8 py-3 bg-[#ef4b4b] text-white rounded-xl text-lg font-medium shadow-lg hover:bg-[#ef4b4b]/90 transition-all duration-300 flex items-center justify-center"
                onClick={() => router.push('/auth/signin')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span className='font-medium font-IBMPlex'>
                    Return to Sign In
                </span>
            </motion.button>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute bottom-2 h-12 w-auto opacity-80 flex"
            >
                <motion.p className="text-[#ef4b4b]/70 text-sm">
                    Student Committee @ Mahidol Wittayanusorn School
                </motion.p>
            </motion.div>
        </div>
    );
};

export default AuthErrorPage;
