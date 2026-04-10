<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AdminBookController extends Controller
{
    public function index(Request $request)
    {
        $books = Book::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Books/Index', [
            'books' => $books,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'nullable|string',
            'treding' => 'nullable|boolean',
            'old_price' => 'nullable|numeric',
            'new_price' => 'required|numeric',
            'stock' => 'nullable|integer',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('cover_image')) {
            $imageFile = $request->file('cover_image');
            $imageName = time() . '_' . Str::slug($request->title) . '.' . $imageFile->getClientOriginalExtension();
            $imageFile->move(public_path('images/books'), $imageName);
            $validated['cover_image'] = 'images/books/' . $imageName;
        } else {
            $validated['cover_image'] = '';
        }

        if (empty($validated['old_price'])) {
            $validated['old_price'] = 0;
        }
        if (empty($validated['category'])) {
            $validated['category'] = 'Uncategorized';
        }

        Book::create($validated);

        return redirect()->back()->with('success', 'Book created successfully.');
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'nullable|string',
            'treding' => 'nullable|boolean',
            'old_price' => 'nullable|numeric',
            'new_price' => 'required|numeric',
            'quantity' => 'nullable|integer',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('cover_image')) {
            // Unlink old image if it exists and is not the default
            if ($book->cover_image && file_exists(public_path($book->cover_image))) {
                @unlink(public_path($book->cover_image));
            }

            $imageFile = $request->file('cover_image');
            $imageName = time() . '_' . Str::slug($request->title) . '.' . $imageFile->getClientOriginalExtension();
            $imageFile->move(public_path('images/books'), $imageName);
            $validated['cover_image'] = 'images/books/' . $imageName;
        } else {
            // preserve the old one if it's there
            $validated['cover_image'] = $book->cover_image ?? '';
        }

        if (empty($validated['old_price'])) {
            $validated['old_price'] = 0;
        }
        if (empty($validated['category'])) {
            $validated['category'] = 'Uncategorized';
        }

        $book->update($validated);

        return redirect()->back()->with('success', 'Book updated successfully.');
    }

    public function destroy(Book $book)
    {
        // Delete image if exists
        if ($book->cover_image && file_exists(public_path($book->cover_image))) {
            @unlink(public_path($book->cover_image));
        }

        $book->delete();

        return redirect()->back()->with('success', 'Book deleted successfully.');
    }
}
