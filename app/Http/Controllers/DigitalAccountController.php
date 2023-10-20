<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DigitalAccountController extends Controller
{
   /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function responsable()
  {
    return view('interfaces.digitalAccounts.responsable');
  }
   /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function revendeur()
  {
    return view('interfaces.digitalAccounts.revendeur');
  }
   /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function salarie()
  {
    return view('interfaces.digitalAccounts.salarie');
  }
    
}
