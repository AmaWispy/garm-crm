<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MyCompany extends Model
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
        return $this->hasMany(MyCompanyBankAccount::class);
    }

    public function contacts()
    {
        return $this->hasMany(MyCompanyContact::class);
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }
}
