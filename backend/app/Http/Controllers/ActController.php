<?php

namespace App\Http\Controllers;

use App\Models\Act;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class ActController extends Controller
{
    public function generatePdf(Act $act)
    {
        $act->load(['client', 'myCompany']);
        $pdf = Pdf::loadView('pdf.act', compact('act'));
        return $pdf->stream("act-{$act->number}.pdf");
    }

    public function index()
    {
        return Act::with(['client', 'invoice', 'myCompany'])->latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->all();
        if (isset($data['date'])) {
            $data['date'] = \Carbon\Carbon::parse($data['date'])->format('Y-m-d');
        }
        $request->merge($data);

        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'my_company_id' => 'required|exists:my_companies,id',
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
        return $act->load(['client', 'invoice', 'myCompany']);
    }

    public function update(Request $request, Act $act)
    {
        $data = $request->all();
        if (isset($data['date'])) {
            $data['date'] = \Carbon\Carbon::parse($data['date'])->format('Y-m-d');
        }
        $request->merge($data);

        $validated = $request->validate([
            'client_id' => 'sometimes|exists:clients,id',
            'my_company_id' => 'sometimes|exists:my_companies,id',
            'invoice_id' => 'nullable|exists:invoices,id',
            'number' => 'sometimes|string|unique:acts,number,' . $act->id,
            'date' => 'sometimes|date',
            'details' => 'nullable|string',
            'amount' => 'sometimes|numeric',
        ]);

        $act->update($validated);
        return $act->load(['client', 'invoice', 'myCompany']);
    }

    public function destroy(Act $act)
    {
        $act->delete();
        return response()->noContent();
    }
}
