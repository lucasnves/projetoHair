<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function loginUser(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Credenciais inválidas'
            ], 401);
        }

        $user = User::where('email', $request->email)->first();
        return response()->json([
            'success' => true,
            'user_token' => $user->createToken('API_TOKEN')->plainTextToken,
            'user' => $user
        ], 200);
    }

    public function logoutUser(Request $request)
    {
        $user = Auth::user();
        // if ($user) {

        //     $user->tokens->each(function ($token) {
        //         $token->delete();
        //     });
        // }

        return response()->json([
            'success' => true,
            'message' => 'Usuário deslogado com sucesso!'
        ]);
    }
}
