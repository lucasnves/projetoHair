<?php

namespace App\Traits;

trait MenuList
{
    public $appointments_status = [
        1 => 'Pendente',
        2 => 'Concluida',
        3 => 'Confirmada',
        4 => 'Remarcada',
        5 => 'Cancelada'
    ];
}
