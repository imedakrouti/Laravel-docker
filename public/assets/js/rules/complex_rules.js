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
var rulesData;
//fectch rules data
function removeDuplicates(arr) {
  return arr.filter(
    (item, index) => arr.findIndex((obj) => obj.name === item.name) === index
  );
}
// Function to validate an input field
function validateInput(inputId, errorMessage) {
  const inputValue = $(inputId).val().trim();

  if (inputValue === "") {
    // If the input is invalid (empty), display the error message
    $(inputId).addClass("is-invalid");
    // Check if an error message container exists
    const errorContainer = $(inputId)
      .closest(".form-group")
      .find(".invalid-feedback");
    if (errorContainer.length === 0) {
      const error = $("<div>").text(errorMessage).addClass("invalid-feedback");
      $(inputId).closest(".form-group").append(error);
    }
    return false; // Return false when validation fails
  } else {
    // If the input is valid (not empty), remove any existing error messages
    $(inputId).removeClass("is-invalid");
    $(inputId).closest(".form-group").find(".invalid-feedback").remove();
    return true; // Return true when validation succeeds
  }
}

fetch(WEBSERVERRules_URL + "rules/")
  .then((response) => response.json())
  .then((data) => {
    // Remove duplicates from the data array based on 'name'
    /* const uniqueData = removeDuplicates(data); */
    rulesData = data;
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
$(document).ready(function () {
  var lastSelectedRow = null;
  var selectedRowData;
  var reglecomplexeTable = $("#reglecomplexeTable").DataTable({
    ajax: {
      url: WEBSERVERRules_URL + "complex_rules",
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
      { data: "description" },
      { data: "type" },
      // {
      //   data: null,
      //   render: function (data, type, row) {
      //     return data.disabled ? "Désactivé" : "Activé";
      //   },
      // },
      {
        data: "disabled",
        render: function (data, type, row) {
          var status = data === false ? "Active" : "Inactive";
          var badgeClass = data === false ? "badge-success" : "badge-danger";
          return '<span class="badge ' + badgeClass + '">' + status + "</span>";
        },
      },
      // {
      //   data: null,
      //   render: function (data, type, row) {
      //     var id = row.rulecomplex_id;
      //     var deleteIcon = '<i class="fas fa-trash-alt"></i>'; // Font Awesome trash icon
      //     var modifyIcon = '<i class="fas fa-edit"></i>'; // Font Awesome edit icon
      //     var infoIcon = '<i class="fas fa-info-circle"></i>'; // Font Awesome info icon
      //     var deleteButtonClass = "btn-outline-danger deleted";
      //     var modifyButtonClass = "btn-outline-info modified";
      //     var infoButtonClass = "btn-outline-primary info-button";
      //     var buttonStyle = "width:80;";

      //     return (
      //       '<div class="btn-group d-flex justify-content-center" role="group">' +
      //       // '<div class="btn-group" role="group">' +
      //       '<button type="button" class="btn ' +
      //       infoButtonClass +
      //       ' action-button mr-2 info-button" data-username="' +
      //       id +
      //       '" style="' +
      //       buttonStyle +
      //       '">' +
      //       infoIcon +
      //       // " Info" + // Here, we include the text "Info" after the icon
      //       "</button>" +
      //       '<button type="button" class="btn ' +
      //       "</button>" +
      //       "</div>"
      //     );
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
      sLengthMenu: " _MENU_ Règles complexes affichées ",
      sInfo: " _START_ &agrave; _END_ sur _TOTAL_ règles complexes",
      sInfoEmpty:
        "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
      sInfoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
      sInfoPostFix: "",
      sLoadingRecords: "Chargement en cours...",
      sZeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",
      sEmptyTable: " Veuillez selectionner une regle complexe.",
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
  });
  var detailcTable = $("#detailcTable").DataTable({
    responsive: true,
    language: {
      // French language configuration here
      sProcessing: "Traitement en cours...",
      sSearch: "Rechercher&nbsp;:",
      sLengthMenu: " _MENU_ règles associées affichées",
      sInfo:
        "Affichage de règles associées _START_ &agrave; _END_ sur _TOTAL_ règles associées",
      sInfoEmpty:
        "Affichage de règles associées 0 &agrave; 0 sur 0 &règles associées",
      sInfoFiltered: "(filtr&eacute; de _MAX_ règles associées au total)",
      sInfoPostFix: "",
      sLoadingRecords: "Chargement en cours...",
      sZeroRecords: "Aucun règles associées &agrave; afficher",
      sEmptyTable: " Veuillez selectionner une regle complexe.",
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
  });
  //typereglecomplexeTable.draw();
  // Ajouter un écouteur d'événement pour la sélection de ligne
  $("#reglecomplexeTable tbody").on("click", "tr", function () {
    // Si une ligne a déjà été sélectionnée, supprimer la classe 'selected'
    if (lastSelectedRow !== null) {
      $(lastSelectedRow).removeClass("selected");
    }

    // Sélectionner la nouvelle ligne en ajoutant la classe 'selected'
    $(this).addClass("selected");

    // Mettre à jour la variable avec la nouvelle ligne sélectionnée
    lastSelectedRow = this;

    // Vous pouvez accéder aux données de la ligne sélectionnée et effectuer des actions supplémentaires ici
    selectedRowData = reglecomplexeTable.row(".selected").data();
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
  $("#reglecomplexeTable").on("click", ".info-button", function () {
    var row = $(this).closest("tr");
    var rowData = reglecomplexeTable.row(row).data();
    var userId = rowData.rulecomplex_id;

    // Show the Bootstrap modal with the user information and statistics
    $("#regleInfoModalLabel").text(
      " Information de la règle complexe : " + rowData.name
    );
    $("#reglecomplexeName").text("Nom: " + rowData.name);
    $("#reglecomplexeDescription").text("Description: " + rowData.description);
    $("#reglecomplexeType").text("Type de règle complexe: " + rowData.type);
    // $("#statistic1").text(statistics.statistic1);
    // $("#statistic2").text(statistics.statistic2);
    $("#regleInfoModal").modal("show");
  });
  //delete complex rule
  // Event listener for the "Confirmer" button in the delete confirmation modal
  $("#confirmDeletes1").on("click", function () {
    if (selectedRowData) {
      console.log("selected Id" + selectedRowData);
      // Make an API request to delete the selected elements
      $.ajax({
        url:
          WEBSERVERRules_URL +
          "complex_rules/" +
          selectedRowData.id, // Update the URL to your delete endpoint
        type: "DELETE",
        data: { id: selectedRowData.id }, // Pass the array of selected IDs to the server
        success: function (response) {
          // Elements deleted successfully
          console.log("Elements deleted:", response);
          Toast.fire({
            icon: "success",
            title: "Règle complexe supprimée avec succès",
          });
          // Reload the DataTable to reflect the changes
          reglecomplexeTable.ajax.reload();

          // Close the delete confirmation modal
          $("#deleteModalsup").modal("hide");
        },
        error: function (xhr, status, error) {
          console.log("Error deleting elements:", error);
        },
      });
    } else {
      Toast.fire({
        icon: "warning",
        title: "Veuillez sélectionner le concept à supprimer",
        position: "center center",
      });
    }
  });
  /////////////////Ajout echantillon ///////
  document
    .getElementById("rulescompForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission

      var inputs = this.querySelectorAll("input");
      var errorMessage = document.getElementById("errorMessage");

      // Remove existing error messages
      var existingErrorMessages = this.getElementsByClassName("error-message");
      while (existingErrorMessages.length > 0) {
        existingErrorMessages[0].remove();
      }

      var emptyInputs = Array.from(inputs).filter(function (input) {
        return input.value.trim() === "";
      });

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

        console.log("test");
        // Autres champs du formulaire
        lname = document.getElementById("nomrc").value;
        ldescription = document.getElementById("descriptionrc").value;
        ltype = document.getElementById("type_reglec").value;
        ltyperegle = document.getElementById("type_regle_ass").value;

        // Construction de l'objet de données
        var requestData = {
          name: lname,
          description: ldescription,
          type: ltype,
          sub_rule_type: ltyperegle,
          disabled: true,
        };
        console.log(requestData);

        $.ajax({
          url: WEBSERVERRules_URL + "complex_rules/",
          type: "POST",
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify(requestData),
          success: function (response) {
            console.log("Subject created:", response);
            table = $("#reglecomplexeTable").DataTable();
            table.ajax.reload();
            $("#addrcomplexModal").modal("hide");

            Toast.fire({
              icon: "success",
              title: "Règle complexe ajoutée avec succès",
            });
            $("#rulescompForm")[0].reset();
          },
          error: function (xhr, status, error) {
            console.log("Error creating :", error);
            Toast.fire({
              icon: "danger",
              title: "Veuillez essayer plus tard",
              position: "center center",
              timer: 2000,
            });
          },
        });
      }
    });

  //////fin ajout///

  // Ajoute un événement de clic sur les lignes du tableau "regleTable"
  $("#reglecomplexeTable tbody").on("click", "tr", function () {
    // Obtient les données de la ligne sélectionnée
    var rowData = reglecomplexeTable.row(this).data();
    var rules = rowData.rules;
    // Clear the DataTable before adding new rows
    detailcTable.clear().draw();

    if (rules.length > 0) {
      $("#detailcTable tbody").html(
        '<tr><td colspan="8" class="text-center"><i class="fas fa-spinner fa-spin"></i> Chargement en cours...</td></tr>'
      );
      rules.forEach((rule) => {
        $.ajax({
          url: WEBSERVERRules_URL + "rules/" + rule + "/",
          type: "GET",
          dataType: "json",
          success: function (response) {
            // Add each rule's data to the DataTable
            detailcTable.row.add([
              response.name, // Clauses
              response.description, //description
              response.type, // Type clauses
              response.disabled
                ? // "Désactivé" : "Activé", // Statut
                  render
                : function (data, type, row) {
                    var status = data === false ? "Inactive" : "Active";
                    var badgeClass =
                      data === false ? "badge-danger" : "badge-success";
                    return (
                      '<span class="badge ' +
                      badgeClass +
                      '">' +
                      status +
                      "</span>"
                    );
                  },
            ]);
            detailcTable.draw();
          },
          error: function (xhr, status, error) {
            console.log("Error fetching rule details:", error);
          },
        });
      });
    } else {
      $("#detailcTable tbody").html(
        '<tr><td colspan="8" class="text-center"><i class="fa-solid fa-circle-exclamation text-danger"></i> Pas de règles associées</td></tr>'
      );
    }
  });

  ///Get details rules//
});
//colorer ligne selectionnée /////
$(document).ready(function () {
  // Initialiser DataTable
  var table = $("#regleTable").DataTable();

  // Variable pour stocker la dernière ligne sélectionnée
  var lastSelectedRow = null;

  // Ajouter un écouteur d'événement pour la sélection de ligne
  $("#reglecomplexeTable tbody").on("click", "tr", function () {
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

//modification //
$(document).ready(function () {
  var selectedRowData; // Variable pour stocker les données de la ligne sélectionnée

  // Écouteur d'événement pour le bouton "Modifier Echantillon"
  $("#btnEditModal").on("click", function () {
    // Récupérer les données de la ligne sélectionnée dans le tableau
    var table = $("#reglecomplexeTable").DataTable();
    var selectedRows = table.rows(".selected").data();
    selectedRowData = selectedRows[0]; // Nous supposons ici que vous ne pouvez sélectionner qu'une seule ligne

    // Pré-remplir le formulaire de modification avec les données récupérées
    $("#edit_name").val(selectedRowData.name);
    $("#edit_description").val(selectedRowData.description);
    $("#edit_type_regle_complex").val(selectedRowData.type);
    $("#edit_type_regle").val(selectedRowData.sub_rule_type);
  });
  // Écouteur d'événement pour le formulaire de modification
  $("#editForm3").on("submit", function (e) {
    e.preventDefault(); // Empêcher le formulaire de se soumettre normalement

    // Récupérer les valeurs modifiées depuis le formulaire
    var editedName = $("#edit_name").val();
    var editedDescription = $("#edit_description").val();
    var editedType = $("#edit_type_regle_complex").val();
    var editedTypeRegass = $("#edit_type_regle").val();
    // Faire appel à l'API PUT pour modifier l'échantillon
    var apiUrl =
      WEBSERVERRules_URL +
      "complex_rules/" +
      selectedRowData.id +
      "/";
    // var apiUrl =
    //   "http://54.36.177.119:8010/complex_rules/" + selectedRowData.id + "/";
    $.ajax({
      url: apiUrl,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify({
        name: editedName,
        description: editedDescription,
        type: editedType,
        sub_rule_type: editedTypeRegass,
        disabled: true,
      }),
      success: function (response) {
        // Échantillon modifié avec succès
        console.log("Règle modifiée:", response);
        $("#editModalRuleC").modal("hide"); // Fermer la fenêtre modale de modification
        table = $("#reglecomplexeTable").DataTable();
        table.ajax.reload();
        $("#editForm3")[0].reset();
        Toast.fire({
          icon: "success",
          title: "Règle complexe modifiée avec succès",
        });
      },
      error: function (xhr, status, error) {
        console.log("Erreur lors de la modification de la règle:", error);
      },
    });
  });
});
//associer régle
$("#btnaddrulesModal").on("click", function (e) {
  if (selectedRowId) {
    $("#addrulecomplex_rule").modal("show");
  } else {
    Toast.fire({
      icon: "warning",
      title: "Veuillez sélectionner la règle à associer",
      position: "center center",
      timer: 2000,
    });
  }
});

var selectedRowId;
$("#reglecomplexeTable tbody").on("click", "tr", function () {
  var table = $("#reglecomplexeTable").DataTable();
  var rowData = table.row(this).data();
  selectedRowId = rowData.id;
  var rules = rowData.rules;
  detailcTable = $("#detailcTable").DataTable();
  $("#name_complex_rule_addrulecomplex_rules").val(rowData.name);

  console.log("selected Id" + selectedRowId);
  console.log(rowData);

  // Initialize the select box and add the default option
  const ruleSelect = $("#rules");
  ruleSelect.empty().append(
    $("<option>", {
      value: "",
      text: "Liste des règles ...",
    })
  );

  // Populate the select box based on rulesData
  rulesData.forEach((value) => {
    if (value.type === rowData.sub_rule_type) {
      ruleSelect.append(
        $("<option>", {
          value: value.id,
          text: value.name,
        })
      );
    }
  });

  // Handle form submission
  $("#addrulecomplex_rule_form").on("submit", function (e) {
    e.preventDefault();

    // Validate input fields
    const isRulesValid = validateInput("#rules", "Veuillez remplir ce champ.");
    const isWeightValid = validateInput(
      "#weight",
      "Veuillez remplir ce champ."
    );

    if (isRulesValid && isWeightValid) {
      const data = {
        complex_rule: selectedRowId,
        sub_rule: $("#rules").val(),
        weight: $("#weight").val(),
      };

      console.log("data to add rule complex rule ", data);

      $.ajax({
        type: "POST",
        url: WEBSERVERRules_URL + "complex_rule/rule/",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
          console.log(response);
          if (response.status !== "failure") {
            ruleId = $("#rules").val();
            // Fetch the details of the newly added rule
            $.ajax({
              url: WEBSERVERRules_URL + "rules/" + ruleId + "/",
              type: "GET",
              dataType: "json",
              success: function (newRuleData) {
                // Add the details of the newly added rule to the DataTable
                detailcTable.row.add([
                  newRuleData.name, // Clauses
                  newRuleData.description, // Description
                  newRuleData.type, // Type clauses
                  newRuleData.disabled ? "Désactivé" : "Activé", // Statut
                ]);
                detailcTable.draw();

                Toast.fire({
                  icon: "success",
                  title: "Règle ajoutée avec succès",
                });

                // Reset form fields and hide the modal
                $("#rules")[0].selectedIndex = 0;
                $("#weight").val("");
                $("#addrulecomplex_rule").modal("hide");
              },
              error: function (xhr, status, error) {
                console.log("Error fetching newly added rule details:", error);
              },
            });
          }
        },
        error: function (data) {
          console.log("error add rule complex rule");
          console.log(data);

          Toast.fire({
            icon: "error",
            title: "Une erreur s'est produite",
          });
        },
      });
    }
  });
});
