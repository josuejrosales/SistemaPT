<?php

namespace App\Http\Controllers;

use App\Models\DetallePedido;
use App\Models\Pedido;
use App\Models\Producto;
use App\Models\System\StateOperation;
use Exception;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    public function getPedidosEloquent()
    {
        return Pedido::with(["getCliente", "getMetodoPago"])->orderBy("created_at", "desc");
    }
    function calcularTotalesConIGV($productos)
    {
        $subtotal = 0;
        $igv = 0.18;
        foreach ($productos as $producto) {

            $c = number_format($producto->cound, 2);
            $p = number_format($producto->price, 2);

            $subtotal += $p * $c;
        }
        $impuesto = $subtotal * $igv;
        $total = $subtotal + $impuesto;
        return (array) [
            'SubTotal' => number_format($subtotal, 2),
            'Impuesto' => number_format($impuesto, 2),
            'Total' => number_format($total, 2)
        ];
    }

    public function index()
    {
        return $this->getPedidosEloquent()->get();
    }
    public function store(Request $request)
    {
        $request->validate([
            "IdCliente" => "required",
            "IdMetodoPago" => "required"
        ]);

        return StateOperation::process(function () use ($request) {
            $table = json_decode($request->get("table-producto"));
            if (count($table) <= 0) throw new Exception("Aún no se han ingresado productos.");

            $IdCliente = $request->get("IdCliente");
            $IdMetodoPago = $request->get("IdMetodoPago");

            $pedido = Pedido::create([
                "IdCliente" => $IdCliente,
                "IdMetodoPago" => $IdMetodoPago,
                "Estado" => "FINALIZED",
                ...$this->calcularTotalesConIGV($table)
            ]);

            foreach ($table as $value) {

                $c = number_format($value->cound, 0);
                $p = number_format($value->price, 2);

                $producto = Producto::find($value->id);
                $producto->Stock -= $c;
                $producto->save();

                DetallePedido::create([
                    "IdPedido" => $pedido->id,
                    "IdProducto" => $value->id,
                    "Cantidad" => $c,
                    "PrecioUnitario" => $p,
                    "Total" => number_format($c * $p, 2),
                ]);
            }
        });
    }
}
