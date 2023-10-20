<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RulesController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function rules()
  {
    return view('interfaces.rules.rules');
  }
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function concept()
  {
    return view('interfaces.rules.concept');
  }
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function clauses()
  {
    return view('interfaces.rules.clauses');
  }
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function formule()
  {
    return view('interfaces.rules.formule');
  }
    /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function echantillons()
  {
    return view('interfaces.rules.echantillons');
  }
   /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function application()
  {
    return view('interfaces.rules.application');
  }
   /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function complexRules()
  {
    return view('interfaces.rules.complexRules');
  }
}
