@extends('layouts.mainLayout')
@section('styles')
    <link rel="stylesheet" href="{{ asset('assets/css/accounts.css') }}">
@endsection
@section('content')
<!-- Main CONTENT -->
<section class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">

                        <h3 style="color: #6666FF;" class="card-title"><i class="fa fa-user" aria-hidden="true" style="color: #64D7C1;"></i> Les Parents</h3>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <button id="openModalBtnp" style='max-width: 100%;margin-bottom: 1%' type="button" class="btn btn-outline-primary"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter Parent</button>

                        <table id="usersTablep" class="table dt-responsive nowrap" style="width:100%">
                        <caption> </caption>
                            <thead class="thead-light">
                                <tr>
                                    <th>Nom d'utilisateur</th>
                                    <th>Prénom</th>
                                    <th>Nom de famille</th>
                                    <th>Email</th>
                                    <th>Rôle</th>
                                    <th>Date de naissance</th>
                                    <th>Date de création</th>
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
<!-- ADD Manager Modal -->
@include('interfaces.accounts.modals.parent.addParent')
<!-- Edit Manager Modal -->
@include('interfaces.accounts.modals.parent.editParent')
<!-- Activate Manager Modal -->
@include('interfaces.accounts.modals.parent.activateParent')
<!-- Desactivate Manager Modal -->
@include('interfaces.accounts.modals.parent.desactivateParent')
@endsection
@section('script')
    <script rel="javascript" src="{{ asset('assets/js/accounts/listparents.js') }}"></script>
@endsection