// console.log("baseUrl :::::::::::::::::", baseUrl);

const genderFilter = document.getElementById("gender-filter");
const ageFilter = document.getElementById("age-filter");
const schoolFilter = document.getElementById("school-filter");
const searchChild = document.getElementById("search-child");
const mediaFilter = document.getElementById("media-filter");
function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthdate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthdate.getDate())
    ) {
        age--;
    }
    return age;
}

// Récupérer les profils de tous les enfants
let childProfiles;
// Function to render the social media icons
/* function loadData(url, table) {
  $.ajax({
    url: url,
    dataType: 'json',
    success: function (data) {
      $.ajax({
        url: globalConfig.WEBSERVER_URL + 'api/profiles/',
        dataType: 'json',
        success: function (response) {
          console.log(response);
          childProfiles = response;
          table.rows.add(data).draw();
          $("#loader").hide()
        }
      });
    }
  });
} */
async function loadData(url, table) {
    try {
        const [data, response] = await Promise.all([
            $.ajax({ url: url, dataType: "json" }),
            $.ajax({
                url: WEBSERVER_URL+"/api/profiles/",
                dataType: "json",
            }),
        ]);

        console.log(response);
        childProfiles = response;
        table.rows.add(data).draw();
        $("#loader").hide();
    } catch (error) {
        // Handle errors here
        console.error(error);
    }
}

