<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Company;
use App\Models\Service;
use App\Models\User;
use App\Traits\MenuList;
use Carbon\Carbon;
use Illuminate\Http\Request;

class LoadController extends Controller
{
    use MenuList;

    public function get_companies()
    {
        $companys = Company::all();
        return $companys;
    }

    public function get_company(Request $request)
    {
        $companys = Company::find($request->company_id);
        return $companys;
    }

    public function get_company_team(Request $request)
    {
        $team = Company::with('users')->findOrFail($request->company_id);

        return response()->json([
            'error' => false,
            'data' => $team->users
        ], 200);
    }

    public function get_company_services(Request $request)
    {
        $services = Service::where('company_id', $request->company_id)->get();
        
        return $services;
    }

    // public function get_appointment(Request $request)
    // {
    //     try {
    //         $appointment = Appointments::where('user_id', $request->user_id)
    //             ->where('company_id', $request->company_id)
    //             ->where('appointment_time', '>=', Carbon::today())
    //             ->orderBy('appointment_time', 'DESC')
    //             ->first();

    //         if ($appointment) {
    //             $appointment->appointment_label = strtoupper($this->appointments_status[$appointment->status]);
    //             $appointment->hairdresser = User::find($appointment->hairdresser_id)->name;
    //             $appointment->appointment_time = Carbon::parse($appointment->appointment_time)->format('H:i - d/m');
    //             return response()->json([
    //                 'error' => false,
    //                 'message' => '.',
    //                 'appointment' => $appointment
    //             ], 200);
    //         }

    //         return response()->json([
    //             'error' => true,
    //             'message' => '.',
    //         ], 200);
    //     } catch (Exception $e) {
    //         return response()->json([
    //             'error' => true,
    //             'message' => 'Error',
    //             'details' => $e->getMessage()
    //         ], 400);
    //     }
    // }

    public function get_all_appointments_user(Request $request)
    {
        try {
            $appointments = Appointment::where('user_id', $request->user_id)->orderBy('appointment_time', 'DESC')->get();
            $data = [];

            foreach ($appointments as $appointment) {
                $data[] = [
                    'id' => $appointment->id,
                    'service' => $appointment->service->name,
                    'price' => $appointment->service->price,
                    'status' => $appointment->status->label,
                    'user' => $appointment->user->name,
                    'employee' => $appointment->employee->name,
                    'company' => $appointment->company->name,
                    'notes' => $appointment->notes,
                    'appointment_time' => Carbon::parse($appointment->appointment_time)->format('H:i - d/m/Y'),
                ];
            }

            return response()->json([
                'error' => false,
                'appointment' => $data
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => 'Error',
                'details' => $e->getMessage()
            ], 200);
        }
    }
}
