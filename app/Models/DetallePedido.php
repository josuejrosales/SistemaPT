<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class DetallePedido extends Model
{
    use HasFactory;

    protected $table = 'detalle_pedido';

    protected $fillable = [
        'Cantidad',
        'PrecioUnitario',
        'Total',
        'IdPedido',
        'IdProducto',
    ];

    public function getProducto()
    {
        return $this->hasOne(Producto::class, 'id', 'IdProducto');
    }
    public static function getPedidoProductoXDia()
    {
        $result = DetallePedido::select(
            'producto.Nombre as Producto',
            DB::raw('SUM(detalle_pedido.Cantidad) AS Cantidad'),
            DB::raw('DAY(detalle_pedido.created_at) AS Dia')
        )
            ->join('producto', 'detalle_pedido.IdProducto', '=', 'producto.id')
            ->groupBy('producto.Nombre', DB::raw('DAY(detalle_pedido.created_at)'))
            ->orderBy('detalle_pedido.created_at', 'ASC')
            ->get();

        $maxPerDay = $result->groupBy('Dia')->map(function ($group) {
            return $group->sortByDesc('Cantidad')->first();
        });

        return  $maxPerDay->values()->toArray();
    }
}
