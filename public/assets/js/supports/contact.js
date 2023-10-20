
$(document).ready(function () {
    var contactTable = $("#contactTable").DataTable({
        ajax: {
          url: WEBSERVER_URL + 'api/support/contact_form/',
            type: "GET"
        },
        columns: [
          {
            data: "id",
            visible: false,
            className: "hidden-column"
          },
          { data: "subject" },
            {
            data: "message",
            render: function (data, type, row) {
              var words = data.split(" ");
              var truncatedMessage = words.slice(0, 7).join(" "); // Display only the first 7 words of the message
              var displayMessage = truncatedMessage + ' <span class="view-more" onclick="openModal(this)" data-message="' + data + '">         Voir Plus...</span>';

              return displayMessage;
            }
          },
          
          
          
          
          { data: "username" },
          { data: "email" },
          {
            data: "created_at",
            render: function (data, type, row) {
              var date = new Date(data);
              var formattedDate = date.toISOString().split("T")[0];
              return formattedDate;
            }
          },
          {
            data: "status",
            render: function (data, type, row) {
              var statusText = data ? "Résolu" : "En Cours";
              var statusClass = data ? "badge-success" : "badge-danger";
          
              return `<span class="badge ${statusClass}">${statusText}</span>`;
            }
          },
          
          
          
          
          {
            data: null,
            render: function (data, type, row) {
              var id = row.id;
              var status = row.status;
              var buttonText = status ? 'Supprimer' : 'Repondre';
              var buttonClass = status ? 'btn-outline-danger deletex' : 'btn-outline-success repondre';
              var buttonStyle = 'width: 100px;'; 
              
              return '<div class="btn-group" role="group">' +
                '<button type="button" class="btn ' + buttonClass + ' action-button mr-2" data-username="' + id + '" style="' + buttonStyle + '">' +
                buttonText +
                '</button>' +
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
          "emptyTable": "Aucune donnée disponible dans le tableau",
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


    function showaddcoo() {
        toastr.success('reponse envoyé avec succés')
    }
      function showupdatecoo() {
        toastr.success('contact mis a jour avec succés')
    }
    function showdeletecoo() {
      toastr.error('contact supprimé avec succés')
    }
   

  
      // Add event listener for status filter change
      $("#statusFilter").on("change", function () {
        var selectedValue = $(this).val();
    
        if (selectedValue === "all") {
          // Show all rows
          contactTable.column(6).search("").draw();
        } else {
          // Filter based on selected status value
          contactTable.column(6).search(selectedValue).draw();
        }
      });




    $(document).ready(function() {
        $(document).on('click', '.editz', function() {
          var id = $(this).data('username');
        
      
          $.ajax({
            url: WEBSERVER_URL + 'api/support/contact_form/' + id + '/',
            type: 'GET',
            success: function(response) {
              // Populate the input fields with the retrieved data
              $('#editsubject').val(response.subject);
              $('#editmessage').val(response.message);
              $('#editusername').val(response.username);
              $('#editemail').val(response.email);
      
              // Store the id in a data attribute of the form
              $('#editFormcont').data('username', id);
      
              // Open the edit modal
              $('#editModalcont').modal('show');
            },
            error: function(xhr, status, error) {
              // Handle error if necessary
            }
          });
        });
      
        $('#editFormcont').submit(function(e) {
          e.preventDefault();
      
          var id = $(this).data('username'); // Retrieve the id from the form data attribute
        
          var formData = {
            subject: $('#editsubject').val(),
            message: $('#editmessage').val(),
            username: $('#editusername').val(),
            email: $('#editemail').val()
          };
      
          var encodedData = Object.keys(formData)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
            .join('&');
      
          $.ajax({
            url: WEBSERVER_URL + 'api/support/contact_form/' + id + '/',
            type: 'PUT',
            data: encodedData,
            contentType: 'application/x-www-form-urlencoded',
            success: function(response) {
              // Handle success response
              console.log(response);
              showupdatecoo();
              contactTable.ajax.reload();
              // Close the edit modal
              $('#editModalcont').modal('hide');
              // Perform any other actions needed
            },
            error: function(xhr, status, error) {
              // Handle error if necessary
            }
          });
        });
      });
      
      








    $(document).on('click', '.deletex', function () {
        var id = $(this).data('username');
        var apiUrl = WEBSERVER_URL + 'api/support/contact_form/' + id + '/';
      
        // Show the confirmation modal
        $('#deleteModalcont').modal('show');
      
        // Handle the delete confirmation
        $('#confirmDelete').on('click', function () {
          // Use the appropriate AJAX method to send the delete request
          $.ajax({
            url: apiUrl,
            type: 'DELETE',
            success: function (response) {
              // Handle the success response here
              console.log('Item deleted successfully');
              contactTable.ajax.reload();
              showdeletecoo();
              $('#deleteModalcont').modal('hide');
              // You can perform additional actions if needed
            },
            error: function (xhr, status, error) {
              // Handle the error response here
              console.error(error);
              // You can display an error message or perform other actions if needed
            }
          });
      
          // Hide the confirmation modal
          $('#cancelReplyBtn1').modal('hide');
        });
        $('#cancelReplyBtn1').on('click', function () {


          $('#deleteModalcont').modal('hide');
        });
      
      
      });
      








// Retrieve the form element
const addFormcont = document.getElementById('addFormcont');

// Add a submit event listener to the form
addFormcont.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the form from submitting normally

  // Get the form values
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;



  // Create the payload object with the coordinates
  const payload = new URLSearchParams();
  payload.append('subject', subject);
  payload.append('message', message);
  payload.append('username', username);
  payload.append('email', email);

  // Send a POST request to the API URL
  fetch( WEBSERVER_URL + 'api/support/contact_form/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: payload.toString()
  })
    .then(response => response.json())
    .then(data => {
      console.log('New coordinate added:', data);
      contactTable.ajax.reload();
      $('#addModalcont').modal('hide');
      showaddcoo();
    })
    .catch(error => {
      console.error('Error adding coordinate:', error);
      // Handle the error
    });
});








// Add a click event listener to each "Repondre" button
$(document).on('click', '.repondre', function () {
  var id = $(this).data('username');

  var apiUrl = WEBSERVER_URL + 'api/support/contact_form/answer_message_contact/';

  $('#replyModal').modal('show');

  $('#cancelReplyBtn').on('click', function () {

    $('#replyMessage').val('');

    $('#replyMessage').removeClass('is-invalid');
    $('#replyMessageError').hide();

    $('#replyModal').modal('hide');
  });


  $('#replyForm').on('submit', function (event) {

    
    event.preventDefault(); 

    var message = $('#replyMessage').val().trim();

    // Perform input validation
    if (message === '') {
      // Show error message and add invalid class to the textarea
      $('#replyMessage').addClass('is-invalid');
      $('#replyMessageError').show();
    } 
  });

  $('#sendReplyBtn').on('click', function () {
    Swal.fire({
      title: 'Confirmation',
      text: 'Êtes-vous sûr de vouloir envoyer cette réponse ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, envoyer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#6c757d"
    }).then((result) => {
      if (result.isConfirmed) {
    var message = $('#replyMessage').val();

    var formData = new FormData();
    formData.append('id_demand', id);
    formData.append('message', message);
    console.log('formData:', formData);
    $.ajax({
      url: apiUrl,
      type: 'PATCH',
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        contactTable.ajax.reload();
        showaddcoo();
        console.log('Reply sent successfully');
      },
      error: function (xhr, status, error) {
       
        console.error(error);
  
      }
    });

    $('#replyMessage').val('');

    $('#replyMessage').removeClass('is-invalid');
    $('#replyMessageError').hide();

    $('#replyModal').modal('hide');

    $('#confirmationModal').modal('hide');
  }
});
});

});});