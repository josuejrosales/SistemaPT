<?php

namespace App\Http\Requests;

class RegisterRequest extends LoginRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return parent::combine([
            "name" => 'required',
            'email' => 'unique:users,email',
            'password' => 'confirmed',
        ], parent::rules());
    }
    public function messages()
    {
        return array_merge(parent::messages(), [
            "name" => "El Nombre es requerido",
            'email.unique' => 'Este usuario ya esta registrado',
            'password.confirmed' => 'Las contraseñas no coinciden.',
        ]);
    }
}
