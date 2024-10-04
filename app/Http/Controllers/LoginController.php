<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function __invoke()
    {
        if (Auth::user()) return redirect("/");
        session()->forget('auth_token');
        return view("login");
    }

    public function LoginIn(Request $request)
    {

        $valid  = $request->validate(
            ["email" => "required", "password" => "required"],
            $request->except("_token")
        );

        if (Auth::attempt($valid)) {

            $user = Auth::user();

            if ($user instanceof User) {

                $user->tokens()->delete();

                $token = $user->createToken('auth_token')->plainTextToken;

                session(['auth_token' => $token]);

                return redirect("/");
            }
        }

        return redirect()
            ->back()
            ->withErrors(["email" => "Correo incorrecto", "password" => "contraseña incorrecta"])
            ->withInput();
    }

    public function Register()
    {
        // new register       
    }

    public function LoginClose()
    {
        Auth::logout();
        session()->flush();
        return redirect()->route("login");
    }
}
