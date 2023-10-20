$(document).ready(function () {
    bsCustomFileInput.init();
    validateInputs();
  
    // Get the id from the URL using JavaScript

    var url = window.location.href; // Get the current full URL
    var id = url.split('/').pop();
    console.log(id); // Output: 2
    console.log(WEBSERVER_URL)
    // Function to fetch child data
    function fetchChildData() {
      $.ajax({
        type: 'GET',
        url: WEBSERVER_URL + 'api/childs/' + id,
        contentType: 'application/json; charset=utf-8',
        data: {},
       
        success: function (data) {
          $('#name').val(`${data.user.first_name} ${data.user.last_name}`);
          $('#address').val(data.address || '');
        },
      });
    }
  
    // Function to handle social media results
    function handleSocialMediaResults(platformId, url, containerId) {
      var selectedUsername = '';
  
      function showError(message) {
        var error = $('<div>')
          .text(message)
          .addClass('invalid-feedback');
        error.addClass('invalid-feedback');
        $('#name').addClass('is-invalid');
        $('#name').closest('.form-group').append(error);
        $(containerId).html(
          '<div class="alert text-danger d-flex align-items-center" role="alert">' +
            '<div style="margin-left: 40%;">' +
            message +
            ' </div>' +
            '</div>'
        );
      }
  
      function fetchResults() {
        var username = $('#name').val();
        var params = {
          name: username,
        };
  
        $.ajax({
          type: 'POST',
          url: url,
          data: params,
          beforeSend: function () {
            $(containerId).html(
              '<div class="text-center"><i class="fas fa-spinner fa-spin"></i> Chargement en cours...</div>'
            );
          },
          success: function (response) {
            $(containerId).empty();
  
            if (response.length === undefined) {
              showError(' Pas de résultat trouvé pour ce profil !');
            } else {
              $.each(response, function (index, result) {
                $(containerId).append(
                  '<div class="user-block" style="display:flex">' +
                    '<div style="display:block">' +
                    '<img class="img-circle img-bordered-sm" src="' + result.image + '" alt="user image">' +
                    '<span class="name"><i class="fab ' + getSocialMediaIconClass(platformId) + '"></i><a href="' + result.link + '" target="_blank">' + result.user_name + '</a></span>' +
                    '<span class="username" data-username="' + result.user_name +'" data-userid="' + result.user_id +'">' +'@' +result.user_id +'</span>' +
                    '</div>' +
                    '<div class="form-check float-right">' +
                    '<label class="main-label">' +
                    '<input class="form-check-input" type="radio" name="r3" id="radioSuccess2" aria-label="...">' +
                    '</label>' 
                    +'</div>'
                    +'</div>'
                );
  
                $('input[type=radio][name=r3]').change(function () {
                  $('.user-block').removeClass('selected');
                  var username = $(this).closest('.user-block').find('.username').text();
                  selectedUsername = username;
                  $(this).closest('.user-block').addClass('selected');
                });
              });
            }
          },
          error: function (xhr, status, error) {
            var errorMessage = JSON.parse(xhr.responseText).message;
            $(containerId).html(
              '<div class="alert text-danger" role="alert" style="text-align: center">' +
                errorMessage +
                '</div>'
            );
          },
        });
      }
  
      $('#add-profile-btn').on('click', function () {
        console.log(id)
        if (selectedUsername) {
          var child = id;
          var pseudo = selectedUsername;
          var social_media_name = platformId;
          var params = {
            child: child,
            pseudo: pseudo,
            social_media_name: social_media_name,
          };
          var requestUrl = WEBSERVER_URL + 'api/profiles/';
          confirmAndSendRequest(params, requestUrl);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Veuillez choisir un profil !',
          });
        }
      });
  
      $('#name').removeClass('is-invalid');
      $('#name').closest('.form-group').find('.invalid-feedback').remove();
      if ($('#name').val() === '') {
        showError('Veuillez saisir un nom valide.');
      } else {
        $(containerId).html(
          '<div class="text-center"><i class="fas fa-spinner fa-spin"></i> Chargement en cours...</div>'
        );
        fetchResults();
      }
    }
  
    // Social media platforms array
    var socialMediaPlatforms = [
      {
        id: 1,
        tabId: '#twitter-tab',
        url: PROFIL_SEARCH_URL + 'twitter/',
        containerId: '#twitter-results',
      },
      {
        id: 8,
        tabId: '#facebook-tab',
        url: PROFIL_SEARCH_URL + 'facebook/',
        containerId: '#facebook-results',
      },
      {
        id: 6,
        tabId: '#pinterest-tab',
        url: PROFIL_SEARCH_URL + 'pinterest/',
        containerId: '#pinterest-results',
      },
      {
        id: 2,
        tabId: '#instagram-tab',
        url: PROFIL_SEARCH_URL + 'instagram/',
        containerId: '#instagram-results',
      },
      {
        id: 3,
        tabId: '#youtube-tab',
        url: PROFIL_SEARCH_URL + 'youtube/',
        containerId: '#youtube-results',
      },
      {
        id: 7,
        tabId: '#reddit-tab',
        url: PROFIL_SEARCH_URL + 'reddit/',
        containerId: '#reddit-results',
      },
      {
        id: 11,
        tabId: '#gamespot-tab',
        url: PROFIL_SEARCH_URL + 'gamespot/',
        containerId: '#gamespot-results',
      },
      {
        id: 5,
        tabId: '#tumblr-tab',
        url: PROFIL_SEARCH_URL + 'tumblr/',
        containerId: '#tumblr-results',
      },
      {
        id: 9,
        tabId: '#quora-tab',
        url: PROFIL_SEARCH_URL + 'quora/',
        containerId: '#quora-results',
      },
     
      
      // Add more social media platforms here if needed
    ];
  
    // Event handlers for social media tabs
    $.each(socialMediaPlatforms, function (index, platform) {
      $(platform.tabId).on('click', function () {
        handleSocialMediaResults(platform.id, platform.url, platform.containerId);
      });
    });
    function getSocialMediaIconClass(platformId) {
        switch (platformId) {
            case 1: // Twitter
                return 'fa-twitter';
            case 2: // Instagram
                return 'fa-instagram';
            case 3: // YouTube
                return 'fa-youtube';
            case 4: // Snapchat
                return 'fa-snapchat';
            case 5: // tumblr
            return 'fa-tumblr';
            case 6: // pinterest
            return 'fa-pinterest';
            case 7: // reddit
            return 'fa-reddit';
            case 8: // facebook
            return 'fa-facebook';
            case 9: // quora
            return 'fa-quora';
            case 10: // adoasis
            return 'fa-adoasis';
            case 11: // gamespot
            return 'fa-gamespot';
            default:
                return 'fa-question'; // Icône par défaut si l'ID de la plateforme est inconnu
        }
    }
  
    // Fetch child data
    fetchChildData();

     //retour button
    $('#retour-btn').on('click', function () {
        window.location.href = '/profils';
    });
});



