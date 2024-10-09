<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\System\StateOperation;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    public function index()
    {
        return Categoria::all();
    }
    public function getCategoriaAll()
    {
        return Categoria::with(['getSubCategoria'])->get();
    }
    public function store(Request $request)
    {
        $request->validate(["Nombre"=>"required"]);
        return StateOperation::process(function () use ($request) {
            Categoria::create([...$request->only(Categoria::make()->getFillable())]);
        });
    }
    public function destroy($id)
    {
        return StateOperation::process(function () use ($id) {
            $categoria = Categoria::find($id);
            $categoria->delete();
        }, function () {
            return ["message" => "No se pudo eliminar el cliente(verificar referencia existente con otros registros)"];
        });
    }
}
