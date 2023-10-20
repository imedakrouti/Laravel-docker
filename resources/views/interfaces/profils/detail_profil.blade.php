@extends('layouts.mainLayout')
@section('styles')
    <link rel="stylesheet" href="{{ asset('assets/css/accounts.css') }}">
@endsection
@section('content')
<section class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card card-outline card-primary">
                    <div class="card-header border-0">
                    <div class="card-tools">
                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                        <i class="fas fa-minus"></i>
                        </button>
                        </div>
                        <h3 class="font-weight-bold text-primary">Information de base</h3>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body my-2">
                        <div class="row">
                            <div class="col-md-2 border-right text-center">
                                <div class="">
                                    <img class="img-circle" alt="" src="{{ asset('assets/img/blank.png') }}" width="100" height="100">
                                </div>
                                <div class="user-info mt-2">
                                    <h4 class="text-capitalize"></h3>
                                        <h4 class="text-muted font-weight-bolder-400"></h4>
                                </div>
                            </div>
                            <hr>
                            <div class="col-md-10 pl-4">
                                <div class="row">
                                    <div class="col-md-5 border-right">
                                        <h3 class="text-muted">Date de naissance :</h3>
                                        <h4><i class="rounded-icon fas fa-birthday-cake fa-xs mr-1 text-center text-light bg-primary"></i> <span id='dateNaissanceDetailProfil'></span> </h4>
                                    </div>
                                    <div class="col-md-7 border-right">
                                        <h3 class="text-muted">E-mail :</h3>
                                        <h4><i class="rounded-icon fas fa-envelope fa-xs mr-1 text-center text-light bg-primary"></i> <span id='emailDetailProfil'></span></h4>
                                    </div>
                                    <!-- <div class="col-md-3 pl-3">
                                        <h3 class="text-muted">Telephone :</h3>
                                        <h4><i class="rounded-icon fas fa-phone-alt fa-xs mr-1 text-center text-light bg-primary"></i></h4>
                                    </div> -->
                                    <div class="col-md-12 mt-3">
                                        <h3 class="text-muted">Adresse :</h3>
                                        <h4><i class="rounded-icon fas fa-map-marker-alt fa-xs mr-1 text-center text-light bg-primary"></i><span id='adressDetailProfil'></span></h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- /.card-body -->
            </div>
            <!-- /.card -->
        </div>
        <!-- /.col -->
    </div>
    <!-- /.row -->
    <div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="card card-outline card-primary">
                <div class="card-header border-0">
                <div class="card-tools">
                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                        <i class="fas fa-minus"></i>
                        </button>
                        </div>
                    <h3 class=" text-primary font-weight-bolder"></i>Réseau Sociaux</h3>
                    
                </div>
                <!-- /.card-header -->
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                        <ul class="list-group-flush" id="socialMediaLinks">

                        </ul>
                  

                            
                        </div>
                    </div>

                </div>
            </div>
            <!-- /.card-body -->
        </div>
        <!-- /.card -->

    </div>
    </div>
    </div>
    <!-- /.container-fluid -->
</section>


@endsection
@section('script')
    <script rel="javascript" src="{{ asset('assets/js/profil/detailprofil.js') }}"></script>
@endsection