<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use Illuminate\Http\Request;

class DetallePedidoController extends Controller
{
    public function show(Request $request, $id)
    {
        $pedido =  Pedido::with(["getDetallePedido.getProducto"])->find($id);
        return $pedido->getDetallePedido;
    }
}
