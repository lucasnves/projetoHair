<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointments;
use App\Models\Companies;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class LoadController extends Controller
{
    public function getCompanies()
    {
        $companys = Companies::all();
        return $companys;
    }

    public function getCompany(Request $request)
    {
        $companys = Companies::find($request->company_id);
        return $companys;
    }

    public function getCompanyHairdressers(Request $request)
    {
        $hairdressers = User::where('company_id', $request->company_id)->get();
        return $hairdressers;
    }

    public function get_appointment(Request $request)
    {
        $appointment = Appointments::where('user_id', $request->user_id)
            ->where('company_id', $request->company_id)
            ->where('appointment_time', '>=', Carbon::today())
            ->orderBy('appointment_time', 'DESC')
            ->first();
        return $appointment;
    }
}
