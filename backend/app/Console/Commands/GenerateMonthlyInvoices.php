<?php

namespace App\Console\Commands;

use App\Models\Client;
use App\Models\Invoice;
use Carbon\Carbon;
use Illuminate\Console\Command;

class GenerateMonthlyInvoices extends Command
{
    protected $signature = 'invoices:generate-monthly';
    protected $description = 'Generate monthly invoices for clients who have monthly billing enabled.';

    public function handle()
    {
        $today = Carbon::today();
        
        // Check if it's the first working day of the month
        if (!$this->isFirstWorkingDay($today)) {
            $this->info('Today is not the first working day of the month. Skipping.');
            return;
        }

        $this->info('Generating monthly invoices...');

        // For now, let's assume all clients with a certain flag need a monthly invoice.
        // Since we don't have that flag yet, let's look for invoices of type 'monthly' from last month
        // and replicate them for this month, OR we can add a 'monthly_billing' boolean to clients.
        
        // For this MVP, let's just find clients who had a 'monthly' invoice last month.
        $lastMonth = $today->copy()->subMonth();
        
        $clientsToBill = Client::whereHas('invoices', function($query) use ($lastMonth) {
            $query->where('type', 'monthly')
                  ->whereYear('date', $lastMonth->year)
                  ->whereMonth('date', $lastMonth->month);
        })->get();

        foreach ($clientsToBill as $client) {
            $lastInvoice = $client->invoices()
                ->where('type', 'monthly')
                ->whereYear('date', $lastMonth->year)
                ->whereMonth('date', $lastMonth->month)
                ->first();

            if ($lastInvoice) {
                $newInvoice = Invoice::create([
                    'client_id' => $client->id,
                    'my_company_id' => $lastInvoice->my_company_id,
                    'number' => 'INV-' . $today->format('Ym') . '-' . str_pad($client->id, 4, '0', STR_PAD_LEFT),
                    'date' => $today->format('Y-m-d'),
                    'due_date' => $today->copy()->addDays(14)->format('Y-m-d'),
                    'type' => 'monthly',
                    'status' => 'unpaid',
                    'total_amount' => $lastInvoice->total_amount,
                    'paid_amount' => 0,
                    'currency' => $lastInvoice->currency,
                    'notes' => 'Generated automatically for ' . $today->format('F Y'),
                ]);

                foreach ($lastInvoice->items as $item) {
                    $newInvoice->items()->create([
                        'description' => $item->description,
                        'quantity' => $item->quantity,
                        'unit' => $item->unit,
                        'price' => $item->price,
                        'total' => $item->total,
                    ]);
                }
                
                $this->info("Generated invoice for client: {$client->name}");
            }
        }
    }

    private function isFirstWorkingDay(Carbon $date): bool
    {
        // Simple logic: if it's 1st and not weekend, OR if it's 2nd and 1st was Sat, OR if it's 3rd and 1st was Sun/2nd was Sun.
        $firstOfMonth = $date->copy()->firstOfMonth();
        
        while ($firstOfMonth->isWeekend()) {
            $firstOfMonth->addDay();
        }
        
        return $date->isSameDay($firstOfMonth);
    }
}
