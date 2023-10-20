<nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <!-- Left navbar links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
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