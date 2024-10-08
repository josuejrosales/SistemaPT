<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\System\StateOperation;
use Exception;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function storeProducto(Request $request, $id)
    {
        $request->validate([
            'producto-image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ], [
            'producto-image' => "Necesitas actualizar una imagen para realizar el cambio."
        ]);

        return StateOperation::process(function () use ($request, $id) {
            $path = $request->file('producto-image')->store('images', 'public');
            $producto = Producto::find($id);
            $producto->update(["Photo" => $path]);
        });
    }
}
