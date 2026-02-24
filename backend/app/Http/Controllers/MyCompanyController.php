<?php

namespace App\Http\Controllers;

use App\Models\MyCompany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MyCompanyController extends Controller
{
    public function index()
    {
        return MyCompany::with(['bankAccounts', 'contacts'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'idno' => 'nullable|string|max:13',
            'vat_code' => 'nullable|string|max:255',
            'director_name' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'legal_address' => 'nullable|string',
            'physical_address' => 'nullable|string',
            'notes' => 'nullable|string',
            'bank_accounts' => 'nullable|array',
            'bank_accounts.*.bank_name' => 'nullable|string',
            'bank_accounts.*.iban' => 'nullable|string',
            'bank_accounts.*.swift_bic' => 'nullable|string',
            'bank_accounts.*.bank_code' => 'nullable|string',
            'contacts' => 'nullable|array',
            'contacts.*.position' => 'nullable|string',
            'contacts.*.first_name' => 'nullable|string',
            'contacts.*.last_name' => 'nullable|string',
            'contacts.*.phone' => 'nullable|string',
            'contacts.*.email' => 'nullable|email',
        ]);

        return DB::transaction(function () use ($validated) {
            $myCompany = MyCompany::create($validated);

            if (!empty($validated['bank_accounts'])) {
                $myCompany->bankAccounts()->createMany($validated['bank_accounts']);
            }

            if (!empty($validated['contacts'])) {
                $myCompany->contacts()->createMany($validated['contacts']);
            }

            return $myCompany->load(['bankAccounts', 'contacts']);
        });
    }

    public function show(MyCompany $myCompany)
    {
        return $myCompany->load(['bankAccounts', 'contacts']);
    }

    public function update(Request $request, MyCompany $myCompany)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'idno' => 'nullable|string|max:13',
            'vat_code' => 'nullable|string|max:255',
            'director_name' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'legal_address' => 'nullable|string',
            'physical_address' => 'nullable|string',
            'notes' => 'nullable|string',
            'bank_accounts' => 'nullable|array',
            'bank_accounts.*.bank_name' => 'nullable|string',
            'bank_accounts.*.iban' => 'nullable|string',
            'bank_accounts.*.swift_bic' => 'nullable|string',
            'bank_accounts.*.bank_code' => 'nullable|string',
            'contacts' => 'nullable|array',
            'contacts.*.position' => 'nullable|string',
            'contacts.*.first_name' => 'nullable|string',
            'contacts.*.last_name' => 'nullable|string',
            'contacts.*.phone' => 'nullable|string',
            'contacts.*.email' => 'nullable|email',
        ]);

        return DB::transaction(function () use ($myCompany, $validated) {
            $myCompany->update($validated);

            if (isset($validated['bank_accounts'])) {
                $myCompany->bankAccounts()->delete();
                $myCompany->bankAccounts()->createMany($validated['bank_accounts']);
            }

            if (isset($validated['contacts'])) {
                $myCompany->contacts()->delete();
                $myCompany->contacts()->createMany($validated['contacts']);
            }

            return $myCompany->load(['bankAccounts', 'contacts']);
        });
    }

    public function destroy(MyCompany $myCompany)
    {
        $myCompany->delete();
        return response()->noContent();
    }
}
