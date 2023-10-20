$(document).ready(function () {
  function confirmAndSendResetRequest(email) {
  console.log("Email for reset:", email);
  Swal.fire({
    title: "Êtes-vous sûr de vouloir réinitialiser le mot de passe ?",
    text: "Cette action est irréversible.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Oui, envoyer",
    cancelButtonText: "Annuler",
    reverseButtons: true,
    confirmButtonColor: "#28a745",
    cancelButtonColor: "#6c757d",
  }).then((result) => {
    if (result.isConfirmed) {
      var resetRequest = {
        email: email,
        redirect_url: "https://app-shield.4indata.fr/", 
      };

      $.ajax({
        url: WEBSERVERD_URL + 'auth/request-reset-email/',
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
            usersTable.reload();
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
  function showError(containerId, message) {
    var error = $('<div>')
      .text(message)
      .addClass('invalid-feedback');
    error.addClass('invalid-feedback');
    $(containerId)
      .find('.form-group')
      .append(error);
    $(containerId)
      .find('.modal-body')
      .prepend(
        '<div class="alert text-danger d-flex align-items-center" role="alert">' +
          '<div style="margin-left: 40%;">' +
          message +
          ' </div>' +
          '</div>'
      );
  }
  var loadingSpinner = $("#loadingSpinner");
  var usersTable = $("#usersTable").DataTable({
    ajax: {
      url: WEBSERVER_URL + 'api/users/',
      type: "GET",
      dataType: "json",
      dataSrc: "",
      beforeSend: function (xhr) {
        // Affichez le spinner avant l'envoi de la requête
        loadingSpinner.show();
      }
    },
    columns: [
      { data: "username" },
      { data: "first_name" },
      { data: "last_name" },
      { data: "email" },
      // { data: "gender" },
      { data: "user_role",
        visible: false,
        className: "hidden-column" },
      { data: "birthday" },
      {
        // Column for created_at
        data: "created_at",
        render: function (data, type, row) {
          var date = new Date(data);
          var formattedDate = date.toISOString().split("T")[0];
          return formattedDate;
        }
      },
  {
      //   // Status column
   data: "is_active",
  render: function (data, type, row) {
    var status = data === true ? "Active" : "Inactive";
   var badgeClass = data === true ? "badge-success" : "badge-danger";
      return '<span class="badge ' + badgeClass + '">' + status + '</span>';
      }
    },
    
      {
        data: "is_active",
        render: function (data, type, row) {
          var username = row.username;
          var email = row.email;
          var deactivateButton = '<button class="btn btn-outline-danger deactivate" data-username="' +
            username +
            '">Désactiver</button>';
          var activateButton = '<button class="btn btn-outline-success activate" style="width:95px" data-username="' +
            username +
            '">Activer</button>';
  
          return '<div class="btn-group" role="group">' +
            '<button class="btn btn-outline-info editMang" data-username="' + username + '">Éditer</button>' +
            '&nbsp;' +
            '&nbsp;' +
            (data === true ? deactivateButton : activateButton) +
            '</div>' +
            '&nbsp;' +
            '&nbsp;' +
            '<button class="btn btn-outline-warning reset-password" data-email="' +
            email +
            '">reset</button>' +
            '</div>';
        }
      }
    ],
    columnDefs: [
      {
        targets: -1,
        searchable: false,
        orderable: false
      }
    ],
    responsive: true,
    language: {
      "decimal": "",
      "emptyTable": '<div class="text-center"><i class="fas fa-spinner fa-spin"></i> Chargement en cours...</div>',
      "info": "Affichage _START_ à _END_ sur _TOTAL_ entrées",
      "infoEmpty": "Affichage 0 à 0 sur 0 entrée",
      "infoFiltered": "(filtré à partir de _MAX_ entrées au total)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Afficher _MENU_ entrées",

      "search": "Rechercher :",
      "zeroRecords": "Aucun enregistrement correspondant trouvé",
      "paginate": {
        "first": "Premier",
        "last": "Dernier",
        "next": "Suivant",
        "previous": "Précédent"
      },
      "aria": {
        "sortAscending": ": activer pour trier la colonne par ordre croissant",
        "sortDescending": ": activer pour trier la colonne par ordre décroissant"
      }
    },
    createdRow: function (row, data, dataIndex) {
      $(row).data("created-at", data.created_at);
    
    },
    initComplete: function () {
      var api = this.api();
      api.order([6, "desc"]).draw();
    
    }
  });
  usersTable.column(4).search("manager").draw();
  // Open the modal when the button is clicked
  $("#openModalBtn").on("click", function () {
    $("#myModal").modal("show");
  });
  
  $(".modal .close").on("click", function () {
    $("#myModal").modal("hide");
  });

  $(window).on("click", function (event) {
    if ($(event.target).hasClass("modal")) {
      $("#myModal").modal("hide");
    }
  });
  $("#userForm").on("submit", function (event) {
    event.preventDefault();
    // Remove previous error state and messages
    $('#username').removeClass('is-invalid');
    $('#username').siblings('.invalid-feedback').remove();
  
    // Validate the form fields
    var firstName = $("#first_name").val();
    var lastName = $("#last_name").val();
    var gender = $("#gender").val();
    var email = $("#email").val();
    var username = $("#username").val();
    var password = $("#password").val();
    var emailVerificationUrl = $("#email_verification_url").val();
    var userAgent = $("#user_agent").val();
    var managerRole = $("#manager_role").val();
    var birthday = $("#birthday").val();
    var user_type = $("#user_type").val();
  
    if (!firstName) {
      showError($('#first_name'), "Veuillez saisir un prénom.");
      return;
    }
  
    if (!lastName) {
      showError($('#last_name'), "Veuillez saisir un nom de famille.");
      return;
    }
  
    if (!email) {
      showError($('#email'), "Veuillez saisir une adresse e-mail.");
      return;
    }
  
    if (!username) {
      showError($('#username'), "Veuillez saisir un nom d'utilisateur.");
      return;
    }
  
    if (!password) {
      showError($('#password'), "Veuillez saisir un mot de passe.");
      return;
    }
  
    // Get the form data
    var formData = {
      first_name: firstName,
      last_name: lastName,
      gender: gender,
      email: email,
      username: username,
      password: password,
      email_verification_url: emailVerificationUrl,
      user_agent: userAgent,
      manager_role: managerRole,
      birthday: birthday,
      user_type: user_type
    };
  
    $.ajax({
      url: WEBSERVER_URL + 'auth/register/',
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (response) {
        downloadFormDataAsTextFile(formData);
        showSuccessaddMessage();
        location.reload();
      },
      error: function (xhr, status, error) {
        if (xhr.status === 400) {
          var responseJSON = JSON.parse(xhr.responseText);
          if (responseJSON.username && responseJSON.username[0].code === "unique") {
            // Display the error message for existing username
            var errorMessage = responseJSON.username[0].string;
            console.log("Existing username error:", errorMessage);
          }
          if (responseJSON.email && responseJSON.email[0].code === "unique") {
            // Display the error message for existing email
            var errorMessage = responseJSON.email[0].string;
            console.log("Existing email error:", errorMessage);
          }
        }
  
        // Display generic error message
        Swal.fire({
          title: "Erreur",
          text: "Une erreur s'est produite lors de l'ajout de l'utilisateur.",
          icon: "error",
          confirmButtonColor: "#d33"
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect to the main page
            window.location.href = "/accounts/manager";
          }
        });
      }
    });
  
    console.log("Formulaire soumis !");
  });
  
  // Handle click on retour button
  $("#retourButton").on("click", function () {
    $("#myModal").modal("hide");
  });
  
  function downloadFormDataAsTextFile(formData) {
    var jsonData = JSON.stringify(formData);
    var blob = new Blob([jsonData], { type: "application/json" });
    var userName = formData.username; 
    var fileName = userName + "_form_data.txt";
  
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
      var downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = fileName;
      downloadLink.click();
      URL.revokeObjectURL(downloadLink.href);
    }
  }
  
  // Reset the form when the modal is hidden
  $("#myModal").on("hidden.bs.modal", function () {

    usersTable.ajax.reload();
  });
  // Variables pour stocker les valeurs d'origine des champs
  var originalFirstName, originalLastName, originalEmail, originalGender, originalBirthday, originalUserrole;

  // Capture le clic sur le bouton "Modifier le profil"
  $(document).on("click", ".editMang", function (e) {
    e.preventDefault();
    // Récupère l'username à partir de l'attribut data-username
    var username = $(this).data("username");

    // Effectue une requête AJAX pour obtenir les données du profil
    $.ajax({
      url: WEBSERVER_URL + 'api/users/' + username,
      type: "GET",
      dataType: "json",
      success: function (response) {
        // Les données du profil ont été récupérées avec succès
        // Utilisez les données pour pré-remplir le formulaire du modal de modification

        // Sauvegarde les valeurs d'origine des champs
        originalData = response;
        originalUsername = response.username;
        originalFirstName = response.first_name;
        originalLastName = response.last_name;
        originalEmail = response.email;
        originalGender = response.gender;
        originalBirthday = response.birthday;
        originalUserrole = response.user_role;

        $("#edit_username").val(response.username);
        $("#edit_first_name").val(response.first_name);
        $("#edit_last_name").val(response.last_name);
        $("#edit_email").val(response.email);
        $("#edit_gender").val(response.gender);
        $("#edit_birthday").val(response.birthday);
        $("#edit_user_role").val(response.user_role);

        // Affiche le modal de modification
        $("#editModal").modal("show");
      },
      error: function (xhr, status, error) {
        // Une erreur s'est produite lors de la récupération des données du profil
        console.log("Erreur lors de la récupération des données du profil :", error);
      }
    });
  });

  // Gère la soumission du formulaire de modification
  $("#editForm").on("submit", function (e) {
    e.preventDefault();
    // Récupère les valeurs du formulaire
    var username = $("#edit_username").val();
    var firstName = $("#edit_first_name").val();
    var lastName = $("#edit_last_name").val();
    var email = $("#edit_email").val();
    var gender = $("#edit_gender").val();
    var birthday = $("#edit_birthday").val();
    var user_role = $("#edit_user_role").val();

    // Crée un objet pour stocker les données modifiées
    var updatedData = {};

    // Vérifie si les champs ont été modifiés et les ajoute à l'objet updatedData
    if (username !== originalUsername) {
      updatedData.username = username;
    } else {
      updatedData.username = username;
    }
    if (email !== originalEmail) {
      updatedData.email = email;
    } else {
      updatedData.email = email;
    }
    if (firstName !== originalFirstName) {
      updatedData.first_name = firstName;
    }
    if (lastName !== originalLastName) {
      updatedData.last_name = lastName;
    }

    if (gender !== originalGender) {
      updatedData.gender = gender;
    }
    if (birthday !== originalBirthday) {
      updatedData.birthday = birthday;
    }
    if (user_role !== originalUserrole) {
      updatedData.user_role = user_role;
    }

    // Effectue une requête AJAX pour mettre à jour les données du profil
    $.ajax({
      url: WEBSERVER_URL + 'api/users/' + username + '/',
      type: "PUT",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(updatedData),
      success: function (response) {
        // Vérifier si l'`username` dans la réponse correspond à celui utilisé dans la requête
        if (response.username === username) {
          // Les données du profil ont été mises à jour avec succès
          console.log("Les données du profil ont été mises à jour :", response);

          // Ferme le modal de modification
          $("#editModal").modal("hide");
          // Afficher un message de succès
          showSuccessupMessage();
          usersTable.reload();
        } else {
          // L'`username` dans la réponse ne correspond pas à celui utilisé dans la requête
          console.log("Erreur : L'`username` dans la réponse ne correspond pas à celui utilisé dans la requête.");
        }
      },
      error: function (xhr, status, error) {
      
        // Traiter les erreurs spécifiques
        if (xhr.status === 400) {
          var responseJSON = JSON.parse(xhr.responseText);
          if (responseJSON.username && responseJSON.username[0].code === "unique") {
            // Afficher le message d'erreur d'username existant
            var errorMessage = responseJSON.username[0].string;
            console.log("Erreur d'username existant:", errorMessage);
          }
          if (responseJSON.email && responseJSON.email[0].code === "unique") {
            // Afficher le message d'erreur d'email existant
            var errorMessage = responseJSON.email[0].string;
            console.log("Erreur d'email existant:", errorMessage);
          }
        }

        // Afficher le message d'erreur générique
        Swal.fire({
          title: "Erreur",
          text: "Une erreur s'est produite lors de la mise à jour de l'utilisateur.",
          icon: "error",
          confirmButtonColor: "#d33"
        }).then((result) => {
          if (result.isConfirmed) {
           
            window.location.href = "/accounts/manager";
          }
        });
      }
    });
  });
  $("#retourButtonm").on("click", function () {
    $("#editModal").modal("hide");
    // location.reload();
  });


  $("#editModal").on("hidden.bs.modal", function () {
    usersTable.ajax.reload();
  });
  
// Gestionnaire d'événement pour le clic sur le bouton de désactivation
$('#usersTable').on('click', '.deactivate', function () {
  var username = $(this).data('username');

  $('#deactivateModalLabel').text("Confirmation de désactivation - " + username);
  $('#confirmDeactivateBtn').data('username', username);
  $('#deactivateModal').modal('show');
});

// Gestionnaire d'événement pour le clic sur le bouton de confirmation de désactivation
$('#confirmDeactivateBtn').on('click', function () {
  var username = $(this).data('username');
  $('#deactivateModal').modal('hide');

  // Préparer les données à envoyer dans la requête PATCH
  var data = {
    activation_state: false,
    username
  };

  // Envoyer la requête AJAX pour désactiver l'utilisateur
  $.ajax({
    url: WEBSERVER_URL + 'api/users/' + username + '/change_account_active_state/',
    type: "GET",
    data: data,
    success: function (response) {
      usersTable.ajax.reload();
      console.log(response);
      showSuccessdMessage();
    },
    error: function (xhr, status, error) {
      // Une erreur s'est produite lors de la désactivation de l'utilisateur
      console.log("Une erreur s'est produite lors de la désactivation de l'utilisateur.");
      console.log("Statut de l'erreur:", status);
      console.log("Erreur:", error);
      alert("Une erreur s'est produite lors de la désactivation de l'utilisateur.");
    }
  });
});

// Gestionnaire d'événement pour le clic sur le bouton de retour du modal de désactivation
$("#retourButtond").on("click", function () {
  $("#deactivateModal").modal("hide");
});
// Gestionnaire d'événement pour le clic sur le bouton d'activation
$('#usersTable').on('click', '.activate', function () {
  var username = $(this).data('username');

  $('#activateModalLabel').text("Confirmation d'activation - " + username);
  $('#confirmActivateBtn').data('username', username);
  $('#activateModal').modal('show');
});

// Gestionnaire d'événement pour le clic sur le bouton de confirmation d'activation
$('#confirmActivateBtn').on('click', function () {
  var username = $(this).data('username');
  $('#activateModal').modal('hide');

  // Préparer les données à envoyer dans la requête PATCH
  var data = {
    activation_state: true,
    username
  };

  // Envoyer la requête AJAX pour activer l'utilisateur
  $.ajax({
    url: WEBSERVER_URL + 'api/users/' + username + '/change_account_active_state/',
    type: "GET",
    data: data,
    success: function (response) {
      usersTable.ajax.reload();
      console.log(response);
      showSuccessaMessage();
    },
    error: function (xhr, status, error) {
      // Une erreur s'est produite lors de l'activation de l'utilisateur
      console.log("Une erreur s'est produite lors de l'activation de l'utilisateur.");
      console.log("Statut de l'erreur:", status);
      console.log("Erreur:", error);
      alert("Une erreur s'est produite lors de l'activation de l'utilisateur.");
    }
  });
});

// Gestionnaire d'événement pour le clic sur le bouton de retour du modal d'activation
$("#retourButtona").on("click", function () {
  $("#activateModal").modal("hide");
});
  // Event listener for reset password button click
  $('#usersTable tbody').on('click', '.reset-password', function () {
    var row = usersTable.row($(this).closest('tr'));
     var data = row.data();
     var email = $(this).data('email');

    confirmAndSendResetRequest(email);
  });

  function generateRandomPassword() {
    var passwordLength = 10; // Change this value to adjust the length of the generated password
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var password = "";
  
    for (var i = 0; i < passwordLength; i++) {
      var randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
  
    document.getElementById("password").value = password;
  }
  
  document.getElementById("generateButton").addEventListener("click", generateRandomPassword);



  function togglePasswordVisibility() {
    var passwordInput = document.getElementById("password");
    var eyeIcon = document.getElementById("eyeIcon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
}
 document.getElementById("togglePasswordButton").addEventListener("click", togglePasswordVisibility);













 document.getElementById('userForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  var inputs = this.getElementsByTagName('input');
  var emptyInputs = [];

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value === '') {
      emptyInputs.push(inputs[i]);
    }
  }

  var errorMessage = document.getElementById('errorMessage');

  if (emptyInputs.length > 0) {
    errorMessage.style.display = 'block';
  } else {
    errorMessage.style.display = 'none';

  }

  // Remove existing error messages
  var existingErrorMessages = this.getElementsByClassName('error-message');
  while (existingErrorMessages.length > 0) {
    existingErrorMessages[0].remove();
  }

  // Display error messages for empty inputs
  for (var i = 0; i < emptyInputs.length; i++) {
    var input = emptyInputs[i];
    var errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'red';
    errorElement.textContent = 'Veuillez remplir ce champ.';
    input.parentNode.appendChild(errorElement);
  }
});




});
