<?php

return [
    /*
    |--------------------------------------------------------------------------
    | SMS Service Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure the settings for your SMS service.
    |
    */

    'api_url' => env('SMS_API_URL', 'https://api.sms-provider.com/v1/send'),
    
    'api_key' => env('SMS_API_KEY', ''),

    'sender_id' => env('SMS_SENDER_ID', 'Panilino'),

];
