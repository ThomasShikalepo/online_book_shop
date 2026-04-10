import { useState, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Plus, Edit2, Trash2, X, Loader2, TrendingUp, Search, ChevronLeft, ChevronRight } from 'lucide-react';
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
    treding?: boolean;
}

interface BooksIndexProps {
    books: Book[];
}

const PAGE_SIZE = 50;

export default function BooksIndex({ books }: BooksIndexProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

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

    // Client-side filtering — instant, no server round-trip
    const filtered = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return books;
        return books.filter(
            (b) =>
                b.title.toLowerCase().includes(q) ||
                (b.category ?? '').toLowerCase().includes(q) ||
                b.description.toLowerCase().includes(q),
        );
    }, [books, searchQuery]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const safePage = Math.min(currentPage, totalPages);
    const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

    const handleSearchChange = (val: string) => {
        setSearchQuery(val);
        setCurrentPage(1); // reset to first page on new search
    };

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

        const submitData = new FormData();
        submitData.append('title', formData.title);
        submitData.append('description', formData.description);
        submitData.append('new_price', formData.new_price);
        if (formData.old_price) submitData.append('old_price', formData.old_price);
        if (formData.category) submitData.append('category', formData.category);
        if (formData.stock) submitData.append('stock', formData.stock);
        if (formData.treding) submitData.append('treding', '1');
        if (formData.cover_image) submitData.append('cover_image', formData.cover_image);

        const onSuccess = () => { setIsFormOpen(false); setIsSubmitting(false); };
        const onError = () => setIsSubmitting(false);

        if (editingBook) {
            router.post(`/admin/books/${editingBook.id}`, submitData, { onSuccess, onError, forceFormData: true });
        } else {
            router.post('/admin/books', submitData, { onSuccess, onError, forceFormData: true });
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Books" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Books Management</h1>
                    <p className="text-neutral-400">
                        {filtered.length > 0
                            ? `${filtered.length} book${filtered.length !== 1 ? 's' : ''}${searchQuery ? ` matching "${searchQuery}"` : ''}`
                            : searchQuery ? `No books match "${searchQuery}"` : 'No books yet'}
                    </p>
                </div>
                <Button onClick={openCreateForm} className="bg-indigo-500 hover:bg-indigo-600 text-white border-0 gap-2 shrink-0">
                    <Plus className="w-4 h-4" /> Add New Book
                </Button>
            </div>

            {/* Search bar */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => handleSearchChange(e.target.value)}
                        placeholder="Search by title, category, or description…"
                        className="w-full bg-neutral-900/70 border border-neutral-800 rounded-xl pl-10 pr-10 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => handleSearchChange('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Table */}
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
                            {paginated.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-3 text-neutral-500">
                                            <Search className="w-10 h-10 opacity-30" />
                                            <p className="text-base">
                                                {searchQuery ? `No books match "${searchQuery}"` : 'No books in the database yet.'}
                                            </p>
                                            {!searchQuery && (
                                                <Button onClick={openCreateForm} className="mt-2 bg-indigo-500 hover:bg-indigo-600 text-white border-0 gap-2">
                                                    <Plus className="w-4 h-4" /> Add your first book
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                paginated.map((book) => (
                                    <tr key={book.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                {book.cover_image ? (
                                                    <img src={`/${book.cover_image}`} alt={book.title} className="w-12 h-16 object-cover rounded shadow-md flex-shrink-0" />
                                                ) : (
                                                    <div className="w-12 h-16 bg-neutral-800 rounded flex items-center justify-center text-neutral-600 text-xs flex-shrink-0">No cover</div>
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
                                            <div className="text-emerald-400 font-medium">N${book.new_price}</div>
                                            {book.old_price ? <div className="text-xs text-neutral-500 line-through">N${book.old_price}</div> : null}
                                        </td>
                                        <td className="px-6 py-4">{book.stock ?? '-'}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => openEditForm(book)} className="p-2 text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-colors" title="Edit">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(book.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Delete">
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

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-800">
                        <p className="text-xs text-neutral-500">
                            Page {safePage} of {totalPages} &middot; {filtered.length} total
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={safePage === 1}
                                className="p-2 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`min-w-[2rem] h-8 px-2 rounded-lg text-xs transition-colors ${
                                        page === safePage
                                            ? 'bg-indigo-500 text-white font-semibold'
                                            : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={safePage === totalPages}
                                className="p-2 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Form */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl shadow-2xl relative my-auto">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
                            <h3 className="text-lg font-semibold text-white">{editingBook ? 'Edit Book' : 'Add New Book'}</h3>
                            <button onClick={() => setIsFormOpen(false)} className="text-neutral-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5 sm:col-span-2">
                                    <label className="text-sm font-medium text-neutral-300">Title *</label>
                                    <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} type="text" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                                </div>
                                <div className="space-y-1.5 sm:col-span-2">
                                    <label className="text-sm font-medium text-neutral-300">Description *</label>
                                    <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
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
                                    {editingBook?.cover_image && (
                                        <p className="text-xs text-neutral-500 mt-1">Leave blank to keep the existing cover image.</p>
                                    )}
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
                                    {isSubmitting ? 'Saving…' : (editingBook ? 'Save Changes' : 'Add Book')}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
