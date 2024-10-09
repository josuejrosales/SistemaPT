<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategoria extends Model
{
    use HasFactory;

    protected $table = 'sub_categoria';

    protected $fillable = [
        'Nombre',
        'Descripcion',
        'IdCategoria'
    ];

    public function getCategoria()
    {
        return $this->hasOne(Categoria::class, "id", "IdCategoria");
    }

    public function getProductoAll()
    {
        return $this->hasMany(Producto::class, "IdSubCategoria", "id");
    }
}
