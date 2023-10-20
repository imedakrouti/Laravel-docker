$(document).ready(function () {
  $(document).on('click', '#togglePasswordButtonChild', function(event) {
    var passwordInput = document.getElementById("passwordc");
    var eyeIcon = document.getElementById("eyeIcon");
  
    if (passwordInput.type === "password") {
      document.getElementById("passwordc").type = "text";
       eyeIcon.classList.remove("fa-eye");
       eyeIcon.classList.add("fa-eye-slash");
    } else {
      document.getElementById("passwordc").type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
    });
    $(document).on('click', '#generateButtoncc', function(event) {
      var passwordLength = 10; // Change this value to adjust the length of the generated password
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var password = "";
    
      for (var i = 0; i < passwordLength; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
      }
    
      document.getElementById("passwordc").value = password;
      });

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



    // Initialisez le DataTable sur la table des utilisateurs
    var usersTable = $("#usersTablec").DataTable({
        ajax: {
          url: WEBSERVER_URL + 'api/users/',
            type: "GET",
            dataType: "json",
            dataSrc: "", // Utilisez une chaîne vide pour spécifier que les données sont directement accessibles
        },
        columns: [
          { data: "username" },
          { data: "first_name" },
          { data: "last_name" },
          { data: "email" },
     
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
       //Status column
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
              var deactivatecButton = '<button class="btn btn-outline-danger deactivatec" data-username="' +
                username +
                '">Désactiver</button>';
              var activatecButton = '<button class="btn btn-outline-success activatec" style="width:95px" data-username="' +
                username +
                '">Activer</button>';
      
              return '<div class="btn-group" role="group">' +
                '<button class="btn btn-outline-info editchilds" data-username="' + username + '">Éditer</button>' +
                '&nbsp;' +
                '&nbsp;' +
                (data === true ? deactivatecButton : activatecButton) +
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
            orderable: false,
          }
        ],
        order: [[7, "desc"]], 
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
    });

    // Filtrer les utilisateurs par rôle "parent"
    usersTable.column(4).search("child").draw();
// Open the modal when the button is clicked
$("#openModalBtnc").on("click", function() {
    $("#myModalc").modal("show");
  });

  // Close the modal when the close button or outside the modal is clicked
  $(".modal .close").on("click", function() {
    $("#myModalc").modal("hide");
  });

  $(window).on("click", function(event) {
    if ($(event.target).hasClass("modal")) {
      $("#myModalc").modal("hide");
    }
  });







  document.getElementById('userFormc').addEventListener('submit', function(event) {
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


// Handle form submission
$("#userFormc").on("submit", function(event) {
  event.preventDefault();

  // Validate the form fields
  
  var firstName = $("#first_name").val();
  var lastName = $("#last_name").val();
  var email = $("#emailc").val();
  var username = $("#usernamec").val();
  var password = $("#passwordc").val();
  var user_type= $('#user_typec').val();
  var user_agent=$('#user_agentc').val();
  var birthday = $("#birthday").val();
  var countryId = parseInt($("#country").val());
  var street = $("#street").val();
  var postal_code = $("#postal_code").val();
  var gender = $("#genderc").val();
  




  // Get the form data
  var formData = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    email_verification_url: email,
    enabled:false,
    birthday: birthday,
    gender: gender,
    user_type:user_type,
    user_agent:user_agent,
    username:username,
    password:password,
    street:street,
    postal_code:postal_code,
    country:countryId
  };
  console.log('my child want to added ',formData);

  // Perform the AJAX request to add a child
  addChild(formData);
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

function addChild(formData) {
  $.ajax({
    url: WEBSERVER_URL +"auth/register/",
    type: "POST",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(formData),
    success: function(response) {
      location.reload();
      showSuccessaddMessage();
      downloadFormDataAsTextFile(formData);
    },
    error: function(xhr, status, error) {
      console.log(error);
      // Handle specific errors
      if (xhr.status === 400) {
        var responseJSON = JSON.parse(xhr.responseText);
        console.log(responseJSON);
        console.log(xhr);
        if (responseJSON.username && responseJSON.username[0].code === "unique") {
          // Display existing username error message
          var errorMessage = responseJSON.username[0].string;
          console.log("Existing username error:", errorMessage);
        }
        if (responseJSON.email && responseJSON.email[0].code === "unique") {
          // Display existing email error message
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
          window.location.href = "/accounts/child";
        }
      });
    }
  });

  console.log("Form submitted!");
}

// Fetch the countries from the API endpoint
$.ajax({
  url: WEBSERVER_URL +"api/countries/",
  type: "GET",
  dataType: "json",
  success: function(countries) {
    // Generate the country options
    var countryOptions = countries.map(function(country) {
      return '<option value="' + country.id + '">' + country.name + '</option>';
    });

    // Append the country options to the select element
    $('#country').html(countryOptions.join(''));
  },
  error: function(xhr, status, error) {
    // Handle the error while fetching countries
    console.error("Error fetching countries:", error);
  }
});

// Handle click on retour button
$("#retourButtonChild").on("click", function() {
  $("#myModalc").modal("hide");
  childrenTable.reload();
});









  // Handle click on retour button
  $("#retourButton").on("click", function() {
    $("#myModalc").modal("hide");
  });

  // Function to reset the form
  function resetForm() {
    $("#userFormc")[0].reset();
  }

  // Reset the form when the modal is hidden
  $("#myModalc").on("hidden.bs.modal", function() {
    resetForm();
  });
    // Variables pour stocker les valeurs d'origine des champs
    var originalData, originalFirstName, originalLastName, originalEmail, originalGender, originalBirthday, originalUserrole;

    // Capture le clic sur le bouton "Modifier le profil"
    $(document).on("click", ".editchilds", function (e) {
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
            

                $("#edit_username").val(response.username);
                $("#edit_first_name").val(response.first_name);
                $("#edit_last_name").val(response.last_name);
                $("#edit_email").val(response.email);
                $("#edit_gender").val(response.gender);
                $("#edit_birthday").val(response.birthday);
       

                // Affiche le modal de modification
                $("#editModalc").modal("show");
            },
            error: function (xhr, status, error) {
              Swal.fire({
                title: "Erreur",
                text: "Une erreur Lors de la récupération la details de l'enfant",
                icon: "error",
                confirmButtonColor: "#d33"
                }).then((result) => {
                
              });

                // Une erreur s'est produite lors de la récupération des données du profil
                console.log("Erreur lors de la récupération des données du profil :", error);
            }
        });
    });

    // Gère la soumission du formulaire de modification
    $("#editFormc").on("submit", function (e) {
        e.preventDefault();
        // Récupère les valeurs du formulaire
        var username = $("#edit_username").val();
        var firstName = $("#edit_first_name").val();
        var lastName = $("#edit_last_name").val();
        var email = $("#edit_email").val();
        var gender = $("#edit_gender").val();
        var birthday = $("#edit_birthday").val();
      

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
                    $("#editModalc").modal("hide");

                    // Réinitialise le formulaire
                    usersTable.ajax.reload();

                    // Afficher un message de succès
                    showSuccessupMessage();
                } else {
                    // L'`username` dans la réponse ne correspond pas à celui utilisé dans la requête
                    console.log("Erreur : L'`username` dans la réponse ne correspond pas à celui utilisé dans la requête.");
                }
            },
            error: function(xhr, status, error) {
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
                  window.location.href = "/accounts/child";
                }
              });
            }
        });
    });

    // Handle click on retour button
    $("#retourButtonc").on("click", function () {
        $("#editModalc").modal("hide");
    });

    // Function to reset the form
    function resetForm() {
        $("#editFormc")[0].reset();
    }

    // Reset the form when the modal is hidden
    $("#editModalc").on("hidden.bs.modal", function () {
        resetForm();
    });
    $('#usersTablec tbody').on('click', '.reset-password', function () {
      var row = usersTable.row($(this).closest('tr'));
       var data = row.data();
       var email = $(this).data('email');
  
      confirmAndSendResetRequest(email);
    });








    
