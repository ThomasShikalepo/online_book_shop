import '@/../css/Home.css';
import { Link, usePage, router } from "@inertiajs/react";
import { motion } from "framer-motion";
import React, { useState } from 'react'

const CartPage = () => {
  const { cartItems } = usePage().props as any;
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [editingItems, setEditingItems] = useState<Set<number>>(new Set());

  // Initialize quantities
  React.useEffect(() => {
    const initialQties: { [key: number]: number } = {};
    cartItems.forEach((item: any) => {
      initialQties[item.id] = item.quantity;
    });
    setQuantities(initialQties);
  }, [cartItems]);

  const totalPrice = cartItems.reduce((total: number, item: any) => {
    const currentQuantity = quantities[item.id] || item.quantity;
    const itemTotal = (item.price ?? item.book?.new_price) * currentQuantity;

    return total + itemTotal;
  }, 0).toFixed(2);

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your entire cart?')) {
      router.delete('/cart');
    }
  };

  const handleRemoveItem = (itemId: number) => {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
      router.delete(`/cart/${itemId}`);
    }
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      return
    }

    setQuantities({ ...quantities, [itemId]: newQuantity });
    setEditingItems(prev => new Set(prev).add(itemId));
  };

  const handleSaveQuantity = (itemId: number) => {
    const newQuantity = quantities[itemId];

    if (newQuantity > 0) {
      router.patch(`/cart/${itemId}`, { quantity: newQuantity }, {
        onSuccess: () => {
          setEditingItems(prev => {
            const newSet = new Set(prev);
            newSet.delete(itemId);

            return newSet;
          });
        }
      });
    }
  };

  const handleCancelEdit = (itemId: number) => {
    // Reset to original quantity
    const originalItem = cartItems.find((item: any) => item.id === itemId);

    if (originalItem) {
      setQuantities({ ...quantities, [itemId]: originalItem.quantity });
      setEditingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);

        return newSet;
      });
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex mt-12 h-full flex-col overflow-hidden bg-white/5 backdrop-blur-2xl shadow-2xl rounded-3xl border border-white/10 mx-auto max-w-4xl relative"
      >
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 relative z-10">
          <div className="flex items-start justify-between border-b border-white/5 pb-6">
            <div className="text-3xl font-black text-white uppercase tracking-tighter">Shopping <span className="text-amber-400">Cart</span></div>
            <div className="ml-3 flex h-7 items-center">
              <button
                type="button"
                onClick={handleClearCart}
                className="relative -m-2 py-2 px-4 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 font-bold"
              >
                Clear Cart
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="flow-root">
              {cartItems.length > 0 ? (
                <ul role="list" className="-my-6 divide-y divide-white/5">
                  {cartItems.map((products: any) => {
                    const currentQuantity = quantities[products.id] || products.quantity;
                    const itemSubtotal = (products.price ?? products.book?.new_price) * currentQuantity;

                    return (
                      <motion.li 
                        layout
                        key={products?.id} 
                        className="flex py-8 group transition-all duration-300"
                      >
                        <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a] p-1">
                          <img
                            alt={products?.book?.title}
                            src={`/images/books/${products?.book?.cover_image}`}
                            className="h-full w-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        <div className="ml-6 flex flex-1 flex-col">
                          <div>
                            <div className="flex flex-wrap justify-between text-lg font-bold text-white">
                              <h3 className="hover:text-amber-400 transition-colors">
                                <Link href="/">{products?.book?.title}</Link>
                              </h3> 
                              <div className="text-right">
                                <p className="text-sm text-slate-400 font-medium">Unit: N$ {(products?.price ?? products?.book?.new_price).toFixed(2)}</p>
                                <p className="text-amber-400 font-black text-xl">N$ {itemSubtotal.toFixed(2)}</p>
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-slate-500 capitalize tracking-wide">
                              <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] font-black uppercase text-slate-400 mr-2 border border-white/10">Category</span>
                              {products?.book?.category}
                            </p>
                          </div>
                          
                          <div className="flex flex-1 flex-wrap items-end justify-between mt-4">
                            <div className="flex items-center gap-4 bg-white/5 p-1 rounded-xl border border-white/10">
                              <label className="text-slate-400 font-bold text-xs ml-2 uppercase tracking-widest">Qty</label>
                              <input
                                type="number"
                                min="1"
                                value={quantities[products.id] || products.quantity}
                                onChange={(e) => handleQuantityChange(products.id, parseInt(e.target.value) || 1)}
                                className="w-16 bg-transparent border-none text-white focus:ring-0 font-black text-lg text-center"
                              />
                              {editingItems.has(products.id) && (
                                <div className="flex gap-1 pr-1">
                                  <button
                                    onClick={() => handleSaveQuantity(products.id)}
                                    className="px-3 py-1.5 bg-amber-400 text-black text-xs rounded-lg hover:bg-amber-500 font-black transition-colors"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => handleCancelEdit(products.id)}
                                    className="px-3 py-1.5 bg-white/10 text-white text-xs rounded-lg hover:bg-white/20 font-black transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemoveItem(products.id)}
                              className="font-black text-red-400/70 hover:text-red-400 transition-colors uppercase text-xs tracking-widest"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-slate-500 font-bold text-xl mb-6">Your library is currently empty.</p>
                  <Link 
                    href="/"
                    className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-3 rounded-2xl font-black transition-all"
                  >
                    Explore Books
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-black/20 backdrop-blur-3xl px-6 py-8 sm:px-10 relative z-10">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1">Subtotal</p>
              <p className="text-sm text-slate-500">Shipping and taxes calculated at checkout.</p>
            </div>
            <p className="text-4xl font-black text-amber-400">N$ {totalPrice ? totalPrice : '0.00'}</p>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/checkout"
              className="flex-1 flex items-center justify-center rounded-2xl bg-amber-400 px-8 py-5 text-lg font-black text-black shadow-lg shadow-amber-400/20 hover:bg-amber-500 transition-all active:scale-[0.98]"
            >
              Proceed to Checkout
            </Link>
            <Link 
              href="/"
              className="flex-1 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 px-8 py-5 text-lg font-black text-white hover:bg-white/10 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default CartPage; 