<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientBankAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'bank_name',
        'iban',
        'swift_bic',
        'bank_code',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
