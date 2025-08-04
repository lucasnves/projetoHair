<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Exception;
use Illuminate\Http\Request;

class SyncController extends Controller
{
    public function create_appointment(Request $request)
    {
        try {
            $appointment = Appointment::create($request->input('data'));
            return response()->json([
                'error' => false,
                'data' => $appointment
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'error' => true,
                'message' => 'Error',
                'details' => $e->getMessage()
            ], 200);
        }
    }
}
