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
                <div class="card">
                    <div class="card-header">
                        <h3 style="color: #6666FF;" class="card-title">
                            <i class="fas fa-file-contract mr-1" aria-hidden="true" style="color: #64D7C1;"></i> Les clauses
                        </h3>
                    </div>
                    <div class="card-body">
                        <button type="button" class="btn btn-outline-primary mr-3 mb-4" data-bs-toggle="modal" data-bs-target="#addclause" data-bs-whatever="Ajouter une clause">
                            <i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter Clause
                        </button>
                        <button id="BtnEditClause" type="button" class="btn btn-outline-success mr-3 mb-4 edit-button" data-toggle="modal" data-target="" data-rowindex="0">
                            <i class="fa fa-pencil" aria-hidden="true"></i> Modifier une Clause
                        </button>
                        <button id="btndeleteClause" type="button" class="btn btn-outline-danger mr-3 mb-4">
                            <i class="fa fa-trash" aria-hidden="true"></i> Supprimer une Clause
                        </button>
                        <table id="datatable-clause" class="table dt-responsive nowrap" style="width:100%">
                            <caption></caption>
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">Nom</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Statut</th>
                                    <th scope="col">Date de création</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="table-bordered"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ADD Clause Modal -->
@include('interfaces.rules.modals.clauses.addClause')
<!-- Edit Clause Modal -->
@include('interfaces.rules.modals.clauses.editClause')
<!-- Delete Clause Modal -->
@include('interfaces.rules.modals.clauses.deleteClause')
<!-- Info Clause Modal -->
@include('interfaces.rules.modals.clauses.infoClause')
<!-- /.content -->
@endsection
@section('script')
    <script rel="javascript" src="{{ asset('assets/js/rules/clauses.js') }}"></script>
@endsection