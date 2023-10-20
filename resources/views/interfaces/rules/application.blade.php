@extends('layouts.mainLayout')

@section('content')
<!-- Main content -->
<section class="content">

    <div class="container-fluid">

        <div class="row">

            <div class="col-12">
                <div>
                <div class="card-header">
                        <h3 style="color: #6666FF;" class="card-title"> <i class="fas fa-cogs" aria-hidden="true"
                                style="color: #64D7C1;"></i> Les applications</h3>
                    </div>
                    <div class="card-body">
                    <div class="row">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-body">
                                        <table id="echantillonsTable" class="table dt-responsive nowrap"
                                            style="width:100%">
                                            <caption></caption>
                                            <span>Liste des échantillons </span>
                                            <thead class="thead-light">
                                                <tr>
                                                    <th>id</th>
                                                    <th>Nom échantillon</th>
                                                    <th>Date de création</th>
                                                    <th>Contexte</th>
                                                    <!-- <th>Actions</th> -->
                                                </tr>
                                            </thead>
                                            <tbody class="table-bordered"></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                            <div class="card">
                                    <div class="card-body">
                                    <div class="d-flex justify-content-center align-items-center">
    <button class="btn btn-outline-primary" onclick="openTab('service')" id="serviceButton">Service</button>
    <div class="mx-2"></div>
    <button class="btn btn-outline-primary" onclick="openTab('concept')" id="conceptButton">Concept</button>
    <div class="mx-2"></div>
    <button class="btn btn-outline-primary" onclick="openTab('qualification')" id="qualificationButton">Qualification</button>
</div>
<div id="service" class="tab">
                                            <table id="serviceTable" class="table dt-responsive nowrap"
                                            style="width:100%">
                                            <caption></caption>
                                            <button id="applyservice" class="btn btn-outline-primary mr-3 mb-4"><i class="fa fa-plus-circle" aria-hidden="true"></i>Appliquer les services</button>
                                            <p></p> 
                                            <span>Liste des services </span>
                                          
                                            <thead class="thead-light">
                                                <tr>
                                                    <th>Nom Service</th>
                                                    <th>Statut</th>
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
<div id="concept" class="tab">
                                           
                                           <!-- <div class="card"> -->
                                               <!-- <div class="card-body"> -->
                                                   <table id="conceptTable" class="table dt-responsive nowrap"
                                                       style="width:100%">
                                                       <caption></caption>
                                                       
                                                       <button type="button"
                                                       class="btn btn-outline-primary mr-3 mb-4"
                                                       data-bs-target="#apply" id="apply">
                                                       <i class="fa fa-plus-circle"></i> Appliquer le concept 
                                                   </button>
                                                   <p></p> 
                                                       <span>Liste des Concepts</span>
                                                       <thead class="thead-light">
                                                           <tr>
                                                               <th>ID</th>
                                                               <th>Nom Concept</th>
                                                               <th>Description</th>
                                                               <th>Type</th>
                                                           </tr>
                                                       </thead>
                                                       <tbody class="table-bordered"></tbody>
                                                   </table>
                                               <!-- </div> -->
                                           <!-- </div> -->
                                       </div>
                                       <div id="qualification" class="tab">
                                           <!-- <h2>Contenu de la Qualification</h2> -->
                                         
                                           <!-- <div class="card"> -->
                                               <!-- <div class="card-body"> -->
                                                   <table id="qualificationTable" class="table dt-responsive nowrap"
                                                       style="width:100%">
                                                       <caption></caption>
                                                       <button type="button"
                                                       class="btn btn-outline-primary mr-3 mb-4"
                                                       data-bs-target="#applyQ" id="applyQ">
                                                       <i class="fa fa-plus-circle"></i> Appliquer la qualification
                                                   </button>
                                                   <p></p> 
                                                       <span>Liste des qualifications</span>
                                                       <thead class="thead-light">
                                                           <tr>
                                                               <th>ID</th>
                                                               <th>Qualité</th>
                                                               <th>Min score context</th>
                                                               <th>Max score context</th>
                                                               <th>Date de création </th>
                                                               <th>Nom concept</th>
                                                           </tr>
                                                       </thead>
                                                       <tbody class="table-bordered"></tbody>
                                                   </table>
                                               <!-- </div> -->
                                           <!-- </div> -->
                                       </div>
                                
                                   </div>
</div> 
<div class="col-md-12">

<div class="card-body">
    <div class="text-center">
        <form class="col g-3 needs-validation" novalidate>
            <div class="col-md-6" hidden>
                <label for="sample" class="form-label">Nom sample</label>
                <input type="text" min=1 class="form-control" id="getsample"
                    name="getsample" value="">
                <div class="invalid-feedback">
                    Veuillez selectionnez un sample.
                </div>
            </div>
            <div>

                <div class="col-md-6" hidden>
                    <label for="concept" class="form-label">Nom concept</label>
                    <input type="text" min=1 class="form-control" id="getconcept"
                        name="getconcept" value="" >
                
                </div>
                <div class="col-md-6" hidden>
                    <label for="service" class="form-label">Nom Service</label>
                    <input type="text" min=1 class="form-control" id="getservice"
                        name="getservice" value="" >
                
                </div>

        </form>


    </div>

</div>
</div>  
<div class="col-md-12">
                            <div class="card">
                                <div class="card-body">
                                    <table id="applyTab" class="table dt-responsive nowrap" style="width:100%">
                                        <caption></caption>

                                        <span>Liste des applications des services  </span>
                                        <table id="applyServiceTab" class="table dt-responsive nowrap" style="width:100%">
                                            <caption></caption>

                                            <!-- <span>Liste des applications : échantillons par concepts </span> -->
                                            <thead class="thead-light">
                                                <tr>
                                                    <th>Contenu des données</th>
                                                    <th>Nom Service</th>
                                                    <th>Nom Label</th>
                                                    <th>Valeur</th>
                                                </tr>
                                            </thead>
                                            <tbody id="responseServiceTableBody">
                                            </tbody>
                                        </table>

                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body">
                                    <table id="applyTab" class="table dt-responsive nowrap" style="width:100%">
                                        <caption></caption>

                                        <span>Liste des applications </span>
                                        <table id="applyTab" class="table dt-responsive nowrap" style="width:100%">
                                            <caption></caption>

                                            <!-- <span>Liste des applications : échantillons par concepts </span> -->
                                            <thead class="thead-light">
                                                <tr>
                                                    <th hiden>ID</th>
                                                    <!-- <th>Sample ID</th>
                                                    <th>Concept ID</th> -->
                                                    <th>Score</th>
                                                    <th>Nombre de données</th>
                                                    <th>NB données concernées</th>
                                                    <th>Valeur_logique</th>
                                                    <th>Ressource_id</th>
                                                    <th>Ressource_type_id</th>
                                                </tr>
                                            </thead>
                                            <tbody id="responseTableBody">
                                            </tbody>
                                        </table>

                                    </table>
                                </div>
                            </div>
                        </div>
</div>
</div>
</div>
</div> 
</section>
@endsection
<!-- /.content -->
@section('script')
    <script rel="javascript" src="{{ asset('assets/js/rules/applications.js') }}"></script>
@endsection