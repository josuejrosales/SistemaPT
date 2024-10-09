<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Pedido extends Model
{
    use HasFactory;

    protected $table = 'pedido';

    protected $fillable = [
        'Estado',
        'SubTotal',
        'Total',
        'Impuesto',
        'IdMetodoPago',
        'IdCliente',
    ];

    public function getMetodoPago()
    {
        return $this->hasOne(MetodoPago::class, 'id', 'IdMetodoPago');
    }
    public function getCliente()
    {
        return $this->hasOne(Cliente::class, 'id', 'IdCliente');
    }
    public function getDetallePedido()
    {
        return $this->hasMany(DetallePedido::class, 'IdPedido', 'id');
    }
    public static function getPedidoXDia()
    {
        $today = Carbon::now();
        return Pedido::select(DB::raw('DAY(created_at) as Clave, COUNT(*) as Valor'))
            ->where('created_at', '>=', $today->subDays(6))
            ->groupBy(DB::raw('DAY(created_at)'))
            ->limit(10)
            ->get();
    }
}
