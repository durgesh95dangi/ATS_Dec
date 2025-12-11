
import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-16 border-t border-gray-800 font-sans">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="text-xl font-bold text-white mb-6 font-display">ResumeBuilder</div>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Helping job seekers build professional resumes and land their dream jobs with AI-powered tools.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-blue-500 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="hover:text-blue-500 transition-colors">
                                <Github className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="hover:text-blue-500 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 font-display">Product</h4>
                        <ul className="space-y-4">
                            <li><Link href="#features" className="hover:text-blue-500 transition-colors">Features</Link></li>
                            <li><Link href="#pricing" className="hover:text-blue-500 transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-blue-500 transition-colors">Templates</Link></li>
                            <li><Link href="#" className="hover:text-blue-500 transition-colors">Examples</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 font-display">Company</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="hover:text-blue-500 transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-blue-500 transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-blue-500 transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-blue-500 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 font-display">Legal</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-blue-500 transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-blue-500 transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} ResumeBuilder. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
