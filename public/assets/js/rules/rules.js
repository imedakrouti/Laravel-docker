const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  iconColor: "White",
  customClass: {
    popup: "colored-toast",
  },
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
var selectedRowData;
var lastSelectedRow = null;
$(document).ready(function () {
    // Get All Country for add rule
    $.ajax({
     url: WEBSERVER_URL +"api/countries/",
     type: "GET",
     dataType: "json",
     success: function(countries) {
       // Generate the country options
       var countryOptions = countries.map(function(country) {
         return '<option value="' + country.name + '">' + country.name + '</option>';
       });
   
       // Append the country options to the select element
       $('#country').html(countryOptions.join(''));
       $('#countryMod').html(countryOptions.join(''));
 
     },
     error: function(xhr, status, error) {
       // Handle the error while fetching countries
       console.error("Error fetching countries:", error);
     }
   });
  //var selectedIds
  var regleTable = $("#regleTable").DataTable({
    ajax: {
      url: WEBSERVERRules_URL + "rules",

      type: "GET",
      dataType: "json",
      dataSrc: "",
      rejectUnauthorized: false, // Add this option to bypass SSL verification
    },
    columns: [
      {
        data: "id",
        visible: false,
        className: "hidden-column",
      },
      { data: "name" },
      { data: "description" },
      { data: "type" },
      {
        data: "disabled",
        render: function (data, type, row) {
          var status = data === false ? "Active" : "Inactive";
          var badgeClass = data === false ? "badge-success" : "badge-danger";
          return '<span class="badge ' + badgeClass + '">' + status + "</span>";
        },
      },
      {
        data: null,
        // responsivePriority: 1, // Set a responsive priority for this column
        render: function (data, type, row) {
          var id = row.rule_id;
          var deleteIcon = '<i class="fas fa-trash-alt"></i>'; // Font Awesome trash icon
          var modifyIcon = '<i class="fas fa-edit"></i>'; // Font Awesome edit icon
          var infoIcon = '<i class="fas fa-info-circle"></i>'; // Font Awesome info icon

          var deleteButtonClass = "btn-outline-danger deleted";
          var modifyButtonClass = "btn-outline-info modified";
          var infoButtonClass = "btn-outline-primary info-button";
          var buttonStyle = "width:80;";

          return (
            '<div class="btn-group d-flex justify-content-center" role="group">' +
            // '<div class="btn-group" role="group">' +
            '<button type="button" class="btn ' +
            infoButtonClass +
            ' action-button mr-2 info-button" data-name="' +
            id +
            '" style="' +
            buttonStyle +
            '">' +
            infoIcon +
            // " Info" + // Here, we include the text "Info" after the icon
            "</button>" +
            '<button type="button" class="btn ' +
            "</button>" +
            "</div>"
          );
        },
      },
    ],
    columnDefs: [
      {
        targets: -1, // Index of the last column (0-based)
        width: "100px", // Set the desired width for the last column here
      },
    ],

    responsive: true,
    responsive: {
      details: {
        // type: "column",
        //target: -1, // Index of the last column (info-button column)
        renderer: function (api, rowIdx, columns) {
          var data = $.map(columns, function (col, i) {
            if (col.hidden) {
              return (
                '<tr data-dt-row="' +
                col.rowIndex +
                '" data-dt-column="' +
                col.columnIndex +
                '">' +
                "<td>" +
                col.title +
                ":</td>" +
                "<td>" +
                col.data +
                "</td>" +
                "</tr>"
              );
            } else {
              return "";
            }
          }).join("");

          return data ? $("<table>").append(data) : false;
        },
      },
    },

    language: {
      // French language configuration here
      sProcessing: "Traitement en cours...",
      sSearch: "Rechercher&nbsp;:",
      sLengthMenu: " _MENU_ Règels affichées ",
      sInfo: " _START_ &agrave; _END_ sur _TOTAL_ règles",
      sInfoEmpty: "Affichage du règle 0 &agrave; 0 sur 0 règles",
      sInfoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
      sInfoPostFix: "",
      sLoadingRecords: "Chargement en cours...",
      sZeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",
      sEmptyTable: "Veuillez sélectionner une règle.",
      oPaginate: {
        sFirst: '<span style="color: #6666FF;">Premier</span>',
        sPrevious: '<span style="color: #6666FF;">Précédent</span>',
        sNext: '<span style="color: #6666FF;">Suivant</span>',
        sLast: '<span style="color: #6666FF;">Dernier</span>',
      },
      oAria: {
        sSortAscending: ": activer pour trier la colonne par ordre croissant",
        sSortDescending:
          ": activer pour trier la colonne par ordre d&eacute;croissant",
      },
    },
    lengthMenu: [5, 10, 25, 50], // Set the options for the number of rows per page
    pageLength: 5, // Set the default number of rows per page
    dom: '<"top"l<"float-left"f>rtip>',
    error: function (xhr, error, thrown) {
      // You can customize the error message here
      console.log("AJAX error:", error);
      //alert("An error occurred while loading data. Please try again later.");
    },
  });
  /*Detail Table*/
  var detailTable = $("#detailTable").DataTable({
    language: {
      // French language configuration here
      sProcessing: "Traitement en cours...",
      sSearch: "Rechercher&nbsp;:",
      sLengthMenu: " _MENU_ clauses",
      sInfo: " _START_ &agrave; _END_ sur _TOTAL_ clauses",
      sInfoEmpty: "Affichage de clause 0 &agrave; 0 sur 0 clause",
      sInfoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
      sInfoPostFix: "",
      sLoadingRecords: "Chargement en cours...",
      sZeroRecords: "Aucun clause &agrave; afficher",
      sEmptyTable: "Veuillez sélectionner une règle.",
      oPaginate: {
        sFirst: '<span style="color: #6666FF;">Premier</span>',
        sPrevious: '<span style="color: #6666FF;">Précédent</span>',
        sNext: '<span style="color: #6666FF;">Suivant</span>',
        sLast: '<span style="color: #6666FF;">Dernier</span>',
        sPageButton: '<span style="color: red;">_PAGE_</span>',
      },
      oAria: {
        sSortAscending: ": activer pour trier la colonne par ordre croissant",
        sSortDescending:
          ": activer pour trier la colonne par ordre d&eacute;croissant",
      },
    },
    lengthMenu: [5, 10, 25, 50], // Set the options for the number of rows per page
    pageLength: 5, // Set the default number of rows per page
    dom: '<"top"l<"float-left"f>rtip>',

    columns: [
      {
        data: null,
        render: function (data, type, row) {
          return (
            row.service_id_name +
            ': <span class="text-primary">' +
            row.label_id_name +
            " </span>"
          );
        },
      },
      { data: "type" },
      {
        data: "disabled",
        render: function (data, type, row) {
          var status = data === false ? "Active" : "Inactive";
          var badgeClass = data === false ? "badge-success" : "badge-danger";
          return '<span class="badge ' + badgeClass + '">' + status + "</span>";
        },
      },
      {
        data: "created_at",
        render: function (data, type, row) {
          var date = new Date(data);
          var formattedDate = date.toLocaleDateString(); // Format the date
          return formattedDate;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          var id = row.rule_id;
          var infoIcon = '<i class="fas fa-info-circle"></i>';
          var infoButtonClass = "btn-outline-primary info-button";
          var buttonStyle = "width:80;";

          return (
            '<div class="btn-group d-flex justify-content-center" role="group">' +
            '<button type="button" class="btn ' +
            infoButtonClass +
            ' action-button mr-2 info-button" data-name="' +
            id +
            '" style="' +
            buttonStyle +
            '">' +
            infoIcon +
            "</button>" +
            "</div>"
          );
        },
      },

      // Define additional columns as needed
    ],
    responsive: true,
    responsive: {
      details: {
        // type: "column",
        //target: -1, // Index of the last column (info-button column)
        renderer: function (api, rowIdx, columns) {
          var data = $.map(columns, function (col, i) {
            if (col.hidden) {
              return (
                '<tr data-dt-row="' +
                col.rowIndex +
                '" data-dt-column="' +
                col.columnIndex +
                '">' +
                "<td>" +
                col.title +
                ":</td>" +
                "<td>" +
                col.data +
                "</td>" +
                "</tr>"
              );
            } else {
              return "";
            }
          }).join("");

          return data ? $("<table>").append(data) : false;
        },
      },
    },
  });
  //colorer ligne selectionnée /////
  // Initialiser DataTable
  var table = $("#regleTable").DataTable();
  // Variable pour stocker la dernière ligne sélectionnée
  // Ajouter un écouteur d'événement pour la sélection de ligne
  $("#regleTable tbody").on("click", "tr", function () {
    // Si une ligne a déjà été sélectionnée, supprimer la classe 'selected'
    if (lastSelectedRow !== null) {
      $(lastSelectedRow).removeClass("selected");
    }
    // Sélectionner la nouvelle ligne en ajoutant la classe 'selected'
    $(this).addClass("selected");
    // Mettre à jour la variable avec la nouvelle ligne sélectionnée
    lastSelectedRow = this;
    // Vous pouvez accéder aux données de la ligne sélectionnée et effectuer des actions supplémentaires ici
    selectedRowData = table.row(".selected").data();
    console.log(selectedRowData); // Exemple : Afficher les données de la ligne sélectionnée dans la console
  });
  $("#deleteAllButton").on("click", function () {
    if (selectedRowData) {
      $("#deleteModalsup").modal("show");
    } else {
      Toast.fire({
        icon: "warning",
        title: "Veuillez sélectionner la règle à supprimer",
        position: "center center",
      });
    }
  });

  // Handle the "Info" button click event
  $("#regleTable").on("click", ".info-button", function () {
    var row = $(this).closest("tr");
    var rowData = regleTable.row(row).data();

    // Map age values to desired text
    var ageMapping = {
      child: "enfant",
      teenager: "adolescent",
      "young adult": "jeune adulte",
    };
    // Build the HTML for context_info
    var contextInfoHTML = "<ul>";
    // Add li for age
    if (rowData.context_info.age) {
      contextInfoHTML += "<li>Age: " + rowData.context_info.age + "</li>";
    } else {
      contextInfoHTML += "<li>Age:</li>"; // Empty li for Gender
    }
    // Add li for gender
    if (rowData.context_info.genre) {
      contextInfoHTML += "<li>Genre: " + rowData.context_info.genre + "</li>";
    } else {
      contextInfoHTML += "<li>Genre:</li>"; // Empty li for Gender
    }
    // Add li for country
    if(rowData.context_info.pays){
      contextInfoHTML += "<li>Pays: " + rowData.context_info.pays + "</li>";
    }
    else{
      contextInfoHTML += "<li>Pays: </li>";
    }
     // Add li for Professionnelle
     if(rowData.context_info.pays){
      contextInfoHTML += "<li>Professionnelle: " + rowData.context_info.professionnelle + "</li>";
    }
    else{
      contextInfoHTML += "<li>Professionnelle: </li>";
    }
     // Add li for Culture
     if(rowData.context_info.culture){
      contextInfoHTML += "<li>Culture: " + rowData.context_info.culture + "</li>";
    }
    else{
      contextInfoHTML += "<li>Culture: </li>";
    }
    contextInfoHTML += "</ul>";
    $("#context_info").html("Context Info:<br>" + contextInfoHTML);
    $("#regleName").html(`
    <div class="row">
      <div class="col-6 font-weight-bold">Nom :</div>
      <div class="col-6">
      <h5 class="m-0 p-0"> <span class="badge badge-pill badge-primary">${rowData.name}</span></h5>
      </div>
    </div>
  `);
    $("#regleDescription").html(`
  <div class="row">
    <div class="col-6 font-weight-bold">Description :</div>
    <div class="col-6">
    <h5 class="m-0 p-0"> <span class="badge badge-pill badge-primary">${rowData.description}</span></h5>
    </div>
  </div>
`);
    $("#regleType").html(`
<div class="row">
  <div class="col-6 font-weight-bold">Type de règle :</div>
  <div class="col-6">
  <h5 class="m-0 p-0"> <span class="badge badge-pill badge-primary">${rowData.type}</span></h5>
  </div>
</div>
`);
    $("#typeClause").html(`
<div class="row">
  <div class="col-6 font-weight-bold">Type clause :</div>
  <div class="col-6">
  <h5 class="m-0 p-0"> <span class="badge badge-pill badge-primary">${rowData.clause_type}</span></h5>
  </div>
</div>
`);
    $("#userInfoModal").modal("show");
  });
  document
    .getElementById("rulesForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission

      var inputs = this.getElementsByTagName("input");
      var emptyInputs = [];

      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
          emptyInputs.push(inputs[i]);
        }
      }

      var errorMessage = document.getElementById("errorMessage");

      if (emptyInputs.length > 0) {
        errorMessage.style.display = "block";
      } else {
        errorMessage.style.display = "none";
        //this.submit(); // Submit the form if all inputs are filled
      }

      // Remove existing error messages
      var existingErrorMessages = this.getElementsByClassName("error-message");
      while (existingErrorMessages.length > 0) {
        existingErrorMessages[0].remove();
      }
      // Display error messages for empty inputs
      for (var i = 0; i < emptyInputs.length; i++) {
        var input = emptyInputs[i];
        var errorElement = document.createElement("div");
        errorElement.className = "error-message";
        errorElement.style.color = "red";
        errorElement.textContent = "Veuillez remplir ce champ.";
        input.parentNode.appendChild(errorElement);
      }
    });
  ///Delete rules//
  // Event listener for the "Confirmer" button in the delete confirmation modal
  $("#confirmDeletesregle").on("click", function () {
    console.log(selectedRowData);
    if (selectedRowData) {
      // Make an API request to delete the selected elements
      $.ajax({
        url: WEBSERVERRules_URL + "rules/" + selectedRowData.id, // Update the URL to your delete endpoint
        type: "DELETE",
        data: { id: selectedRowData.id }, // Pass the array of selected IDs to the server
        success: function (response) {
          // Elements deleted successfully
          console.log("Elements deleted:", response);

          // Reload the DataTable to reflect the changes
          regleTable.ajax.reload();

          // Close the delete confirmation modal
          $("#deleteModalsup").modal("hide");
          Toast.fire({
            icon: "success",
            title: "Règle supprimée avec succès",
          });
        },
        error: function (xhr, status, error) {
          console.log("Error deleting elements:", error);
        },
      });
    }
  });

  // Ajoute un événement de clic sur les lignes du tableau "regleTable"
  $("#regleTable tbody").on("click", "tr", function () {
    // Obtient les données de la ligne sélectionnée
    var rowData = regleTable.row(this).data();
    var selectedId = rowData.id;
    // Fais une requête à l'API pour obtenir les détails de la règle avec l'ID sélectionné
    $.ajax({
      // url: "http://54.36.177.119:8010/rules/" + selectedId + "/",
      url: WEBSERVERRules_URL + "rules/" + selectedId + "/",
      type: "GET",
      dataType: "json",
      success: function (response) {
        // Met à jour le contenu du tableau "typeregleTable" avec le type de règle
        // typeregleTable.clear().row.add([response.type]).draw();

        console.log(response);
        clauses = response.clauses;
        detailTable.clear().draw();
        if (clauses.length > 0) {
          $("#detailTable tbody").html(
            '<tr><td colspan="8" class="text-center"><i class="fas fa-spinner fa-spin"></i> Chargement en cours...</td></tr>'
          );
          clauses.forEach((clause) => {
            $.ajax({
              url: WEBSERVERRules_URL + "clauses/" + clause + "/",
              type: "GET",
              dataType: "json",
              success: function (response) {
                detailTable.row.add(response).draw();
              },
              error: function (xhr, status, error) {
                console.log("Error fetching rule details:", error);
              },
            });
          });
        } else {
          $("#detailTable tbody").html(
            '<tr><td colspan="8" class="text-center"><i class="fa-solid fa-circle-exclamation text-danger"></i> Pas de clauses associées</td></tr>'
          );
        }
        // Met à jour le contenu du tableau "detailTable" avec les détails de la règle
      },
      error: function (xhr, status, error) {
        console.log("Error fetching rule details:", error);
      },
    });
  });
  ///Get details rules//
});

