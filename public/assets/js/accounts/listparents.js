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
          url: WEBSERVER_URL + 'auth/request-reset-email/',
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
    var usersTable = $("#usersTablep").DataTable({
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
        // Status column
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
            var deactivatepButton = '<button class="btn btn-outline-danger deactivatep" data-username="' +
              username +
              '">Désactiver</button>';
            var activateButton = '<button class="btn btn-outline-success activate" style="width:95px" data-username="' +
              username +
              '">Activer</button>';
    
            return '<div class="btn-group" role="group">' +
              '<button class="btn btn-outline-info editPart" data-username="' + username + '">Éditer</button>' +
              '&nbsp;' +
              '&nbsp;' +
              (data === true ? deactivatepButton : activateButton) +
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
        console.log("Résultat de l'ordonnancement :", api.order());
      }
    });
    
    
    
    
    
   
    usersTable.column(4).search("parent").draw();
    // Open the modal when the button is clicked
    $("#openModalBtnp").on("click", function () {
      $("#myModalp").modal("show");
    });
    
    $(".modal .close").on("click", function () {
      $("#myModalp").modal("hide");
    });
  
    $(window).on("click", function (event) {
      if ($(event.target).hasClass("modal")) {
        $("#myModalp").modal("hide");
      }
    });
  
// Handle form submission
$("#userFormp").on("submit", function (event) {
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

  // Fetch the schools from the API endpoint
  $.ajax({
    url: WEBSERVER_URL +"api/schools/",
    type: "GET",
    dataType: "json",
    success: function (schools) {
      // Get the selected school ID
      var selectedSchoolId = parseInt($("#school").val());

      // Find the selected school object
      var selectedSchool = schools.find(function (school) {
        return school.id === selectedSchoolId;
      });

      // Check if the selected school exists
      if (!selectedSchool) {
        console.error("Selected school not found.");
        return;
      }

      // Get the school ID from the selected school object
      var schoolId = selectedSchool.id;

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
        enabled: true,
        school: schoolId,
        birthday: birthday,
        user_type:user_type
      };

      // Perform the AJAX registration request
      registerUser(formData);
      usersTable.ajax.reload();
    },
    error: function (xhr, status, error) {
      // Handle the error while fetching schools
      console.error("Error fetching schools:", error);
    }
  });
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
function registerUser(formData) {
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
      // Afficher le message d'erreur générique
      Swal.fire({
        title: "Erreur",
        text: "Une erreur s'est produite lors de l'ajout de l'utilisateur.",
        icon: "error",
        confirmButtonColor: "#d33"
      }).then((result) => {
        if (result.isConfirmed) {
          // Rediriger vers la page principale
          window.location.href = "/accounts";
        }
      });
    }
  });

  console.log("Formulaire soumis !");
}

// Fetch the schools from the API endpoint
$.ajax({
  url: WEBSERVER_URL +"api/schools/",
  type: "GET",
  dataType: "json",
  success: function (schools) {
    // Generate the school options
    var schoolOptions = schools.map(function (school) {
      return '<option value="' + school.id + '">' + school.name + '</option>';
    });

    // Append the school options to the select element
    $('#school').html(schoolOptions.join(''));
  },
  error: function (xhr, status, error) {
    // Handle the error while fetching schools
    console.error("Error fetching schools:", error);
  }
});

// Handle click on retour button
$("#retourButtonqq").on("click", function () {
  $("#myModalp").modal("hide");
  usersTable.ajax.reload();
});

    
  
    // Reset the form when the modal is hidden
    $("#myModalp").on("hidden.bs.modal", function () {
      usersTable.ajax.reload();
    });
   // Variables pour stocker les valeurs d'origine des champs
  var originalFirstName, originalLastName, originalEmail, originalGender, originalBirthday, originalUserrole;

  // Capture le clic sur le bouton "Modifier le profil"
  $(document).on("click", ".editPart", function (e) {
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
        $("#editModalp").modal("show");
      },
      error: function (xhr, status, error) {
        // Une erreur s'est produite lors de la récupération des données du profil
        console.log("Erreur lors de la récupération des données du profil :", error);
      }
    });
  });

  // Gère la soumission du formulaire de modification
  $("#editFormp").on("submit", function (e) {
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

        if (response.username === username) {
          usersTable.ajax.reload();
          // Les données du profil ont été mises à jour avec succès
          console.log("Les données du profil ont été mises à jour :", response);

          // Ferme le modal de modification
          $("#editModalp").modal("hide");
        
          // Réinitialise le formulaire
          $("#editFormp")[0].reset();

          // Afficher un message de succès
          showSuccessupMessage();
        } else {
          // L'`username` dans la réponse ne correspond pas à celui utilisé dans la requête
          console.log("Erreur : L'`username` dans la réponse ne correspond pas à celui utilisé dans la requête.");
        }
      },
      error: function (xhr, status, error) {
        // Erreur - une erreur s'est produite lors de l'ajout de l'utilisateur
        console.log("Une erreur s'est produite lors de le mise à jour de l'utilisateur.");
        console.log("Statut de l'erreur:", status);
        console.log("Erreur:", error);

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
            // Rediriger vers la page principale
            window.location.href = "/accounts/parent";
          }
        });
      }
    });
  });
  // Handle click on retour button
  $("#retourButtonp").on("click", function () {
    $("#editModalp").modal("hide");
    usersTable.reload();
  });


  $("#editModalp").on("hidden.bs.modal", function () {
    usersTable.reload();
  });

// Gestionnaire d'événement pour le clic sur le bouton de désactivation
$('#usersTablep').on('click', '.deactivatep', function () {
  var username = $(this).data('username');

  $('#deactivateModalLabel').text("Confirmation de désactivation - " + username);
  $('#confirmDeactivateBtnp').data('username', username);
  $('#deactivateModalp').modal('show');
});

// Gestionnaire d'événement pour le clic sur le bouton de confirmation de désactivation
$('#confirmDeactivateBtnp').on('click', function () {
  var username = $(this).data('username');
  $('#deactivateModalp').modal('hide');

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
      // L'utilisateur a été désactivé avec succès
      console.log(response);
      usersTable.ajax.reload();
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
  $("#deactivateModalp").modal("hide");
});
    // Event listener for reset password button click
    $('#usersTablep tbody').on('click', '.reset-password', function () {
      var row = usersTable.row($(this).closest('tr'));
       var data = row.data();
       var email = $(this).data('email');
  
      confirmAndSendResetRequest(email);
    });
    // Gestionnaire d'événement pour le clic sur le bouton d'activation
$('#usersTablep').on('click', '.activate', function () {
  var username = $(this).data('username');

  $('#activateModalLabel').text("Confirmation d'activation - " + username);
  $('#confirmActivateBtnp').data('username', username);
  $('#activateModalp').modal('show');
});
  // Gestionnaire d'événement pour le clic sur le bouton de confirmation d'activation
$('#confirmActivateBtnp').on('click', function () {
  var username = $(this).data('username');
  $('#activateModalp').modal('hide');

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
      // L'utilisateur a été activé avec succès
      console.log(response);
      usersTable.ajax.reload();
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
$("#retourButtonap").on("click", function () {
  $("#activateModalp").modal("hide");
});
  // Event listener for reset password button click
  $('#usersTablep tbody').on('click', '.reset-password', function () {
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
  
  document.getElementById("generateButtonc").addEventListener("click", generateRandomPassword); 



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
  