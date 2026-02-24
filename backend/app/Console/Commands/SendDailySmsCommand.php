<?php

namespace App\Console\Commands;

use App\Services\SmsService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class SendDailySmsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sms:send-daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send daily SMS notifications';

    /**
     * Execute the console command.
     *
     * @param SmsService $smsService
     * @return int
     */
    public function handle(SmsService $smsService)
    {
        $this->info('Starting daily SMS sending...');
        Log::info('Daily SMS command started.');

        // Logic to get recipients and send messages
        // Example:
        // $users = User::whereNotNull('phone')->get();
        // foreach ($users as $user) {
        //     $smsService->sendSms($user->phone, 'Your daily notification');
        // }

        $this->info('Daily SMS sending completed.');
        Log::info('Daily SMS command finished.');

        return Command::SUCCESS;
    }
}
