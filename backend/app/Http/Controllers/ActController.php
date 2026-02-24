<?php

namespace App\Http\Controllers;

use App\Models\Act;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class ActController extends Controller
{
    public function generatePdf(Act $act)
    {
        $act->load(['client']);
        $pdf = Pdf::loadView('pdf.act', compact('act'));
        return $pdf->download("act-{$act->number}.pdf");
    }

    public function index()
    {
        return Act::with(['client', 'invoice'])->latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'invoice_id' => 'nullable|exists:invoices,id',
            'number' => 'required|string|unique:acts',
            'date' => 'required|date',
            'details' => 'nullable|string',
            'amount' => 'required|numeric',
        ]);

        return Act::create($validated);
    }

    public function show(Act $act)
    {
        return $act->load(['client', 'invoice']);
    }

    public function destroy(Act $act)
    {
        $act->delete();
        return response()->noContent();
    }
}
