$(document).ready(function () {
    // Récupère l'ID à partir de l'URL
    const urlParams = window.location.href;
    const childId = urlParams.split('/').pop();
    console.log(childId);
    var selectedPlatformId; // Variable pour stocker l'ID de la plateforme sélectionnée
    var selectedPlatformName; // Variable pour stocker le nom de la plateforme sélectionnée
    $.ajax({
        url: CRAWLSERVER_URL + 'social-media-list/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var options = '';
            for (var i = 0; i < data.length; i++) {
                options += '<option value="' + data[i].id + '">' + data[i].media_name + '</option>';
            }
        $('#social-media-select2').append(options);
            // Mettre à jour les variables "selectedPlatformId" et "selectedPlatformName" lorsque la sélection change

            $('#social-media-select2').on('change', function () {

                selectedPlatformId = $(this).val();

                selectedPlatformName = $(this).find('option:selected').text();

            });
            console.log(data);

            $('#social-media-select2').val(data[0].id).trigger('change');
        }
    });

    $('#add-mauelle-btn').on('click', function () {

        $('#username-input').removeClass('is-invalid');

        $('#social-media-select2').removeClass('is-invalid');

        $('#username-input').closest('.form-group').append(error);

        var urlParams = new URLSearchParams(window.location.search);

        var child = urlParams.get('id');

        var pseudo = $('#username-input').val(); // Récupérer la valeur de l'input

        var social_media_name = selectedPlatformId; // Récupérer l'ID de la plateforme sélectionnée

        var social_media = selectedPlatformName; // Récupérer le nom de la plateforme sélectionnée

        var url = 'https://' + social_media + '.com/' + pseudo; // Construire le lien

        console.log(social_media_name);

        console.log(selectedPlatformName);

        console.log(pseudo);

        console.log(url);
        if (pseudo !== '' && social_media_name !== '') {

            var apiUrl = WEBSERVER_URL + 'profiles/';

            var params = {

                child: child,

                pseudo: pseudo,

                social_media_name: social_media_name,

                url: url

            };

            confirmAndSendRequest(params, apiUrl);

        } else {

            var error = $('<div>').text('Veuillez saisir des données valides.').addClass('invalid-feedback');

            error.addClass('invalid-feedback');

            $('#username-input').addClass('is-invalid');

            $('#social-media-select2').addClass('is-invalid');

            $('#username-input').closest('.form-group').append(error);

        }
    });
    //retour button

    $('#retour-btn-manuel').on('click', function () {

        window.location.href = '/profils';

    });
});