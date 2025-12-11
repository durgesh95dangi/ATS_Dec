
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
    {
        name: "Free",
        price: "0",
        description: "Perfect for getting started",
        features: [
            "1 Resume Template",
            "Basic AI Suggestions",
            "PDF Download",
            "Watermark included"
        ],
        cta: "Start Free",
        popular: false
    },
    {
        name: "Pro",
        price: "12",
        description: "Best for job seekers",
        features: [
            "All Premium Templates",
            "Advanced AI Writing Assist",
            "Unlimited PDF Downloads",
            "No Watermark",
            "Cover Letter Builder"
        ],
        cta: "Get Pro",
        popular: true
    },
    {
        name: "Lifetime",
        price: "99",
        description: "One-time payment",
        features: [
            "Everything in Pro",
            "Lifetime Access",
            "Priority Support",
            "Future Updates Included",
            "Multiple Profiles"
        ],
        cta: "Get Lifetime",
        popular: false
    }
];

export default function Pricing() {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <section id="pricing" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-display"
                    >
                        Simple, Transparent Pricing
                    </motion.h2>
                    <p className="text-lg text-gray-600 mb-8 font-sans">
                        Start for free, upgrade when you need more power.
                    </p>

                    {/* Toggle */}
                    <div className="flex items-center justify-center gap-4 font-sans">
                        <span className={`text-sm font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
                        <button
                            onClick={() => setIsYearly(!isYearly)}
                            className="relative w-14 h-8 bg-blue-600 rounded-full p-1 transition-colors hover:bg-blue-700 focus:outline-none"
                        >
                            <motion.div
                                className="w-6 h-6 bg-white rounded-full shadow-md"
                                animate={{ x: isYearly ? 24 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </button>
                        <span className={`text-sm font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
                            Yearly <span className="text-blue-600 text-xs font-bold ml-1 bg-blue-50 px-2 py-0.5 rounded-full">-20%</span>
                        </span>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto font-sans">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative bg-white rounded-2xl p-8 border ${plan.popular ? 'border-blue-600 shadow-xl scale-105 z-10' : 'border-gray-200 shadow-sm hover:shadow-lg'} transition-all duration-300`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold uppercase tracking-wide px-4 py-1.5 rounded-full shadow-sm">
                                    Most Popular
                                </div>
                            )}

                            <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">{plan.name}</h3>
                            <p className="text-gray-500 text-sm mb-6">{plan.description}</p>

                            <div className="flex items-end gap-1 mb-6">
                                <span className="text-4xl font-bold text-gray-900">
                                    ${isYearly && plan.price !== "0" ? Math.floor(parseInt(plan.price) * 0.8 * 12) : plan.price}
                                </span>
                                <span className="text-gray-500 mb-1">
                                    {plan.name === "Lifetime" ? "/life" : (isYearly ? "/year" : "/mo")}
                                </span>
                            </div>

                            <button className={`w-full py-3 rounded-xl font-bold mb-8 transition-colors font-display ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-xl' : 'bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200'}`}>
                                {plan.cta}
                            </button>

                            <ul className="space-y-4">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                                            <Check className="w-3.5 h-3.5 text-blue-600" />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
