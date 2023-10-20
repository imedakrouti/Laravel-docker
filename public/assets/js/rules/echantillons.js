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
$(document).ready(function () {
  var selectedIds = [];

  var echantillonTable = $("#echantillonTable").DataTable({
    ajax: {
      url: WEBSERVERRules_URL + "sample",
      type: "GET",
      dataType: "json",
      dataSrc: "",
    },
    columns: [
      {
        data: "id",
        visible: false,
        className: "hidden-column",
      },
      { data: "name" },
      {
        data: "created_at",
        render: function (data) {
          // Format the date as YYYY-MM-DD
          return moment(data).format("DD-MM-YYYY");
        },
      },
      //   { data: null,
      //   render: function (data, type, full, meta) {
      //     var contextValue = data.context;
      //     conditions.forEach(function(condition) {
      //       if (contextValue === condition.id) {
      //           contextValue=condition.operator;
      //           return false
      //       }
      //     });
      //       return contextValue
      // }
      // },
      // {
      //   data: null,
      //   render: function (data, type, row) {
      //     return `
      //       <div class="btn-group d-flex justify-content-center" role="group">
      //         <button type="button" class="btn btn-outline-primary action-button mr-2 info-button" data-name="${row.id}" style="width: 80px;">
      //           <i class="fas fa-info-circle"></i>
      //         </button>
      //       </div>
      //     `;
      //   },
      // },
    ],
    columnDefs: [
      {
        targets: -1, // Index of the last column (0-based)
        width: "100px", // Set the desired width for the last column here
      },
    ],

    responsive: true,

    language: {
      // French language configuration here
      sProcessing: "Traitement en cours...",
      sSearch: "Rechercher&nbsp;:",
      sLengthMenu: " _MENU_ Échantillons affichés ",
      sInfo: " _START_ &agrave; _END_ sur _TOTAL_ Échantillons  ",
      sInfoEmpty:
        "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
      sInfoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
      sInfoPostFix: "",
      sLoadingRecords: "Chargement en cours...",
      sZeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",
      sEmptyTable:
        "Veuillez choisir un élément dans le tableau des échantillons.",
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
    rowCallback: function (row, data) {
      // Make the table rows clickable and selected in blue
      $(row).on("click", function () {
        $(this).toggleClass("selected");
        if ($(this).hasClass("selected")) {
          selectedIds.push(data.id);
        } else {
          selectedIds = selectedIds.filter((id) => id !== data.id);
        }
      });

      // Reset selectedIds when a DataTable page is changed
      echantillonTable.on("page.dt", function () {
        selectedIds = [];
      });
    },
    dom: '<"top"l<"float-left"f>rtip>',
  });
  var DetailsindividutTable = $("#DetailsindividutTable").DataTable({
    language: {
      // French language configuration here
      sProcessing: "Traitement en cours...",
      sSearch: "Rechercher&nbsp;:",
      sLengthMenu: "_MENU_ Détails individu affichés",
      sInfo: " _START_ &agrave; _END_ sur _TOTAL_ détails individu",
      sInfoEmpty:
        "Affichage de détails individu 0 &agrave; 0 sur 0 détails individu",
      sInfoFiltered: "(filtr&eacute; de _MAX_ détails individu au total)",
      sInfoPostFix: "",
      sLoadingRecords: "Chargement en cours...",
      sZeroRecords: "Aucun détails individu &agrave; afficher",
      sEmptyTable:
        "Veuillez choisir un échantillon dans le tableau des échantillons.",
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
    proccessing: true,
    responsive: true,
    columns: [
      {
        data: "user.first_name",
      },
      {
        data: "user.last_name",
      },
      {
        data: "user.gender",
        render: function (data, type, full, meta) {
          return data == "M" ? "Masculin" : data === "N" ? "Autre" : "Feminin";
        },
      },
      {
        data: "user.birthday",
        render: function (data) {
          /* var date=new Date("2023-06-09");
            console.log(date);
            console.log(data); */
          return moment(data).format("DD-MM-YYYY");
        },
      },
      {
        data: "country",
      },
      // Define additional columns as needed
    ],
  });

  DetailsindividutTable.draw();
  // ///////////////
  var contexteTable = $("#contexteTable").DataTable({
    language: {
      // French language configuration here
      sProcessing: "Traitement en cours...",
      sSearch: "Rechercher&nbsp;:",
      sLengthMenu: "_MENU_ Contexte affiché",
      sInfo: " _START_ &agrave; _END_ sur _TOTAL_ détails individu",
      sInfoEmpty: "Affichage de contexte 0 &agrave; 0 sur 0 ",
      sInfoFiltered: "(filtr&eacute; de _MAX_ détails individu au total)",
      sInfoPostFix: "",
      sLoadingRecords: "Chargement en cours...",
      sZeroRecords: "Aucun détails individu &agrave; afficher",
      sEmptyTable:
        "Veuillez choisir un échantillon dans le tableau des échantillons.",
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
    proccessing: true,
  });

  contexteTable.draw();
  //////////////////////////
  var DetailsContenuDonneesTable = $("#DetailsContenuDonneesTable").DataTable({
    language: {
      // French language configuration here
      sProcessing: "Traitement en cours...",
      sSearch: "Rechercher&nbsp;:",
      sLengthMenu: " _MENU_ Détails contenu affichés",
      sInfo: " _START_ &agrave; _END_ sur _TOTAL_ détails contenu",
      sInfoEmpty:
        "Affichage de détails contenu 0 &agrave; 0 sur 0 détails contenu",
      sInfoFiltered: "(filtr&eacute; de _MAX_ détails contenu au total)",
      sInfoPostFix: "",
      sLoadingRecords: "Chargement en cours...",
      sZeroRecords: "Aucun détails contenu &agrave; afficher",
      sEmptyTable: "Veuillez choisir un élément dans le tableau des individus.",
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
    responsive: true,
    columns: [
      {
        data: "data_content",
      },
      // Define additional columns as needed
    ],
  });
  DetailsContenuDonneesTable.draw();

  $(document).ready(function () {
    // Première section : Récupérer les ID d'individus et afficher les détails dans des onglets
    $("#echantillonTable tbody").on("click", "tr", function () {
      var echantillonTable = $("#echantillonTable").DataTable();
      var DetailsindividutTable = $("#DetailsindividutTable").DataTable();
      var row = $(this).closest("tr");
      var rowData = echantillonTable.row(row).data();
      var sampleName = rowData.name;
      var apiUrl =
        WEBSERVERRules_URL +
        "sample/list/individuals/?sample_name=" +
        encodeURIComponent(sampleName);
      console.log(apiUrl);
      console.log(rowData);

      // Show spinner before making the API request
      $("#DetailsindividutTable tbody").html(
        '<tr><td colspan="8" class="text-center"><i class="fas fa-spinner fa-spin"></i> Chargement en cours...</td></tr>'
      );

      // Hide the message
      $("#DetailsContenuDonneesTable").DataTable().clear().draw();

      $.ajax({
        url: apiUrl,
        type: "GET",
        dataType: "json",
        success: function (response) {
          console.log(response);
          DetailsindividutTable.clear().draw();
          var individualIds = response.map(function (individual) {
            return individual.individual_id;
          });
          // Récupérer le type d'individu
          console.log(individualIds);
          if (individualIds.length > 0) {
            var individualType = response[0].individual_type;
            var individualId;

            individualIds.forEach((idIndividu) => {
              $.ajax({
                url: globalConfig.WEBSERVER_URL + "api/childs/" + idIndividu,
                type: "GET",
                dataType: "json",
                success: function (response) {
                  var row = DetailsindividutTable.row.add(response).draw();
                  row
                    .nodes()
                    .to$()
                    .click(function () {
                      if (individualId != idIndividu) {
                        showIndividualContentDetails(
                          idIndividu,
                          individualType
                        );
                        individualId = idIndividu;
                      }
                    });
                },
                error: function (xhr, status, error) {
                  console.log("Error fetching rule details:", error);
                },
              });
            });
          } else {
            console.log("Error fetching rule details");
            // Show the message when there are no individualIds
            $("#DetailsindividutTable tbody").html(`
                        <tr>
                            <td colspan="8" class="text-center">
                                    <i class="fas fa-exclamation-triangle mr-2 text-danger"></i>Pas d'individu associé !
                            </td>
                        </tr>
                    `);
          }
        },
        error: function (xhr, status, error) {
          console.log("Error fetching rule details:", error);
        },
      });
    });

    // Fonction pour afficher les détails de contenu des données de l'individu sélectionné
    function showIndividualContentDetails(idIndividu, typeIndividu) {
      console.log(idIndividu);
      $("#DetailsContenuDonneesTable tbody").html(
        '<tr><td colspan="8" class="text-center"><i class="fas fa-spinner fa-spin"></i> Chargement en cours...</td></tr>'
      );

      var apiUrl =
        WEBSERVERRules_URL +
        "sample-individual_meta/?individual_id=" +
        idIndividu +
        "&individual_type=" +
        typeIndividu;
      console.log("API URL:", apiUrl); // Log API URL
      $.get(apiUrl, function (data) {
        console.log("API Response:", data); // Log API response

        var detailsTable1 = $("#DetailsContenuDonneesTable tbody");
        detailsTable1.empty();
        var detailContenu = $("#DetailsContenuDonneesTable").DataTable();
        detailContenu.clear().draw();
        $.each(data, function (index, item) {
          var rowData = {
            data_content: item.data_content,
          };
          detailContenu.row.add(rowData).draw();
        });
      });
    }
  });
  $("#deleteAllButton").on("click", function () {
    if (selectedIds.length > 0) {
      $("#deleteModalsup").modal("show");
    } else {
      Toast.fire({
        icon: "warning",
        title: "Veuillez sélectionner l'échantillon à supprimer",
        position: "center center",
      });
    }
  });
  // Handle the "Info" button click event
  $("#echantillonTable").on("click", ".info-button", function () {
    var row = $(this).closest("tr");
    var rowData = echantillonTable.row(row).data();
    console.log(rowData);
    // Show the Bootstrap modal with the user information and statistics
    $("#userInfoModalLabel").text(
      " Information de l'échantillon : " + rowData.name
    );
    $("#EchantillonName").text("Nom :  " + rowData.name);
    $("#userInfoModal").modal("show");
  });
  // Get references to the label, submit button, and file input
  const fileLabel = document.getElementById("fileLabel");
  const submitButton = document.getElementById("submitButton");
  const fileInput = document.getElementById("fileInput");
  submitButton.disabled = true; // Disable the submit button if the file is not valid
  // Add a change event listener to the file input to handle the selected file
  fileInput.addEventListener("change", function () {
    const selectedFile = fileInput.files[0];

    // Check if a file is selected
    if (selectedFile) {
      // Check if the file type is either CSV or Excel
      const allowedFileTypes = [
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (!allowedFileTypes.includes(selectedFile.type)) {
        // Show an alert if the selected file is not an Excel or CSV file
        Toast.fire({
          icon: "error",
          title: "Veuillez sélectionner un fichier Excel valide",
          position: "center center",
        });
        submitButton.disabled = true; // Disable the submit button if the file is not valid
        fileLabel.textContent = "Veuillez choisir un fichier excel"; // Reset the label text
        return;
      } else {
        submitButton.disabled = false; // Enable the submit button if the file is valid
        fileLabel.textContent = selectedFile.name; // Display the selected file name in the label
      }
    } else {
      submitButton.disabled = true; // Disable the submit button if no file is selected
      fileLabel.textContent = "Veuillez choisir un fichier excel"; // Reset the label text
    }
  });

  // Add a click event listener to the "Submit" button
  submitButton.addEventListener("click", function () {
    Toast.fire({
      icon: "success",
      title: "Fichier ajouté avec succès",
    });
    $("#importmodal").modal("hide");
  });

  // Event listener for the "Confirmer" button in the delete confirmation modal
  $("#confirmDeletes").on("click", function () {
    if (selectedIds.length > 0) {
      // Make an API request to delete the selected elements
      $.ajax({
        url: WEBSERVERRules_URL + "sample/" + selectedIds[0], // Update the URL to your delete endpoint
        type: "DELETE",
        data: { id: selectedIds }, // Pass the array of selected IDs to the server
        success: function (response) {
          // Elements deleted successfully
          console.log("Elements deleted:", response);

          // Reload the DataTable to reflect the changes
          echantillonTable.ajax.reload();

          // Close the delete confirmation modal
          $("#deleteModalsup").modal("hide");
        },
        error: function (xhr, status, error) {
          console.log("Error deleting elements:", error);
        },
      });
    }
  });
});

//colorer ligne selectionnée /////
$(document).ready(function () {
  // Initialiser DataTable
  var table = $("#DetailsindividutTable").DataTable();

  // Variable pour stocker la dernière ligne sélectionnée
  var lastSelectedRow = null;

  // Ajouter un écouteur d'événement pour la sélection de ligne
  $("#DetailsindividutTable tbody").on("click", "tr", function () {
    // Si une ligne a déjà été sélectionnée, supprimer la classe 'selected'
    if (lastSelectedRow !== null) {
      $(lastSelectedRow).removeClass("selected");
    }

    // Sélectionner la nouvelle ligne en ajoutant la classe 'selected'
    $(this).addClass("selected");

    // Mettre à jour la variable avec la nouvelle ligne sélectionnée
    lastSelectedRow = this;

    // Vous pouvez accéder aux données de la ligne sélectionnée et effectuer des actions supplémentaires ici
    var selectedRowData = table.rows(".selected").data();
    console.log(selectedRowData); // Exemple : Afficher les données de la ligne sélectionnée dans la console
  });
});
///
$(document).ready(function () {
  // Initialiser DataTable
  var table = $("#echantillonTable").DataTable();

  // Variable pour stocker la dernière ligne sélectionnée
  var lastSelectedRow = null;

  // Ajouter un écouteur d'événement pour la sélection de ligne
  $("#echantillonTable tbody").on("click", "tr", function () {
    // Si une ligne a déjà été sélectionnée, supprimer la classe 'selected'
    if (lastSelectedRow !== null) {
      $(lastSelectedRow).removeClass("selected");
    }
    // Sélectionner la nouvelle ligne en ajoutant la classe 'selected'
    $(this).addClass("selected");

    // Mettre à jour la variable avec la nouvelle ligne sélectionnée
    lastSelectedRow = this;
    // Vous pouvez accéder aux données de la ligne sélectionnée et effectuer des actions supplémentaires ici
    var selectedRowData = table.rows(".selected").data();
    console.log(selectedRowData); // Exemple : Afficher les données de la ligne sélectionnée dans la console
  });
});
//fin colorer ligne selectionnée /////
//lister les contextes et modifier l'echantillon
$(document).ready(function () {
  var idcondition;

  // Fonction pour charger les données depuis l'API et remplir la liste déroulante
  function chargerContextes() {
    var select = document.getElementById("edit_context");

    // Effectuer la première requête fetch à l'API
    fetch(WEBSERVERRules_URL + "show/conditions/")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Parcourir les données JSON et ajouter des options au menu déroulant
        data.forEach(function (contexte) {
          var option = document.createElement("option");
          option.value = contexte.Condition_ID;
          option.textContent = contexte.condition_value;
          select.appendChild(option);
        });
      })
      .catch(function (error) {
        console.error("Une erreur s'est produite : " + error);
      });
  }

  // Appeler la fonction pour charger les données lors du chargement de la page
  chargerContextes();

  // Gérer l'événement de sélection d'une option
  document
    .getElementById("edit_context")
    .addEventListener("change", function () {
      var selectedOption = this.options[this.selectedIndex];
      idcondition = selectedOption.value; // Mettez à jour idcondition avec la valeur sélectionnée
      console.log("ID Condition sélectionné : " + idcondition);
    });

  $(document).ready(function () {
    var selectedRowData; // Variable pour stocker les données de la ligne sélectionnée

    // Écouteur d'événement pour le bouton "Modifier Echantillon"
    $("#editbutton").on("click", function () {
      // Récupérer les données de la ligne sélectionnée dans le tableau
      var table = $("#echantillonTable").DataTable();
      var selectedRows = table.rows(".selected").data();
      selectedRowData = selectedRows[0]; // Nous supposons ici que vous ne pouvez sélectionner qu'une seule ligne

      // Pré-remplir le formulaire de modification avec les données récupérées
      $("#edit_name").val(selectedRowData.name);
      $("#edit_context").val(selectedRowData.context);
    });

    // Écouteur d'événement pour le formulaire de modification
    $("#updateEchantillon").on("click", function (e) {
      e.preventDefault(); // Prevent the form from submitting normally

      // Reset validation feedback
      $("#edit_name").removeClass("is-invalid");
      $("#edit_context").removeClass("is-invalid");

      // Retrieve edited values from the form
      var editedName = $("#edit_name").val();
      var editedContext = $("#edit_context").val();

      // Check if the fields are empty
      if (editedName.trim() === "") {
        showError("Veuillez saisir un nom d'échantillon.", "#edit_name");
        return; // Exit the function if validation fails
      }
      // Call the API PUT request to update the sample
      var apiUrl =
        WEBSERVERRules_URL + "sample/" + selectedRowData.id + "/";
      $.ajax({
        url: apiUrl,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify({ name: editedName, context: editedContext }),

        success: function (response) {
          console.log("Échantillon modifié:", response);
          Toast.fire({
            icon: "success",
            title: "Échantillon modifié avec succès",
          });
          table = $("#echantillonTable").DataTable();
          table.ajax.reload();
          // Manually hide the modal by setting display property to "none"
          // Close the modal using Bootstrap's modal method
          $("#editModal").modal("hide");
        },
        error: function (xhr, status, error) {
          console.log(
            "Erreur lors de la modification de l'échantillon:",
            error
          );
        },
      });
    });
  });
});

/////////////////////
function showError(message, input) {
  var error = $("<div>").text(message).addClass("invalid-feedback");
  error.addClass("invalid-feedback");
  $(input).addClass("is-invalid");
  $(input).closest(".form-group").append(error);
}
//  sélection de ligne dans echantillonTable
$("#echantillonTable tbody").on("click", "tr", function () {
  // Récupérez l'ID de l'échantillon sélectionné
  var echantillonTable = $("#echantillonTable").DataTable();
  var row = $(this).closest("tr");
  var rowData = echantillonTable.row(row).data();
  var echantillonId = rowData.id; // Assurez-vous que c'est l'attribut correct

  // Faites une requête AJAX pour obtenir les détails de l'échantillon en utilisant son ID
  $.ajax({
    url: WEBSERVERRules_URL + "sample/" + echantillonId,
    type: "GET",
    dataType: "json",
    success: function (echantillonResponse) {
      // Maintenant, vous avez les détails de l'échantillon, y compris le contexte
      var contexteId = echantillonResponse.context; // Supposons que la propriété soit "context"
      console.log(contexteId);
      // Faites une deuxième requête AJAX pour obtenir le contexte associé à l'échantillon
      $.ajax({
        url:
          WEBSERVERRules_URL +
          "show/condition/?condition_id=" +
          contexteId,
        type: "GET",
        dataType: "json",
        success: function (contexteResponse) {
          // Extrait l'opérateur du contexte
          var contexteOperator = contexteResponse[contexteId];

          // Affichez l'opérateur dans la table contexteTable
          $("#contexteTable tbody").html(`
                      <tr>
                          <td>${contexteOperator}</td>
                      </tr>
                  `);
        },
        error: function (xhr, status, error) {
          console.log("Erreur lors de la récupération du contexte :", error);
          $("#contexteTable tbody").html(`
          <tr>
      
              <td colspan="8" class="text-center">
                                    <i class="fas fa-exclamation-triangle mr-2 text-danger"></i> Pas de contexte !
                            </td>
          </tr>
      `);
        },
      });
    },
    error: function (xhr, status, error) {
      console.log(
        "Erreur lors de la récupération des détails de l'échantillon :",
        error
      );
    },
  });
});
// afficher les operateurs ligne 2
// Sélectionnez le sélecteur d'opérateurs de calcul
const SelectcalculationOperator = document.getElementById(
  "SelectcalculationOperator"
);

// Faites une requête HTTP pour obtenir les opérateurs depuis l'API
fetch(WEBSERVERRules_URL + "show/operators/comparision/")
  .then((response) => response.json())
  .then((data) => {
    // Obtenez la liste des opérateurs depuis la réponse de l'API
    const operators = data.calculation_operators;

    // Parcourez la liste des opérateurs et ajoutez-les au sélecteur
    operators.forEach((operator) => {
      const option = document.createElement("option");
      option.value = operator;
      option.text = operator;
      SelectcalculationOperator.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des opérateurs :", error);
  });
// Sélectionnez le sélecteur d'options d'opérande
const SelectOP = document.getElementById("SelectOP");

// Faites une requête HTTP pour obtenir les options d'opérande depuis l'API
fetch(WEBSERVERRules_URL + "show/operand-options/")
  .then((response) => response.json())
  .then((data) => {
    // Obtenez la liste des options d'opérande depuis la réponse de l'API
    const operandOptions = data.operand_options;

    // Parcourez la liste des options d'opérande et ajoutez-les au sélecteur
    operandOptions.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.text = option;
      SelectOP.appendChild(optionElement);
    });
  })
  .catch((error) => {
    console.error(
      "Erreur lors de la récupération des options d'opérande :",
      error
    );
  });
// Sélectionnez le sélecteur d'options d'opérande
const SelectOP2 = document.getElementById("SelectOP2");

// Faites une requête HTTP pour obtenir les options d'opérande depuis l'API
fetch(WEBSERVERRules_URL + "show/operand-options/")
  .then((response) => response.json())
  .then((data) => {
    // Obtenez la liste des options d'opérande depuis la réponse de l'API
    const operandOptions = data.operand_options;

    // Parcourez la liste des options d'opérande et ajoutez-les au sélecteur
    operandOptions.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.text = option;
      SelectOP2.appendChild(optionElement);
    });
  })
  .catch((error) => {
    console.error(
      "Erreur lors de la récupération des options d'opérande :",
      error
    );
  });
//////ajout//////
$(document).ready(function () {
  var IdOperation1,
    IdOperation2,
    IdVariable1,
    IdVariable2,
    IdValuee1,
    IdValuee2;

  $("#SelectOP").on("change", function () {
    var selectedValue = $(this).val();
    if (selectedValue === "operation") {
      $("#labeloperationOP").show();
      $.ajax({
        url: WEBSERVERRules_URL + "show/operations/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          var operationSelect = $("#operationSelect");
          operationSelect.empty();
          response.forEach(function (operation) {
            operationSelect.append(
              $("<option>", {
                value: operation.operation_ID,
                text: operation.operation_value,
              })
            );
          });
          operationSelect.show();
        },
      });
    } else {
      $("#operationSelect,#labeloperationOP").hide();
    }
    // Ajoutez un événement de changement au select des opérations
    $("#operationSelect").on("change", function () {
      IdOperation1 = $(this).val(); // Stockez l'ID de l'opération sélectionnée
      console.log("ID de l'operation sélectionnée :", IdOperation1);
    });
  });

  $("#SelectOP2").on("change", function () {
    var selectedValue = $(this).val();
    if (selectedValue === "operation") {
      $("#labeloperationOP2").show();
      $.ajax({
        url: WEBSERVERRules_URL + "show/operations/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          var operationSelect = $("#operationSelect2");
          operationSelect.empty();
          response.forEach(function (operation) {
            operationSelect.append(
              $("<option>", {
                value: operation.operation_ID,
                text: operation.operation_value,
              })
            );
          });
          operationSelect.show();
        },
      });
    } else {
      $("#operationSelect2,#labeloperationOP2").hide();
    }
    // Ajoutez un événement de changement au select des opérations
    $("#operationSelect2").on("change", function () {
      IdOperation2 = $(this).val(); // Stockez l'ID de l'opération sélectionnée
      console.log("ID de l'operation sélectionnée :", IdOperation2);
    });
  });

  $("#SelectOP").on("change", function () {
    var selectedValue = $(this).val();
    if (selectedValue === "variable") {
      $("#labelvariableOP").show();
      $.ajax({
        url: WEBSERVERRules_URL + "variable/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          var variableSelect = $("#variableSelectOP");
          variableSelect.empty();
          response.forEach(function (variable) {
            variableSelect.append(
              $("<option>", {
                value: variable.id,
                text: variable.name,
              })
            );
          });
          variableSelect.show();
        },
      });
    } else {
      $("#variableSelectOP,#labelvariableOP").hide();
    }
    // Ajoutez un événement de changement au select des opérations
    $("#variableSelectOP").on("change", function () {
      IdVariable1 = $(this).val(); // Stockez l'ID de l'opération sélectionnée
      console.log("ID de la variable sélectionnée :", IdVariable1);
    });
  });

  $("#SelectOP2").on("change", function () {
    var selectedValue = $(this).val();
    if (selectedValue === "variable") {
      $("#labelvariableOP2").show();
      $.ajax({
        url: WEBSERVERRules_URL + "variable/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          var variableSelect = $("#variableSelect2");
          variableSelect.empty();
          response.forEach(function (variable) {
            variableSelect.append(
              $("<option>", {
                value: variable.id,
                text: variable.name,
              })
            );
          });
          variableSelect.show();
        },
      });
    } else {
      $("#variableSelect2,#labelvariableOP2").hide();
    }
    // Ajoutez un événement de changement au select des opérations
    $("#variableSelect2").on("change", function () {
      IdVariable2 = $(this).val(); // Stockez l'ID de l'opération sélectionnée
      console.log("ID de la variable sélectionnée :", IdVariable2);
    });
  });
  /////////
  // lister les values et ajouter value //// pour operant 1 ///////////

  $("#SelectOP").on("change", function () {
    var selectedValue = $(this).val();
    if (selectedValue === "value") {
      $("#labelvalueOP, #addvalue").show();
      $.ajax({
        url: WEBSERVERRules_URL + "value/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          var variableSelect = $("#valueSelect");
          variableSelect.empty();
          response.forEach(function (variable) {
            variableSelect.append(
              $("<option>", {
                value: variable.id,
                text: variable.value,
              })
            );
          });
          variableSelect.show();
        },
      });
    } else {
      $("#valueSelect,#labelvalueOP, #addvalue").hide();
    }
    // Ajoutez un événement de changement au select des opérations
    $("#valueSelect").on("change", function () {
      IdValuee1 = $(this).val(); // Stockez l'ID de l'opération sélectionnée
      console.log("ID de la valeur sélectionnée :", IdValuee1);
    });
  });
  /// lister les values et ajouter value //// pour operant 2 ///////////

  $("#SelectOP2").on("change", function () {
    var selectedValue = $(this).val();
    if (selectedValue === "value") {
      $("#labelvalueOP2, #addvalue2").show();
      $.ajax({
        url: WEBSERVERRules_URL + "value/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          var variableSelect = $("#valueSelect2");
          variableSelect.empty();
          response.forEach(function (variable) {
            variableSelect.append(
              $("<option>", {
                value: variable.id,
                text: variable.value,
              })
            );
          });
          variableSelect.show();
        },
      });
    } else {
      $("#valueSelect2,#labelvalueOP2, #addvalue2").hide();
    }
    // Ajoutez un événement de changement au select des opérations
    $("#valueSelect2").on("change", function () {
      IdValuee2 = $(this).val(); // Stockez l'ID de l'opération sélectionnée
      console.log("ID de la valeur sélectionnée :", IdValuee2);
    });
  });

  //////
  $("#addOperationButton").on("click", function () {
    if (
      $("#SelectOP").val() === "variable" &&
      $("#SelectOP2").val() === "variable"
    ) {
      var operand1Id = IdVariable1;
      var operand2Id = IdVariable2;
    }
    if (
      $("#SelectOP").val() === "operation" &&
      $("#SelectOP2").val() === "operation"
    ) {
      var operand1Id = IdOperation1;
      var operand2Id = IdOperation2;
    }
    if ($("#SelectOP").val() === "value" && $("#SelectOP2").val() === "value") {
      var operand1Id = IdValuee1;
      var operand2Id = IdValuee2;
    }
    if (
      $("#SelectOP").val() === "operation" &&
      $("#SelectOP2").val() === "variable"
    ) {
      var operand1Id = IdOperation1;
      var operand2Id = IdVariable2;
    }
    if (
      $("#SelectOP").val() === "variable" &&
      $("#SelectOP2").val() === "operation"
    ) {
      var operand1Id = IdVariable1;
      var operand2Id = IdOperation2;
    }
    //////////////
    if (
      $("#SelectOP").val() === "value" &&
      $("#SelectOP2").val() === "variable"
    ) {
      var operand1Id = IdValuee1;
      var operand2Id = IdVariable2;
    }
    if (
      $("#SelectOP").val() === "variable" &&
      $("#SelectOP2").val() === "value"
    ) {
      var operand1Id = IdVariable1;
      var operand2Id = IdValuee2;
    }
    ///////////////
    if (
      $("#SelectOP").val() === "value" &&
      $("#SelectOP2").val() === "operation"
    ) {
      var operand1Id = IdValuee1;
      var operand2Id = IdOperation2;
    }
    if (
      $("#SelectOP").val() === "operation" &&
      $("#SelectOP2").val() === "value"
    ) {
      var operand1Id = IdOperation1;
      var operand2Id = IdValuee2;
    }
    ///////////////
    var operator = $("#SelectcalculationOperator").val();

    var operationPayload = {
      operand_1_id: operand1Id,
      operand_1_type: $("#SelectOP").val(),
      operator: operator,
      operand_2_id: operand2Id,
      operand_2_type: $("#SelectOP2").val(),
    };

    $.ajax({
      url: WEBSERVERRules_URL + "condition/",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(operationPayload),
      dataType: "json",
      success: function (response) {
        console.log("Opération ajoutée avec succès !");
        Toast.fire({
          icon: "success",
          title: "Contexte ajouté avec succès",
        });
      },
      error: function (xhr, status, error) {
        console.error("Erreur lors de l'ajout de l'opération:", error);
      },
    });
  });
});
//lister les contextes et ajouter l'echantillon
$(document).ready(function () {
  var idcondition;

  // Fonction pour charger les données depuis l'API et remplir la liste déroulante
  function chargerContextes() {
    var select = document.getElementById("addcontext");

    // Effectuer la première requête fetch à l'API
    fetch(WEBSERVERRules_URL + "show/conditions/")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Parcourir les données JSON et ajouter des options au menu déroulant
        data.forEach(function (contexte) {
          var option = document.createElement("option");
          option.value = contexte.Condition_ID;
          option.textContent = contexte.condition_value;
          select.appendChild(option);
        });
      })
      .catch(function (error) {
        console.error("Une erreur s'est produite : " + error);
      });
  }

  // Appeler la fonction pour charger les données lors du chargement de la page
  chargerContextes();

  // Gérer l'événement de sélection d'une option
  document.getElementById("addcontext").addEventListener("change", function () {
    var selectedOption = this.options[this.selectedIndex];
    idcondition = selectedOption.value; // Mettez à jour idcondition avec la valeur sélectionnée
    console.log("ID Condition sélectionné : " + idcondition);
  });

  document
    .getElementById("ajoutechantillon")
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
        lname = document.getElementById("echname").value;

        // Construct the data object
        var requestData = {
          name: lname,
          context: idcondition, // Utilisez la variable idcondition ici
        };
        console.log(requestData);

        // Effectuer la deuxième requête fetch à l'API
        fetch(WEBSERVERRules_URL + "sample/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (response) {
            // Subject created successfully
            console.log("Subject created:", response);
            $("#Ajouterechantillon").modal("hide");
            table = $("#echantillonTable").DataTable();
            table.ajax.reload();
            $("#ajoutechantillon")[0].reset();
            Toast.fire({
              icon: "success",
              title: "Échantillon ajouté avec succès",
            });
          })
          .catch(function (error) {
            console.log("Error creating :", error);
          });
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
});
// ///ajouter value //// pour operant 1 ///////////
// Gérez le bouton "Ajouter" pour l'option "value"
$("#ajoutervalue").on("click", function () {
  var value = $("#valueInputOP").val();
  var valueType = $("#valueTypeSelectOP").val();
  // Faites une requête à l'API pour ajouter la valeur
  $.ajax({
    url: WEBSERVERRules_URL + "value/",
    type: "POST",
    contentType: "application/json", // Définissez le type de contenu comme JSON
    data: JSON.stringify({
      value: value,
      type: valueType,
    }),
    dataType: "json",
    success: function (response) {
      Toast.fire({
        icon: "success",
        title: "Valeur ajoutée avec succès",
      });
      console.log("Valeur ajoutée avec succès !");
    },
  });
});

