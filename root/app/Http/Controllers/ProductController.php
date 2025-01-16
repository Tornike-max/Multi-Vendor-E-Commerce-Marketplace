<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::query()->published()->paginate(12);
        dd($products);
        return inertia('Welcome');
    }
}
