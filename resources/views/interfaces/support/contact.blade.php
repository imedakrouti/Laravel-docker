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

            <h3 style="color: #6666FF;" class="card-title"> <i class="fa fa-envelope" aria-hidden="true" style="color: #64D7C1;"></i> Les Contacts</h3>
          </div>
          <div class="col-md-4">

            <!-- /.card-header -->
            <br>
            <label for="x">Filtrer par statut:</label>
            <div class="d-flex mt">
              <label for="statusFilter" class="mr"></label>
              <select id="statusFilter" class="form-control">
                <option value="all">Tous les status</option>
                <option value="En Cours">En Cours</option>
                <option value="Résolu">Résolu</option>
              </select>
            </div>
          </div>


          <div class="card-body">


            <!--    <button type="button" id="addContactButton" data-toggle="modal" style='max-width: 100%;margin-bottom: 5%' data-target="#addModalcont" class="btn btn-primary"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter Contact</button>-->
            <table id="contactTable" class="table dt-responsive nowrap" style="width:100%">
              <thead class="thead-light">

                <tr>
                  <th>id</th>
                  <th>Objet</th>
                  <th>Message</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Date de création</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody class="table-bordered"></tbody>
            </table>


            <div id="modal" class="modal1">
              <div class="modal-content">
                <span class="close" onclick="closeModal()">&times;</span>
                <h2 class="modal-title">Détails du Message</h2>
                <p id="modal-message"></p>
              </div>
            </div>

            <script>
              var modal = document.getElementById("modal");
              var modalMessage = document.getElementById("modal-message");

              function openModal(button) {
                document.getElementById("modal").style.visibility = "visible";
                document.getElementById("modal").style.opacity = "1";
                var message = button.getAttribute("data-message");
                modalMessage.innerText = message;
                modal.style.display = "block";
              }

              function closeModal() {
                document.getElementById("modal").style.visibility = "hidden";
                document.getElementById("modal").style.opacity = "0";
                modal.style.display = "none";
              }
            </script>
            <style>
              .view-more {
                color: blue;
                text-decoration: underline;
                cursor: pointer;
              }
            </style>

          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->

  </div>
</section>
<!-- /.content -->
<!-- ADD Contact Modal -->
@include('interfaces.support.modals.contact.addContact')
<!-- DELETE Contact Modal -->
@include('interfaces.support.modals.contact.deleteContact')
<!-- Edit Contact Modal -->
@include('interfaces.support.modals.contact.editContact')
<!-- Reply Form Modal -->
@include('interfaces.support.modals.contact.reply')
<!-- Confirmation Modal -->
@include('interfaces.support.modals.contact.confirmation')
@endsection
@section('script')
    <script rel="javascript" src="{{ asset('assets/js/supports/contact.js') }}"></script>
@endsection