/////////////////Ajout echantillon ///////
$(document).on("submit", "#rulesForm", function (e) {
  e.preventDefault(); // Empêche la soumission par défaut du formulaire
  // Récupération des valeurs sélectionnées des listes déroulantes
  var inputs = this.getElementsByTagName("input");
  var emptyInputs = [];

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "") {
      emptyInputs.push(inputs[i]);
    }
  }

  var errorMessage = document.getElementById("errorMessage");

  // Remove existing error messages
  var existingErrorMessages = this.getElementsByClassName("error-message");
  while (existingErrorMessages.length > 0) {
    existingErrorMessages[0].remove();
  }

  if (emptyInputs.length > 0) {
    errorMessage.style.display = "block";
    emptyInputs.forEach(function (input) {
      var errorElement = document.createElement("div");
      errorElement.className = "error-message";
      errorElement.style.color = "red";
      errorElement.textContent = "Veuillez remplir ce champ.";
      input.parentNode.appendChild(errorElement);
    });
  } else {
    errorMessage.style.display = "none";

    var selectedGenre = $("#genre").val();
    var selectedAge = $("#age").val();
    var selectedCountry = $("#country").val();
    var culture = $("#culture").val();
    var professionnelle = $("#professionnelle").val();
    // Création de la chaîne de contexte en combinant les valeurs sélectionnées
    var contextInfo = {
      genre: selectedGenre,
      age: selectedAge,
      pays: selectedCountry,
      culture: culture,
      professionnelle: professionnelle
    };
    // Autres champs du formulaire
    var lname = document.getElementById("nom").value;
    var ldescription = document.getElementById("description").value;
    var ltyperegle = document.getElementById("type_regle").value;
    var ltypeclause = document.getElementById("type_clause").value;
    // Construction de l'objet de données
    var requestData = {
      name: lname,
      description: ldescription,
      type: ltyperegle,
      clause_type: ltypeclause,
      context_info: contextInfo, // Ajout de l'objet context_info
    };
    console.log(requestData);
    $.ajax({
      url: WEBSERVERRules_URL + "rules/",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(requestData),
      success: function (response) {
        Toast.fire({
          icon: "success",
          title: "Régle ajoutée avec succès",
        });
        table = $("#regleTable").DataTable();
        $("#rulesForm")[0].reset();
        table.ajax.reload();
        // Subject created successfully
        console.log("Subject created:", response);
        $("#ModalAjouterRegle").modal("hide");
      },
      error: function (xhr, status, error) {
        console.log("Error creating :", error);
      },
    });
  }
});
//////fin ajout///
//modification //

