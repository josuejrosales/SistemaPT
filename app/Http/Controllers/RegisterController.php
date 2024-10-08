<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function index()
    {
        return view("register");
    }
    public function store(RegisterRequest $validate)
    {
        try {
            User::create([
                'name' => $validate->name,
                'email' => $validate->email,
                'password' => Hash::make($validate->password),
            ]);
            return redirect()->route('login')
                ->with('success', 'Te registraste correctamente ' . $validate->name)
                ->with("user", $validate->email);
        } catch (Exception $e) {
            return redirect("/register")->with('error', 'No se puedo completar el registro.');
        }
    }
}
