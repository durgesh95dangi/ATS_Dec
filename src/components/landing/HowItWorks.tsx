
import { motion } from 'framer-motion';

const steps = [
    {
        number: "01",
        title: "Upload Your Resume",
        description: "Upload your existing resume to get started instantly. We support PDF and Word formats."
    },
    {
        number: "02",
        title: "Paste Job Description",
        description: "Tell us about the job you're applying for. Our AI analyzes keywords to optimize your resume."
    },
    {
        number: "03",
        title: "Download New Resume",
        description: "Get a perfectly formatted, ATS-friendly resume tailored to the job description in seconds."
    }
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="container mx-auto px-4 relative">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-display"
                    >
                        How It Works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-600 font-sans"
                    >
                        Three simple steps to your new career.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative max-w-6xl mx-auto font-sans">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2"></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative group text-center"
                        >
                            <div className="w-16 h-16 bg-blue-600 text-white text-2xl font-bold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform font-display">
                                {step.number}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
