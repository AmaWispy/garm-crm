<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceController extends Controller
{
    public function generatePdf(Invoice $invoice)
    {
        $invoice->load(['client', 'myCompany', 'items']);
        $pdf = Pdf::loadView('pdf.invoice', compact('invoice'));
        return $pdf->stream("invoice-{$invoice->number}.pdf");
    }

    public function index()
    {
        return Invoice::with(['client', 'myCompany'])->latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->all();
        
        // Convert ISO dates to Y-m-d
        if (isset($data['date'])) {
            $data['date'] = \Carbon\Carbon::parse($data['date'])->format('Y-m-d');
        }
        if (isset($data['due_date'])) {
            $data['due_date'] = \Carbon\Carbon::parse($data['due_date'])->format('Y-m-d');
        }

        $request->merge($data);

        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'my_company_id' => 'required|exists:my_companies,id',
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

        return $invoice->load(['items', 'myCompany']);
    }

    public function show(Invoice $invoice)
    {
        return $invoice->load(['client', 'myCompany', 'items']);
    }

    public function update(Request $request, Invoice $invoice)
    {
        $data = $request->all();
        
        // Convert ISO dates to Y-m-d
        if (isset($data['date'])) {
            $data['date'] = \Carbon\Carbon::parse($data['date'])->format('Y-m-d');
        }
        if (isset($data['due_date'])) {
            $data['due_date'] = \Carbon\Carbon::parse($data['due_date'])->format('Y-m-d');
        }

        $request->merge($data);

        $validated = $request->validate([
            'client_id' => 'sometimes|exists:clients,id',
            'my_company_id' => 'sometimes|exists:my_companies,id',
            'number' => 'sometimes|string|unique:invoices,number,' . $invoice->id,
            'date' => 'sometimes|date',
            'due_date' => 'nullable|date',
            'type' => 'sometimes|in:one-time,monthly',
            'status' => 'sometimes|in:unpaid,partially,paid',
            'total_amount' => 'sometimes|numeric',
            'paid_amount' => 'sometimes|numeric',
            'currency' => 'sometimes|string|max:3',
            'notes' => 'nullable|string',
            'items' => 'sometimes|array',
            'items.*.description' => 'required_with:items|string',
            'items.*.quantity' => 'required_with:items|numeric',
            'items.*.unit' => 'required_with:items|string',
            'items.*.price' => 'required_with:items|numeric',
        ]);

        $invoice->update($validated);

        if (isset($validated['items'])) {
            $invoice->items()->delete();
            foreach ($validated['items'] as $item) {
                $invoice->items()->create([
                    'description' => $item['description'],
                    'quantity' => $item['quantity'],
                    'unit' => $item['unit'],
                    'price' => $item['price'],
                    'total' => $item['quantity'] * $item['price'],
                ]);
            }
        }

        return $invoice->load(['items', 'myCompany', 'client']);
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();
        return response()->noContent();
    }
}
