<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'my_company_id',
        'number',
        'date',
        'due_date',
        'type',
        'status',
        'total_amount',
        'paid_amount',
        'currency',
        'notes',
    ];

    protected $casts = [
        'date' => 'date',
        'due_date' => 'date',
        'total_amount' => 'decimal:2',
        'paid_amount' => 'decimal:2',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function myCompany()
    {
        return $this->belongsTo(MyCompany::class);
    }

    public function items()
    {
        return $this->hasMany(InvoiceItem::class);
    }

    public function act()
    {
        return $this->hasOne(Act::class);
    }
}
