toastr.options = {
    "closeButton": true,
    "newestOnTop": false,
    "progressBar": true,
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "3000",
    "hideDuration": "3000",
    "timeOut": "5000",
    "extendedTimeOut": "3000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

function showSuccessMessage() {
    toastr.success('profil ajouté avec succés')
}
function showSuccessupMessage() {
    toastr.success('Compte mis à jour avec succés')
}
function showSuccessaddMessage() {
    toastr.success('Compte ajouté avec succés')
}
function showSuccessdMessage() {
    toastr.success('Compte Désactivé avec succés')
}
function showErrorMessage() {
  toastr.error('Probléme lors désactivation du compte')
}
function showSuccesssujMessage() {
  toastr.success('Sujet ajouté avec succés')
}
function showSuccessaMessage() {
    toastr.success('Compte Activé avec succés')
}
//confirm and sent request
function confirmAndSendRequest(params, url) {
    Swal.fire({
      title: "Etes vous sur?",
      text: "Ajouter un nouveau profil social",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, Ajouter!",
      cancelButtonText: "Non, Annuler!",
      reverseButtons: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#6c757d",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          method: 'POST',
          url: url,
          data: JSON.stringify(params),
          contentType: 'application/json; charset=utf-8',
          success: function (response) {
            console.log(response);
            showSuccessMessage();
            setTimeout(function () {
              const url = "/profils";
              window.location.href = url;
            }, 2500); // 2500 milliseconds = 2.5 seconds
          },
          error: function (xhr, status, error) {
            console.error(error);
          }
        });
      }
    });
  }
  //confirm delete and sent request
  function confirmAndSendDeleteRequest(profileId) {
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
}


function confirmAndSendResetRequest(email) {
    Swal.fire({
      title: "Êtes-vous sûr de vouloir réinitialiser le mot de passe ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, envoyer",
      cancelButtonText: "Annuler",
      reverseButtons: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
    }).then((result) => {
      if (result.isConfirmed) {
        var resetRequest = {
          email: email,
          redirect_url: "https://app-shield.4indata.fr/", 
        };

        $.ajax({
          url: "http://54.36.177.119:8017/auth/request-reset-email/",
          type: 'POST',
          dataType: 'json',
          data: JSON.stringify(resetRequest),
          contentType: 'application/json',
          success: function(result) {
            Swal.fire({
              title: "Demande de réinitialisation envoyée !",
              text: "La demande de réinitialisation du mot de passe a été envoyée avec succès.",
              icon: "success",
              confirmButtonColor: "#28a745",
            }).then((result) => {
              location.reload();
            });
          },
          error: function(xhr, status, error) {
            Swal.fire({
              title: "Erreur",
              text: "Une erreur est survenue lors de la demande de réinitialisation du mot de passe : " + error,
              icon: "error",
              confirmButtonColor: "#28a745",
            });
          }
        });
      }
    });
  }


function validateInputs() {
    let inputName = document.getElementById("name");
    let inputAddress = document.getElementById("address");
  
    if (inputName !== null) {
        inputName.addEventListener("input", function (event) {
            if (!/^[a-zA-Z]+$/.test(event.target.value)) {
                event.target.setCustomValidity("L'entrée doit être une chaîne de caractères.");
            } else {
                event.target.setCustomValidity("");
            }
        });
    }

    if (inputAddress !== null) {
        inputAddress.addEventListener("input", function (event) {
            if (!/^[a-zA-Z]+$/.test(event.target.value)) {
                event.target.setCustomValidity("L'entrée doit être une chaîne de caractères.");
            } else {
                event.target.setCustomValidity("");
            }
        });
    }
  }
  $('.delete-profile').click(function() {
    let profileId = $(this).data('profile-id');
    console.log('profile id click');
    confirmAndSendDeleteRequest(profileId);
});
