<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MyCompanyContact extends Model
{
    use HasFactory;

    protected $fillable = [
        'my_company_id',
        'position',
        'first_name',
        'last_name',
        'phone',
        'email',
    ];

    public function myCompany()
    {
        return $this->belongsTo(MyCompany::class);
    }
}
