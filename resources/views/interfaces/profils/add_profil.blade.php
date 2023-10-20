@extends('layouts.mainLayout')
@section('styles')
    <link rel="stylesheet" href="{{ asset('assets/css/accounts.css') }}">
@endsection
@section('content')
<section class="content">
        <div class="container-fluid custom-style">
            <!-- general form elements -->
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title"><i class="fa fa-comments" aria-hidden="true"></i> Ajouter les Réseaux sociaux</h3>
                    
                </div>
            <div class="card-body">
            <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="tab1-tab" data-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">Recherche automatique</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="tab2-tab" data-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false">Recherche manuelle</a>
                        </li>
                    </ul>
            <div class="tab-content">
                    <!-- Tab 1 form -->
                    <div class="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                        <form id="search-form">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <h5>Nom et prénom</h5>
                                            <input type="text" class="form-control" name="name" id="name" required>
                                            <input type="hidden" name="firstname" id="firstname" required>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <h5>Lieux</h5>
                                            <input type="text" class="form-control" name="address" id="address" required>
                                        </div>
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label for="exampleInputFile">
                                                <h5>Photo de l'enfant</h5>
                                            </label>
                                            <div class="input-group">
                                                <div class="custom-file">
                                                    <input type="file" class="custom-file-input" name="image" id="image" accept="image/*">
                                                    <label class="custom-file-label" for="exampleInputFile">Choisissez le fichier</label>
                                                </div>
                                                <button type="submit" id="search-btn" class="btn btn-outline-primary" style="padding: 0.375rem 1.75rem;">
                                                    Rechercher
                                                </button>


                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="col-sm-4">
                            
                        </div> -->
                                </div>

                                <div>
                                    <div style="margin-top:10px">

                                        <ul class="nav nav-tabs" id="custom-content-below-tab" role="tablist">
                                            <!-- <li class="nav-item">

                                                <a class="nav-link" id="tout-tab" data-toggle="pill" href="#tout-results" role="tab" aria-controls="tout-results" aria-selected="false"> TOUT</a>
                                            </li> -->
                                            <li class="nav-item">

                                                <a class="nav-link" id="twitter-tab" data-toggle="pill" href="#twitter-results" role="tab" aria-controls="twitter-results" aria-selected="false"><i class="fab fa-twitter"></i> twitter</a>
                                            </li>
                                            <li class="nav-item">

                                                <a class="nav-link" id="instagram-tab" data-toggle="pill" href="#instagram-results" role="tab" aria-controls="instagram-results" aria-selected="false"><i class="fab fa-instagram"></i> Instagram</a>
                                            </li>
                                            <li class="nav-item">

                                                <a class="nav-link" id="facebook-tab" data-toggle="pill" href="#facebook-results" role="tab" aria-controls="facebook-results" aria-selected="false"><i class="fab fa-facebook"></i> Facebook</a>
                                            </li>
                                            <li class="nav-item">

                                                <a class="nav-link" id="youtube-tab" data-toggle="pill" href="#youtube-results" role="tab" aria-controls="youtube-results" aria-selected="false"><i class="fab fa-youtube"></i> Youtube</a>
                                            </li>
                                            <li class="nav-item">

                                                <a class="nav-link" id="pinterest-tab" data-toggle="pill" href="#pinterest-results" role="tab" aria-controls="pinterest-results" aria-selected="false"><i class="fab fa-pinterest"></i> pinterest</a>
                                            </li>
                                            <li class="nav-item">

                                                <a class="nav-link" id="reddit-tab" data-toggle="pill" href="#reddit-results" role="tab" aria-controls="reddit-results" aria-selected="false"><i class="fab fa-reddit"></i> Reddit</a>
                                            </li>
                                            <li class="nav-item">

                                                <a class="nav-link" id="gamespot-tab" data-toggle="pill" href="#gamespot-results" role="tab" aria-controls="gamespot-results" aria-selected="false"><i class="fab fa-g"></i> gamespot</a>
                                            </li>
                                            <li class="nav-item">

                                                <a class="nav-link" id="tumblr-tab" data-toggle="pill" href="#tumblr-results" role="tab" aria-controls="tumblr-results" aria-selected="false"><i class="fab fa-tumblr"></i> Tumblr</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content">
                                         
                                            <div class="tab-pane fade" id="twitter-results" role="tabpanel" aria-labelledby="twitter-tab">

                                            </div>
                                            <div class="tab-pane fade" id="instagram-results" role="tabpanel" aria-labelledby="instagram-tab">

                                            </div>
                                            <div class="tab-pane fade" id="facebook-results" role="tabpanel" aria-labelledby="facebook-tab">

                                            </div>
                                            <div class="tab-pane fade" id="youtube-results" role="tabpanel" aria-labelledby="youtube-tab">

                                            </div>
                                            <div class="tab-pane fade" id="pinterest-results" role="tabpanel" aria-labelledby="pinterest-tab">

                                            </div>
                                            <div class="tab-pane fade" id="reddit-results" role="tabpanel" aria-labelledby="reddit-tab">

                                            </div>
                                            <div class="tab-pane fade" id="gamespot-results" role="tabpanel" aria-labelledby="gamespot-tab">

                                            </div>
                                            <div class="tab-pane fade" id="tumblr-results" role="tabpanel" aria-labelledby="tumblr-tab">
                                            </div>
                                        </div>
                                    </div>
                                    <!-- /.card -->
                                </div>
                            </div>
                            <!-- /.card-body -->
                            <div class="card-footer">
                                <div class="row">
                                    <div>
                                        <button type="button" id="retour-btn" class="btn btn-outline-secondary cancel" style="padding: 7px 25px;font-size: 20px;border-radius: 10px;">Retour</button>
                                        <button type="button" class="btn btn-outline-primary add-btn" id="add-profile-btn"style="padding: 7px 25px;font-size: 20px;border-radius: 10px;">Ajouter</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!-- Tab 2 form -->
                    <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                        <form id="search-form">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <h5>Réseau social</h5>
                                            <select class="form-control select2" id="social-media-select2" style="width: 100%;">
                                                <option value="">Sélectionnez un réseau social</option>
                                            </select>
                                        </div>
                                        <!-- /.form-group -->
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <h5>Nom d'utilisateur</h5>
                                            <input type="text" class="form-control" name="username-input" id="username-input" required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="row">
                                    <div>
                                        <button type="button" id="retour-btn-manuel" class="btn btn-outline-secondary cancel" style="padding: 7px 25px;font-size: 20px;border-radius: 10px;">Retour</button>
                                        <button type="button" class="btn btn-outline-primary add-btn" id="add-mauelle-btn"style="padding: 7px 25px;font-size: 20px;border-radius: 10px;">Ajouter</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
                <!-- Form container -->
                
            </div>
            <!-- /.card -->

        </div><!-- /.container-fluid -->
    </section>

@endsection
@section('script')
    <script rel="javascript" src="{{ asset('assets/js/profil/addprofil.js') }}"></script>
    <script rel="javascript" src="{{ asset('assets/js/profil/addmanuel.js') }}"></script>
@endsection