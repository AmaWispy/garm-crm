<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MyCompanyBankAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'my_company_id',
        'bank_name',
        'iban',
        'swift_bic',
        'bank_code',
    ];

    public function myCompany()
    {
        return $this->belongsTo(MyCompany::class);
    }
}
