<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'idno',
        'vat_code',
        'director_name',
        'country',
        'legal_address',
        'physical_address',
        'notes',
    ];

    public function bankAccounts()
    {
        return $this->hasMany(ClientBankAccount::class);
    }

    public function contacts()
    {
        return $this->hasMany(ClientContact::class);
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function acts()
    {
        return $this->hasMany(Act::class);
    }
}
