import { Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import AppLayout from "@/layouts/app-layout";
import { HiPencilSquare, HiTrash } from "react-icons/hi2";

export default function Dashboard() {
    const { users } = usePage().props as any;

    return (
        <AppLayout>
            <div className="w-full">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 flex items-center justify-between"
                >
                    <h1 className="text-4xl font-black text-white">Admin Dashboard</h1>
                    <Link href="/admin/create">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-amber-400 text-black px-6 py-3 rounded-2xl font-black shadow-lg"
                        >
                            Create Admin
                        </motion.button>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6"
                >
                    <h2 className="text-2xl font-black text-white mb-6">Users</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left px-4 py-4 font-black text-slate-300 uppercase tracking-wider">ID</th>
                                    <th className="text-left px-4 py-4 font-black text-slate-300 uppercase tracking-wider">Name</th>
                                    <th className="text-left px-4 py-4 font-black text-slate-300 uppercase tracking-wider">Email</th>
                                    <th className="text-left px-4 py-4 font-black text-slate-300 uppercase tracking-wider">Type</th>
                                    <th className="text-left px-4 py-4 font-black text-slate-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((user: any) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                                        className="border-b border-white/5 transition-colors"
                                    >
                                        <td className="px-4 py-4 text-white font-semibold">{user.id}</td>
                                        <td className="px-4 py-4 text-slate-300">{user.name}</td>
                                        <td className="px-4 py-4 text-slate-300">{user.email}</td>
                                        <td className="px-4 py-4">
                                            <span className={`px-3 py-1 rounded-lg text-sm font-black ${
                                                user.user_type === 'Admin' 
                                                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' 
                                                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                                            }`}>
                                                {user.user_type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 flex items-center gap-3">
                                            <motion.button
                                                whileHover={{ scale: 1.1, color: '#fbbf24' }}
                                                className="text-slate-300 transition-colors"
                                            >
                                                <HiPencilSquare className="size-5" />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1, color: '#f87171' }}
                                                className="text-slate-300 transition-colors"
                                            >
                                                <HiTrash className="size-5" />
                                            </motion.button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </AppLayout>
    );
}
