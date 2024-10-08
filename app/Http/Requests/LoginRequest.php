<?php

namespace App\Http\Requests;

class LoginRequest extends BaseRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "email" => "required",
            "password" => "required"
        ];
    }
    public function messages()
    {
        return [
            'email.required' => 'El usuario es requerido.',
            'password.required' => 'Las contraseña es requerido.',
        ];
    }
}
