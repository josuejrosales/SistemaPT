<?php

namespace App\Http\Controllers;

use App\Models\MetodoPago;
use App\Models\System\StateOperation;
use Illuminate\Http\Request;

class MetodoPagoController extends Controller
{
    public function index()
    {
        return MetodoPago::all();
    }
    public function store(Request $request)
    {
        $request->validate(["Nombre" => "required"]);

        return StateOperation::process(function () use ($request) {
            MetodoPago::create([...$request->only(MetodoPago::make()->getFillable())]);
        });
    }
    public function destroy($id)
    {
        return StateOperation::process(function () use ($id) {
            $metodoPago = MetodoPago::find($id);
            $metodoPago->delete();
        }, function () {
            return ["message" => "No se pudo eliminar el cliente(verificar referencia existente con otros registros)"];
        });
    }
}
