<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function get_companys(): Response
    {
        $companys = Company::all();
        return Inertia::render('Dashboard', [
            'companys' => $companys,
        ]);
    }
}
