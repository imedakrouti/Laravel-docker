@extends('layouts.mainLayout')
@section('styles')
    <link rel="stylesheet" href="{{ asset('assets/css/support.css') }}">
@endsection
@section('content')
<!-- Main content -->
<section class="content">
<div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">

<h3 style="color: #6666FF;" class="card-title"><i class="fa fa-life-ring" aria-hidden="true" style="color: #64D7C1;"></i> Liste des demandes de support</h3>
</div>
<div class="card-body">
<div class="row mb-2 d-flex justify-content-between align-items-center">
<div class="col-md-4">
                                <button id="openModalBtnsup" style='max-width: 100%;margin-bottom: 5%' type="button" class="btn btn-outline-primary"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter un sujet</button>
                            </div>

                             <div class="col-md-4">
  <label for="x">Filtrer par :</label>
  <div class="d-flex">
    <label for="subjectFilter" class="mr-2"></label>
    <select id="subjectFilter" class="form-control">
      <option value="">Tous les sujets</option>
    </select>
  </div>  
  <div class="d-flex mt-2">
    <label for="statusFilters" class="mr-2"></label>
    <select id="statusFilters" class="form-control">
      <option value="all">Tous les status</option>
      <option value="Ouvert">Ouvert</option>
      <option value="Résolu">Résolu</option>
    </select>
  </div>           
</div>

</div>
<table id="supportTable" class="table  dt-responsive nowrap" style="width:100%">
                        <caption> </caption>
                        <thead class="thead-light">

                                <tr>
                                    <!-- <th>ID</th> -->
                                    <th>ID</th>
                                    <th>Nom d'utilisateur</th>
                                    <th>Email d'utilisateur</th>
                                    <th>Message</th>
                                    <th>Sujet</th>
                                    <th>Date de création</th>
                                    
                                    <th>Statut</th>
                                    <th>Actions</th>
                                    <th>URL Redmine</th>
                                </tr>
                            </thead>
                            <tbody class="table-bordered"></tbody>
                        </table>
</div>
</div>
</div>
</div>
<!-- ADD Subject Modal -->
@include('interfaces.support.modals.support.ajouterSujet')
<!-- DELETE Modal -->
@include('interfaces.support.modals.support.delete')
<!-- Reply FORM Modal -->
@include('interfaces.support.modals.support.reponse')
    <!-- /.container-fluid -->
</section>
<!-- /.content -->

@endsection
@section('script')
    <script rel="javascript" src="{{ asset('assets/js/supports/listsupport.js') }}"></script>
@endsection