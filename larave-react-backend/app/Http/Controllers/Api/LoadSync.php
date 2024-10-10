<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Companies;
use App\Models\User;
use Illuminate\Http\Request;

class LoadSync extends Controller
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
}
