import { Link, router, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState } from "react";
import AppLayout from "@/layouts/app-layout";


export default function CreateAdmin() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        router.post('/admin/store', formData, {
            onError: (errors) => {
                setErrors(errors as Record<string, string>);
                setIsLoading(false);
            },
            onSuccess: () => {
                setIsLoading(false);
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
                });
            }
        });
    };

    return (
        <AppLayout>
            <div className="w-full max-w-2xl">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-4 mb-2">
                        <Link href="/admin">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="text-amber-400 font-black hover:underline"
                            >
                                ← Back to Dashboard
                            </motion.button>
                        </Link>
                    </div>
                    <h1 className="text-4xl font-black text-white">Create Admin</h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-8"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full rounded-xl bg-white/5 border ${
                                    errors.name ? 'border-red-500' : 'border-white/10'
                                } text-white py-3 px-4 focus:outline-none focus:border-amber-400 focus:bg-white/10 transition-all`}
                                placeholder="Admin name"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full rounded-xl bg-white/5 border ${
                                    errors.email ? 'border-red-500' : 'border-white/10'
                                } text-white py-3 px-4 focus:outline-none focus:border-amber-400 focus:bg-white/10 transition-all`}
                                placeholder="admin@example.com"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full rounded-xl bg-white/5 border ${
                                    errors.password ? 'border-red-500' : 'border-white/10'
                                } text-white py-3 px-4 focus:outline-none focus:border-amber-400 focus:bg-white/10 transition-all`}
                                placeholder="Enter password"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-black text-slate-300 uppercase tracking-wider mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                className={`w-full rounded-xl bg-white/5 border border-white/10 text-white py-3 px-4 focus:outline-none focus:border-amber-400 focus:bg-white/10 transition-all`}
                                placeholder="Confirm password"
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-amber-400 text-black px-6 py-3 rounded-xl font-black shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Creating..." : "Create Admin"}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </AppLayout>
    );
}