// Gestionnaire d'événement pour le clic sur le bouton de désactivation
$('#usersTablec').on('click', '.deactivatec', function () {
  var username = $(this).data('username');

  $('#deactivateModalLabelc').text("Confirmation de désactivation - " + username);
  $('#confirmDeactivateBtnc').data('username', username);
  $('#deactivateModalc').modal('show');
});

$('#retourDesactivateBtn').on('click',function(){
  $('#deactivateModalc').modal('hide');
})

// Gestionnaire d'événement pour le clic sur le bouton de confirmation de désactivation
$('#confirmDeactivateBtnc').on('click', function () {
  var username = $(this).data('username');
  $('#deactivateModalc').modal('hide');

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
$("#retourButtonc").on("click", function () {
  $("#deactivateModalc").modal("hide");
});
// Gestionnaire d'événement pour le clic sur le bouton d'activation
$('#usersTablec').on('click', '.activatec', function () {
  var username = $(this).data('username');

  $('#activateModalLabelc').text("Confirmation d'activation - " + username);
  $('#confirmActivateBtnc').data('username', username);
  $('#activateModalc').modal('show');
});

// Gestionnaire d'événement pour le clic sur le bouton de confirmation d'activation
$('#confirmActivateBtnc').on('click', function () {
  var username = $(this).data('username');
  $('#activateModalc').modal('hide');

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
});


