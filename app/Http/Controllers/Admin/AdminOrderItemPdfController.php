<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminOrderItemPdfController extends Controller
{
    public function upload(Request $request, OrderItem $orderItem)
    {
        $request->validate([
            'pdf' => 'required|file|mimes:pdf|max:20480',
        ]);

        // Delete old PDF if exists
        if ($orderItem->pdf_path && file_exists(public_path($orderItem->pdf_path))) {
            @unlink(public_path($orderItem->pdf_path));
        }
        
        $request->validate([
            'pdf' => 'required|file|mimes:pdf,epub,mobi|max:250000', // max 250MB
        ]);

        $pdf = $request->file('pdf');
        
        $destPath = public_path('images/books/pdfs');
        if (!file_exists($destPath)) {
            mkdir($destPath, 0777, true);
        }

        $filename = time() . '_order_item_' . $orderItem->id . '.' . $pdf->getClientOriginalExtension();
        $pdf->move($destPath, $filename);

        $orderItem->pdf_path = 'images/books/pdfs/' . $filename;
        $orderItem->save();

        return redirect()->back()->with('success', 'PDF uploaded successfully.');
    }
}
