<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Act {{ $act->number }}</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 12px; color: #333; }
        .box { max-width: 800px; margin: auto; padding: 30px; }
        .header { text-align: center; margin-bottom: 30px; }
        .title { font-size: 18px; font-weight: bold; text-transform: uppercase; }
        .info-table { width: 100%; margin-top: 20px; }
        .details { margin-top: 30px; line-height: 1.6; }
        .signatures { margin-top: 50px; display: table; width: 100%; }
        .sig-box { display: table-cell; width: 50%; }
    </style>
</head>
<body>
    <div class="box">
        <div class="header">
            <div class="title">Act of Work Performed #{{ $act->number }}</div>
            <div>Date: {{ $act->date->format('d.m.Y') }}</div>
        </div>

        <div class="details">
            <p>This act confirms that the following works/services were performed for <strong>{{ $act->client->name }}</strong>:</p>
            
            <div style="margin: 20px 0; padding: 10px; background: #f9f9f9; border: 1px solid #eee;">
                {{ $act->details ?: 'Services according to contract.' }}
            </div>

            <p>Total amount: <strong>{{ number_format($act->amount, 2) }}</strong></p>
            
            <p>The parties have no mutual claims regarding the volume, quality, and timing of the work performed.</p>
        </div>

        <div class="signatures">
            <div class="sig-box">
                <strong>Performer:</strong><br><br>
                ____________________<br>
                Garm CRM Solutions
            </div>
            <div class="sig-box">
                <strong>Customer:</strong><br><br>
                ____________________<br>
                {{ $act->client->name }}
            </div>
        </div>
    </div>
</body>
</html>
