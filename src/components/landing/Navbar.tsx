
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100"
        >
            <div className="text-xl font-bold text-blue-700 flex items-center gap-2 font-display">
                <span className="bg-gradient-to-r from-blue-700 to-indigo-600 text-transparent bg-clip-text">ResumeBuilder</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
                <Link href="#features" className="text-gray-600 hover:text-blue-700 font-medium transition-colors text-sm">Features</Link>
                <Link href="#how-it-works" className="text-gray-600 hover:text-blue-700 font-medium transition-colors text-sm">How It Works</Link>
                <Link href="#pricing" className="text-gray-600 hover:text-blue-700 font-medium transition-colors text-sm">Pricing</Link>
                <Link href="#faq" className="text-gray-600 hover:text-blue-700 font-medium transition-colors text-sm">FAQ</Link>
            </div>
            <div className="flex items-center gap-4">
                <Link href="/auth/sign-in" className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm">
                    Log in
                </Link>
                <Link href="/auth/sign-up" className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-medium transition-all shadow-sm transform hover:scale-105 active:scale-95 text-sm font-display">
                    Get Started
                </Link>
            </div>
        </motion.nav>
    );
}
