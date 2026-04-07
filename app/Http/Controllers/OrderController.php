<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::with(['orderItems.book'])
            ->where('user_id', $request->user()->id)
            ->orderByDesc('created_at')
            ->get();

        return inertia('Books/OrdersPage', [
            'orders' => $orders,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'address' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:100'],
            'country' => ['required', 'string', 'max:100'],
            'state' => ['nullable', 'string', 'max:100'],
            'zipcode' => ['nullable', 'string', 'max:50'],
            'billing_same' => ['accepted'],
        ]);

        $user = $request->user();

        $cartItems = CartItem::where('user_id', $user->id)
            ->with('book')
            ->get();

        if ($cartItems->isEmpty()) {
            return back()->withErrors(['cart' => 'Your cart is empty.']);
        }

        $totalPrice = $cartItems->reduce(function ($total, CartItem $item) {
            return $total + ($item->price * $item->quantity);
        }, 0);

        DB::transaction(function () use ($user, $validated, $cartItems, $totalPrice) {
            $order = Order::create([
                'user_id' => $user->id,
                'total_price' => $totalPrice,
                'status' => 'pending',
                'name' => $validated['name'],
                'email' => $user->email,
                'phone' => $validated['phone'],
                'address' => $validated['address'],
                'city' => $validated['city'],
                'state' => $validated['state'] ?? null,
                'country' => $validated['country'],
                'postal_code' => $validated['zipcode'] ?? null,
            ]);

            foreach ($cartItems as $item) {
                OrderItem::create([
                    'user_id' => $user->id,
                    'order_id' => $order->id,
                    'book_id' => $item->book_id,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'subtotal' => $item->subtotal,
                    'total' => $item->price * $item->quantity,
                ]);
            }

            CartItem::where('user_id', $user->id)->delete();
        });

        return redirect()->route('cart')->with('success', 'Your order has been placed successfully.');
    }
}
