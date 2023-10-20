@extends('layouts.mainLayout')
@section('styles')
    <link rel="stylesheet" href="{{ asset('assets/css/formule.css') }}">
@endsection
@section('content')
<!-- Main content -->
<section class="content">
<div class="container-fluid">

<div class="row">

<div class="col-12">
<div class="card">
                <div class="card-header">
                    <h3 style="color: #6666FF;" class="card-title"> <i class="fa-solid fa-pen-fancy" aria-hidden="true" style="color: #64D7C1;"></i> Les Formules</h3>
                </div>
                
          <div class="card-body">

<button data-toggle="modal" data-target="#ajoutuserform" type="button" class="btn btn-outline-primary mr-3 mb-4"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter Formule</button>
<button id="editbutton" type="button" class="btn btn-outline-success mr-3 mb-4 edit-button" data-toggle="modal" data-target="#editModal" data-rowindex="0"><i class="fa fa-pencil" aria-hidden="true"></i> Modifier Formule</button>
<button id="deleteAllButton" type="button" class="btn btn-outline-danger mr-3 mb-4"><i class="fa fa-trash" aria-hidden="true"></i> Supprimer Formule</button>
<div class="row">
<div class="col-md-12">
          <table id="formuleTable" class="table dt-responsive nowrap" style="width:100%">
            <caption></caption>
            <span>Liste des formules</span>
            <thead class="thead-light">
              <tr>
                <th>id</th>
                <th>Nom</th>
                <th>Description</th>
                <th >Date Création </th>
                <!-- <th >Valeur </th> -->
                <th >Actions</th>
              </tr>
            </thead>
            <tbody class="table-bordered"></tbody>
          </table>
  </div>
  <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <table id="FormuleClairTable" class="table dt-responsive nowrap" style="width:100%">
            <caption></caption>
            <span>La Formule en clair </span>
            <thead class="thead-light">
              <tr>
                <th>Formule en clair</th>
              </tr>
            </thead>
            <tbody class="table-bordered"></tbody>
          </table>
        </div>
      </div>
    </div>
</div>
</div>
</div>
</div>
</div>
</div>

</section>
<!-- /.content -->
<!-- ADD Formule Modal -->
@include('interfaces.rules.modals.formule.ajouterFormule')
<!-- Edit Formule Modal -->
@include('interfaces.rules.modals.formule.modifierFormule')
<!-- DELETE Formule -->
@include('interfaces.rules.modals.formule.deleteFormule')
<!-- Definir Formule -->
@include('interfaces.rules.modals.formule.definirFormule')
@endsection
@section('script')
    <script rel="javascript" src="{{ asset('assets/js/rules/formules.js') }}"></script>
@endsection