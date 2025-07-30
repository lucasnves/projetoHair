<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    public function service() {
        return $this->belongsTo(Service::class);
    }

    public function status() {
        return $this->belongsTo(AppointmentStatus::class, 'status_id');
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function employee() {
        return $this->belongsTo(User::class, 'employee_id');
    }

    public function company() {
        return $this->belongsTo(Company::class);
    }
}
