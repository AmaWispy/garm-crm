<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientController extends Controller
{
    public function index()
    {
        return Client::with(['bankAccounts', 'contacts'])->get();
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
            $client = Client::create($validated);

            if (!empty($validated['bank_accounts'])) {
                $client->bankAccounts()->createMany($validated['bank_accounts']);
            }

            if (!empty($validated['contacts'])) {
                $client->contacts()->createMany($validated['contacts']);
            }

            return $client->load(['bankAccounts', 'contacts']);
        });
    }

    public function show(Client $client)
    {
        return $client->load(['bankAccounts', 'contacts']);
    }

    public function update(Request $request, Client $client)
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

        return DB::transaction(function () use ($client, $validated) {
            $client->update($validated);

            if (isset($validated['bank_accounts'])) {
                $client->bankAccounts()->delete();
                $client->bankAccounts()->createMany($validated['bank_accounts']);
            }

            if (isset($validated['contacts'])) {
                $client->contacts()->delete();
                $client->contacts()->createMany($validated['contacts']);
            }

            return $client->load(['bankAccounts', 'contacts']);
        });
    }

    public function destroy(Client $client)
    {
        $client->delete();
        return response()->noContent();
    }
}
