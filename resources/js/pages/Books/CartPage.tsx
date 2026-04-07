import '@/../css/Home.css';
import { Link, usePage, router } from "@inertiajs/react";
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
      <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <div className="text-lg font-medium text-gray-900">Shopping cart</div>
            <div className="ml-3 flex h-7 items-center ">
              <button
                type="button"
                onClick={handleClearCart}
                className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200  "
              >
                <span className="">Clear Cart</span>
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="flow-root">

              {
                cartItems.length > 0 ? (<ul role="list" className="-my-6 divide-y divide-gray-200">

                  {
                    cartItems.map((products: any) => {
                      const currentQuantity = quantities[products.id] || products.quantity;
                      const itemSubtotal = (products.price ?? products.book?.new_price) * currentQuantity;

                      return (
                        <li key={products?.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              alt=""
                              src={`/images/books/${products?.book?.cover_image}`}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <Link href="/">{products?.book?.title}</Link>
                                </h3> 
                                <div className="text-right">
                                  <p className="sm:ml-4">Unit price: N$ {products?.price?.toFixed(2) ?? products?.book?.new_price?.toFixed(2)}</p>
                                  <p className="sm:ml-4 font-semibold">total: N$ {itemSubtotal.toFixed(2)}</p>
                                </div>
                              </div>
                              <p className="mt-1 text-sm text-gray-500 capitalize"><strong>Category:</strong> {products?.book?.category}</p>
                            </div>
                            <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <label className="text-gray-500 font-medium">Qty:</label>
                                <input
                                  type="number"
                                  min="1"
                                  value={quantities[products.id] || products.quantity}
                                  onChange={(e) => handleQuantityChange(products.id, parseInt(e.target.value) || 1)}
                                  className="w-16 px-2 py-1 border border-gray-300 rounded text-gray-900"
                                />
                                {editingItems.has(products.id) && (
                                  <div className="flex gap-1">
                                    <button
                                      onClick={() => handleSaveQuantity(products.id)}
                                      className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={() => handleCancelEdit(products.id)}
                                      className="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                )}
                              </div>

                              <div className="flex">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveItem(products.id)}
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })
                  }



                </ul>) : (<p>No products found!</p>)
              }


            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>N$ {totalPrice ? totalPrice : '0.00'}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6">
            <Link
              href="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent btn-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <Link href="/">
              or
              <button
                type="button"

                className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartPage; 