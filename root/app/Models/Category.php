<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
