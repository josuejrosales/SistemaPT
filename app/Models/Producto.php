<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $table = 'producto';

    protected $fillable = [
        'Nombre',
        'Descripcion',
        'Precio',
        'Stock',
        'Photo',
        'IdCategoria',
        'IdSubCategoria',
    ];

    public function getCategoria()
    {
        return $this->hasOne(Categoria::class, 'id', 'IdCategoria');
    }
    public function getSubCategoria()
    {
        return $this->hasOne(SubCategoria::class, 'id', 'IdSubCategoria');
    }
}
