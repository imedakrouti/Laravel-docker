$(document).ready(function () {
  var url = window.location.href;
  var urlParts = url.split('/');
  console.log(urlParts);
  var id = urlParts[urlParts.length - 1];
  console.log(id);
  $.ajax({
    type: 'GET',
    url: WEBSERVER_URL + 'api/childs/' + id,
    contentType: 'application/json; charset=utf-8',
    data: {},
   
    success: function (data) {
      console.log('my child data ',data);
      $('#dateNaissanceDetailProfil').html(`${data.user.birthday}`);
      $('#adressDetailProfil').html(data.adress || '');
      $('#emailDetailProfil').html(data.user.email);
    },
  });
$.ajax({
  url: WEBSERVER_URL + 'api/childs/' + id+'/profiles',
  type: "GET",
  dataType: "json",
  success: function (response) {
    response.map((x)=>{
      var $newLi = $('<li></li>');
      $newLi.addClass('list-group-item d-flex justify-content-between align-items-center');
      $newLi.html(`
      <h2 class='text-capitalize col-md-3'><img src="${urlParts[0]}//${urlParts[2]}/assets/img/${x.social_media}.png" class="mr-3" width=40 height=40 />${x.social_media}</h2>
      <a href="${x.url}" class="profile-link font-weight-bold text-dark h3 col-md-5" target="_blank">${x.pseudo}</a>
      <button class="btn btn-outline-danger delete-profile" data-profile-id="${x.id}">Supprimer le profil</button>
      `);
      $("#socialMediaLinks").append($newLi);
    });
  },
  error: function (xhr, status, error) {
    // Une erreur s'est produite lors de la récupération des données du profil
    console.log("Erreur lors de la récupération des données du profil :", error);
  }
});
$(document).on('click', '.delete-profile', function(event) {
  let profileId = $(this).data('profile-id');
  console.log('profile id click');
  Swal.fire({
    title: "Êtes-vous sûr de vouloir supprimer ce profil ?",
    text: "Cette action est irréversible.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Oui, supprimer",
    cancelButtonText: "Annuler",
    reverseButtons: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
}).then((result) => {
    if (result.isConfirmed) {
        $.ajax({
            url: WEBSERVER_URL + 'api/profiles/' + profileId,
            type: 'DELETE',
            success: function(result) {
                Swal.fire({
                    title: "Profil supprimé !",
                    text: "Le profil a été supprimé avec succès.",
                    icon: "success",
                    confirmButtonColor: "#28a745",
                }).then((result) => {
                    location.reload();
                });
            },
            error: function(xhr, status, error) {
                Swal.fire({
                    title: "Erreur",
                    text: "Une erreur est survenue lors de la suppression du profil : " + error,
                    icon: "error",
                    confirmButtonColor: "#28a745",
                });
            }
        });
    }
});
});
});
$(document).on('click', '.profile-link', function(event) {
    var url = $(this).attr('href');
    console.log(url);
     if (!url) {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }
          toastr.error('profil media indisponible')
        event.preventDefault(); // prevent default behavior of anchor tag
    }
   
});
