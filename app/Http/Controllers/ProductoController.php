<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Producto;
use App\Models\SubCategoria;
use App\Models\System\StateOperation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductoController extends Controller
{
    public function validate(Request $request, $extras = [])
    {
        $validate = Validator::make($request->all(), [
            "Nombre" => "required",
            "Precio" => "required|numeric",
            "Stock" => "required|numeric",
            "IdCategoria" => "required",
            "IdSubCategoria" => "required",
            ...$extras,
        ]);

        return $validate;
    }
    public function getProdutosEloquent()
    {
        return Producto::with(["getCategoria", "getSubCategoria"])->orderBy("created_at", "desc");
    }
    public function index()
    {
        return $this->getProdutosEloquent()->get();
    }
    public function show(Request $request, $_)
    {
        return $this->getProdutosEloquent()
            ->where("IdCategoria", $request->get("IdCategoria"))
            ->where("IdSubCategoria", $request->get("IdSubCategoria"))
            ->get();
    }
    public function Store(Request $request)
    {
        $validate = $this->validate($request, []);

        if ($validate->fails()) {
            return response()->json(["message" => "No se completo el proceso de validacion", "data" => $validate->errors()], 500);
        }
        return StateOperation::process(function () use ($request) {
            Producto::create([...$request->only(Producto::make()->getFillable())]);
        });
    }
    public function filters()
    {
        $categorias = Categoria::all();
        $sub_categorias = SubCategoria::all();
        return compact("categorias", "sub_categorias");
    }
}
