import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';

interface User {
    id: number;
    name: string;
    email: string;
    user_type: string;
    created_at: string;
}

interface UsersIndexProps {
    users: {
        data: User[];
        links: any[];
    };
}

export default function UsersIndex({ users }: UsersIndexProps) {
    return (
        <AdminLayout>
            <Head title="Manage Users" />

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Users Directory</h1>
                    <p className="text-neutral-400">View registered users and administrators.</p>
                </div>
            </div>

            <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-neutral-400">
                        <thead className="text-xs text-neutral-500 uppercase bg-neutral-950/50 border-b border-neutral-800">
                            <tr>
                                <th className="px-6 py-4 font-medium">User Details</th>
                                <th className="px-6 py-4 font-medium">Role</th>
                                <th className="px-6 py-4 font-medium">Joined Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-8 text-center text-neutral-500">No users found.</td>
                                </tr>
                            ) : (
                                users.data.map((user) => (
                                    <tr key={user.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{user.name}</div>
                                            <div className="text-xs text-neutral-500">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border inline-block
                                                ${user.user_type === 'Admin' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-neutral-800 text-neutral-300 border-neutral-700'}
                                            `}>
                                                {user.user_type === 'Admin' ? 'Administrator' : 'Customer'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-neutral-500">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Pagination placeholder */}
        </AdminLayout>
    );
}
