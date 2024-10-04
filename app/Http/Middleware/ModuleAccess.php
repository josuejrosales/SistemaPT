<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ModuleAccess
{
    private $rutas = [
        "/api/hola"
    ];

    /**
     * @method evalua las rutas permitidas
     */
    public function eval($request, $entry): bool
    {
        $access = false;

        $path = preg_replace('/^\/?api\//', '/', trim('/' . ltrim($request->path(), '/')));

        foreach ($entry as $value) {

            $preg = str_replace(['/', '{*}'], ['\/', '(.*)'], $value);

            if (preg_match('/^' . $preg . '$/', $path)) {

                $access = true;

                break;
            }
        }

        return $access;
    }

    /**
     * @method controla las rutas desconosidas
     */
    public function handle(Request $request, Closure $next): Response
    {
        $access = true;

        $route = array_filter(explode("/", $request->path()), fn($v) => strlen(trim($v)) > 0);

        if (count($route) != 0) {

            $access = (bool)($this->eval($request, $this->rutas));
        }

        return $access ? $next($request) : response()->json(["message" => "Acesso denegado"], 500);
    }
}
