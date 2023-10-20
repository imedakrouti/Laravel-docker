
<!-- jQuery -->
<script src="{{ asset('assets/plugins/jquery/jquery.min.js') }}"></script>
<script src="{{ asset('assets/plugins/jquery-ui/jquery-ui.min.js') }}"></script>
<!-- AdminLTE App -->
<script src="{{ asset('assets/js/dashboard/adminlte.js') }}"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
<script src= "{{ asset('assets/plugins/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
<script src= "{{ asset('assets/plugins/datatables/jquery.dataTables.min.js') }}"></script>
<script src= "{{ asset('assets/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js') }}"></script>
<script src= "{{ asset('assets/plugins/datatables-responsive/js/dataTables.responsive.min.js') }}"></script>
<script src= "{{ asset('assets/plugins/datatables-responsive/js/responsive.bootstrap4.min.js') }}"></script>
<script src= "{{ asset('assets/plugins/datatables-buttons/js/dataTables.buttons.min.js') }}"></script>
<script src= "{{ asset('assets/plugins/datatables-buttons/js/buttons.html5.min.js') }}"></script>
<script src= "{{ asset('assets/plugins/bs-custom-file-input/bs-custom-file-input.js') }}"></script>
<script src= "{{ asset('assets/plugins/bs-custom-file-input/bs-custom-file-input.min.js') }}"></script>
<script src= "{{ asset('assets/plugins/select2/js/select2.full.min.js') }}"></script>
<script src= "{{ asset('assets/plugins/toastr/toastr.min.js') }}"></script>
<script src= "{{ asset('assets/plugins/jquery-validation/jquery.validate.min.js') }}"></script>
<script src= "{{ asset('assets/plugins/jquery-validation/additional-methods.min.js') }}"></script>
<script src= "{{ asset('assets/plugins/sweetalert2/sweetalert2.min.js') }}"></script>
<script>
    $(document).ready(function() {
        $('.nav-item.menu-open').parents('.nav-item').addClass('menu-open');
        $('.nav-item .nav-link.active').parents('.nav-item').addClass('menu-open');
    });
</script>
<script>
    const WEBSERVER_URL="{{ env('WEBSERVER_URL') }}"
    const WEBSERVERD_URL="{{ env('WEBSERVERD_URL') }}"
    const WEBSERVERRules_URL ="{{ env('WEBSERVERRules_URL') }}"
    const CRAWLSERVER_URL ="{{ env('CRAWLSERVER_URL') }}"
    const PROFIL_SEARCH_URL ="{{ env('PROFIL_SEARCH_URL') }}"
</script>
<script src= "{{ asset('assets/js/profil/function.js') }}"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>