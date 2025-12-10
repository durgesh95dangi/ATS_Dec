
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Software Engineer",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        content: "I applied to 50 jobs with my old resume and got 0 callbacks. After using ResumeBuilder, I got 3 interviews in a week. The AI suggestions were a game changer.",
        rating: 5
    },
    {
        name: "David Chen",
        role: "Product Manager",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
        content: "The templates are actually professional and clean. Most other builders look too flashy or too boring. This perfected the balance.",
        rating: 5
    },
    {
        name: "Emily Rodriguez",
        role: "Marketing Director",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        content: "Super easy to use. I loved the real-time preview feature. I was able to customize it exactly how I wanted without fighting with formatting.",
        rating: 4
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-display"
                    >
                        Loved by Job Seekers
                    </motion.h2>
                    <p className="text-lg text-gray-600 font-sans">
                        Join thousands of professionals who have advanced their careers with us.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto font-sans">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-1 mb-6 text-yellow-400">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-700 italic mb-8 min-h-20">"{testimonial.content}"</p>
                            <div className="flex items-center gap-4">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
