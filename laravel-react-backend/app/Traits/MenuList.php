<?php

namespace App\Traits;

trait MenuList
{
    public $appointments_status = [
        1 => 'Pendente',
        2 => 'Confirmado',
        3 => 'Concluído',
        4 => 'Cancelado'
    ];
}
