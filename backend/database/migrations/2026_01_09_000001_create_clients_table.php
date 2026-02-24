<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Наименование
            $table->string('idno', 13)->nullable(); // IDNO (13 цифр)
            $table->string('vat_code')->nullable(); // НДС
            $table->string('director_name')->nullable(); // Администратор
            $table->string('country')->default('Moldova'); // Страна (Moldova или Other)
            $table->string('legal_address')->nullable(); // Юридический адрес
            $table->string('physical_address')->nullable(); // Физический адрес
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('client_bank_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->string('bank_name')->nullable();
            $table->string('iban')->nullable(); // 6.1 IBAN
            $table->string('swift_bic')->nullable(); // 6.2 SWIFT/BIC
            $table->string('bank_code')->nullable(); // 6.3 Код Банка
            $table->timestamps();
        });

        Schema::create('client_contacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->string('position')->nullable(); // 7.1 Должность
            $table->string('first_name')->nullable(); // 7.2 Имя
            $table->string('last_name')->nullable(); // 7.3 Фамилия
            $table->string('phone')->nullable(); // 7.4 Телефон
            $table->string('email')->nullable(); // 7.5 Емаил
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('client_contacts');
        Schema::dropIfExists('client_bank_accounts');
        Schema::dropIfExists('clients');
    }
};
