<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceController extends Controller
{
    public function generatePdf(Invoice $invoice)
    {
        $invoice->load(['client', 'items']);
        $pdf = Pdf::loadView('pdf.invoice', compact('invoice'));
        return $pdf->download("invoice-{$invoice->number}.pdf");
    }

    public function index()
    {
        return Invoice::with('client')->latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'number' => 'required|string|unique:invoices',
            'date' => 'required|date',
            'due_date' => 'nullable|date',
            'type' => 'required|in:one-time,monthly',
            'status' => 'required|in:unpaid,partially,paid',
            'total_amount' => 'required|numeric',
            'paid_amount' => 'required|numeric',
            'currency' => 'required|string|max:3',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.description' => 'required|string',
            'items.*.quantity' => 'required|numeric',
            'items.*.unit' => 'required|string',
            'items.*.price' => 'required|numeric',
        ]);

        $invoice = Invoice::create($validated);

        foreach ($request->items as $item) {
            $invoice->items()->create([
                'description' => $item['description'],
                'quantity' => $item['quantity'],
                'unit' => $item['unit'],
                'price' => $item['price'],
                'total' => $item['quantity'] * $item['price'],
            ]);
        }

        return $invoice->load('items');
    }

    public function show(Invoice $invoice)
    {
        return $invoice->load(['client', 'items']);
    }

    public function update(Request $request, Invoice $invoice)
    {
        $validated = $request->validate([
            'status' => 'sometimes|in:unpaid,partially,paid',
            'paid_amount' => 'sometimes|numeric',
            // other fields can be added if needed
        ]);

        $invoice->update($validated);
        return $invoice;
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();
        return response()->noContent();
    }
}
