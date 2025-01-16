<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductListResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::query()->published()->paginate(12);
        return inertia('Home', [
            'products' =>   ProductListResource::collection($products)
        ]);
    }
}
