<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class ProductController extends Controller
{

    public function index()
    {
        return Product::select('id','title', 'email','ticket', 'time')->get();
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        
        $request->validate([
            'title'=>'required',
            // 'date'=>'required', //first part is string
            'email'=>'required',
            'ticket'=>'required',
            'time'=>'required'
        ]);
        try{
        
        Product::create($request->post());//this part is important to post into database
        return response()->json([
        'message'=>'Your Booking is Successfull!!'
        ]);
        }
        catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
            'message'=>'Something goes wrong while creating a product!!'
            ],500);
        }
    }

    public function show(Product $product)
    {
        return response()->json([
        'product'=>$product
        ]);
    }

    public function edit(Product $product)
    {
        //
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'title'=>'required',
            // 'date'=>'required',
            'email'=>'required',
            'ticket'=>'required',
            'time'=>'required'
        ]);
        try{
                $product->fill($request->post())->update();

                return response()->json([
                'message'=>'Your Booking Successfully Updated!!'
                ]);
            }
        catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
            'message'=>'Something goes wrong while updating a product!!'
            ],500);
        }
        }

            public function destroy(Product $product)
            {
                try {

                        $product->delete();
                        return response()->json([
                        'message'=>'Your Booking Successfully Cancelled!!'
                        ]);
                    } 
                catch (\Exception $e) {
                \Log::error($e->getMessage());
                return response()->json([
                'message'=>'Something goes wrong while deleting a product!!'
                ]);
                }
            }

}
