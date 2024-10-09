<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\SubCategoria;
use App\Models\System\StateOperation;
use Illuminate\Http\Request;

class SubCategoriaController extends Controller
{
    public function getProductoAllWithSubCategoria($IdCategoria, $IdSubCategoria)
    {
        return Producto::where("IdCategoria", $IdCategoria)->where("IdSubCategoria", $IdSubCategoria)->get();
    }
    public function index()
    {
        return SubCategoria::with(["getCategoria"])->get();
    }
    public function store(Request $request)
    {
        $request->validate([
            "IdCategoria" => "required",
            "Nombre" => "required",
        ]);
        return StateOperation::process(function () use ($request) {
            SubCategoria::create([...$request->only(SubCategoria::make()->getFillable())]);
        });
    }
    public function destroy($id)
    {
        return StateOperation::process(function () use ($id) {
            $subCategoria = SubCategoria::find($id);
            $subCategoria->delete();
        }, function () {
            return ["message" => "No se pudo eliminar el cliente(verificar referencia existente con otros registros)"];
        });
    }
}
