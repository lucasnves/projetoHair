<?php

namespace App\Http\Controllers;

use App\Models\Companies;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function getCompanys(): Response
    {
        $companys = Companies::all();
        return Inertia::render('Dashboard', [
            'companys' => $companys,
        ]);
    }
}
