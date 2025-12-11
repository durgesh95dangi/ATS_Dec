
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, Smartphone, Zap, FileText, Target } from 'lucide-react';

const features = [
    {
        icon: Sparkles,
        title: "AI-Powered Suggestions",
        description: "Smart writing assistance helps you craft compelling bullet points and professional summaries instantly.",
        color: "bg-blue-50 text-blue-600"
    },
    {
        icon: Target,
        title: "ATS Optimized",
        description: "Our templates are designed to pass Applicant Tracking Systems so your resume actually reaches recruiters.",
        color: "bg-indigo-50 text-indigo-600"
    },
    {
        icon: FileText,
        title: "Professional Templates",
        description: "Choose from a variety of sleek, modern designs that highlight your skills and experience perfectly.",
        color: "bg-cyan-50 text-cyan-600"
    },
    {
        icon: Zap,
        title: "Instant Download",
        description: "Export your resume in PDF format with a single click, ready to be sent to your dream employer.",
        color: "bg-sky-50 text-sky-600"
    },
    {
        icon: Smartphone,
        title: "Mobile Friendly",
        description: "Edit your resume on the go. Our platform is fully responsive and works great on all devices.",
        color: "bg-blue-50 text-blue-600"
    },
    {
        icon: CheckCircle,
        title: "Real-time Previews",
        description: "See changes instantly as you type. No more guessing how your resume will look after export.",
        color: "bg-indigo-50 text-indigo-600"
    }
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-white relative">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold tracking-wide font-sans"
                    >
                        Features
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-display"
                    >
                        Everything You Need to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Get Hired Faster</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 font-sans"
                    >
                        Packed with powerful features to help you build a standout resume in record time.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto font-sans">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform`}>
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
