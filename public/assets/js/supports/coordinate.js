$(document).ready(function () {
    // Initialisez le DataTable sur la table des utilisateurs
    var coordinatTable = $("#coordinatTable").DataTable({
        ajax: {
            url: WEBSERVER_URL + 'api/support/coordonate/',
            type: "GET",
            dataType: "json",
            dataSrc: "", // Utilisez une chaîne vide pour spécifier que les données sont directement accessibles
        },
        columns: [
            {
                data: "id",
                visible: false,
                className: "hidden-column"
            },
            { data: "email" },
            { data: "phone" },
            { data: "address" },
            { data: "country" },
            {
                // Colonne d'action
                data: null,
                render: function (data, type, row) {
                    var id = row.id;
                    return '<div class="btn-group" role="group">' +
                    '<button type="button" class="btn btn-outline-info edits mr-2" data-username="' + id + '">' +
                      ' Éditer' +
                    '</button>' +
                    '<button type="button" class="btn btn-outline-danger deletez" data-username="' + id + '">' +
                      ' Supprimer' +
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
        toastr.success('coordonnée ajouté avec succés')
    }
      function showupdatecoo() {
        toastr.success('coordonnée mis a jour avec succés')
    }
    function showdeletecoo() {
      toastr.error('coordonnée supprimé avec succés')
    }


    $(document).ready(function() {
      $(document).on('click', '.edits', function() {
        var id = $(this).data('username');
        $.ajax({
          url: WEBSERVER_URL + 'api/support/coordonate/' + id + '/',
          type: 'GET',
          success: function(response) {
            // Populate the input fields with the retrieved data
            $('#editEmail').val(response.email);
            $('#editPhone').val(response.phone);
            $('#editAddress').val(response.address);
    
            // Create an array of country options
            var countryOptions = [
              'Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda',
              'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium',
              'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bonaire, Sint Eustatius and Saba', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island',
              'Brazil', 'British Indian Ocean Territory', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada',
              'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros',
              'Congo', 'Congo (the Democratic Republic of the)', 'Cook Islands', 'Costa Rica', 'Côte d\'Ivoire', 'Croatia', 'Cuba', 'Curaçao', 'Cyprus',
              'Czechia', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea',
              'Estonia', 'Eswatini', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia',
              'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe',
              'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island and McDonald Islands', 'Holy See', 'Honduras',
              'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan',
              'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya',
              'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands',
              'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia (Federated States of)', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro',
              'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua',
              'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'North Korea', 'North Macedonia', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan',
              'Palau', 'Palestine, State of', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico',
              'Qatar', 'Réunion', 'Romania', 'Russia', 'Rwanda', 'Saint Barthélemy', 'Saint Helena, Ascension and Tristan da Cunha', 'Saint Kitts and Nevis',
              'Saint Lucia', 'Saint Martin (French part)', 'Saint Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino',
              'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten (Dutch part)',
              'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'South Korea',
              'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
              'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Türkiye', 'Turkmenistan',
              'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States Minor Outlying Islands',
              'United States of America', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Virgin Islands (British)', 'Virgin Islands (U.S.)',
              'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'
            ];
    
            // Populate the select field with country options
            $('#editCountry').empty(); // Clear existing options
            $.each(countryOptions, function(index, country) {
              $('#editCountry').append($('<option>', {
                value: country,
                text: country
              }));
            });
    
            // Set the selected value based on the retrieved response
            $('#editCountry').val(response.country);
    
            // Store the id in a data attribute of the form
            $('#editFormcoo').data('username', id);
    
            // Open the edit modal
            $('#editModalcoo').modal('show');
            },
            error: function(xhr, status, error) {
              // Handle error if necessary
            }
          });
        });
      
        $('#editFormcoo').submit(function(e) {
          e.preventDefault();
      
          var id = $(this).data('username'); // Retrieve the id from the form data attribute
         
          var formData = {
            email: $('#editEmail').val(),
            phone: $('#editPhone').val(),
            address: $('#editAddress').val(),
            country: $('#editCountry').val()
          };
      
          var encodedData = Object.keys(formData)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
            .join('&');
      
          $.ajax({
            url: WEBSERVER_URL + 'api/support/coordonate/' + id + '/',
            type: 'PATCH',
            data: encodedData,
            contentType: 'application/x-www-form-urlencoded',
            success: function(response) {
              // Handle success response
              console.log(response);
              showupdatecoo();
              coordinatTable.ajax.reload();
              // Close the edit modal
              $('#editModalcoo').modal('hide');
              // Perform any other actions needed
            },
            error: function(xhr, status, error) {
              // Handle error if necessary
            }
          });
          
        });
     
      $('#cancelReplyBtn2').on('click', function () {


        $('#editModalcoo').modal('hide');
      });

      });
      
      








    $(document).on('click', '.deletez', function () {
        var id = $(this).data('username');
      
      
        // Show the confirmation modal
        $('#deleteModalcoo').modal('show');
      
        // Handle the delete confirmation
        $('#confirmDelete').on('click', function () {
          // Use the appropriate AJAX method to send the delete request
          $.ajax({
            url: WEBSERVER_URL + 'api/support/coordonate/' + id + '/',
            type: 'DELETE',
            success: function (response) {
              // Handle the success response here
              console.log('Item deleted successfully');
              coordinatTable.ajax.reload();
              showdeletecoo();
              $('#deleteModalcoo').modal('hide');
              // You can perform additional actions if needed
            },
            error: function (xhr, status, error) {
              // Handle the error response here
              console.error(error);
              // You can display an error message or perform other actions if needed
            }
          });
      
          // Hide the confirmation modal
          $('#deleteModalcoo').modal('hide');
        });
        $('#cancelReplyBtn3').on('click', function () {


          $('#deleteModalcoo').modal('hide');
        });
      });
      








// Retrieve the form element
const addForm = document.getElementById('addForm');
const addModalcoo = document.getElementById('addModalcoo');
const closeButton = addModalcoo.querySelector('#fermert');
// Add a submit event listener to the form
addForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the form from submitting normally

  // Get the form values
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const country = document.getElementById('country').value;


  // Create the payload object with the coordinates
  const payload = new URLSearchParams();
  payload.append('email', email);
  payload.append('phone', phone);
  payload.append('address', address);
  payload.append('country', country);
 
  // Send a POST request to the API URL
  fetch( WEBSERVER_URL + 'api/support/coordonate/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: payload.toString()
  })
    .then(response => response.json())
    .then(data => {
      closeButton.click();
      if(Array.isArray(data.country)){
        toastr.error('Le pays déjà existant');
      }
      else{
        coordinatTable.ajax.reload();
        showaddcoo();
      }
      
    })
    .catch(error => {
      console.error('Error adding coordinate:', error);
      // Handle the error
    });

});

document.getElementById('addForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  var inputs = this.getElementsByTagName('input');
  var emptyInputs = [];

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value === '') {
      emptyInputs.push(inputs[i]);
    }
  }

  var select = this.getElementsByTagName('select')[0];
  if (select.value === '') {
    emptyInputs.push(select);
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