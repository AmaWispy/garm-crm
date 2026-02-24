<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SmsService
{
    protected string $apiUrl;
    protected string $apiKey;

    public function __construct()
    {
        $this->apiUrl = config('sms.api_url', '');
        $this->apiKey = config('sms.api_key', '');
    }

    /**
     * Send an SMS message.
     *
     * @param string $phoneNumber
     * @param string $message
     * @return bool
     */
    public function sendSms(string $phoneNumber, string $message): bool
    {
        if (empty($this->apiKey)) {
            Log::error('SMS service API key is not configured.');
            return false;
        }

        try {
            // Placeholder for actual SMS provider implementation
            // $response = Http::post($this->apiUrl, [
            //     'key' => $this->apiKey,
            //     'phone' => $phoneNumber,
            //     'message' => $message,
            // ]);

            // return $response->successful();
            
            Log::info("SMS sent to {$phoneNumber}: {$message}");
            return true;
        } catch (\Exception $e) {
            Log::error("Failed to send SMS to {$phoneNumber}: " . $e->getMessage());
            return false;
        }
    }
}
