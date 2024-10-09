<?php

namespace App\Http\Controllers;

use App\Models\DetallePedido;
use App\Models\Pedido;

class ReporteController extends Controller
{
    public function index()
    {
        return [
            "pedidoxdia" => Pedido::getPedidoXDia(),
            "pedidoxproductoxdia" => DetallePedido::getPedidoProductoXDia(),
        ];
    }
}
