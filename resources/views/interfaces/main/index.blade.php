<!DOCTYPE html>
<html lang="en">
<head>
<title>DataForEthic</title>
 <!-- Font Awesome -->
 <link rel="stylesheet" href="{{ asset('assets/plugins/fontawesome-free/css/all.min.css') }}">
<!-- Theme style -->
<link rel="stylesheet" href="{{ asset('assets/css/adminlte.min.css') }}">
<!-- Main style -->
<link rel="stylesheet" href="{{ asset('assets/css/main.css') }}">
<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- Bootstrap 4 -->
 <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body class="hold-transition sidebar-mini">
<header>
@php
$cardClass='';
$cardClassP='';
$cardClassS='';
@endphp    
@if(session('user')['role']== 'admin' || session('user')['role']== 'admingr')
@php
$cardClass = 'card';
@endphp
@else
@php
$cardClass = 'card-disabled';
@endphp
@endif  
@if(session('user')['role']== 'admin' || session('user')['role']== 'admingp')
@php
$cardClassP = 'card';
@endphp
@else
@php
$cardClassP = 'card-disabled';
@endphp
@endif  
@if(session('user')['role']== 'admin' || session('user')['role']== 'admings')
@php
$cardClassS = 'card';
@endphp
@else
@php
$cardClassS = 'card-disabled';
@endphp
@endif       
         
                <!-- Navbar -->
                <nav class="navbar navbar-expand-lg navbar-dark">
                    <!-- Left navbar links -->
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <span style=" font-size: 18px;" class="navbar-text text-white">DataForEthic</span>
                        </li>
                    </ul>
    
                    <!-- Right navbar links -->
                    <ul class="navbar-nav ml-auto">
                        <!-- User Panel -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src="{{ asset('img/avatar5.png') }}" class="img-circle elevation-2" alt="User Image" style="width: 30px; height: 30px; object-fit: cover; margin-right: 5px;">
                                <span class="d-none d-sm-inline">
                                @if(session('user'))
                                {{ session('user')['username'] }}
                                @else
                                Guest
                                @endif
                                </span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                <a class="dropdown-item" href="/logout">
                                    <i class="fas fa-sign-out-alt mr-2"></i>Se déconnecter
                                </a>
                            </div>
                        </li>
                    </ul>
                </nav>
                <!-- Content goes here -->
    </header>
    <!-- MAIN CONTENT-->
<div class="main-content">
    <div class="section__content section__content--p30">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="admin-panel">
              
                    <img class="navbar-logo" src="{{ asset('img/Iconesvg.svg') }}" alt="DataForEthic Logo">
                        <h2 class="title-1">
                        <!-- class="icon-spin" -->
                        <span style="color:64D7C1" ></i></span><span style="color:6666FF">&nbsp;Panneau d'administration &nbsp;</span><span style="color:64D7C1" ></span>
                        </h2>
                       
                        <div class="card-container">
                        @if(session('user')['role']== 'admin' || session('user')['role']== 'admingr')
                        
                        @else
                        @endif
                            <div class="card">
                                    <a href="/rules" class="card-link">
                                        <i class="fas fa-cogs"></i>
                                        <h2>Gestion des règles</h2>
                                    </a>
                            </div>


                            <div class="card">
                                    <a href="/profils" class="card-link">
                                        <i class="fas fa-user"></i>
                                        <h2>Gestion des profils</h2>
                                    </a>
                        
                            </div>


                            <div class="card">
                                    <a href="/accounts/manager" class="card-link">
                                        <i class="fas fa-suitcase"></i>
                                        <h2>Gestion de comptes Netethic</h2>
                                    </a>
                              
                            </div>


                            <div class="card">
                                    <a href="/support" class="card-link">
                                        <i class="fas fa-envelope"></i>
                                        <h2>Contact & Support Netethic</h2>
                                    </a>
                             
                            </div>


                            <div class="card">
                                    <a href="/digital/responsable" class="card-link">
                                        <i class="fas fa-suitcase"></i>
                                        <h2>Gestion de comptes Digitalethic</h2>
                                    </a>
                            </div>

                            <div class="card-disabled">
                                    <!-- <a href="#" class="card-link"> -->
                                        <i class="fas fa-envelope"></i>
                                        <h2>Contact & Support Digitalethic</h2>
                                    <!-- </a> -->
                            </div>

                        </div>

                    </div>

                    <!-- Add the Font Awesome CDN link in the head section of your HTML document -->
                    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
                </div>
            </div>
        </div>
    </div>
</div>
    <!-- Footer -->
    @include('partial.footer') 

</body>
</html>