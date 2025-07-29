<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{   
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'company_user', 'company_id', 'user_id');
    }
}
