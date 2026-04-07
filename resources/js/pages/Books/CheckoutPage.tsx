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
            <div>
                <h2 className="font-semibold text-xl text-black mb-2">Cash On Delivery</h2>
                <p className="text-black mb-2">Total Price: N$ {totalPrice}</p>
                <p className="text-black mb-6">Items: {totalItems}</p>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-4 px-4 md:p-8 mb-6 text-black border border-white/20"
              >
              {cartError && (
                <div className="mb-4 rounded-md bg-red-50 p-4 text-red-700">
                  {cartError}
                </div>
              )}
              {generalError && (
                <div className="mb-4 rounded-md bg-red-50 p-4 text-red-700">
                  {generalError}
                </div>
              )}
              {Object.entries(form.errors)
                .filter(([key]) => key !== 'cart' && key !== 'general')
                .map(([key, value]) => (
                  <div key={key} className="mb-4 rounded-md bg-red-50 p-4 text-red-700">
                    {value}
                  </div>
                ))}
              {cartItems.length === 0 && (
                <div className="mb-4 rounded-md bg-yellow-50 p-4 text-yellow-700">
                  Your cart is empty. Add books to your cart before placing an order.
                </div>
              )}
              <form onSubmit={handleSubmit} className="grid gap-4 gap-y-2 text-sm text-black grid-cols-1 lg:grid-cols-3 my-8">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={form.data.name}
                        onChange={(event) => form.setData('name', event.target.value)}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        required
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={currentUser?.email ?? ''}
                        disabled
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-400"
                        placeholder="email@domain.com"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={form.data.phone}
                        onChange={(event) => form.setData('phone', event.target.value)}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="+123 456 7890"
                        required
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="address">Address / Street</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={form.data.address}
                        onChange={(event) => form.setData('address', event.target.value)}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={form.data.city}
                        onChange={(event) => form.setData('city', event.target.value)}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="country">Country / region</label>
                      <input
                        type="text"
                        name="country"
                        id="country"
                        value={form.data.country}
                        onChange={(event) => form.setData('country', event.target.value)}
                        placeholder="Country"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="state">State / province</label>
                      <input
                        type="text"
                        name="state"
                        id="state"
                        value={form.data.state}
                        onChange={(event) => form.setData('state', event.target.value)}
                        placeholder="State"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-1">
                      <label htmlFor="zipcode">Zipcode</label>
                      <input
                        type="text"
                        name="zipcode"
                        id="zipcode"
                        value={form.data.zipcode}
                        onChange={(event) => form.setData('zipcode', event.target.value)}
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-5 mt-3">
                      <div className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="billing_same"
                          id="billing_same"
                          checked={form.data.billing_same}
                          onChange={(event) => form.setData('billing_same', event.target.checked)}
                          className="form-checkbox"
                        />
                        <label htmlFor="billing_same" className="ml-2">
                          I agree to the{' '}
                          <Link href="#" className="underline underline-offset-2 text-blue-600">
                            Terms & Conditions
                          </Link>{' '}
                          and{' '}
                          <Link href="#" className="underline underline-offset-2 text-blue-600">
                            Shopping Policy
                          </Link>
                          .
                        </label>
                      </div>
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          type="submit"
                          disabled={!isFormComplete || form.processing || cartItems.length === 0}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                        >
                          {form.processing ? <Spinner className="text-white" /> : null}
                          {form.processing ? 'Placing order...' : 'Place an Order'}
                        </button>
                      </div>
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
