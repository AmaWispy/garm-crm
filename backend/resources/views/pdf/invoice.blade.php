<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice {{ $invoice->number }}</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 12px; color: #333; }
        .invoice-box { max-width: 800px; margin: auto; padding: 30px; }
        .header { display: table; width: 100%; margin-bottom: 20px; }
        .logo { font-size: 24px; font-weight: bold; color: #1a73e8; }
        .company-info { text-align: right; }
        .bill-to { margin-top: 40px; margin-bottom: 20px; }
        .details-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .details-table th { background: #f8f9fa; border-bottom: 2px solid #dee2e6; padding: 10px; text-align: left; }
        .details-table td { padding: 10px; border-bottom: 1px solid #dee2e6; }
        .totals { margin-top: 30px; text-align: right; }
        .totals-row { display: table; width: 100%; }
        .footer { margin-top: 50px; font-size: 10px; color: #777; border-top: 1px solid #eee; padding-top: 10px; }
    </style>
</head>
<body>
    <div class="invoice-box">
        <table class="header">
            <tr>
                <td class="logo">GARM CRM</td>
                <td class="company-info">
                    <strong>Garm CRM Solutions</strong><br>
                    Chisinau, Moldova<br>
                    Email: contact@garm-crm.com
                </td>
            </tr>
        </table>

        <hr>

        <table style="width: 100%; margin-top: 20px;">
            <tr>
                <td>
                    <strong>Bill To:</strong><br>
                    {{ $invoice->client->name }}<br>
                    {{ $invoice->client->address }}<br>
                    Fiscal Code: {{ $invoice->client->fiscal_code }}
                </td>
                <td style="text-align: right;">
                    <strong>Invoice #:</strong> {{ $invoice->number }}<br>
                    <strong>Date:</strong> {{ $invoice->date->format('d.m.Y') }}<br>
                    <strong>Due Date:</strong> {{ $invoice->due_date ? $invoice->due_date->format('d.m.Y') : '-' }}
                </td>
            </tr>
        </table>

        <table class="details-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Unit</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                @foreach($invoice->items as $item)
                <tr>
                    <td>{{ $item->description }}</td>
                    <td>{{ number_format($item->quantity, 2) }}</td>
                    <td>{{ $item->unit }}</td>
                    <td>{{ number_format($item->price, 2) }}</td>
                    <td>{{ number_format($item->total, 2) }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <div class="totals">
            <p><strong>Total Amount:</strong> {{ number_format($invoice->total_amount, 2) }} {{ $invoice->currency }}</p>
            <p><strong>Paid Amount:</strong> {{ number_format($invoice->paid_amount, 2) }} {{ $invoice->currency }}</p>
            <p style="font-size: 16px;"><strong>Balance Due:</strong> {{ number_format($invoice->total_amount - $invoice->paid_amount, 2) }} {{ $invoice->currency }}</p>
        </div>

        <div class="footer">
            Thank you for your business! If you have any questions, please contact us.
        </div>
    </div>
</body>
</html>
