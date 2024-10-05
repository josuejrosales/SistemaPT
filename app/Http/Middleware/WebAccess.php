<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class WebAccess
{
    private const RUTAS_USER = [
        "/otros",
    ];
    private const RUTAS_API = [
        "/getUser",
    ];

    public function eval($request, $result): bool
    {
        $access = false;

        $path = preg_replace('/^\/?api\//', '/', trim('/' . ltrim($request->path(), '/')));

        foreach ($result as $value) {

            $preg = str_replace(['/', '{*}'], ['\/', '(.*)'], $value);

            if (preg_match('/^' . $preg . '$/', $path)) {

                $access = true;

                break;
            }
        }

        return $access;
    }
    public function handle(Request $request, Closure $next): Response
    {

        $access = true;

        $route_list = array_filter(explode("/", $request->path()), fn($v) => strlen(trim($v)) > 0);

        if (count($route_list) != 0) {

            $r_api = $route_list[0] == 'api' ? self::RUTAS_API : self::RUTAS_USER;

            $access = $this->eval($request, $r_api);
        }

        return $access ? $next($request) : response()
            ->json(["message" => "No estas autorizado para realizar esta accion"], 500);
    }
}
