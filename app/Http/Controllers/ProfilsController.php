<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfilsController extends Controller
{ 
   /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return view('interfaces.profils.index');
  }
  public function detail_profil($id)
  {
    return view('interfaces.profils.detail_profil');
  }  
  public function add_profil($id)
  {
    return view('interfaces.profils.add_profil');
  }
}
