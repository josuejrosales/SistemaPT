<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function index()
    {
        return view("login");
    }

    public function store(LoginRequest $request)
    {
        if (Auth::attempt($request->only(["email", "password"]))) {

            $user = Auth::user();

            if ($user instanceof User) {

                $user->tokens()->delete();

                $token = $user->createToken('auth_token')->plainTextToken;

                session(['auth_token' => $token]);

                return redirect("/dashboard");
            }
        }

        return redirect()
            ->back()
            ->withErrors(["email" => "El correo no existe", "password" => "Contraseña incorrecta"])
            ->withInput();
    }

    public function destroy()
    {
        Auth::logout();
        session()->flush();
        return redirect("/login");
    }
}
