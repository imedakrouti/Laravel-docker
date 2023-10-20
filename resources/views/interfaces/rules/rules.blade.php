@extends('layouts.mainLayout')
@section('styles')
    <link rel="stylesheet" href="{{ asset('assets/css/accounts.css') }}">
@endsection
@section('content')
<!-- Main content -->
<section class="content">
<div class="container-fluid">

<div class="row">

  <div class="col-12">
    <div>
      <div class="card-header">
      <h3 style="color: #6666FF;" class="card-title"> <i class="fa fa-cut fa-sm" aria-hidden="true" style="color: #64D7C1;"></i> &nbsp; Les Règles</h3>
      </div>
      <div class="card-body">
      <button data-toggle="modal" id="BtnAjouteregle"data-target=""  type="button" class="btn btn-outline-primary mr-3 mb-4"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter une règle</button>
            <button id="BtnEditRegle" type="button" class="btn btn-outline-success mr-3 mb-4 edit-button" data-toggle="modal" data-target="" data-rowindex="0"><i class="fa fa-pencil" aria-hidden="true"></i> Modifier une règle</button>
            <button id="deleteAllButton" type="button" class="btn btn-outline-danger mr-3 mb-4"><i class="fa fa-trash" aria-hidden="true"></i> Supprimer une règle</button>
            <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <table id="regleTable" class="table dt-responsive nowrap" style="width:100%">
            <caption></caption>
            <span>Liste des règles</span>
            <thead class="thead-light">
              <tr>
                <th>id</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Type</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody class="table-bordered"></tbody>
          </table>
        </div>
      </div>
    </div>
   <!--  <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <table id="typeregleTable" class="table dt-responsive nowrap" style="width:100%">
            <caption></caption>
            <span>Type de règle</span>
            <thead class="thead-light">
              <tr>
                <th>Type de règle</th>
              </tr>
            </thead>
            <tbody class="table-bordered"></tbody>
          </table>
        </div>
      </div>
    </div> -->
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <table id="detailTable" class="table dt-responsive nowrap" style="width:100%">
            <caption></caption>
            <span>Détails de règle</span>
            <thead class="thead-light">
              <tr>
                <th>Nom</th>
                <th>Type clauses</th>
                <th>Statut</th>
                <th>Date de creation</th>
                <th>Action</th>
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
</section>
<!-- ADD Rule Modal -->
@include('interfaces.rules.modals.rules.addRule')
<!-- Edit Rule Modal -->
@include('interfaces.rules.modals.rules.editRule')
<!-- DELETE Formule -->
@include('interfaces.rules.modals.rules.deleteRule')
<!-- Info Rule -->
@include('interfaces.rules.modals.rules.infoRule')
<!-- /.content -->
@endsection
@section('script')
    <script rel="javascript" src="{{ asset('assets/js/rules/rules.js') }}"></script>
@endsection