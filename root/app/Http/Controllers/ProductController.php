<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;
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

    public function show(Product $product)
    {
        // $productObject = Product::query()->with(['variationTypes', 'productVariations'])->where('id', '=', $product->id)->first();
        return inertia('Products/Show', [
            'product' => new ProductResource($product),
            'variationOptions' => request('options', [])
        ]);
    }
}
