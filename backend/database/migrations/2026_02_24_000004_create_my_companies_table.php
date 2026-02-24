<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('my_companies', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Наименование
            $table->string('idno', 13)->nullable(); // IDNO
            $table->string('vat_code')->nullable(); // НДС
            $table->string('director_name')->nullable(); // Администратор
            $table->string('country')->default('Moldova');
            $table->string('legal_address')->nullable();
            $table->string('physical_address')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('my_company_bank_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('my_company_id')->constrained()->onDelete('cascade');
            $table->string('bank_name')->nullable();
            $table->string('iban')->nullable();
            $table->string('swift_bic')->nullable();
            $table->string('bank_code')->nullable();
            $table->timestamps();
        });

        Schema::create('my_company_contacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('my_company_id')->constrained()->onDelete('cascade');
            $table->string('position')->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->timestamps();
        });

        Schema::table('invoices', function (Blueprint $table) {
            $table->foreignId('my_company_id')->nullable()->after('client_id')->constrained('my_companies')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropConstrainedForeignId('my_company_id');
        });
        Schema::dropIfExists('my_company_contacts');
        Schema::dropIfExists('my_company_bank_accounts');
        Schema::dropIfExists('my_companies');
    }
};
