
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>DataForEthic | Log in </title>
  <link rel="stylesheet" href="{{ asset('assets/css/login.css') }}">
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{{ asset('assets/plugins/fontawesome-free/css/all.min.css') }}">
  <!-- icheck bootstrap -->
  <link rel="stylesheet" href="{{ asset('assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css') }}">
 <!-- Theme style -->
 <link rel="stylesheet" href="{{ asset('assets/css/adminlte.min.css') }}">  
</head>
<div id="gradient-overlay"></div>
<div class="login-pages">
<div class="login-box">
  <!-- /.login-logo -->
  <div class="card card-outline card-info">
 
    <div class="card-header text-center">
    <img src="{{ asset('img/logosvg.svg') }}" alt="DataForEthic Logo" style="width:200px">
  
    </div>
 
    <div class="card-body">

      <p class="login-box-msg">Restez en contact avec vos profils.</p>
      @if (session('message'))
    <div class="alert">{{ session('message') }}</div>
@endif
      <form method="POST" action="{{ route('login') }}" id="login-form">
      @csrf
        <div class="input-group mb-3">
          <input type="text" id="username" name="username"class="form-control" placeholder="UserName" value="{{ old('username') }}">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" id="password" name="password"class="form-control" placeholder="Password" value="{{ old('password') }}">
          <div class="input-group-append">
            <div class="input-group-text">
              <span id='lockIcon' class="fas fa-lock"></span>
            </div>
          </div>
        </div>
       
        <div>
        <button type="submit" name="login"class="btn btn-xxxx btn-block"><i class="fas fa-sign-in-alt mr-2"></i></i>se connecter</button>
 
          </div>
      </form>
      
      <!-- /.social-auth-links -->
    </div>
    
    <!-- /.card-body -->
  </div>
  
  <!-- /.card -->
</div>

<!-- /.login-box -->

</div>
@include('partial.footer') 
<script src="{{ asset('assets/plugins/jquery-validation/jquery.validate.min.js') }}"></script>
<script src="{{ asset('assets/plugins/jquery-validation/additional-methods.min.js') }}"></script>
<script src="{{ asset('assets/js/login/login.js') }}"></script>
</html>
