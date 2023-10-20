@extends('layouts.mainLayout')
@section('styles')
    <link rel="stylesheet" href="{{ asset('assets/css/accounts.css') }}">
@endsection
@section('content')
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">

            <h3 style="color: #6666FF;" class="card-title"><i class="fas fa-users fa-sm" style="color: #64D7C1;"></i> List Des Enfants</h3>
          </div>
          <!-- /.card-header -->
          <div class="card-body">
            <div class="row mb-2 d-flex justify-content-between align-items-center">
              <div class="col-md-4">
                <label class="col-form-label" for="school-filter">Ecole</label>
                <select id="school-filter" class="form-control">
                  <option value="">Tous</option>
                
                </select>
              </div>
              <div class="col-md-4">
                <label class="col-form-label" for="niveau-filter">Niveau</label>
                <select id="niveau-filter" class="form-control" disabled>

                </select>
              </div>
              <button id="search-child" class="btn btn-outline-primary btn-md mt-4 mr-4" type="submit"><i class="fas fa-search mx-2"></i> Chercher éléve</button>

            </div>
            <div class="row mb-4">
              <div class="col-md-4">
                <label class="col-form-label" for="gender-filter">Genre</label>
                <select id="gender-filter" class="form-control">
                  <option value="">Tous</option>
                  <option value="Masculin">Masculin</option>
                  <option value="Feminin">Feminin</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div class="col-md-4">
                <label class="col-form-label" for="age-filter">Age</label>
                <select id="age-filter" class="form-control">
                  <option value="">Tous</option>
                  <option value="0to12">Moins de 12 ans</option>
                  <option value="12to18">De 12 à 18 ans</option>
                  <option value="gt18">Plus de 18 ans</option>
                </select>
              </div>
              <div class="col-md-4">
                <label class="col-form-label" for="media-filter">Social Média</label>
                <select id="media-filter" class="form-control">
                  <option value="">Tous</option>
                  <option value="has_media">Avec profil media</option>
                  <option value="no_media">Sans profil media</option>
                </select>
              </div>
            </div>
            <table id="myTable" class="table table-data dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
            <caption> </caption>
            <thead class="thead-light">
                <tr class="table-header bg-gray">
               <!--   <th> <button type="button" class="btn btn-default btn-sm checkbox-toggle">
                      <i class="far fa-square"></i>
                    </button></th>-->
                  <th id="#">#</th>
                  <th id="image">Image</th>
                  <th id="nomprenom">Nom et prénom</th>
                  <th id="genre">Genre</th>
                  <th id="age">Âge</th>
                  <th id="rs">Réseaux sociaux</th>
                  <th id="action">Action</th>
                </tr>
              </thead>
              <tbody class="table-bordered">

              <!-- <div id="loader"class="text-center"><i class="fas fa-spinner fa-spin fa-2x"></i> Chargement en cours...</div> -->
              </tbody>
              <tfoot class="thead-light">
                <tr>
                <!--  <th> <button type="button" class="btn btn-default btn-sm checkbox-toggle">
                      <i class="far fa-square"></i>
                    </button>-->
                  </th>
                  <th id="#">#</th>
                  <th id="image">Image</th>
                  <th id="nomprenom">Nom et prénom</th>
                  <th id="genre">Genre</th>
                  <th id="age">Âge</th>
                  <!-- <th>Niveau</th> -->
                  <th id="rs">Réseaux sociaux</th>
                  <th id="action">Action</th>
                </tr>
              </tfoot>
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

@endsection
@section('script')
    <script rel="javascript" src="{{ asset('assets/js/profil/index.js') }}"></script>
@endsection