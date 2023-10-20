
<div class="sidebar">
    <!-- Sidebar Menu -->
    <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <!-- Add icons to the links using the .nav-icon class
                   with font-awesome or any other icon font library -->
            <li class="nav-item">
                <a href="{{ route('main') }}" class="nav-link">
                    <i class="fas fa-home text-red" aria-hidden="true"></i>
                    <p>
                        Menu Principal
                    </p>
                </a>
            </li>
            <li class="nav-header">  
            <span style="background-color: initial" class="nav-link">
            <h5 class="font-weight-bold d-flex align-items-center"> <img src="{{ asset('img/netethic.png') }}" class="mr-1"alt="User Image" style="width:20px;"> Netethic </h5>
                    <!-- <i class="right fas fa-angle-left"></i> -->
                </span>
            </li>
            <li class="nav-item">
                <a class="nav-link">
                    <i class="fas fa-cog text-orange"></i>
                    <p> Gestion Règles
                    <i class="right fas fa-angle-left"></i>
                    </p>
                </a>
                <ul class="nav nav-treeview">
                
                    <li class="nav-item">
                        <a href="{{ route('rules_concept') }}" class="nav-link {{ checkRouteIsActive('rules_concept') }}">
                        <i class="fa-solid fa-pen" style="color: #fdd33a;"></i>
                            <p>
                                Concept
                            </p>
                        </a>
                    </li>

    <!-- new -->
    <li class="nav-item">
                <a class="nav-link">
                    <!-- <i class="fas fa-cog text-orange"></i> -->
                    <i class="fas fa-stream" style="color: #f58924;"></i>
                    <p> Groupe des Règles
                    <i class="right fas fa-angle-left"></i>
                    </p>
                </a>
                <ul class="nav nav-treeview">
                    <li class="nav-item ">
                        <a href="{{ route('rules') }}" class="nav-link {{ checkRouteIsActive('rules') }}" >
                        <i class="fa-solid fa-book" style="color: #d84818;"></i>
                            <p>
                            Règles
                            </p>
                        </a>
                    </li>


                    <li class="nav-item">
                        <a href="{{ route('rules_complex') }}" class="nav-link {{ checkRouteIsActive('rules_complex') }}">
                        <i class="fa-solid fa-pen-ruler" style="color: #256fef;"></i>
                            <p>
                            Règles Complexes 
                            </p>
                        </a>
                    </li>
                    
                </ul>
            </li>
                    <li class="nav-item ">
                        <a href="{{ route('rules_formule') }}" class="nav-link {{ checkRouteIsActive('rules_formule') }}">
                        <i class="fa-solid fa-pen-to-square" style="color: #34da5e;"></i>
                         <p>
                                Formule
                            </p>
                        </a>
                    </li>

                    <li class="nav-item ">
                        <a href="{{ route('rules_clauses') }}" class="nav-link {{ checkRouteIsActive('rules_clauses') }}">
                            <i class="fa-solid fa-file-lines" style="color: #86b2fd;"></i>
                            <p>
                                Clause
                            </p>
                        </a>
                    </li>
                    <li class="nav-item ">
                        <a href="{{ route('rules_echantillons') }}" class="nav-link {{ checkRouteIsActive('rules_echantillons') }}">
                            <i class="fas fa-cut fa-sm text-red"></i>
                            <p>
                            Échantillons
                            </p>
                        </a>
                    </li>
                    <li class="nav-item ">
                        <a href="{{ route('rules_application') }}" class="nav-link {{ checkRouteIsActive('rules_application') }}">
                        <i class="fas fa-cogs text-red"></i> 
                            <p>
                            Application
                            </p>
                        </a>
                    </li>
                 
            <!-- new -->
                </ul>
            </li>
            <li class="nav-item">
                <a class="nav-link">

                    <i class="fas fa-address-book text-green" aria-hidden="true"></i>
                    <p> Gestion comptes 
                    <i class="right fas fa-angle-left"></i>
                    </p>
                </a>
                <ul class="nav nav-treeview">
                    <li class="nav-item">
                        <a href="{{ route('manager') }}" class="nav-link {{ checkRouteIsActive('manager') }}">
                            <i class="fa fa-university text-blue" aria-hidden="true"></i>
                            <p>
                                Comptes Manager
                            </p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{ route('parent') }}" class="nav-link {{ checkRouteIsActive('parent') }}">
                            <i class="fa fa-user text-green" aria-hidden="true"></i>
                            <p>
                                Comptes Parent
                            </p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{ route('child') }}" class="nav-link {{ checkRouteIsActive('child') }}">
                            <i class="fa fa-child text-orange" aria-hidden="true"></i>
                            <p>
                                Comptes Enfant
                            </p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link ">
                            <i class="fas fa-chart-pie text-yellow" aria-hidden="true"></i>
                            <p>
                                Statistiques
                            </p>
                        </a>
                    </li>

                </ul>
            </li>
            <li class="nav-item">
                <a href="{{ route('profiles') }}" class="nav-link {{ checkRouteIsActive('profiles') }}">
                    <i class="fas fa-users fa-sm text-blue"></i>
                    <p>
                        Gestion Profiles
                    </p>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link">
                    <i class="fas fa-question-circle text-yellow" aria-hidden="true"></i>
                    <p> Aide et Support
                    <i class="right fas fa-angle-left"></i>
                    </p>
                </a>
                <ul class="nav nav-treeview">
                    <li class="nav-item">
                        <a href="{{ route('support') }}" class="nav-link {{ checkRouteIsActive('support') }}">
                            <i class="fa fa-life-ring text-blue" aria-hidden="true"></i>
                            <p>
                                Support
                            </p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{ route('coordoonee') }}" class="nav-link {{ checkRouteIsActive('coordoonee') }}">
                            <i class="fa fa-address-card text-green" aria-hidden="true"></i>

                            <p>
                                Coordonnées
                            </p>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a href="{{ route('contact') }}"  class="nav-link {{ checkRouteIsActive('contact') }}">
                            <i class="fa fa-envelope text-yellow" aria-hidden="true"></i>

                            <p>
                                Contact
                            </p>
                        </a>
                    </li>
                </ul>
            </li>
        </li>
        


        <li class="nav-header">
        <span style="background-color: initial" class="nav-link">
        <h5 class="d-flex align-items-center font-weight-bold"> <img src="{{ asset('img/digitalethic.png') }}" class="mr-1"alt="User Image" style="width:20px;"> Digitalethic </h5>
                    <!-- <i class="right fas fa-angle-left"></i> -->
                </span>
        </li>
       
        <li class="nav-item">
            <a class="nav-link">
                <i class="fas fa-address-book text-green" aria-hidden="true"></i>
                <p> Gestion comptes 
                <i class="right fas fa-angle-left"></i>
                </p>
            </a>
            <ul class="nav nav-treeview">
                <li class="nav-item">
                    <a href="{{ route('responsable') }}" class="nav-link {{ checkRouteIsActive('responsable') }}">
                        <i class="fa fa-university text-blue" aria-hidden="true"></i>
                        <p>
                            Comptes Responsable
                        </p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('revendeur') }}" class="nav-link {{ checkRouteIsActive('revendeur') }}">
                        <i class="fa fa-user text-green" aria-hidden="true"></i>
                        <p>
                            Comptes Revendeur
                        </p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('salarie') }}" class="nav-link {{ checkRouteIsActive('salarie') }}">
                        <i class="fa fa-child text-orange" aria-hidden="true"></i>
                        <p>
                            Comptes Salarié
                        </p>
                    </a>
                </li>        
            </ul>
        </li>
        </ul>
    </nav>
    <!-- /.sidebar-menu -->
</div>