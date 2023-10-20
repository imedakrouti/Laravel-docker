<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use lluminate\Http\Response;
use Illuminate\Support\Facades\Session;

class UserController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    if (Session::has('user')) {
       return redirect('/main');
  }
    return view('interfaces.users.login');
  }
  /**
   * Check login
   *
   * @return \Illuminate\Http\Response
   */
  public function login(Request $request)
  {
      $credentials = $request->only('username', 'password');
      $staticUsers = config('static_users');
  
      if (isset($staticUsers[$credentials['username']])) {
          $user = $staticUsers[$credentials['username']];
          if ($user['password'] === $credentials['password']) {
              $user=['username'=>$credentials['username'],'password'=>$user['password'],'role'=>$user['role']];
              Session::put('user',$user);
              return redirect('/main');
          }
          else{
            return back()->with('message', 'Mot de passe invalid');
          }
      }
  
      return back()->with('message', "Nom d'utilisateur invalid");

    }
 /**
   * Logout
   *
   * @return \Illuminate\Http\Response
   */
  public function logout()
  {
      Session::forget('user');
      return redirect('/');
  }

  
}