$(document).ready(function () {
  // Écouteur d'événement pour le bouton "Modifier Echantillon"
  $("#BtnEditRegle").on("click", function () {
    console.log(selectedRowData);
    // Récupérer les données de la ligne sélectionnée dans le tableau
    if (selectedRowData) {
      $("#editRegleModal").modal("show");
      // Pré-remplir le formulaire de modification avec les données récupérées
      $("#edit_name").val(selectedRowData.name);
      $("#edit_description").val(selectedRowData.description);
      $("#edit_type_regle").val(selectedRowData.type);
      $("#edit_type_clause").val(selectedRowData.clause_type);
      // Pré-remplir les champs de sélection pour le genre et l'âge
      $("#edit_genre").val(selectedRowData.context_info.genre);
      $("#edit_age").val(selectedRowData.context_info.age);
      $("#countryMod").val(selectedRowData.context_info.pays);
      $("#cultureMod").val(selectedRowData.context_info.culture);
      $("#professionnelleMod").val(selectedRowData.context_info.professionnelle);
    } else {
      Toast.fire({
        icon: "warning",
        title: "Veuillez sélectionner la règle à modifier",
        position: "center center",
      });
    }
  });
  // Écouteur d'événement pour le formulaire de modification
  $("#editFormRule").on("submit", function (e) {
    e.preventDefault(); // Empêcher le formulaire de se soumettre normalement

    // Récupérer les valeurs modifiées depuis le formulaire
    var editedName = $("#edit_name").val();
    var editedDescription = $("#edit_description").val();
    var editedType = $("#edit_type_regle").val();
    var editedTypeClause = $("#edit_type_clause").val();
    var editedGenre = $("#edit_genre").val();
    var editedAge = $("#edit_age").val();
    
    // Faire appel à l'API PUT pour modifier l'échantillon
    var apiUrl =
      WEBSERVERRules_URL + "rules/" + selectedRowData.id + "/";
    $.ajax({
      url: apiUrl,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify({
        name: editedName,
        description: editedDescription,
        type: editedType,
        clause_type: editedTypeClause,
        context_info: {
          genre: editedGenre,
          age: editedAge,
          pays: $('#countryMod').val(),
          culture: $('#cultureMod').val(),
          professionnelle: $('#professionnelleMod').val(),
        },
      }),
      success: function (response) {
        // Échantillon modifié avec succès
        console.log("Règle modifiée:", response);
        Toast.fire({
          icon: "success",
          title: "Règle modifiée avec succès",
        });
        var table = $("#regleTable").DataTable();
        table.ajax.reload();
        $("#editRegleModal").modal("hide"); // Fermer la fenêtre modale de modification
      },
      error: function (xhr, status, error) {
        console.log("Erreur lors de la modification de l'échantillon:", error);
      },
    });
  });
});

