$(document).ready(function () {
  $(document).on('click', '#togglePasswordButton', function(event) {
    var passwordInput = document.getElementById("password");
    var eyeIcon = document.getElementById("eyeIcon");
  
    if (passwordInput.type === "password") {
      document.getElementById("password").type = "text";
       eyeIcon.classList.remove("fa-eye");
       eyeIcon.classList.add("fa-eye-slash");
    } else {
      document.getElementById("password").type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
    });
    // Initialisez le DataTable sur la table des utilisateurs
    var usersTablerev = $("#usersTablerev").DataTable({
        ajax: {
            url: WEBSERVERD_URL + 'api/user/users_infos/?username=admin_user',
            type: "GET",
            dataType: "json",
            dataSrc: "", // Utilisez une chaîne vide pour spécifier que les données sont directement accessibles
        },
        columns: [
            {
                data: "user_id",
                visible: false,
                className: "hidden-column"
            },
            { data: "account_type",
            visible: false,
               className: "hidden-column"  },
            { data: "username" },
       
            
            { data: "first_name" },
            { data: "laste_name" },
            { data: "departements" },
            {
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
                  var deactivateButton = '<button class="btn btn-outline-danger deactivaterev" data-username="' +
                    username +
                    '">Désactiver</button>';
                  var activateButton = '<button class="btn btn-outline-success activaterev" style="width:95px" data-username="' +
                    username +
                    '">Activer</button>';
          
                  return '<div class="btn-group" role="group">' +
                    '<button class="btn btn-outline-info editrev" data-username="' + username + '">Éditer</button>' +
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
                orderable: false,
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
          "loadingRecords": '<div class="text-center"><i class="fas fa-spinner fa-spin"></i> Chargement en cours...</div>',
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

    usersTablerev.column(1).search("Revendeur", true, false).draw();


    function showadd() {
        toastr.success('Responsable ajouté avec succés')
    }

    $("#openModalBtnrev").on("click", function () {
        $("#myModalrev").modal("show");
      });
     $("#retourButton").on("click", function () {
      $("#myModalrev").modal("hide");
    });
    $('#retourButtonm').on("click", function () {
      $("#editModalrev").modal("hide");
    }); 



// Function to handle form submission
function submitForm(event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Get the form data
    const form = document.getElementById('userFormrev');
    const formData = new FormData(form);
  
    // Create an object to hold the form data
    const userData = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      username: formData.get('username'),
      password: formData.get('password'),
      department: [parseInt(formData.get('departmentSelect'))],
      account_type: formData.get('account_type'),
      seniority: parseInt(formData.get('seniority')),
      email_verification_url: formData.get('email_verification_url')
    };
  
    // Make a POST request to your API endpoint
    fetch(WEBSERVERD_URL +'api/auth/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (response.ok) {
        downloadFormDataAsTextFile(userData);
        console.log('Form submitted successfully');
        showadd();
        location.reload();
      } else {

        console.error('Form submission error');

      }
    })
    .catch(error => {

      console.error('Error:', error);

    });
  }
  
  // Function to fetch departments and populate the combobox
  function fetchDepartments() {
    fetch(WEBSERVERD_URL +'api/department/')
      .then(response => response.json())
      .then(data => {
        // Get the select element for departments
        const departmentSelect = document.getElementById('departmentSelect');
  
        // Clear existing options
        departmentSelect.innerHTML = '';
  
        // Add departments as options
        data.forEach(department => {
          const option = document.createElement('option');
          option.value = department.id;
          option.textContent = department.title;
          departmentSelect.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Error:', error);
        // TODO: Add your error handling code here
      });
  }
  
  // Call the fetchDepartments function to populate the combobox on page load
  fetchDepartments();
  
  // Add event listener to the form submit button
  const submitButton = document.querySelector('#userFormrev button[type="submit"]');
  submitButton.addEventListener('click', submitForm);
  
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
  

  

  $(document).ready(function() {
    $(document).on("click", ".editrev", function (e) {
        // Get the username from the button's data attribute
        var username = $(this).data("username");
        console.log(username);
      
        // Fetch the old information using the username
        fetch(WEBSERVERD_URL +'api/user/users_infos/?username=' + username, {
          method: 'GET'
        })
          .then(response => response.json())
          .then(data => {
            console.log(data); // Log the API response for debugging
      
            // Find the object that matches the desired username
            var user = data.find(obj => obj.username === username);
            if (user) {
              // Update the form with the fetched information
              document.getElementById('edit_username').value = user.username;
              document.getElementById('edit_first_name').value = user.first_name;
              document.getElementById('edit_last_name').value = user.laste_name;
              document.getElementById('department').value = user.departements;
            //  document.getElementById('edit_seniority').value = user.seniority ? user?.seniority : '';
      
              // Open the modal
              $('#editModalrev').modal('show');
            } else {
              console.log('User not found');
            }
          })
          .catch(error => {
            console.log('Error:', error);
          });
      });
      
      $(document).ready(function() {
        // Fetch departments list
        fetch(WEBSERVERD_URL +'api/department/')
          .then(response => response.json())
          .then(data => {
            // Update the department dropdown options
            var departmentDropdown = document.getElementById('department');
            departmentDropdown.innerHTML = ''; // Clear existing options
            
            // Add new options for each department
            data.forEach(department => {
              var option = document.createElement('option');
              option.value = department.id;
              option.text = department.title;
              departmentDropdown.appendChild(option);
            });
          })
          .catch(error => {
            console.log('Error:', error);
          });
      
        // Add event listener to the form's submit event
        var editForm = document.getElementById('editFormrev');
        editForm.addEventListener('submit', function(event) {
          event.preventDefault(); // Prevent the default form submission
      
          // Get the username from the form input field
          var username = $("#edit_username").val();
      
          // Prepare the data to be sent to the API
          var formData = new FormData(editForm);
      
          // Make the API update request
          fetch(WEBSERVERD_URL +'api/user/' + username, {
            method: 'PUT',
            body: formData
            
          })
            .then(response => response.json())
            
            .then(data => {
              console.log('Success:', data);
              usersTablerev.ajax.reload();
              $('#editModalrev').modal('hide');
            })
            .catch(error => {
              console.log('Error:', error);
            });
        });
      });
      
});
  





// Gestionnaire d'événement pour le clic sur le bouton de désactivation
$('#usersTablerev').on('click', '.deactivaterev', function () {
    var username = $(this).data('username');
  
    $('#deactivateModalLabelrev').text("Confirmation de désactivation - " + username);
    $('#confirmDeactivateBtnrev').data('username', username);
    $('#deactivateModalrev').modal('show');
  });
  
  // Gestionnaire d'événement pour le clic sur le bouton de confirmation de désactivation
  $('#confirmDeactivateBtnrev').on('click', function () {
    var username = $(this).data('username');
    $('#deactivateModalrev').modal('hide');
  
    // Préparer les données à envoyer dans la requête PATCH
    var data = {
    is_active: false,
    };
  
    // Envoyer la requête AJAX pour désactiver l'utilisateur
    $.ajax({
      url: WEBSERVERD_URL +'api/user/' + username ,
      type: "PUT",
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
  $("#retourButtonrevd").on("click", function () {
    $("#deactivateModalrev").modal("hide");
  });
  // Gestionnaire d'événement pour le clic sur le bouton d'activation
  $('#usersTablerev').on('click', '.activaterev', function () {
    var username = $(this).data('username');
  
    $('#activateModalLabelrev').text("Confirmation d'activation - " + username);
    $('#confirmActivateBtnrev').data('username', username);
    $('#activateModalrev').modal('show');
  });
  
  // Gestionnaire d'événement pour le clic sur le bouton de confirmation d'activation
  $('#confirmActivateBtnrev').on('click', function () {
    var username = $(this).data('username');
    $('#activateModalrev').modal('hide');
  
    // Préparer les données à envoyer dans la requête PATCH
    var data = {
        is_active: true,
    };
  
    // Envoyer la requête AJAX pour activer l'utilisateur
    $.ajax({
        url: WEBSERVERD_URL +'api/user/' + username ,
      type: "PUT",
      data: data,
      success: function (response) {
        usersTablerev.ajax.reload();
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
  $("#retourButtonreva").on("click", function () {
    $("#activateModalrev").modal("hide");
  });
   


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