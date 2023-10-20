@extends('layouts.mainLayout')
@section('styles')
    <link rel="stylesheet" href="{{ asset('assets/css/contact.css') }}">
@endsection
@section('content')
<!-- Main content -->
<section class="content">
<div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">

<h3 style="color: #6666FF;" class="card-title"> <i class="fa fa-address-card" aria-hidden="true" style="color: #64D7C1;"></i> Les coordonnées</h3>
</div>   
<div class="card-body">
                   
                   <button type="button" id="addCoordinateButton" data-toggle="modal" style='max-width: 100%;margin-bottom: 5%' data-target="#addModalcoo" class="btn btn-outline-primary"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter Coordonnée</button>
                   <table id="coordinatTable" class="table dt-responsive nowrap" style="width:100%">
                   <thead class="thead-light">

                           <tr>
                           <th>id</th>
                               <th>Email</th>
                               <th>Télephone</th>
                               <th>Adresse</th>
                               <th>Pays</th>
                               <th>Actions</th>
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
<!-- /.content -->
<!-- ADD Coordinate Modal -->
@include('interfaces.support.modals.coordonnees.addCoordoonee')
<!-- DELETE Coordinate Modal -->
@include('interfaces.support.modals.coordonnees.deleteCoordoonee')
<!-- Edit Coordinate Modal -->
@include('interfaces.support.modals.coordonnees.editCoordoonee')
@endsection
@section('script')
    <script rel="javascript" src="{{ asset('assets/js/supports/coordinate.js') }}"></script>
@endsection