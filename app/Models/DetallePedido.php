<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
