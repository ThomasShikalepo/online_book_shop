import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Plus, Edit2, Trash2, X, Loader2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Book {
    id: number;
    title: string;
    description: string;
    category?: string;
    stock?: number;
    old_price?: number;
    new_price: number;
    cover_image?: string;
    treding?: boolean; // Spelled exactly like in backend
}

interface BooksIndexProps {
    books: {
        data: Book[];
        links: any[]; // Pagination
    };
}

export default function BooksIndex({ books }: BooksIndexProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState<{
        title: string;
        description: string;
        new_price: string;
        old_price?: string;
        category?: string;
        stock?: string;
        cover_image?: File | null;
        treding?: boolean;
    }>({
        title: '',
        description: '',
        new_price: '',
        old_price: '',
        category: '',
        stock: '',
        cover_image: null,
        treding: false,
    });

    const openCreateForm = () => {
        setEditingBook(null);
        setFormData({ title: '', description: '', new_price: '', old_price: '', category: '', stock: '', cover_image: null, treding: false });
        setIsFormOpen(true);
    };

    const openEditForm = (book: Book) => {
        setEditingBook(book);
        setFormData({
            title: book.title,
            description: book.description,
            new_price: String(book.new_price),
            old_price: book.old_price ? String(book.old_price) : '',
            category: book.category || '',
            stock: book.stock ? String(book.stock) : '',
            cover_image: null,
            treding: book.treding || false,
        });
        setIsFormOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this book?')) {
            router.delete(`/admin/books/${id}`);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // We use router.post instead of put for FormData (files)
        // In Laravel, we can pass _method: 'PUT' if needed
        const submitData = new FormData();
        submitData.append('title', formData.title);
        submitData.append('description', formData.description);
        submitData.append('new_price', formData.new_price);
        if (formData.old_price) submitData.append('old_price', formData.old_price);
        if (formData.category) submitData.append('category', formData.category);
        if (formData.stock) submitData.append('stock', formData.stock);
        if (formData.treding) submitData.append('treding', '1');
        
        if (formData.cover_image) {
            submitData.append('cover_image', formData.cover_image);
        }

        const onSuccess = () => {
            setIsFormOpen(false);
            setIsSubmitting(false);
        };
        const onError = () => setIsSubmitting(false);

        if (editingBook) {
            router.post(`/admin/books/${editingBook.id}`, submitData, {
                onSuccess,
                onError,
                forceFormData: true, 
            });
        } else {
            router.post('/admin/books', submitData, {
                onSuccess,
                onError,
                forceFormData: true,
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Books" />
            
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Books Management</h1>
                    <p className="text-neutral-400">Add, edit, or remove books from your store.</p>
                </div>
                <Button onClick={openCreateForm} className="bg-indigo-500 hover:bg-indigo-600 text-white border-0 gap-2">
                    <Plus className="w-4 h-4" /> Add New Book
                </Button>
            </div>

            <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-neutral-400">
                        <thead className="text-xs text-neutral-500 uppercase bg-neutral-950/50 border-b border-neutral-800">
                            <tr>
                                <th className="px-6 py-4 font-medium">Book</th>
                                <th className="px-6 py-4 font-medium">Category</th>
                                <th className="px-6 py-4 font-medium">Price</th>
                                <th className="px-6 py-4 font-medium">Stock</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.data.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">No books found.</td>
                                </tr>
                            ) : (
                                books.data.map((book) => (
                                    <tr key={book.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                {book.cover_image ? (
                                                    <img src={`/${book.cover_image}`} alt={book.title} className="w-12 h-16 object-cover rounded shadow-md" />
                                                ) : (
                                                    <div className="w-12 h-16 bg-neutral-800 rounded flex items-center justify-center text-neutral-600">No cover</div>
                                                )}
                                                <div>
                                                    <div className="font-medium text-white line-clamp-1 flex items-center gap-2">
                                                        {book.title}
                                                        {book.treding && (
                                                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                                                <TrendingUp className="w-3 h-3" /> Trending
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-neutral-500 line-clamp-1 mt-1 max-w-xs">{book.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{book.category || '-'}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-emerald-400 font-medium">${book.new_price}</div>
                                            {book.old_price && <div className="text-xs text-neutral-500 line-through">${book.old_price}</div>}
                                        </td>
                                        <td className="px-6 py-4">{book.stock || '-'}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => openEditForm(book)} className="p-2 text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(book.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination UI Placeholder (can be expanded) */}

            {/* Modal Form */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl mt-auto sm:mt-0 shadow-2xl relative">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
                            <h3 className="text-lg font-semibold text-white">{editingBook ? 'Edit Book' : 'Add New Book'}</h3>
                            <button onClick={() => setIsFormOpen(false)} className="text-neutral-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5 sm:col-span-2">
                                    <label className="text-sm font-medium text-neutral-300">Title</label>
                                    <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} type="text" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                                </div>
                                <div className="space-y-1.5 sm:col-span-2">
                                    <label className="text-sm font-medium text-neutral-300">Description</label>
                                    <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"></textarea>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-neutral-300">New Price *</label>
                                    <input required value={formData.new_price} onChange={e => setFormData({...formData, new_price: e.target.value})} type="number" step="0.01" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-neutral-300">Old Price</label>
                                    <input value={formData.old_price} onChange={e => setFormData({...formData, old_price: e.target.value})} type="number" step="0.01" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-neutral-300">Category</label>
                                    <input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} type="text" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-neutral-300">Stock</label>
                                    <input value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} type="number" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                                </div>
                                <div className="space-y-1.5 sm:col-span-2">
                                    <label className="text-sm font-medium text-neutral-300">Cover Image</label>
                                    <input type="file" accept="image/*" onChange={e => setFormData({...formData, cover_image: e.target.files ? e.target.files[0] : null})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20 focus:outline-none transition-colors" />
                                </div>
                                <div className="sm:col-span-2 flex items-center gap-3">
                                    <input type="checkbox" id="treding" checked={formData.treding} onChange={e => setFormData({...formData, treding: e.target.checked})} className="w-4 h-4 rounded border-neutral-800 bg-neutral-950 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-neutral-900" />
                                    <label htmlFor="treding" className="text-sm font-medium text-neutral-300">Mark as Trending Book</label>
                                </div>
                            </div>
                            
                            <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-800 mt-6">
                                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)} className="bg-transparent border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white">
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed gap-2"
                                >
                                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {isSubmitting ? 'Saving...' : (editingBook ? 'Save Changes' : 'Add Book')}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
