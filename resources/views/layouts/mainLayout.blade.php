<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>DataForEthic</title>
    <!-- FaviIcon -->
    <link rel="shortcut icon" href="../assets/img/favicon.ico" type="image/x-icon">
    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- DataTables -->
    <link rel="stylesheet" href="{{ asset('assets/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/plugins/datatables-responsive/css/responsive.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/plugins/datatables-buttons/css/buttons.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/plugins/datatables-buttons/css/buttons.bootstrap4.min.css') }}">
    <!-- SweetAlert -->
    <link rel="stylesheet" href="{{ asset('assets/css/sweetalert2.min.css') }}">
    <!-- Theme style -->
    <link rel="stylesheet" href="{{ asset('assets/css/adminlte.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/adminlte.min.css') }}">
    <!-- Import style -->
    @yield('styles')
    <!-- icheck bootstrap -->
    <link rel="stylesheet" href="{{ asset('assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/plugins/toastr/toastr.min.css') }}">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{ asset('assets/plugins/fontawesome-free/css/all.min.css') }}">
</head>

<body class="hold-transition sidebar-mini">
    <div class="wrapper">
        <!-- Navbar -->
           @include('partial.header') 

        <!-- /.navbar -->
        <!-- Main Sidebar Container -->
        <aside class="main-sidebar sidebar-light-transparent elevation-4">
            <a href="/main" class="brand-link">
            <img src="{{ asset('img/dataforethique.png') }}" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
            <span class="brand-text font-weight-bold"><span class="text-primary">DataForEthic </span></span>
            </a>
            <!-- Sidebar -->
            @include('partial.sidebar') 

            <!-- /.sidebar -->
        </aside>

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                    </div>
                </div>
                <!-- /.container-fluid -->
            </section>
        <!-- Main Container -->
           <section class="content">
               <div class="container-fluid">
                   <div class="row">
                        <div class="col-12">
                        @yield('content')
                        </div>
                    </div>
                </div>
                </div>
           </section>
        <!-- End Main Container -->

@include('partial.footer')
@include('partial.footerScript')
</body>
@yield('script')
</html>