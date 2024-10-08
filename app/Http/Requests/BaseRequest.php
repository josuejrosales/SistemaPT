<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BaseRequest extends FormRequest
{
    public function combine($rules, $parent): array
    {
        return array_reduce(array_keys($rules), function ($acum, $index) use ($rules) {
            $acum[$index] = isset($acum[$index]) ?  $acum[$index] . "|" . $rules[$index] : $rules[$index];
            return $acum;
        }, $parent);
    }
}