$("#BtnAjouteregle").on("click", function () {
  $("#ModalAjouterRegle").modal("show");
});
$("#BtnEditRegle").on("click", function () {});
$("#btnHideModalDelet").on("click", function () {
  $("#deleteModalsup").modal("hide");
});
$("#hideEditModal").on("click", function () {
  $("#editRegleModal").modal("hide");
  $("#editFormRule")[0].reset();
});
$("#detailTable").on("click", ".info-button", function () {
  var row = $(this).closest("tr");
  detailTable = $("#detailTable").DataTable();
  var rowData = detailTable.row(row).data();
  console.log(rowData);
  var createdDate = new Date(rowData.created_at);

  var formattedDate = createdDate.toLocaleDateString();
  // Show the Bootstrap modal with the user information and statistics
  $("#id_clause").html(`
                  <div class="row">
                    <div class="col-6 font-weight-bold">Id Clause:</div>
                    <div class="col-6">
                      <h5 class="m-0 p-0"><span class="badge badge-pill badge-primary">${rowData.id}</span></h5>
                    </div>
                  </div>
                `);

  $("#type_clause_").html(`
                  <div class="row">
                    <div class="col-6 font-weight-bold">Type Clause:</div>
                    <div class="col-6">
                    <h5 class="m-0 p-0"><span class="badge badge-pill badge-primary">${rowData.type}</span></h5>
                    </div>
                  </div>
                `);

  $("#status_clause").html(`
                  <div class="row">
                    <div class="col-6 font-weight-bold">Statut Clause:</div>
                    <div class="col-6">
                    <h5 class="m-0 p-0"> <span class="badge badge-pill ${
                      rowData.disabled ? "badge-danger" : "badge-success"
                    }">${rowData.disabled ? "Desactivé" : "Active"}</span></h5>
                    </div>
                  </div>
                `);

  $("#created_at_clause").html(`
                  <div class="row">
                    <div class="col-6 font-weight-bold">Date de création:</div>
                    <div class="col-6">
                    <h5 class="m-0 p-0"> <span class="badge badge-pill badge-primary">${formattedDate}</span></h5>
                    </div>
                  </div>
                `);

  $("#label_name").html(`
                  <div class="row">
                    <div class="col-6 font-weight-bold">Label service:</div>
                    <div class="col-6">
                    <h5 class="m-0 p-0"> <span class="badge badge-pill badge-primary">${rowData.label_id_name}</span></h5>
                    </div>
                  </div>
                `);
  $("#service_name").html(`
                  <div class="row">
                    <div class="col-6 font-weight-bold">Label service:</div>
                    <div class="col-6">
                    <h5 class="m-0 p-0"> <span class="badge badge-pill badge-primary">${rowData.service_id_name}</span></h5>
                    </div>
                  </div>
                `);

  $("#value_threshold_clause").html(`
                  <div class="row">
                    <div class="col-6 font-weight-bold">Value Threshold:</div>
                    <div class="col-6">
                    <h5 class="m-0 p-0"> <span class="badge badge-pill badge-primary">${rowData.value_threshold}</span></h5>
                    </div>
                  </div>
                `);

  $("#nb_occu_threshold_operator_clause").html(`
                  <div class="row">
                    <div class="col-6 font-weight-bold">Nb Occu Threshold Operator:</div>
                    <div class="col-6">
                    <h5 class="m-0 p-0"> <span class="badge badge-pill badge-primary">${rowData.nb_occu_threshold_operator}</span></h5>
                    </div>
                  </div>
                `);

  $("#value_thresh_operator_clause").html(`
                  <div class="row">
                    <div class="col-6 font-weight-bold">Value Thresh Operator:</div>
                    <div class="col-6">
                    <h5 class="m-0 p-0"> <span class="badge badge-pill badge-primary">${rowData.value_thresh_operator}</span></h5>
                    </div>
                  </div>
                `);

  $("#nb_occu_threshold_clause").html(`
                  <div class="row">
                    <div class="col-6 font-weight-bold">Nb Occu Threshold:</div>
                    <div class="col-6">
                    <h5 class="m-0 p-0"> <span class="badge badge-pill badge-primary">${rowData.nb_occu_threshold}</span></h5>
                    </div>
                  </div>
                `);

  $("#clauseInfoModal").modal("show");
});
