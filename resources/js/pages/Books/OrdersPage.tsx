import { Head, usePage } from '@inertiajs/react';
import React from 'react';

type Book = {
  title: string;
  cover_image?: string;
};

type OrderItem = {
  id: number;
  quantity: number;
  price: number;
  subtotal: number;
  total: number;
  book?: Book;
};

type Order = {
  id: number;
  total_price: string;
  status: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  postal_code?: string;
  created_at: string;
  orderItems: OrderItem[];
};

export default function OrdersPage() {
  const { orders = [] } = usePage().props as any;

  return (
    <>
      <Head title="My Orders" />

      <div className="min-h-screen bg-gray-100 text-black py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">My Orders</h1>
              <p className="mt-2 text-base text-gray-700">Review your order history and order details.</p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <p className="text-gray-800 text-base">You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order: Order) => (
                <div key={order.id} className="overflow-hidden rounded-3xl bg-white shadow-sm">
                  <div className="border-b border-gray-200 bg-gray-50 px-6 py-5 sm:px-8">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">Order #{order.id}</h2>
                        <p className="text-sm text-gray-700">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
                        {order.status}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-6 sm:px-8">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Customer</p>
                        <p className="mt-1 text-base text-gray-900">{order.name}</p>
                        <p className="text-base text-gray-800">{order.email}</p>
                        <p className="text-base text-gray-800">{order.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Shipping address</p>
                        <p className="mt-1 text-base text-gray-900">{order.address}</p>
                        <p className="text-base text-gray-800">
                          {order.city}, {order.state ?? ''} {order.country} {order.postal_code ?? ''}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 overflow-hidden rounded-3xl border border-gray-200">
                      <div className="bg-gray-50 px-4 py-4 text-sm font-medium text-gray-800 sm:px-6">
                        Order items
                      </div>
                      <div className="divide-y divide-gray-200 bg-white">
                        {order.orderItems.map((item) => (
                          <div key={item.id} className="px-4 py-5 sm:px-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex items-start gap-4">
                                <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
                                  {item.book?.cover_image ? (
                                    <img
                                      src={`/images/books/${item.book.cover_image}`}
                                      alt={item.book?.title}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : null}
                                </div>
                                <div>
                                  <p className="text-base font-semibold text-gray-900">{item.book?.title ?? 'Book'}</p>
                                  <p className="text-base text-gray-800">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <div className="text-right text-base text-gray-900">
                                <p>Unit: N$ {item.price.toFixed(2)}</p>
                                <p>Subtotal: N$ {item.total.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-4 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Order total</p>
                        <p className="text-2xl font-semibold text-gray-900">N$ {parseFloat(order.total_price).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}