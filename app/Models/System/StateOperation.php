<?php

namespace App\Models\System;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class StateOperation extends Model
{
    private $data;

    private $operation;

    public static $messageSuccess = ["message" => "Procesado", "data" => true];
    public static $messageError = ["message" => "No procesado", "data" => true];

    public function __construct($operation = true)
    {
        $this->data = [];
        $this->operation = $operation;
    }

    public function set($key, $value)
    {
        $this->data[$key] = $value;
    }

    public function getData()
    {
        return $this->data;
    }
    public function getOperation()
    {
        return $this->operation;
    }
    public function setOperation($operation)
    {
        $this->operation = $operation;
    }
    public static function process($funSuccess, $funError = null)
    {

        $getSuccess = function ($data) {
            $msg = StateOperation::$messageSuccess;
            $msg = [...$msg, ...$data];
            return $msg;
        };

        $getError = function ($data) {
            $msg = StateOperation::$messageError;
            $msg["message"] = $data;
            return $msg;
        };

        try {
            DB::beginTransaction();
            $success = $funSuccess();
            DB::commit();
            return $success ? $getSuccess($success)
                : StateOperation::$messageSuccess;
        } catch (Exception $e) {
            DB::rollBack();
            $error = $funError ? $funError($e) : $getError($e->getMessage());
            return response()->json($error, 500);
        }
    }
}