$(document).ready(function () {
    // get all schools
    $.ajax({
        url: WEBSERVER_URL + 'api/schools',
        type: "GET",
        dataType: "json",
        success: function (response) {
          response.map((x)=>{
            var $option = $('<option></option>');
            $option.val(x.id);
            $option.text(x.name);
            $("#school-filter").append($option);
          });
        },
        error: function (xhr, status, error) {
          // Une erreur s'est produite lors de la récupération des données du profil
          console.log("Erreur lors de la récupération des données du profil :", error);
        }
      });
    let table = $("#myTable").DataTable({
        processing: true,
        // "serverSide": true,
        language: {
            sLengthMenu: " _MENU_ Enfants affichés ",
            sInfo: " _START_ &agrave; _END_ sur _TOTAL_ Enfants  ",
            sInfoFiltered: "(filtr&eacute; de _MAX_ enfants au total)",
            sInfoEmpty: "Affichage de l'enfant 0 &agrave; 0 sur 0 enfants",
            sEmptyTable: "Pas d'enfants inscrits.",
            sInfoPostFix: "",
            oPaginate: {
                sFirst: '<span style="color: #6666FF;">Premier</span>',
                sPrevious: '<span style="color: #6666FF;">Précédent</span>',
                sNext: '<span style="color: #6666FF;">Suivant</span>',
                sLast: '<span style="color: #6666FF;">Dernier</span>',
            },
            oAria: {
                sSortAscending:
                    ": activer pour trier la colonne par ordre croissant",
                sSortDescending:
                    ": activer pour trier la colonne par ordre d&eacute;croissant",
            },
        },
        initComplete: function (settings, json) {
            // console.log('@@@ init complete @@@');
            $("#myTable tbody").html(
                '<tr><td colspan="8" class="text-center"><i class="fas fa-spinner fa-spin"></i> Chargement en cours...</td></tr>'
            );
        },
        lengthChange: true,
        searching: true,
        lengthMenu: [5, 10, 25, 50], // Set the options for the number of rows per page
        pageLength: 5, // Set the default number of rows per page
        ordering: true,
        info: true,
        autoWidth: true,
        responsive: true,
        /* "columnDefs": [
      {
        "targets": [0, 2],
        "orderable": false
      },
      {
        "targets": -1,
        "orderable": false,
        "width": 350
      }
    ], */
        columns: [
            {
                data: null,
                render: function (data, type, full, meta) {
                    return meta.row + 1;
                },
            },
            {
                data: "user.photo",
                render: function (data, type, full, meta) {
                    console.log(data);
                    return (
                        '<img class="img-circle img-bordered-sm" src="' +
                        (data ? data : "assets/img/blank.png") +
                        '" width="40" height="40">'
                    );
                },
            },
            {
                data: null,
                render: function (data, type, full, meta) {
                    return full.user.first_name + " " + full.user.last_name;
                },
            },
            {
                data: "user.gender",
                render: function (data, type, full, meta) {
                    return data == "M"
                        ? "Masculin"
                        : data === "N"
                        ? "Autre"
                        : "Feminin";
                },
            },
            {
                data: "user.birthday",
                render: function (data, type, full, meta) {
                    return calculateAge(data);
                },
            },
            {
                data: null,
                render: function (data, type, full, meta) {
                    let images = "";
                    childProfiles.forEach(function (profile) {
                        if (profile.child == full.id) {
                            images +=
                                '<img class="media-img img-circle mr-2" src="assets/img/' +
                                profile.social_media +
                                '.png" width="25" height="25">';
                        }
                    });
                    return images;
                },
            },
            {
                data: null,
                render: function (data, type, full, meta) {
                    return (
                        '<div class="btn-group d-flex space-evenly" role="group">' +
                        '<a class="btn btn-outline-primary btn-sm mr-2" href="' +
                        // baseUrl +
                        `/profils/add/${full.id}` +
                
                        '" data-id="' +
                        full.id +
                        '"><i class="fas fa-search mx-2"></i>Chercher le profil</a>' +
                        '<a class="btn btn-outline-warning btn-sm" href="' +
                        // baseUrl +
                        "/profils/details/" +
                        full.id +
                        '" data-id="' +
                        full.id +
                        '"><i class="fas fa-eye mx-2"></i>Détails profile</a>' +
                        "</div>"
                    );
                },
            },
        ],
        order: [[5, "desc"]], // Order by the 6th column (index 5) in descending order
    });

    // Load list child
    loadData(WEBSERVER_URL+"/api/childs/", table);
    // Load list child per school
    searchChild.addEventListener("click", () => {
        let idNiveau = $("#niveau-filter").val();
        let idSchool = $("#school-filter").val();
        console.log("ecole" + idSchool + " Niveau" + idNiveau);
        // Clear previous invalid feedback and class
        $("#school-filter").removeClass("is-invalid");
        $("#school-filter")
            .closest(".col-md-4")
            .find(".invalid-feedback")
            .remove();
        $("#niveau-filter").removeClass("is-invalid");
        $("#niveau-filter")
            .closest(".col-md-4")
            .find(".invalid-feedback")
            .remove();
        table.clear().draw();
        if (idNiveau && idSchool) {
            $.ajax({
                url: `${WEBSERVER_URL}/api/classes/child_by_class_id/?class_id=${idSchool}`,
                dataType: "json",
                success: function (data) {
                    table.clear().rows.add(data).draw();
                },
            });
        } else if (!idSchool) {
            let error = $("<div>")
                .text("Veuillez choisir une école.")
                .addClass("invalid-feedback");
            $("#school-filter").addClass("is-invalid");
            let errorContainer = $("#school-filter").closest(".col-md-4");
            errorContainer.append(error);
        } else if (!idNiveau) {
            let error = $("<div>")
                .text("Veuillez choisir un niveau.")
                .addClass("invalid-feedback d-block");
            $("#niveau-filter").addClass("is-invalid");
            let errorContainer = $("#niveau-filter").closest(".col-md-4");
            errorContainer.append(error);
        }
    });

    //filter list student per gender
    genderFilter.addEventListener("change", () => {
        table.column(3).search(genderFilter.value).draw();
    });

    //filter list student per age
    $("#age-filter").change(function () {
        let val = $.fn.dataTable.util.escapeRegex($(this).val());
        //console.log(val);
        if (val === "") {
            table.column(4).search("").draw();
        } else if (val === "0to12") {
            table.column(4).search("^(0?[0-9]|1[01])$", true, false).draw();
        } else if (val === "12to18") {
            table.column(4).search("^(1[2-7])$", true, false).draw();
        } else if (val === "gt18") {
            table
                .column(4)
                .search("^2[1-9]|[3-9]\\d|\\d{3,}$", true, false)
                .draw();
        }
    });

    //filtre liste student per social media profile
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
        let mediaFilter = $("#media-filter").val();
        if (mediaFilter === "") {
            return true;
        } else if (mediaFilter === "has_media") {
            return (
                $(table.cell(dataIndex, 5).node()).find(".media-img").length > 0
            );
        } else if (mediaFilter === "no_media") {
            return (
                $(table.cell(dataIndex, 5).node()).find(".media-img").length ===
                0
            );
        }
        return true;
    });

    $("#media-filter").change(function () {
        let mediaFilter = $(this).val();
        if (mediaFilter === "") {
            table.column(5).search("").draw();
        } else if (mediaFilter === "has_media") {
            table.column(5).search("").draw();
        } else if (mediaFilter === "no_media") {
            table.column(5).search("").draw();
        }
    });

    // liste  classe for each  school
    $("#school-filter").on("change", () => {
        let id = $("#school-filter").val();
        //console.log(id);
        //let url = `http://api.shield.kaisens.fr/api/classes/child_by_class_id/?class_id=${id}`;
        let url = `${WEBSERVER_URL}/api/schools/class_by_school_id/?school_id=${id}`;
        if (id) {
            $.ajax({
                url: url,
                success: (data) => {
                    // console.log(data);
                    $("#niveau-filter").empty();
                    $("#niveau-filter").prop("disabled", false);
                    $("#niveau-filter").append(
                        ' <option value="">Choisir un niveau</option>'
                    );
                    data.forEach((niveau) =>
                        $("#niveau-filter").append(
                            `<option value="${niveau.id}">${niveau.name}</option>`
                        )
                    );
                },
            });
        } else if (!id) {
            $("#niveau-filter").empty().prop("disabled", true);
            $("#myTable tbody").html(
                '<tr><td colspan="8" class="text-center"><i class="fas fa-spinner fa-spin"></i> Chargement en cours...</td></tr>'
            );
            loadData(WEBSERVER_URL+"/api/childs/", table);
        }
    });
});
