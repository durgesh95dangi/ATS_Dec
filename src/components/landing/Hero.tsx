
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="container mx-auto px-4 pt-20 pb-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white opacity-50"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold tracking-wide border border-blue-100 font-sans"
            >
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                v2.0 Now Available
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-[1.1] font-display"
            >
                Build Your Dream Resume <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 animate-gradient-x">
                    in Minutes
                </span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed font-sans"
            >
                Create professional, ATS-friendly resumes with our AI-powered builder. Stand out from the crowd and land your next job interview effortlessly.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row justify-center gap-4 mb-20 font-sans"
            >
                <Link href="/auth/sign-up" className="px-8 py-4 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200 transform hover:-translate-y-1 active:translate-y-0 font-display">
                    Build My Resume Free
                </Link>
                <Link href="/auth/sign-in" className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all shadow-sm hover:shadow-md font-display">
                    View Dashboard
                </Link>
            </motion.div>
        </section>
    );
}
