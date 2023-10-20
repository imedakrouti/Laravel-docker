@extends('layouts.mainLayout')
@section('styles')
    <link rel="stylesheet" href="{{ asset('assets/css/accounts.css') }}">
@endsection
@section('content')
<!-- Main content -->
<!-- Main CONTENT -->
<section class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 style="color: #6666FF;" class="card-title">
                            <i class="fa-solid fa-pen-fancy" aria-hidden="true" style="color: #64D7C1;"></i> Les concepts
                        </h3>
                    </div>
                    <!-- /.card-header -->

                    <div class="card-body">
                        <button data-bs-toggle="modal" data-bs-target="#modalAddConcept" type="button" class="btn btn-outline-primary mr-3 mb-4">
                            <i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter Concept
                        </button>
                        <!-- <button id="openModalBtnc" type="button" class="btn btn-outline-primary mr-3 mb-4"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter Concept</button> -->
                        <button id="editbutton" type="button" class="btn btn-outline-success mr-3 mb-4 edit-button" data-bs-toggle="modal" data-bs-target="" data-rowindex="0">
                            <i class="fa fa-pencil" aria-hidden="true"></i> Modifier Concept
                        </button>
                        <button data-bs-toggle="modal" id="btnaddFormuleModal" data-bs-target="#" type="button" class="btn btn-outline-warning mr-3 mb-4">
                            <i class="fa fa-plus-circle" aria-hidden="true"></i> Associer une formule
                        </button>
                        <button id="delete_concept_modal" type="button" class="btn btn-outline-danger mr-3 mb-4">
                            <i class="fa fa-trash" aria-hidden="true"></i> Supprimer Concept
                        </button>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <table id="conceptTable" class="table dt-responsive nowrap" style="width:100%">
                                            <caption>Liste des concepts</caption>
                                            <thead class="thead-light">
                                                <tr>
                                                    <th>id</th>
                                                    <th>Nom</th>
                                                    <th>Description</th>
                                                    <th>Date de création</th>
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
                                        <table id="formulaTable" class="table dt-responsive nowrap" style="width:100%">
                                            <caption>Liste des formules associées</caption>
                                            <thead class="thead-light">
                                                <tr>
                                                    <th>Nom</th>
                                                    <th>Formule</th>
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

<!-- ADD Concept Modal -->
@include('interfaces.rules.modals.concept.addConceptModal')
<!-- Associate Formule Modal -->
@include('interfaces.rules.modals.concept.associerFormuleModal')
<!-- Edit Concept Modal -->
@include('interfaces.rules.modals.concept.editConceptModal')
<!-- DELETE Modal -->
@include('interfaces.rules.modals.concept.deleteModal')
<!-- GET User Info -->
@include('interfaces.rules.modals.concept.userInfo')
@endsection

@section('script')
    <script rel="javascript" src="{{ asset('assets/js/rules/concepts.js') }}"></script>
@endsection