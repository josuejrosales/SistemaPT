<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\System\StateOperation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClienteController extends Controller
{
    public function validate(Request $request, $extras = [])
    {
        $validate = Validator::make($request->all(), [
            "Nombre" => "required",
            "Email" => "required",
            "Telefono" => "required|numeric",
            "Direccion" => "required",
            ...$extras,
        ]);

        return $validate;
    }
    public function getClientesEloquent()
    {
        return Cliente::with([])->orderBy("created_at", "desc");
    }
    public function index()
    {
        return $this->getClientesEloquent()->get();
    }
    public function Store(Request $request)
    {
        $validate = $this->validate($request, []);

        if ($validate->fails()) {
            return response()->json(["message" => "No se completo el proceso de validacion", "data" => $validate->errors()], 500);
        }
        return StateOperation::process(function () use ($request) {
            Cliente::create([...$request->only(Cliente::make()->getFillable())]);
        });
    }
}