/// ajouter value //// pour operant 2 ///////////
// Gérez le bouton "Ajouter" pour l'option "value"
$("#ajoutervalue2").on("click", function () {
  var value = $("#valueInputOP2").val();
  var valueType = $("#valueTypeSelectOP2").val();
  // Faites une requête à l'API pour ajouter la valeur
  $.ajax({
    url: WEBSERVERRules_URL + "value/",
    type: "POST",
    contentType: "application/json", // Définissez le type de contenu comme JSON
    data: JSON.stringify({
      value: value,
      type: valueType,
    }),
    dataType: "json",
    success: function (response) {
      Toast.fire({
        icon: "success",
        title: "Valeur ajoutée avec succès",
      });
      console.log("Valeur ajoutée avec succès !");
    },
  });
});
// bouton ajouter valeur pour operent 1//
// Sélectionnez le bouton et les éléments à afficher/masquer
const addButton = document.getElementById("addvalue");
const addvalueButton = document.getElementById("ajoutervalue");
const inputElement = document.getElementById("valueInputOP");
const selectElement = document.getElementById("valueTypeSelectOP");

// Ajoutez un écouteur d'événements au clic sur le bouton
addButton.addEventListener("click", function () {
  // Vérifiez si les éléments sont actuellement masqués
  if (inputElement.style.display === "none") {
    // Affichez les éléments en utilisant le style "block"
    inputElement.style.display = "block";
    selectElement.style.display = "block";
    addvalueButton.style.display = "block";
  } else {
    // Masquez les éléments s'ils sont déjà visibles
    inputElement.style.display = "none";
    selectElement.style.display = "none";
    addvalueButton.style.display = "none";
  }
});
// bouton ajouter valeur pour operent 2//
// Sélectionnez le bouton et les éléments à afficher/masquer
const addButton2 = document.getElementById("addvalue2");
const addvalueButton2 = document.getElementById("ajoutervalue2");
const inputElement2 = document.getElementById("valueInputOP2");
const selectElement2 = document.getElementById("valueTypeSelectOP2");

// Ajoutez un écouteur d'événements au clic sur le bouton
addButton2.addEventListener("click", function () {
  // Vérifiez si les éléments sont actuellement masqués
  if (inputElement2.style.display === "none") {
    // Affichez les éléments en utilisant le style "block"
    inputElement2.style.display = "block";
    selectElement2.style.display = "block";
    addvalueButton2.style.display = "block";
  } else {
    // Masquez les éléments s'ils sont déjà visibles
    inputElement2.style.display = "none";
    selectElement2.style.display = "none";
    addvalueButton2.style.display = "none";
  }
});
