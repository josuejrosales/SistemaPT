<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $table = 'pedido';

    protected $fillable = [
        'Estado',
        'SubTotal',
        'Total',
        'Descuento',
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
}
