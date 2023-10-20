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

                        <h3 style="color: #6666FF;" class="card-title"> <i class="fa fa-university" aria-hidden="true" style="color: #64D7C1;"></i> Les Revendeurs</h3>
                    </div>
                    <!-- /.card-header -->

                    <div class="card-body">
                        <button id="openModalBtnrev" style='max-width: 100%;margin-bottom: 1%;' type="button" class="btn btn-outline-primary"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter Revendeur</button>
                        <style>

                        </style>


                        <table id="usersTablerev" class="table  dt-responsive nowrap" style="width:100%">
                            <thead class="thead-light">
                                <tr>
                                    <th>id</th>
                                    <th>type</th>
                                    <th>Nom d'utilisateur</th>
                                    <th>Prénom</th>
                                    <th>Nom de famille</th>
                                    <th>Département</th>
                                    <th>Statut</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody class="table-bordered"></tbody>
                        </table>



                        <!-- Les lignes d'utilisateurs seront ajoutées dynamiquement ici -->
                        </tbody>
                        </table>


                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
            <!-- /.col -->
        </div>
        <!-- /.row -->

    </div>
    <!-- /.container-fluid -->
</section>
<!-- /.content -->
<!-- ADD Revendeur Modal -->
@include('interfaces.digitalAccounts.modals.revendeur.addRevendeur')
<!-- Edit Revendeur Modal -->
@include('interfaces.digitalAccounts.modals.revendeur.editRevendeur')
<!-- Activate Revendeur Modal -->
@include('interfaces.digitalAccounts.modals.revendeur.activateRevendeur')
<!-- Desactivate Revendeur Modal -->
@include('interfaces.digitalAccounts.modals.revendeur.desactivateRevendeur')
@endsection
@section('script')
    <script rel="javascript" src="{{ asset('assets/js/accounts/listrevendeur.js') }}"></script>
@endsection