import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

type CartItem = {
  id: number;
  quantity: number;
  price?: number;
  book?: {
    new_price: number;
  };
};

type CheckoutForm = {
  name: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zipcode: string;
  billing_same: boolean;
};

function CheckoutPage() {
  const { auth, cartItems = [] } = usePage().props as any;
  const currentUser = auth?.user;

  const [formData, setFormData] = useState<CheckoutForm>({
    name: currentUser?.name ?? '',
    phone: '',
    address: '',
    city: '',
    country: '',
    state: '',
    zipcode: '',
    billing_same: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const isChecked = formData.billing_same;

  const totalPrice = cartItems
    .reduce(
      (sum: number, item: CartItem) => sum + ((item.price ?? item.book?.new_price ?? 0) * item.quantity),
      0,
    )
    .toFixed(2);
  const totalItems = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isChecked) {
      return;
    }

    setSubmitted(true);
  };

  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div>
              <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delivery</h2>
              <p className="text-gray-500 mb-2">Total Price: N$ {totalPrice}</p>
              <p className="text-gray-500 mb-6">Items: {totalItems}</p>
            </div>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              {submitted ? (
                <div className="rounded-md bg-green-50 p-4 text-green-700">
                  Thank you! Your order has been submitted.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">Personal Details</p>
                    <p>Please fill out all the fields.</p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5 text-black">
                        <label htmlFor="name">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleFieldChange}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-400"
                          required
                        />
                      </div>

                      <div className="md:col-span-5 text-black">
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

                      <div className="md:col-span-5 text-black">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleFieldChange}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-400"
                          placeholder="+123 456 7890"
                          required
                        />
                      </div>

                      <div className="md:col-span-3 text-black">
                        <label htmlFor="address">Address / Street</label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={formData.address}
                          onChange={handleFieldChange}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-400"
                          required
                        />
                      </div>

                      <div className="md:col-span-2 text-black">
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={formData.city}
                          onChange={handleFieldChange}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-400"
                          required
                        />
                      </div>

                      <div className="md:col-span-2 text-black">
                        <label htmlFor="country">Country / region</label>
                        <input
                          type="text"
                          name="country"
                          id="country"
                          value={formData.country}
                          onChange={handleFieldChange}
                          placeholder="Country"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          required
                        />
                      </div>

                      <div className="md:col-span-2 text-black">
                        <label htmlFor="state">State / province</label>
                        <input
                          type="text"
                          name="state"
                          id="state"
                          value={formData.state}
                          onChange={handleFieldChange}
                          placeholder="State"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-400"
                          required
                        />
                      </div>

                      <div className="md:col-span-1 text-black">
                        <label htmlFor="zipcode">Zipcode</label>
                        <input
                          type="text"
                          name="zipcode"
                          id="zipcode"
                          value={formData.zipcode}
                          onChange={handleFieldChange}
                          className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-400"
                          required
                        />
                      </div>

                      <div className="md:col-span-5 mt-3 text-black">
                        <div className="inline-flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="billing_same"
                            id="billing_same"
                            className="form-checkbox"
                            checked={formData.billing_same}
                            onChange={handleFieldChange}
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
                            disabled={!isChecked}
                            className="btn-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-70"
                          >
                            Place an Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage
