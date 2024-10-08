<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class NotAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::user()) return redirect("/dashboard");
        session()->forget('auth_token');
        return $next($request);
    }
}
