import { Link, useForm, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from "framer-motion";
import React from 'react';
import { Spinner } from '@/components/ui/spinner';


type CartItem = {
  id: number;
  quantity: number;
  price?: number;
  book?: {
    new_price: number;
  };
};

export default function CheckoutPage() {
  const { auth, cartItems = [] } = usePage().props as any;
  const currentUser = auth?.user;

  const form = useForm({
    name: currentUser?.name ?? '',
    phone: '',
    address: '',
    city: '',
    country: '',
    state: '',
    zipcode: '',
    billing_same: false,
  });

  const totalPrice = cartItems
    .reduce(
      (sum: number, item: CartItem) => sum + ((item.price ?? item.book?.new_price ?? 0) * item.quantity),
      0,
    )
    .toFixed(2);

  const totalItems = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
  const cartError = ((form.errors as any).cart as string) ?? undefined;
  const generalError = ((form.errors as any).general as string) ?? undefined;

  const isFormComplete = Boolean(
    form.data.name.trim()
    && form.data.phone.trim()
    && form.data.address.trim()
    && form.data.city.trim()
    && form.data.country.trim()
    && form.data.state.trim()
    && form.data.zipcode.trim()
    && form.data.billing_same
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.post('/orders');
  };

  return (
    <section className="relative">
      <div className="min-h-screen p-6 bg-transparent flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto relative">
          <AnimatePresence>
            {form.processing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-3xl"
              >
                <div className="flex flex-col items-center gap-4">
                  <Spinner className="size-12 text-blue-600" />
                  <p className="text-lg font-medium text-blue-900">Processing your order...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

            <div>
              <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-6">
                <div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Checkout <span className="text-amber-400">Order</span></h2>
                  <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-xs">Cash on Delivery</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-1">Total Amount</p>
                  <p className="text-4xl font-black text-amber-400">N$ {totalPrice}</p>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 md:p-10 mb-6 text-white border border-white/10 relative overflow-hidden"
              >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 blur-[100px] rounded-full pointer-events-none" />

                {cartError && (
                  <div className="mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 p-4 text-red-400 font-bold text-sm">
                    {cartError}
                  </div>
                )}
                {generalError && (
                  <div className="mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 p-4 text-red-400 font-bold text-sm">
                    {generalError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="grid gap-12 text-sm grid-cols-1 lg:grid-cols-3 relative z-10">
                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center text-sm">1</span>
                      Personal Details
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      Please enter your shipping and contact information to complete the order.
                    </p>
                    <div className="pt-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">Order Summary</p>
                      <p className="text-white font-black text-lg">{totalItems} Items</p>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <label htmlFor="name" className="text-slate-400 font-bold mb-2 block uppercase tracking-widest text-[10px]">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={form.data.name}
                          onChange={(event) => form.setData('name', event.target.value)}
                          className="h-14 border bg-white/5 border-white/10 rounded-2xl px-6 w-full text-white focus:outline-none focus:border-amber-400 focus:bg-white/10 transition-all duration-300 font-bold shadow-inner"
                          required
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="email" className="text-slate-400 font-bold mb-2 block uppercase tracking-widest text-[10px]">Email Address</label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          value={currentUser?.email ?? ''}
                          disabled
                          className="h-14 border bg-white/5 border-white/5 rounded-2xl px-6 w-full text-slate-500 font-bold cursor-not-allowed"
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="phone" className="text-slate-400 font-bold mb-2 block uppercase tracking-widest text-[10px]">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={form.data.phone}
                          onChange={(event) => form.setData('phone', event.target.value)}
                          className="h-14 border bg-white/5 border-white/10 rounded-2xl px-6 w-full text-white focus:outline-none focus:border-amber-400 focus:bg-white/10 transition-all duration-300 font-bold shadow-inner"
                          placeholder="+123 456 7890"
                          required
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="address" className="text-slate-400 font-bold mb-2 block uppercase tracking-widest text-[10px]">Address / Street</label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={form.data.address}
                          onChange={(event) => form.setData('address', event.target.value)}
                          className="h-14 border bg-white/5 border-white/10 rounded-2xl px-6 w-full text-white focus:outline-none focus:border-amber-400 focus:bg-white/10 transition-all duration-300 font-bold shadow-inner"
                          required
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="city" className="text-slate-400 font-bold mb-2 block uppercase tracking-widest text-[10px]">City</label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={form.data.city}
                          onChange={(event) => form.setData('city', event.target.value)}
                          className="h-14 border bg-white/5 border-white/10 rounded-2xl px-6 w-full text-white focus:outline-none focus:border-amber-400 focus:bg-white/10 transition-all duration-300 font-bold shadow-inner"
                          required
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="country" className="text-slate-400 font-bold mb-2 block uppercase tracking-widest text-[10px]">Country</label>
                        <input
                          type="text"
                          name="country"
                          id="country"
                          value={form.data.country}
                          onChange={(event) => form.setData('country', event.target.value)}
                          className="h-14 border bg-white/5 border-white/10 rounded-2xl px-6 w-full text-white focus:outline-none focus:border-amber-400 focus:bg-white/10 transition-all duration-300 font-bold shadow-inner"
                          required
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="state" className="text-slate-400 font-bold mb-2 block uppercase tracking-widest text-[10px]">State / Province</label>
                        <input
                          type="text"
                          name="state"
                          id="state"
                          value={form.data.state}
                          onChange={(event) => form.setData('state', event.target.value)}
                          className="h-14 border bg-white/5 border-white/10 rounded-2xl px-6 w-full text-white focus:outline-none focus:border-amber-400 focus:bg-white/10 transition-all duration-300 font-bold shadow-inner"
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="zipcode" className="text-slate-400 font-bold mb-2 block uppercase tracking-widest text-[10px]">Zipcode</label>
                        <input
                          type="text"
                          name="zipcode"
                          id="zipcode"
                          value={form.data.zipcode}
                          onChange={(event) => form.setData('zipcode', event.target.value)}
                          className="h-14 border bg-white/5 border-white/10 rounded-2xl px-6 w-full text-white focus:outline-none focus:border-amber-400 focus:bg-white/10 transition-all duration-300 font-bold shadow-inner"
                        />
                      </div>

                      <div className="md:col-span-2 mt-4">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={form.data.billing_same}
                            onChange={(e) => form.setData('billing_same', e.target.checked)}
                            className="w-6 h-6 rounded-lg bg-white/5 border-white/10 text-amber-400 focus:ring-amber-400 focus:ring-offset-[#0f172a] transition-all"
                          />
                          <span className="text-slate-400 font-medium group-hover:text-white transition-colors">
                            I agree to the <Link href="#" className="text-amber-400 font-black hover:underline">Terms</Link> and <Link href="#" className="text-amber-400 font-black hover:underline">Policies</Link>.
                          </span>
                        </label>
                      </div>

                      <div className="md:col-span-2 pt-6">
                        <button
                          type="submit"
                          disabled={!isFormComplete || form.processing || cartItems.length === 0}
                          className="w-full bg-amber-400 hover:bg-amber-500 text-black font-black py-5 rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-amber-400/20 active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
                        >
                          {form.processing ? <Spinner className="text-black" /> : null}
                          {form.processing ? 'Placing Order...' : 'Confirm Order'}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
}
