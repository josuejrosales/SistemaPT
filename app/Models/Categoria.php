<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    protected $table = 'categoria';

    protected $fillable = [
        'Nombre',
        'Descripcion'
    ];

    public function getSubCategoria()
    {
        return $this->hasMany(SubCategoria::class, "IdCategoria", "id");
    }
}
