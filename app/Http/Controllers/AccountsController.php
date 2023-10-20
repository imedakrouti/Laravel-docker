<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AccountsController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function manager()
  {
    return view('interfaces.accounts.manager');
  }
   /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function parent()
  {
    return view('interfaces.accounts.parent');
  }
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function child()
  {
    return view('interfaces.accounts.child');
  }
}
