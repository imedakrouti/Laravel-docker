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

                        <h3 style="color: #6666FF;" class="card-title"> <i class="fa fa-university" aria-hidden="true" style="color: #64D7C1;"></i> Les Salariés</h3>
                    </div>
                    <!-- /.card-header -->

                    <div class="card-body">
                        <button id="openModalBtnsal" style='max-width: 100%;margin-bottom: 1%;' type="button" class="btn btn-outline-primary"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter Salarié</button>
                        <style>

                        </style>


                        <table id="usersTablesal" class="table  dt-responsive nowrap" style="width:100%">
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
<!-- ADD Salarie Modal -->
@include('interfaces.digitalAccounts.modals.salarie.addSalarie')
<!-- Edit Salarie Modal -->
@include('interfaces.digitalAccounts.modals.salarie.editSalarie')
<!-- Activate Salarie Modal -->
@include('interfaces.digitalAccounts.modals.salarie.activateSalarie')
<!-- Desactivate Salarie Modal -->
@include('interfaces.digitalAccounts.modals.salarie.desactivateSalarie')
@endsection
@section('script')
    <script rel="javascript" src="{{ asset('assets/js/accounts/listsalarie.js') }}"></script>
@endsection