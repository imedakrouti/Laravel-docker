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
        <div >
          <div class="card-header">
            <h3 style="color: #6666FF;" class="card-title"> <i class="fa fa-cut fa-sm" aria-hidden="true" style="color: #64D7C1;"></i> Les échantillons</h3>
          </div>
          <div class="row">
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
        <button  id  ="BtnAjouterechantillon"data-bs-toggle="modal" data-bs-target="#Ajouterechantillon" type="button" class="btn btn-outline-primary mr-3 mb-4"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter Échantillon</button>
            <button id="editbutton" type="button" class="btn btn-outline-success mr-3 mb-4 edit-button" data-bs-toggle="modal" data-bs-target="#editModal" data-rowindex="0"><i class="fa fa-pencil" aria-hidden="true"></i> Modifier Échantillon</button>
            <button id="deleteAllButton" type="button" class="btn btn-outline-danger mr-3 mb-4" ><i class="fa fa-trash" aria-hidden="true"></i> Supprimer Échantillon</button>
            <button id="importerclick" type="button" data-bs-toggle="modal"data-bs-target="#importmodal"class="btn btn-outline-info mr-3 mb-4"><i class="fas fa-download" aria-hidden="true"></i> Importer</button>
          <table id="echantillonTable" class="table dt-responsive nowrap" style="width:100%">
            <caption></caption>
            <br>
            <span>Liste des échantillons</span>
            <thead class="thead-light">
              <tr>
                <th>id</th>
                <th>Nom</th>
                <th>Date de création</th>
                <!-- <th>Contexte</th> -->
                <!-- <th >Actions</th> -->
              </tr>
            </thead>
            <tbody class="table-bordered"></tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
        <button  data-toggle="modal" data-target="#AjoutContexteModal" type="button" class="btn btn-outline-primary mr-3 mb-4"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter Contexte </button>
            <!-- <button id="editbutton" type="button" class="btn btn-outline-success mr-3 mb-4 edit-button" data-bs-toggle="modal" data-bs-target="#editModal" data-rowindex="0"><i class="fa fa-pencil" aria-hidden="true"></i> Modifier Contexte</button> -->
            <!-- <button id="deleteAllButton" type="button" class="btn btn-outline-danger mr-3 mb-4"><i class="fa fa-trash" aria-hidden="true"></i> Supprimer Echantillon</button> -->
          <table id="contexteTable" class="table dt-responsive nowrap" style="width:100%">
            <caption></caption>
            <br>
            <span>Liste des contextes</span>
            <thead class="thead-light">
              <tr>
                <th>Contexte</th>
              </tr>
            </thead>
            <tbody class="table-bordered"></tbody>
          </table>
        </div>
      </div>
    </div>
     <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <table id="DetailsindividutTable" class="table dt-responsive nowrap" style="width:100%">
          <span>Détails d'individu associé</span>
            <caption></caption>
            <thead class="thead-light">
              <tr>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Genre</th>
                <th>Date de naissance </th>
                <th>Pays</th>
                
              </tr>
            </thead>
            <tbody class="table-bordered"></tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <table id="DetailsContenuDonneesTable" class="table dt-responsive nowrap" style="width:100%">
          <span>Détails contenu des données  </span>
            <caption></caption>
            <thead class="thead-light">
              <tr>
              <th>Contenu des données</th>
              </tr>
            </thead>
            <tbody class="table-bordered"></tbody>
          </table>
        </div>
      </div>
    </div> 
  </div>
        </div>
       <div>
</div>
</div>
</section>
<!-- ADD Echantillon Modal -->
@include('interfaces.rules.modals.echantillons.AjouterEchantillons')
<!-- Edit Echantillon Modal -->
@include('interfaces.rules.modals.echantillons.editEchantillons')
<!-- DELETE Echantillon -->
@include('interfaces.rules.modals.echantillons.deleteEchantillons')
<!-- Import Echantillon -->
@include('interfaces.rules.modals.echantillons.importEchantillons')
<!-- /.content -->
@endsection
@section('script')
    <script rel="javascript" src="{{ asset('assets/js/rules/echantillons.js') }}"></script>
@endsection