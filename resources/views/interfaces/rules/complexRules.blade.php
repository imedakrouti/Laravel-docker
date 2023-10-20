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
            <h3 style="color: #6666FF;" class="card-title"> <i class="fa fa-cut fa-sm mr-2" aria-hidden="true" style="color: #64D7C1;"></i>Les Règles complexes</h3>
        </div>
        <div class="card-body">
        <button data-bs-toggle="modal" id="btnaddrcomplexModal"  data-bs-target="#addrcomplexModal" type="button" class="btn btn-outline-primary mr-3 mb-4"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter une règle complexe</button>
<button data-bs-toggle="modal" id="btnaddrulesModal" data-bs-target="#" type="button" class="btn btn-outline-warning mr-3 mb-4"><i class="fa fa-plus-circle" aria-hidden="true"></i> Associer une règle</button>
<button data-bs-toggle="modal" id="btnEditModal"   data-bs-target="#editModalRuleC" type="button" class="btn btn-outline-success mr-3 mb-4 edit-button" data-toggle="" data-target="" data-rowindex="0"><i class="fa fa-pencil" aria-hidden="true"></i> Modifier une règle complexe</button>
<button data-bs-toggle="modal" id="deleteAllButton" type="button" class="btn btn-outline-danger mr-3 mb-4"><i class="fa fa-trash" aria-hidden="true"></i> Supprimer une règle complexe</button>
<div >
  <div class="row">
  <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <table id="reglecomplexeTable" class="table dt-responsive nowrap" style="width:100%">
            <caption></caption>
            <span>Liste des règles complexes</span>
            <thead class="thead-light">
              <tr>
                <th>id</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Type</th>
                <th>Statut</th>
                <!-- <th>Actions</th> -->
              </tr>
            </thead>
            <tbody class="table-bordered"></tbody>
          </table>
        </div>
      </div>
    </div>
</div>
<div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <table id="detailcTable" class="table dt-responsive nowrap" style="width:100%">
            <caption></caption>
            <span>Liste des règles associées</span>
            <thead class="thead-light">
              <tr>
              <th>Nom</th>
                <th>Description</th>
                <th>Type</th>
                <th>Statut</th>
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
      <div>
   </div>  
</div>
</section>
<!-- ADD Rule Complex Modal -->
@include('interfaces.rules.modals.complexRules.addComplexRule')
<!-- Edit Rule Complex Modal -->
@include('interfaces.rules.modals.complexRules.editComplexRule')
<!-- DELETE Complex Rule -->
@include('interfaces.rules.modals.complexRules.deleteComplexRule')
<!-- Info Complex Rule -->
@include('interfaces.rules.modals.complexRules.infoComplexRule')
<!-- Add Rule To Complex Rule -->
@include('interfaces.rules.modals.complexRules.addRuleToComplexRule')
<!-- /.content -->
@endsection
@section('script')
    <script rel="javascript" src="{{ asset('assets/js/rules/complex_rules.js') }}"></script>
@endsection