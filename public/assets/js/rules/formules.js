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

  var formuleTable = $("#formuleTable").DataTable({
    ajax: {
      url: WEBSERVERRules_URL + "formula/",

      type: "GET",

      dataType: "json",

      dataSrc: {},
    },

    columns: [
      {
        data: "id",

        visible: false,

        className: "hidden-column",
      },

      { data: "name" },
      { data: "description" },
      {
        data: "created_at",
        render: function (data) {
          return moment(data).format("DD-MM-YYYY");
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          var id = row.user_id;
          var defineFormulaButton =
            '<button type="button" class="btn btn-outline-success define-formula-button" data-id="' +
            id +
            '">Définir formule</button>';

          var deleteIcon = '<i class="fas fa-trash-alt"></i>';
          var modifyIcon = '<i class="fas fa-edit"></i>';
          var infoIcon = '<i class="fas fa-info-circle"></i>';

          var deleteButtonClass = "btn-outline-danger deleted";
          var modifyButtonClass = "btn-outline-info modified";
          var infoButtonClass = "btn-outline-primary info-button";

          var buttonStyle = "width:80;";

          return (
            '<div class="btn-group d-flex justify-content-center" role="group">' +
            // '<button type="button" class="btn ' +
            // infoButtonClass +
            // ' action-button mr-2 info-button" data-name="' +
            // id +
            // '" style="' +
            // buttonStyle +
            // '">' +
            // infoIcon +
            // "</button>" +
            '<button type="button" class="btn ' +
            // deleteButtonClass +
            // ' action-button mr-2" data-username="' +
            // id +
            // '" style="' +
            // buttonStyle +
            // '">' +
            // deleteIcon +
            // "</button>" +
            // '<button type="button" class="btn ' +
            // modifyButtonClass +
            // ' action-button mr-2 edit-button" data-username="' +
            id +
            '" style="' +
            buttonStyle +
            '">' +
            // modifyIcon +
            // "</button>" +
            defineFormulaButton +
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

    language: {
      // French language configuration here

      sProcessing: "Traitement en cours...",

      sSearch: "Rechercher&nbsp;:",

      sLengthMenu: " _MENU_ Formules affichées ",

      sInfo: "_START_ &agrave; _END_ sur _TOTAL_ Formules ",

      sInfoEmpty:
        "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",

      sInfoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",

      sInfoPostFix: "",

      sLoadingRecords: "Chargement en cours...",

      sZeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",

      sEmptyTable:
        "Veuillez choisir un élément dans le tableau des noms d'utilisateur.",

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

      formuleTable.on("page.dt", function () {
        selectedIds = [];
      });
    },

    lengthMenu: [5, 10, 25, 50], // Set the options for the number of rows per page

    pageLength: 5, // Set the default number of rows per page

    dom: '<"top"l<"float-left"f>rtip>',
  });

  // var firstNameTable = $("#firstNameTable").DataTable({
  //   language: {
  //     // French language configuration here

  //     sProcessing: "Traitement en cours...",

  //     sSearch: "Rechercher&nbsp;:",

  //     sLengthMenu: " _MENU_ Opérations associées affichées",

  //     sInfo:
  //       "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",

  //     sInfoEmpty:
  //       "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",

  //     sInfoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",

  //     sInfoPostFix: "",

  //     sLoadingRecords: "Chargement en cours...",

  //     sZeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",

  //     sEmptyTable:
  //       "Veuillez choisir une formule dans le tableau de liste des formules.",

  //     oPaginate: {
  //       sFirst: '<span style="color: #6666FF;">Premier</span>',

  //       sPrevious: '<span style="color: #6666FF;">Précédent</span>',

  //       sNext: '<span style="color: #6666FF;">Suivant</span>',

  //       sLast: '<span style="color: #6666FF;">Dernier</span>',

  //       sPageButton: '<span style="color: red;">_PAGE_</span>',
  //     },

  //     oAria: {
  //       sSortAscending: ": activer pour trier la colonne par ordre croissant",

  //       sSortDescending:
  //         ": activer pour trier la colonne par ordre d&eacute;croissant",
  //     },
  //   },

  //   lengthMenu: [5, 10, 25, 50], // Set the options for the number of rows per page

  //   pageLength: 5, // Set the default number of rows per page

  //   dom: '<"top"l<"float-left"f>rtip>',
  // });

  // firstNameTable.draw();
  $("#deleteAllButton").on("click", function () {
    if (selectedIds.length > 0) {
      $("#deleteModalsup").modal("show");
    } else {
      Toast.fire({
        icon: "warning",
        title: "Veuillez sélectionner la formule à supprimer",
        position: "center center",
      });
    }
  });

  $("#formuleTable").on("click", ".edit-button", function () {
    var row = $(this).closest("tr");
    var rowData = formuleTable.row(row).data();
  });
  // Function to make the "username" and "first_name" cells editable in the selected row
  function makeCellsEditable(row) {
    var usernameCell = row.find("td:nth-child(1)"); // Assuming "username" is in the second column

    var firstNameCell = row.find("td:nth-child(2)"); // Assuming "first_name" is in the third column

    var username = usernameCell.text();

    var firstName = firstNameCell.text();

    usernameCell.html(
      '<input type="text" class="form-control" value="' + username + '">'
    );

    firstNameCell.html(
      '<input type="text" class="form-control" value="' + firstName + '">'
    );
  }
  // Event listener for edit button clicks

  $("#formuleTable").on("click", ".edit-button", function () {
    var row = $(this).closest("tr");

    // Check if the row is already in an editable state (e.g., another row is being edited)

    if (row.hasClass("editing-row")) {
      // If the row is already being edited, save the changes and revert to normal state

      saveChangesAndRevert(row);
    } else {
      // If the row is not in an editable state, make the "username" and "first_name" cells editable

      makeCellsEditable(row);

      // Add a class to indicate that the row is in an editable state

      row.addClass("editing-row");
    }
  });
  // Function to save changes and revert the "username" and "first_name" cells back to their original non-editable state
  function saveChangesAndRevert(row) {
    var usernameCell = row.find("td:nth-child(1)"); // Assuming "username" is in the second column

    var firstNameCell = row.find("td:nth-child(2)"); // Assuming "first_name" is in the third column

    var usernameValue = usernameCell.find("input").val();

    var firstNameValue = firstNameCell.find("input").val();

    // Save the changes to the table cells

    usernameCell.text(usernameValue);

    firstNameCell.text(firstNameValue);

    // Remove the class indicating the editable state

    row.removeClass("editing-row");

    formuleTable.ajax.reload();
  }

  // Handle the "Info" button click event
  $("#formuleTable").on("click", ".info-button", function () {
    var row = $(this).closest("tr");
    var rowData = formuleTable.row(row).data();
    var userId = rowData.rule_id;
    // Show the Bootstrap modal with the user information and statistics
    $("#userInfoModalLabel").text(" Information du concept : " + rowData.name);
    $("#formuleName").text("Nom: " + rowData.name);
    $("#formuleDescription").text("Description: " + rowData.description);
    $("#userInfoModal").modal("show");
  });
  // Open modal when the button is clicked
  $("#openModalBtnsup").on("click", function () {
    $("#myModalsup").modal("show");
  });
  // Close modal when the close button is clicked
  $(".modal .close").on("click", function () {
    $("#myModalsup").modal("hide");
  });
  $(document).on("submit", "#userF", function (e) {
    lname = document.getElementById("username").value;
    description = document.getElementById("first_name").value;
    // Construct the data object
    var requestData = {
      name: lname,
      description: description,
    };
    console.log(requestData.name, requestData.description);
    $.ajax({
      url: WEBSERVERRules_URL + "formula/",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(requestData),
      dataType: "json",
      success: function (response) {
        // Subject created successfully
        console.log("Subject created:", response);
        Toast.fire({
          icon: "success",
          title: "Formule ajoutée avec succès",
        });
      },
      error: function (xhr, status, error) {
        console.log("Error creating :", error);
      },
    });
  });
  $("#retourButtonsubj").on("click", function () {
    $("#myModalsup").modal("hide");
  });

  $("#myModalsup").on("hidden.bs.modal", function () {
    formuleTable.reload();
  });

  // Event listener for the "Confirmer" button in the delete confirmation modal

  $("#deleteButton").on("click", function () {
    if (selectedIds.length > 0) {
      // Make an API request to delete the selected elements

      $.ajax({
        url: WEBSERVERRules_URL + "formula/" + selectedIds[0], // Update the URL to your delete endpoint
        type: "DELETE",
        data: { id: selectedIds }, // Pass the array of selected IDs to the server
        success: function (response) {
          // Elements deleted successfully
          console.log("Elements deleted:", response);
          // Reload the DataTable to reflect the changes
          formuleTable.ajax.reload();
          // Close the delete confirmation modal
          $("#deleteModalsup").modal("hide");
          Toast.fire({
            icon: "success",
            title: "Formule supprimée avec succès",
          });
        },
        error: function (xhr, status, error) {
          console.log("Error deleting elements:", error);
        },
      });
    }
  });
});

///Affichage tableau ////
$(document).ready(function () {
  var formuleTable = $("#formuleTable").DataTable(); // Initialiser le tableau DataTable

  // Écouteur d'événement pour les lignes du premier tableau
  $("#formuleTable tbody").on("click", "tr", function () {
    // Obtenez l'ID de la ligne cliquée
    var rowData = formuleTable.row(this).data();
    var selectedId = rowData.id;
    console.log(selectedId);

    // Utilisez $.ajax pour faire l'appel API avec gestion des success et error
    $.ajax({
      url: WEBSERVERRules_URL + "formula/operation/" + selectedId,
      type: "GET",
      success: function (data) {
        // Traitement en cas de succès de la première requête
        var associatedOperationId = data.operation;
        console.log(associatedOperationId);

        // Faites l'appel API pour récupérer les détails de l'opération associée
        $.ajax({
          url:
            WEBSERVERRules_URL +
            "show/operation/?operation_id=" +
            associatedOperationId,
          type: "GET",
          success: function (showFormulaData) {
            // Traitement en cas de succès de la deuxième requête
            var formulaInClear = showFormulaData;
            var $formulaCell = $("<td>").text(formulaInClear);
            $formulaCell.css("white-space", "normal");
            $("#firstNameTable tbody")
              .empty()
              .append($("<tr>").append($formulaCell));
          },
          error: function (xhr, status, error) {
            // Traitement en cas d'erreur de la deuxième requête
            console.error(
              "Erreur lors de la requête API (opération associée) : " + error
            );
            // Affichez "Aucune opération associée" dans la table firstNameTable en cas d'erreur
            var $errorCell = $("<td>").text("Aucune opération associée");
            $("#firstNameTable tbody")
              .empty()
              .append($("<tr>").append($errorCell));
          },
        });
      },
      error: function (xhr, status, error) {
        // Traitement en cas d'erreur de la première requête
        console.error(
          "Erreur lors de la requête API (formule/operation) : " + error
        );
        // Affichez "Aucune opération associée" dans la table firstNameTable en cas d'erreur
        var $errorCell = $("<td>").text("Aucune opération associée");
        $("#firstNameTable tbody").empty().append($("<tr>").append($errorCell));
      },
    });
  });
});

///Affichage tableau 2  ////
///Affichage tableau 2  ////

$(document).ready(function () {
  var formuleTable = $("#formuleTable").DataTable(); // Initialiser le tableau DataTable

  // Écouteur d'événement pour les lignes du premier tableau

  $("#formuleTable tbody").on("click", "tr", function () {
    // Obtenez l'ID de la ligne cliquée

    var rowData = formuleTable.row(this).data();

    var selectedName = rowData.name;

    console.log(selectedName);

    // Faites l'appel API pour récupérer la formule en clair

    $.get(
      WEBSERVERRules_URL +
        "show/formula/?formula_name=" +
        selectedName,

      function (showFormulaData) {
        // Obtenez la formule en clair depuis la réponse JSON

        // var formulaInClear = showFormulaData;

        // Supprimez les accolades de la formule

        var formulaInClear = showFormulaData.replace(/\{|\}/g, "");

        console.log(formulaInClear);

        // Mettez à jour le deuxième tableau avec la formule en clair

        var $formulaCell = $("<td>").text(formulaInClear);

        // Appliquez la propriété CSS pour permettre le retour à la ligne

        $formulaCell.css("white-space", "normal");

        $("#FormuleClairTable tbody")
          .empty()

          .append($("<tr>").append($formulaCell));
      }
    );
  });
});

//modification //
$(document).ready(function () {
  var selectedRowData; // Variable pour stocker les données de la ligne sélectionnée
  // Écouteur d'événement pour le bouton "Modifier Echantillon"
  $("#editbutton").on("click", function () {
    // Récupérer les données de la ligne sélectionnée dans le tableau
    var table = $("#formuleTable").DataTable();
    var selectedRows = table.rows(".selected").data();
    selectedRowData = selectedRows[0]; // Nous supposons ici que vous ne pouvez sélectionner qu'une seule ligne

    // Pré-remplir le formulaire de modification avec les données récupérées
    $("#edit_name").val(selectedRowData.name);
    $("#edit_description").val(selectedRowData.description);
  });
  // Écouteur d'événement pour le formulaire de modification
  $("#editForm1").on("submit", function (e) {
    e.preventDefault(); // Empêcher le formulaire de se soumettre normalement
    // Récupérer les valeurs modifiées depuis le formulaire
    var editedName = $("#edit_name").val();
    var editedDescription = $("#edit_description").val();
    // Faire appel à l'API PUT pour modifier l'échantillon
    var apiUrl =
      WEBSERVERRules_URL + "formula/" + selectedRowData.id + "/";
    $.ajax({
      url: apiUrl,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify({
        name: editedName,
        description: editedDescription,
      }),
      success: function (response) {
        Toast.fire({
          icon: "success",
          title: "Formule modifiée avec succès",
        });
        table = $("#formuleTable").DataTable();
        table.ajax.reload();
        // Manually hide the modal by setting display property to "none"
        // Close the modal using Bootstrap's modal method
        $("#editModal").modal("hide");
        // Échantillon modifié avec succès
        console.log("Formule modifiée:", response);
      },
      error: function (xhr, status, error) {
        console.log("Erreur lors de la modification de la formule:", error);
      },
      // success: function (response) {
      //   // Afficher l'alerte en vert
      //   $("#successAlert").fadeIn(300).delay(2000).fadeOut(400); // Afficher pendant 2 secondes

      //   console.log("Formule modifiée:", response);
      //   $("#editModal").modal("hide");
      // },
      // error: function (xhr, status, error) {
      //   console.log("Erreur lors de la modification de la formule:", error);
      // },
    });
  });
});
//colorer ligne selectionnée et decolorer lors du click en dehors du tableau  /////
$(document).ready(function () {
  // Initialiser DataTable
  var table = $("#formuleTable").DataTable();
  // Variable pour stocker la dernière ligne sélectionnée
  var lastSelectedRow = null;

  // Ajouter un écouteur d'événement pour la sélection de ligne
  $("#formuleTable tbody").on("click", "tr", function () {
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

  // Ajouter un écouteur d'événement pour le clic en dehors du tableau
  $(document).on("click", function (event) {
    // Vérifier si le clic est en dehors du tableau et de la ligne sélectionnée
    if (
      !$(event.target).closest("#formuleTable").length &&
      lastSelectedRow !== null
    ) {
      $(lastSelectedRow).removeClass("selected");
      lastSelectedRow = null;
    }
  });
});
///
// afficher le modal de definition de fomule
$(document).ready(function () {
  // Gestionnaire d'événement pour le bouton "Définir formule"
  $("#formuleTable").on("click", ".define-formula-button", function () {
    var id = $(this).data("id");
    // Remplir le formulaire du modal avec les données correspondantes à "id" si nécessaire
    // Ouvrir le modal
    $("#defineFormulaModal").modal("show");
  });
  // Gestionnaire d'événement pour le bouton "Enregistrer" dans le modal
  $("#saveFormulaButton").click(function () {
    // Ici, vous pouvez ajouter le code pour traiter les données du formulaire et les enregistrer

    // Fermer le modal
    $("#defineFormulaModal").modal("hide");
  });
});
// afficher les iterations
$(document).ready(function () {
  // Gestionnaire d'événement pour le bouton "Définir formule"
  $("#formuleTable").on("click", ".define-formula-button", function () {
    var id = $(this).data("id");
    // Effectuer une requête AJAX pour obtenir les opérateurs d'itération depuis l'API
    $.ajax({
      // url: "http://54.36.177.119:8010/show/operators/iteration/",
      url: WEBSERVERRules_URL + "show/operators/iteration/",
      type: "GET",
      dataType: "json",
      success: function (response) {
        var iterationOperators = response.iteration_operators;
        // Remplir le <select> avec les options des opérateurs d'itération
        var selectOptions = "";
        $.each(iterationOperators, function (index, operator) {
          selectOptions +=
            '<option value="' + operator + '">' + operator + "</option>";
        });
        // Insérer les options dans le <select>
        $("#iterationOperatorSelect").html(selectOptions);
        // Ouvrir le modal
        $("#defineFormulaModal").modal("show");
      },
      error: function (xhr, status, error) {},
    });
  });
});
// afficher les operents
$(document).ready(function () {
  // Gestionnaire d'événement pour le bouton "Définir formule"
  $("#formuleTable").on("click", ".define-formula-button", function () {
    // Effectuer une autre requête AJAX pour obtenir les options d'opérande depuis l'API
    $.ajax({
      // url: "http://54.36.177.119:8010/show/operand-options/",
      url: WEBSERVERRules_URL + "show/operand-options/",
      type: "GET",
      dataType: "json",
      success: function (operandResponse) {
        var operandOptions = operandResponse.operand_options;

        // Remplir le <select> avec les options d'opérande
        var operandSelectOptions = "";
        $.each(operandOptions, function (index, option) {
          operandSelectOptions +=
            '<option value="' + option + '">' + option + "</option>";
        });
        // Insérer les options dans le <select> d'opérande
        $("#operandOptionsSelect").html(operandSelectOptions);
        // Ouvrir le modal
        $("#defineFormulaModal").modal("show");
      },
      error: function (xhr, status, error) {},
    });
  });
});
// afficher les comparaison operateurs
$(document).ready(function () {
  // Gestionnaire d'événement pour le bouton "Définir formule"
  $("#formuleTable").on("click", ".define-formula-button", function () {
    // Effectuer une troisième requête AJAX pour obtenir les opérateurs de calcul depuis l'API
    $.ajax({
      // url: "http://54.36.177.119:8010/show/operators/comparision/",
      url: WEBSERVERRules_URL + "show/operators/comparision/",
      type: "GET",
      dataType: "json",
      success: function (calculationResponse) {
        var calculationOperators = calculationResponse.calculation_operators;
        // Remplir le <select> avec les opérateurs de calcul
        var calculationSelectOptions = "";
        $.each(calculationOperators, function (index, operator) {
          calculationSelectOptions +=
            '<option value="' + operator + '">' + operator + "</option>";
        });
        // Insérer les options dans le <select> d'opérateurs de calcul
        $("#calculationOperatorSelect").html(calculationSelectOptions);
        // Ouvrir le modal
        $("#defineFormulaModal").modal("show");
      },
      error: function (xhr, status, error) {},
    });
  });
});
// afficher les variables
$(document).ready(function () {
  // Ajoutez un événement de changement au select "Opérants"
  $("#operandOptionsSelect").on("change", function () {
    var selectedValue = $(this).val();
    // Si l'option "variable" est sélectionnée
    if (selectedValue === "variable") {
      $("#labelvariable").show();
      // Faites une requête à l'API pour obtenir les options de variable
      $.ajax({
        // url: "http://54.36.177.119:8010/variable/",
        url: WEBSERVERRules_URL + "variable/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          // Obtenez le select pour les variables
          var variableSelect = $("#variableSelect");

          // Effacez d'abord les options précédentes
          variableSelect.empty();

          // Ajoutez les nouvelles options en fonction de la réponse de l'API
          response.forEach(function (variable) {
            // Ajoutez uniquement le "name" de chaque objet comme option
            variableSelect.append(
              $("<option>", {
                value: variable.name,
                text: variable.name,
              })
            );
          });
          // Affichez le select des variables
          variableSelect.show();
        },
      });
    } else {
      // Si une autre option est sélectionnée, cachez le select des variables
      $("#variableSelect").hide();
      $("#labelvariable").hide();
    }
  });
});
// // afficher les operations
$(document).ready(function () {
  // Ajoutez un événement de changement au select "Opérants"
  $("#operandOptionsSelect").on("change", function () {
    var selectedValue = $(this).val();

    // Si l'option "operation" est sélectionnée
    if (selectedValue === "operation") {
      $("#labeloperation").show();
      // Faites une requête à l'API pour obtenir les options de variable
      $.ajax({
        // url: "http://54.36.177.119:8010/show/operations/",
        url: WEBSERVERRules_URL + "show/operations/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          // Obtenez le select pour les variables
          var operationSelect = $("#operationSelect");
          // Effacez d'abord les options précédentes
          operationSelect.empty();
          // Ajoutez les nouvelles options en fonction de la réponse de l'API
          response.forEach(function (operation) {
            // Ajoutez uniquement le "name" de chaque objet comme option
            operationSelect.append(
              $("<option>", {
                value: operation.operation_value,
                text: operation.operation_value,
              })
            );
          });
          // Affichez le select des variables
          operationSelect.show();
        },
      });
    } else {
      // Si une autre option est sélectionnée, cachez le select des variables
      $("#operationSelect").hide();
      $("#labeloperation").hide();
    }
  });
});
// ajouter Value
$(document).ready(function () {
  // Ajoutez un événement de changement au select "Opérants"
  $("#operandOptionsSelect").on("change", function () {
    var selectedValue = $(this).val();
    // Cacher tous les champs associés aux autres options
    $(
      "#variableSelect, #operationSelect, #valueInput, #valueTypeSelect, #addValueButton"
    ).hide();
    // Si l'option "value" est sélectionnée
    if (selectedValue === "value") {
      // Affichez les champs pour l'option "value"
      $(
        "#valueInput, #valueTypeSelect, #addValueButton , #labelvalue ,#labeltype"
      ).show();
      $("#valueInputLabel, #valueTypeSelectLabel").show();
    } else {
      $(
        "#valueInput, #valueTypeSelect, #addValueButton, #labelvalue ,#labeltype"
      ).hide();
      $("#valueInputLabel, #valueTypeSelectLabel").hide(); // Masquer les labels
    }
  });
  // Gérez le bouton "Ajouter" pour l'option "value"
  $("#addValueButton").on("click", function () {
    var value = $("#valueInput").val();
    var valueType = $("#valueTypeSelect").val();
    // Faites une requête à l'API pour ajouter la valeur
    $.ajax({
      // url: "http://54.36.177.119:8010/value/",
      url: WEBSERVERRules_URL + "value/",
      type: "POST",
      contentType: "application/json", // Définissez le type de contenu comme JSON
      data: JSON.stringify({
        value: value,
        type: valueType,
      }),
      dataType: "json",
      success: function (response) {
        // Traitez la réponse comme nécessaire
        console.log("Valeur ajoutée avec succès !");
      },
    });
  });
});
//afficher les operents ligne 2
$(document).ready(function () {
  // Gestionnaire d'événement pour le bouton "Définir formule"
  $("#formuleTable").on("click", ".define-formula-button", function () {
    // Effectuer une autre requête AJAX pour obtenir les options d'opérande depuis l'API
    $.ajax({
      // url: "http://54.36.177.119:8010/show/operand-options/",
      url: WEBSERVERRules_URL + "show/operand-options/",
      type: "GET",
      dataType: "json",
      success: function (operandResponse) {
        var operandOptions = operandResponse.operand_options;
        // Remplir le <select> avec les options d'opérande
        var operandSelectOptions = "";
        $.each(operandOptions, function (index, option) {
          operandSelectOptions +=
            '<option value="' + option + '">' + option + "</option>";
        });
        // Insérer les options dans le <select> d'opérande
        $("#operandOptionsSelect2").html(operandSelectOptions);
        // Ouvrir le modal
        $("#defineFormulaModal").modal("show");
      },
      error: function (xhr, status, error) {},
    });
  });
});
// afficher les variables ligne 2
$(document).ready(function () {
  // Ajoutez un événement de changement au select "Opérants"
  $("#operandOptionsSelect2").on("change", function () {
    var selectedValue = $(this).val();
    // Si l'option "variable" est sélectionnée
    if (selectedValue === "variable") {
      $("#labelvariable2").show();
      // Faites une requête à l'API pour obtenir les options de variable
      $.ajax({
        // url: "http://54.36.177.119:8010/variable/",
        url: WEBSERVERRules_URL + "variable/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          // Obtenez le select pour les variables
          var variableSelect = $("#variableSelect2");
          // Effacez d'abord les options précédentes
          variableSelect.empty();
          // Ajoutez les nouvelles options en fonction de la réponse de l'API
          response.forEach(function (variable) {
            // Ajoutez uniquement le "name" de chaque objet comme option
            variableSelect.append(
              $("<option>", {
                value: variable.name,
                text: variable.name,
              })
            );
          });
          // Affichez le select des variables
          variableSelect.show();
        },
      });
    } else {
      // Si une autre option est sélectionnée, cachez le select des variables
      $("#variableSelect2 ,#labelvariable2").hide();
    }
  });
});
// ajouter Value ligne 2
$(document).ready(function () {
  // Ajoutez un événement de changement au select "Opérants"
  $("#operandOptionsSelect2").on("change", function () {
    var selectedValue = $(this).val();
    // Cacher tous les champs associés aux autres options
    $(
      "#variableSelect2, #operationSelect2, #valueInput2, #valueTypeSelect2, #addValueButton2"
    ).hide();
    // Si l'option "value" est sélectionnée
    if (selectedValue === "value") {
      // Affichez les champs pour l'option "value"
      $(
        "#valueInput2, #valueTypeSelect2, #addValueButton2 ,#labelvalue2 , #labeltype2"
      ).show();
      $("#valueInputLabel, #valueTypeSelectLabel").show();
    } else {
      $(
        "#valueInput2, #valueTypeSelect2, #addValueButton2  ,#labelvalue2 ,#labeltype2"
      ).hide();
      $("#valueInputLabel, #valueTypeSelectLabel").hide(); // Masquer les labels
    }
  });
  // Gérez le bouton "Ajouter" pour l'option "value"
  $("#addValueButton2").on("click", function () {
    var value = $("#valueInput2").val();
    var valueType = $("#valueTypeSelect2").val();
    // Faites une requête à l'API pour ajouter la valeur
    $.ajax({
      // url: "http://54.36.177.119:8010/value/",
      url: WEBSERVERRules_URL + "value/",
      type: "POST",
      contentType: "application/json", // Définissez le type de contenu comme JSON
      data: JSON.stringify({
        value: value,
        type: valueType,
      }),
      dataType: "json",
      success: function (response) {
        // Traitez la réponse comme nécessaire
        console.log("Valeur ajoutée avec succès !");
      },
    });
  });
});
// afficher les operateurs ligne 2
$(document).ready(function () {
  // Gestionnaire d'événement pour le bouton "Définir formule"
  $("#formuleTable").on("click", ".define-formula-button", function () {
    var id = $(this).data("id");
    // Effectuer une requête AJAX pour obtenir les opérateurs d'itération depuis l'API
    $.ajax({
      // url: "http://54.36.177.119:8010/show/operators/iteration/",
      url: WEBSERVERRules_URL + "show/operators/iteration/",
      type: "GET",
      dataType: "json",
      success: function (response) {
        // Effectuer une autre requête AJAX pour obtenir les options d'opérande depuis l'API
        $.ajax({
          // url: "http://54.36.177.119:8010/show/operand-options/",
          url: WEBSERVERRules_URL + "show/operand-options/",
          type: "GET",
          dataType: "json",
          success: function (operandResponse) {
            // ...

            // Effectuer une troisième requête AJAX pour obtenir les opérateurs de calcul depuis l'API
            $.ajax({
              // url: "http://54.36.177.119:8010/show/operators/calculation/",
              url:
                WEBSERVERRules_URL + "show/operators/calculation/",
              type: "GET",
              dataType: "json",
              success: function (calculationResponse) {
                var calculationOperators =
                  calculationResponse.calculation_operators;
                // Remplir le <select> avec les opérateurs de calcul
                var calculationSelectOptions = "";
                $.each(calculationOperators, function (index, operator) {
                  calculationSelectOptions +=
                    '<option value="' +
                    operator +
                    '">' +
                    operator +
                    "</option>";
                });
                // Insérer les options dans le <select> d'opérateurs de calcul
                $("#calculationOperatorSelect2").html(calculationSelectOptions);
                // Ouvrir le modal
                $("#defineFormulaModal").modal("show");
              },
              error: function (xhr, status, error) {},
            });
          },
          error: function (xhr, status, error) {},
        });
      },
      error: function (xhr, status, error) {},
    });
  });
});
//afficher les operents  2
$(document).ready(function () {
  // Gestionnaire d'événement pour le bouton "Définir formule"
  $("#formuleTable").on("click", ".define-formula-button", function () {
    // Effectuer une autre requête AJAX pour obtenir les options d'opérande depuis l'API
    $.ajax({
      // url: "http://54.36.177.119:8010/show/operand-options/",
      url: WEBSERVERRules_URL + "show/operand-options/",
      type: "GET",
      dataType: "json",
      success: function (operandResponse) {
        var operandOptions = operandResponse.operand_options;

        // Remplir le <select> avec les options d'opérande
        var operandSelectOptions = "";
        $.each(operandOptions, function (index, option) {
          operandSelectOptions +=
            '<option value="' + option + '">' + option + "</option>";
        });
        // Insérer les options dans le <select> d'opérande
        $("#operandOptionsSelect3").html(operandSelectOptions);
        // Ouvrir le modal
        $("#defineFormulaModal").modal("show");
      },
      error: function (xhr, status, error) {},
    });
  });
});
// afficher les variables  2
$(document).ready(function () {
  // Ajoutez un événement de changement au select "Opérants"
  $("#operandOptionsSelect3").on("change", function () {
    var selectedValue = $(this).val();

    // Si l'option "variable" est sélectionnée
    if (selectedValue === "variable") {
      // Faites une requête à l'API pour obtenir les options de variable
      $.ajax({
        // url: "http://54.36.177.119:8010/variable/",
        url: WEBSERVERRules_URL + "variable/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          // Obtenez le select pour les variables
          var variableSelect = $("#variableSelect3");
          // Effacez d'abord les options précédentes
          variableSelect.empty();
          // Ajoutez les nouvelles options en fonction de la réponse de l'API
          response.forEach(function (variable) {
            // Ajoutez uniquement le "name" de chaque objet comme option
            variableSelect.append(
              $("<option>", {
                value: variable.name,
                text: variable.name,
              })
            );
          });
          // Affichez le select des variables
          variableSelect.show();
        },
      });
    } else {
      // Si une autre option est sélectionnée, cachez le select des variables
      $("#variableSelect3").hide();
    }
  });
});
// ajouter Value  2
$(document).ready(function () {
  // Ajoutez un événement de changement au select "Opérants"
  $("#operandOptionsSelect3").on("change", function () {
    var selectedValue = $(this).val();
    // Cacher tous les champs associés aux autres options
    $(
      "#variableSelect3, #operationSelect3, #valueInput3, #valueTypeSelect3, #addValueButton3"
    ).hide();
    // Si l'option "value" est sélectionnée
    if (selectedValue === "value") {
      // Affichez les champs pour l'option "value"
      $("#valueInput3, #valueTypeSelect3, #addValueButton3").show();
      $("#valueInputLabel, #valueTypeSelectLabel").show();
    } else {
      $("#valueInput3, #valueTypeSelect3, #addValueButton3").hide();
      $("#valueInputLabel, #valueTypeSelectLabel").hide(); // Masquer les labels
    }
  });
  // Gérez le bouton "Ajouter" pour l'option "value"
  $("#addValueButton3").on("click", function () {
    var value = $("#valueInput3").val();
    var valueType = $("#valueTypeSelect3").val();
    // Faites une requête à l'API pour ajouter la valeur
    $.ajax({
      // url: "http://54.36.177.119:8010/value/",
      url: WEBSERVERRules_URL + "value/",
      type: "POST",
      contentType: "application/json", // Définissez le type de contenu comme JSON
      data: JSON.stringify({
        value: value,
        type: valueType,
      }),
      dataType: "json",
      success: function (response) {
        // Traitez la réponse comme nécessaire
        console.log("Valeur ajoutée avec succès !");
      },
    });
  });
});
// afficher les operations  pour l'operant ligne 1
$(document).ready(function () {
  // Ajoutez un événement de changement au select "Opérants"
  $("#operandOptionsSelect3").on("change", function () {
    var selectedValue = $(this).val();
    // Si l'option "operation" est sélectionnée
    if (selectedValue === "operation") {
      // Faites une requête à l'API pour obtenir les options de variable
      $.ajax({
        // url: "http://54.36.177.119:8010/show/operations/",
        url: WEBSERVERRules_URL + "show/operations/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          // Obtenez le select pour les variables
          var operationSelect = $("#operationSelect3");
          // Effacez d'abord les options précédentes
          operationSelect.empty();
          // Ajoutez les nouvelles options en fonction de la réponse de l'API
          response.forEach(function (operation) {
            // Ajoutez uniquement le "name" de chaque objet comme option
            operationSelect.append(
              $("<option>", {
                value: operation.operation_value,
                text: operation.operation_value,
              })
            );
          });
          // Affichez le select des variables
          operationSelect.show();
        },
      });
    } else {
      // Si une autre option est sélectionnée, cachez le select des variables
      $("#operationSelect3").hide();
    }
  });
});
// afficher les operations  pour l'operant ligne 2
$(document).ready(function () {
  // Ajoutez un événement de changement au select "Opérants"
  $("#operandOptionsSelect2").on("change", function () {
    var selectedValue = $(this).val();
    // Si l'option "operation" est sélectionnée
    if (selectedValue === "operation") {
      $("#labeloperation2").show();
      // Faites une requête à l'API pour obtenir les options de variable
      $.ajax({
        // url: "http://54.36.177.119:8010/show/operations/",
        url: WEBSERVERRules_URL + "show/operations/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          // Obtenez le select pour les variables
          var operationSelect = $("#operationSelect2");
          // Effacez d'abord les options précédentes
          operationSelect.empty();
          // Ajoutez les nouvelles options en fonction de la réponse de l'API
          response.forEach(function (operation) {
            // Ajoutez uniquement le "name" de chaque objet comme option
            operationSelect.append(
              $("<option>", {
                value: operation.operation_value,
                text: operation.operation_value,
              })
            );
          });
          // Affichez le select des variables
          operationSelect.show();
        },
      });
    } else {
      // Si une autre option est sélectionnée, cachez le select des variables
      $("#operationSelect2,#labeloperation2").hide();
    }
  });
});
// afficher les iterations Apres click bouton Ajouter un autre operand
$(document).ready(function () {
  // Gestionnaire d'événement pour le bouton "Définir formule"
  $("#formuleTable").on("click", ".define-formula-button", function () {
    var id = $(this).data("id");
    // Effectuer une requête AJAX pour obtenir les opérateurs d'itération depuis l'API
    $.ajax({
      // url: "http://54.36.177.119:8010/show/operators/iteration/",
      url: WEBSERVERRules_URL + "show/operators/iteration/",
      type: "GET",
      dataType: "json",
      success: function (response) {
        var iterationOperators = response.iteration_operators;
        // Remplir le <select> avec les options des opérateurs d'itération
        var selectOptions = "";
        $.each(iterationOperators, function (index, operator) {
          selectOptions +=
            '<option value="' + operator + '">' + operator + "</option>";
        });
        // Insérer les options dans le <select>
        $("#iterationOperatorSelect4").html(selectOptions);
        // Ouvrir le modal
        $("#defineFormulaModal").modal("show");
      },
      error: function (xhr, status, error) {},
    });
  });
});
// afficher les operents pour iteration Apres click bouton Ajouter un autre operand
$(document).ready(function () {
  // Gestionnaire d'événement pour le bouton "Définir formule"
  $("#formuleTable").on("click", ".define-formula-button", function () {
    // Effectuer une autre requête AJAX pour obtenir les options d'opérande depuis l'API
    $.ajax({
      // url: "http://54.36.177.119:8010/show/operand-options/",
      url: WEBSERVERRules_URL + "show/operand-options/",
      type: "GET",
      dataType: "json",
      success: function (operandResponse) {
        var operandOptions = operandResponse.operand_options;

        // Remplir le <select> avec les options d'opérande
        var operandSelectOptions = "";
        $.each(operandOptions, function (index, option) {
          operandSelectOptions +=
            '<option value="' + option + '">' + option + "</option>";
        });
        // Insérer les options dans le <select> d'opérande
        $("#operandOptionsSelect4").html(operandSelectOptions);
        // Ouvrir le modal
        $("#defineFormulaModal").modal("show");
      },
      error: function (xhr, status, error) {},
    });
  });
});
// afficher les comparaison operateurs Apres click bouton Ajouter un autre operand
$(document).ready(function () {
  // Gestionnaire d'événement pour le bouton "Définir formule"
  $("#formuleTable").on("click", ".define-formula-button", function () {
    // Effectuer une troisième requête AJAX pour obtenir les opérateurs de calcul depuis l'API
    $.ajax({
      // url: "http://54.36.177.119:8010/show/operators/comparision/",
      url: WEBSERVERRules_URL + "show/operators/comparision/",
      type: "GET",
      dataType: "json",
      success: function (calculationResponse) {
        var calculationOperators = calculationResponse.calculation_operators;
        // Remplir le <select> avec les opérateurs de calcul
        var calculationSelectOptions = "";
        $.each(calculationOperators, function (index, operator) {
          calculationSelectOptions +=
            '<option value="' + operator + '">' + operator + "</option>";
        });
        // Insérer les options dans le <select> d'opérateurs de calcul
        $("#calculationOperatorSelect4").html(calculationSelectOptions);
        // Ouvrir le modal
        $("#defineFormulaModal").modal("show");
      },
      error: function (xhr, status, error) {},
    });
  });
});
// afficher les operents pour operand 2 Apres click bouton Ajouter un autre operand
$(document).ready(function () {
  // Gestionnaire d'événement pour le bouton "Définir formule"
  $("#formuleTable").on("click", ".define-formula-button", function () {
    // Effectuer une autre requête AJAX pour obtenir les options d'opérande depuis l'API
    $.ajax({
      // url: "http://54.36.177.119:8010/show/operand-options/",
      url: WEBSERVERRules_URL + "show/operand-options/",
      type: "GET",
      dataType: "json",
      success: function (operandResponse) {
        var operandOptions = operandResponse.operand_options;

        // Remplir le <select> avec les options d'opérande
        var operandSelectOptions = "";
        $.each(operandOptions, function (index, option) {
          operandSelectOptions +=
            '<option value="' + option + '">' + option + "</option>";
        });
        // Insérer les options dans le <select> d'opérande
        $("#operandOptionsSelectl3").html(operandSelectOptions);
        // Ouvrir le modal
        $("#defineFormulaModal").modal("show");
      },
      error: function (xhr, status, error) {},
    });
  });
});
// afficher les operations  pour l'operant 2 dans la Dernière ligne
$(document).ready(function () {
  // Ajoutez un événement de changement au select "Opérants"
  $("#operandOptionsSelectl3").on("change", function () {
    var selectedValue = $(this).val();
    // Si l'option "operation" est sélectionnée
    if (selectedValue === "operation") {
      $("#labeloperationl3").show();
      // Faites une requête à l'API pour obtenir les options de variable
      $.ajax({
        // url: "http://54.36.177.119:8010/show/operations/",
        url: WEBSERVERRules_URL + "show/operations/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          // Obtenez le select pour les variables
          var operationSelect = $("#operationSelectl3");
          // Effacez d'abord les options précédentes
          operationSelect.empty();
          // Ajoutez les nouvelles options en fonction de la réponse de l'API
          response.forEach(function (operation) {
            // Ajoutez uniquement le "name" de chaque objet comme option
            operationSelect.append(
              $("<option>", {
                value: operation.operation_value,
                text: operation.operation_value,
              })
            );
          });
          // Affichez le select des variables
          operationSelect.show();
        },
      });
    } else {
      // Si une autre option est sélectionnée, cachez le select des variables
      $("#operationSelectl3,#labeloperationl3").hide();
    }
  });
});
// afficher les variables pour l'operant 2 dans la Dernière ligne
$(document).ready(function () {
  // Ajoutez un événement de changement au select "Opérants"
  $("#operandOptionsSelectl3").on("change", function () {
    var selectedValue = $(this).val();

    // Si l'option "variable" est sélectionnée
    if (selectedValue === "variable") {
      $("#labelvariablel3").show();
      // Faites une requête à l'API pour obtenir les options de variable
      $.ajax({
        // url: "http://54.36.177.119:8010/variable/",
        url: WEBSERVERRules_URL + "variable/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          // Obtenez le select pour les variables
          var variableSelect = $("#variableSelectl3");
          // Effacez d'abord les options précédentes
          variableSelect.empty();
          // Ajoutez les nouvelles options en fonction de la réponse de l'API
          response.forEach(function (variable) {
            // Ajoutez uniquement le "name" de chaque objet comme option
            variableSelect.append(
              $("<option>", {
                value: variable.name,
                text: variable.name,
              })
            );
          });
          // Affichez le select des variables
          variableSelect.show();
        },
      });
    } else {
      // Si une autre option est sélectionnée, cachez le select des variables
      $("#variableSelectl3,#labelvariablel3").hide();
    }
  });
});
// ajouter Value pour l'operant 2 dans la Dernière ligne
$(document).ready(function () {
  // Ajoutez un événement de changement au select "Opérants"
  $("#operandOptionsSelectl3").on("change", function () {
    var selectedValue = $(this).val();
    // Cacher tous les champs associés aux autres options
    $(
      "#variableSelectl3, #operationSelectl3, #valueInputl3, #valueTypeSelectl3, #addValueButtonl3"
    ).hide();
    // Si l'option "value" est sélectionnée
    if (selectedValue === "value") {
      // Affichez les champs pour l'option "value"
      $(
        "#valueInputl3, #valueTypeSelectl3, #addValueButtonl3,#labelvaluel3,#labeltypel3"
      ).show();
      $("#valueInputLabel, #valueTypeSelectLabel").show();
    } else {
      $(
        "#valueInputl3, #valueTypeSelectl3, #addValueButtonl3,#labelvaluel3,#labeltypel3"
      ).hide();
      $("#valueInputLabel, #valueTypeSelectLabel").hide(); // Masquer les labels
    }
  });
  // Gérez le bouton "Ajouter" pour l'option "value"
  $("#addValueButtonl3").on("click", function () {
    var value = $("#valueInputl3").val();
    var valueType = $("#valueTypeSelectl3").val();
    // Faites une requête à l'API pour ajouter la valeur
    $.ajax({
      // url: "http://54.36.177.119:8010/value/",
      url: WEBSERVERRules_URL + "value/",
      type: "POST",
      contentType: "application/json", // Définissez le type de contenu comme JSON
      data: JSON.stringify({
        value: value,
        type: valueType,
      }),
      dataType: "json",
      success: function (response) {
        // Traitez la réponse comme nécessaire
        console.log("Valeur ajoutée avec succès !");
      },
    });
  });
});
// afficher les operations pour l'iteration Apres click bouton Ajouter un autre operand
$(document).ready(function () {
  // Ajoutez un événement de changement au select "Opérants"
  $("#operandOptionsSelect4").on("change", function () {
    var selectedValue = $(this).val();
    // Si l'option "operation" est sélectionnée
    if (selectedValue === "operation") {
      $("#labeloperation4").show();
      // Faites une requête à l'API pour obtenir les options de variable
      $.ajax({
        // url: "http://54.36.177.119:8010/show/operations/",
        url: WEBSERVERRules_URL + "show/operations/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          // Obtenez le select pour les variables
          var operationSelect = $("#operationSelect4");
          // Effacez d'abord les options précédentes
          operationSelect.empty();
          // Ajoutez les nouvelles options en fonction de la réponse de l'API
          response.forEach(function (operation) {
            // Ajoutez uniquement le "name" de chaque objet comme option
            operationSelect.append(
              $("<option>", {
                value: operation.operation_value,
                text: operation.operation_value,
              })
            );
          });
          // Affichez le select des variables
          operationSelect.show();
        },
      });
    } else {
      // Si une autre option est sélectionnée, cachez le select des variables
      $("#operationSelect4,#labeloperation4").hide();
    }
  });
});
// afficher les variables pour l'iteration Apres click bouton Ajouter un autre operand
$(document).ready(function () {
  // Ajoutez un événement de changement au select "Opérants"
  $("#operandOptionsSelect4").on("change", function () {
    var selectedValue = $(this).val();

    // Si l'option "variable" est sélectionnée
    if (selectedValue === "variable") {
      $(" #labelvariable4").show();
      // Faites une requête à l'API pour obtenir les options de variable
      $.ajax({
        // url: "http://54.36.177.119:8010/variable/",
        url: WEBSERVERRules_URL + "variable/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          // Obtenez le select pour les variables
          var variableSelect = $("#variableSelect4");
          // Effacez d'abord les options précédentes
          variableSelect.empty();
          // Ajoutez les nouvelles options en fonction de la réponse de l'API
          response.forEach(function (variable) {
            // Ajoutez uniquement le "name" de chaque objet comme option
            variableSelect.append(
              $("<option>", {
                value: variable.name,
                text: variable.name,
              })
            );
          });
          // Affichez le select des variables
          variableSelect.show();
        },
      });
    } else {
      // Si une autre option est sélectionnée, cachez le select des variables
      $("#variableSelect4 , #labelvariable4").hide();
    }
  });
});
// ajouter Value pour pour l'iteration Apres click bouton Ajouter un autre operand
$(document).ready(function () {
  // Ajoutez un événement de changement au select "Opérants"
  $("#operandOptionsSelect4").on("change", function () {
    var selectedValue = $(this).val();
    // Cacher tous les champs associés aux autres options
    $(
      "#variableSelect4, #operationSelect4, #valueInput4, #valueTypeSelect4, #addValueButton4"
    ).hide();
    // Si l'option "value" est sélectionnée
    if (selectedValue === "value") {
      // Affichez les champs pour l'option "value"
      $(
        "#valueInput4, #valueTypeSelect4, #addValueButton4,#labelvalue4,#labeltype4"
      ).show();
      $("#valueInputLabel, #valueTypeSelectLabel").show();
    } else {
      $(
        "#valueInput4, #valueTypeSelect4, #addValueButton4,#labelvalue4,#labeltype4"
      ).hide();
      $("#valueInputLabel, #valueTypeSelectLabel").hide(); // Masquer les labels
    }
  });
  // Gérez le bouton "Ajouter" pour l'option "value"
  $("#addValueButton4").on("click", function () {
    var value = $("#valueInput4").val();
    var valueType = $("#valueTypeSelect4").val();
    // Faites une requête à l'API pour ajouter la valeur
    $.ajax({
      // url: "http://54.36.177.119:8010/value/",
      url: WEBSERVERRules_URL + "value/",
      type: "POST",
      contentType: "application/json", // Définissez le type de contenu comme JSON
      data: JSON.stringify({
        value: value,
        type: valueType,
      }),
      dataType: "json",
      success: function (response) {
        // Traitez la réponse comme nécessaire
        console.log("Valeur ajoutée avec succès !");
      },
    });
  });
});
// afficher les operents à droite pour l'iteration Apres click bouton Ajouter un autre operand
$(document).ready(function () {
  // Gestionnaire d'événement pour le bouton "Définir formule"
  $("#formuleTable").on("click", ".define-formula-button", function () {
    // Effectuer une autre requête AJAX pour obtenir les options d'opérande depuis l'API
    $.ajax({
      // url: "http://54.36.177.119:8010/show/operand-options/",
      url: WEBSERVERRules_URL + "show/operand-options/",
      type: "GET",
      dataType: "json",
      success: function (operandResponse) {
        var operandOptions = operandResponse.operand_options;

        // Remplir le <select> avec les options d'opérande
        var operandSelectOptions = "";
        $.each(operandOptions, function (index, option) {
          operandSelectOptions +=
            '<option value="' + option + '">' + option + "</option>";
        });
        // Insérer les options dans le <select> d'opérande
        $("#operandOptionsSelect5").html(operandSelectOptions);
        // Ouvrir le modal
        $("#defineFormulaModal").modal("show");
      },
      error: function (xhr, status, error) {},
    });
  });
});
// afficher les operations  operation à droite pour l'iteration Apres click bouton Ajouter un autre operand
$(document).ready(function () {
  // Ajoutez un événement de changement au select "Opérants"
  $("#operandOptionsSelect5").on("change", function () {
    var selectedValue = $(this).val();
    // Si l'option "operation" est sélectionnée
    if (selectedValue === "operation") {
      // Faites une requête à l'API pour obtenir les options de variable
      $.ajax({
        // url: "http://54.36.177.119:8010/show/operations/",
        url: WEBSERVERRules_URL + "show/operations/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          // Obtenez le select pour les variables
          var operationSelect = $("#operationSelect5");
          // Effacez d'abord les options précédentes
          operationSelect.empty();
          // Ajoutez les nouvelles options en fonction de la réponse de l'API
          response.forEach(function (operation) {
            // Ajoutez uniquement le "name" de chaque objet comme option
            operationSelect.append(
              $("<option>", {
                value: operation.operation_value,
                text: operation.operation_value,
              })
            );
          });
          // Affichez le select des variables
          operationSelect.show();
        },
      });
    } else {
      // Si une autre option est sélectionnée, cachez le select des variables
      $("#operationSelect5").hide();
    }
  });
});
// afficher les variables pour operation à droite pour l'iteration Apres click bouton Ajouter un autre operand
$(document).ready(function () {
  // Ajoutez un événement de changement au select "Opérants"
  $("#operandOptionsSelect5").on("change", function () {
    var selectedValue = $(this).val();

    // Si l'option "variable" est sélectionnée
    if (selectedValue === "variable") {
      // Faites une requête à l'API pour obtenir les options de variable
      $.ajax({
        // url: "http://54.36.177.119:8010/variable/",
        url: WEBSERVERRules_URL + "variable/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          // Obtenez le select pour les variables
          var variableSelect = $("#variableSelect5");
          // Effacez d'abord les options précédentes
          variableSelect.empty();
          // Ajoutez les nouvelles options en fonction de la réponse de l'API
          response.forEach(function (variable) {
            // Ajoutez uniquement le "name" de chaque objet comme option
            variableSelect.append(
              $("<option>", {
                value: variable.name,
                text: variable.name,
              })
            );
          });
          // Affichez le select des variables
          variableSelect.show();
        },
      });
    } else {
      // Si une autre option est sélectionnée, cachez le select des variables
      $("#variableSelect5").hide();
    }
  });
});
// ajouter Value pour operation à droite pour l'iteration Apres click bouton Ajouter un autre operand
$(document).ready(function () {
  // Ajoutez un événement de changement au select "Opérants"
  $("#operandOptionsSelect5").on("change", function () {
    var selectedValue = $(this).val();
    // Cacher tous les champs associés aux autres options
    $(
      "#variableSelect5, #operationSelect5, #valueInput5, #valueTypeSelect5, #addValueButton5"
    ).hide();
    // Si l'option "value" est sélectionnée
    if (selectedValue === "value") {
      // Affichez les champs pour l'option "value"
      $("#valueInput5, #valueTypeSelect5, #addValueButton5").show();
      $("#valueInputLabel, #valueTypeSelectLabel").show();
    } else {
      $("#valueInput5, #valueTypeSelect5, #addValueButton5").hide();
      $("#valueInputLabel, #valueTypeSelectLabel").hide(); // Masquer les labels
    }
  });
  // Gérez le bouton "Ajouter" pour l'option "value"
  $("#addValueButton5").on("click", function () {
    var value = $("#valueInput5").val();
    var valueType = $("#valueTypeSelect5").val();
    // Faites une requête à l'API pour ajouter la valeur
    $.ajax({
      // url: "http://54.36.177.119:8010/value/",
      url: WEBSERVERRules_URL + "value/",
      type: "POST",
      contentType: "application/json", // Définissez le type de contenu comme JSON
      data: JSON.stringify({
        value: value,
        type: valueType,
      }),
      dataType: "json",
      success: function (response) {
        // Traitez la réponse comme nécessaire
        console.log("Valeur ajoutée avec succès !");
      },
    });
  });
});
//////////////////////////////////////////////////
// afficher les operents
$(document).ready(function () {
  // Gestionnaire d'événement pour le bouton "Définir formule"
  $("#formuleTable").on("click", ".define-formula-button", function () {
    // Effectuer une autre requête AJAX pour obtenir les options d'opérande depuis l'API
    $.ajax({
      // url: "http://54.36.177.119:8010/show/operand-options/",
      url: WEBSERVERRules_URL + "show/operand-options/",
      type: "GET",
      dataType: "json",
      success: function (operandResponse) {
        var operandOptions = operandResponse.operand_options;

        // Remplir le <select> avec les options d'opérande
        var operandSelectOptions = "";
        $.each(operandOptions, function (index, option) {
          operandSelectOptions +=
            '<option value="' + option + '">' + option + "</option>";
        });
        // Insérer les options dans le <select> d'opérande
        $("#operandOptionsSelectOP").html(operandSelectOptions);
        // Ouvrir le modal
        $("#defineFormulaModal").modal("show");
      },
      error: function (xhr, status, error) {},
    });
  });
});
///////////////////////////////////

//////ajout//////
$(document).ready(function () {
  var IdOperation, IdOperation2, IdVariable, IdVariable2, IdValuee1, IdValuee2;

  // Ajoutez un événement de changement au select "Opérants"
  $("#operandOptionsSelectOP").on("change", function () {
    var selectedValue = $(this).val();

    // Si l'option "variable" est sélectionnée
    if (selectedValue === "variable") {
      $("#labelvariableOP").show();
      // Faites une requête à l'API pour obtenir les options de variable
      $.ajax({
        // url: "http://54.36.177.119:8010/variable/",
        url: WEBSERVERRules_URL + "variable/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          // Obtenez le select pour les variables
          var variableSelect = $("#variableSelectOP");
          // Effacez d'abord les options précédentes
          variableSelect.empty();
          // Ajoutez les nouvelles options en fonction de la réponse de l'API
          response.forEach(function (variable) {
            // Ajoutez uniquement le "name" de chaque objet comme option
            variableSelect.append(
              $("<option>", {
                value: variable.id,
                text: variable.name,
              })
            );
          });
          // Affichez le select des variables
          variableSelect.show();
        },
      });
    } else {
      // Si une autre option est sélectionnée, cachez le select des variables
      $("#variableSelectOP,#labelvariableOP").hide();
    }
    // Ajoutez un événement de changement au select des opérations
    $("#variableSelectOP").on("change", function () {
      IdVariable = $(this).val(); // Stockez l'ID de l'opération sélectionnée
      console.log("ID de la variable sélectionnée :", IdVariable);
    });
  });
  // Ajoutez un événement de changement au select "Opérants"
  $("#operandOptionsSelectOP2").on("change", function () {
    var selectedValue = $(this).val();

    // Si l'option "variable" est sélectionnée
    if (selectedValue === "variable") {
      $("#labelvariableOP2").show();
      // Faites une requête à l'API pour obtenir les options de variable
      $.ajax({
        // url: "http://54.36.177.119:8010/variable/",
        url: WEBSERVERRules_URL + "variable/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          // Obtenez le select pour les variables
          var variableSelect = $("#variableSelectOP2");
          // Effacez d'abord les options précédentes
          variableSelect.empty();
          // Ajoutez les nouvelles options en fonction de la réponse de l'API
          response.forEach(function (variable) {
            // Ajoutez uniquement le "name" de chaque objet comme option
            variableSelect.append(
              $("<option>", {
                // value: variable.name,
                value: variable.id,
                text: variable.name,
              })
            );
          });
          // Affichez le select des variables
          variableSelect.show();
        },
      });
    } else {
      // Si une autre option est sélectionnée, cachez le select des variables
      $("#variableSelectOP2,#labelvariableOP2").hide();
    }
    // Ajoutez un événement de changement au select des opérations
    $("#variableSelectOP2").on("change", function () {
      IdVariable2 = $(this).val(); // Stockez l'ID de l'opération sélectionnée
      console.log("ID de la variable sélectionnée :", IdVariable2);
    });
  });
  // Ajoutez un événement de changement au select "Opérants"
  $("#operandOptionsSelectOP").on("change", function () {
    var selectedValue = $(this).val();
    // Si l'option "operation" est sélectionnée
    if (selectedValue === "operation") {
      $("#labeloperationOP").show();
      // Faites une requête à l'API pour obtenir les options de variable
      $.ajax({
        // url: "http://54.36.177.119:8010/show/operations/",
        url: WEBSERVERRules_URL + "show/operations/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          // Obtenez le select pour les opérations
          var operationSelect = $("#operationSelectOP");
          // Effacez d'abord les options précédentes
          operationSelect.empty();
          // Ajoutez les nouvelles options en fonction de la réponse de l'API
          response.forEach(function (operation) {
            // Ajoutez uniquement le "name" de chaque objet comme option
            operationSelect.append(
              $("<option>", {
                value: operation.operation_ID, // Utilisez operation_ID comme valeur
                text: operation.operation_value,
              })
            );
          });
          // Affichez le select des opérations
          operationSelect.show();
        },
      });
    } else {
      // Si une autre option est sélectionnée, cachez le select des opérations
      $("#operationSelectOP ,#labeloperationOP").hide();
    }
  });

  // Ajoutez un événement de changement au select des opérations
  $("#operationSelectOP").on("change", function () {
    IdOperation = $(this).val(); // Stockez l'ID de l'opération sélectionnée
    console.log("ID de l'opération sélectionnée :", IdOperation);
  });

  // Ajoutez un événement de changement au select "Opérants"
  $("#operandOptionsSelectOP2").on("change", function () {
    var selectedValue = $(this).val();
    // Si l'option "operation" est sélectionnée
    if (selectedValue === "operation") {
      $("#labeloperationOP2").show();
      // Faites une requête à l'API pour obtenir les options de variable
      $.ajax({
        // url: "http://54.36.177.119:8010/show/operations/",
        url: WEBSERVERRules_URL + "show/operations/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          // Obtenez le select pour les opérations
          var operationSelect = $("#operationSelectOP2");
          // Effacez d'abord les options précédentes
          operationSelect.empty();
          // Ajoutez les nouvelles options en fonction de la réponse de l'API
          response.forEach(function (operation) {
            // Ajoutez uniquement le "name" de chaque objet comme option
            operationSelect.append(
              $("<option>", {
                value: operation.operation_ID, // Utilisez operation_ID comme valeur
                text: operation.operation_value,
              })
            );
          });
          // Affichez le select des opérations
          operationSelect.show();
        },
      });
    } else {
      // Si une autre option est sélectionnée, cachez le select des opérations
      $("#operationSelectOP2 ,#labeloperationOP2").hide();
    }
  });
  // Ajoutez un événement de changement au select des opérations
  $("#operationSelectOP2").on("change", function () {
    IdOperation2 = $(this).val(); // Stockez l'ID de l'opération sélectionnée
    console.log("ID de l'opération sélectionnée :", IdOperation2);
  });
  ////////
  // lister les values et ajouter value //// pour operant 1 ///////////

  $("#operandOptionsSelectOP").on("change", function () {
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
  $("#operandOptionsSelectOP2").on("change", function () {
    var selectedValue = $(this).val();
    if (selectedValue === "value") {
      $("#labelvalueOP2, #addValuebouton2").show();
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
      $("#valueSelect2,#labelvalueOP2, #addValuebouton2").hide();
    }
    // Ajoutez un événement de changement au select des opérations
    $("#valueSelect2").on("change", function () {
      IdValuee2 = $(this).val(); // Stockez l'ID de l'opération sélectionnée
      console.log("ID de la valeur sélectionnée :", IdValuee2);
    });
  });

  ////////
  $("#addOperationButton").on("click", function () {
    if ($("#operandOptionsSelectOP").val() === "variable") {
      var operand1Id = IdVariable;
    }
    if ($("#operandOptionsSelectOP2").val() === "variable") {
      var operand2Id = IdVariable2;
    }
    if ($("#operandOptionsSelectOP").val() === "operation") {
      var operand1Id = IdOperation;
    }
    if ($("#operandOptionsSelectOP2").val() === "operation") {
      var operand2Id = IdOperation2;
    }
    if (
      $("#operandOptionsSelectOP").val() === "value" &&
      $("#operandOptionsSelectOP2").val() === "value"
    ) {
      var operand1Id = IdValuee1;
      var operand2Id = IdValuee2;
    }
    if (
      $("#operandOptionsSelectOP").val() === "operation" &&
      $("#operandOptionsSelectOP2").val() === "variable"
    ) {
      var operand1Id = IdOperation;
    }
    if (
      $("#operandOptionsSelectOP").val() === "variable" &&
      $("#operandOptionsSelectOP2").val() === "operation"
    ) {
      var operand2Id = IdOperation2;
    }
    //////////////
    if (
      $("#operandOptionsSelectOP").val() === "value" &&
      $("#operandOptionsSelectOP2").val() === "variable"
    ) {
      var operand1Id = IdValuee1;
      var operand2Id = IdVariable2;
    }
    if (
      $("#operandOptionsSelectOP").val() === "variable" &&
      $("#operandOptionsSelectOP2").val() === "value"
    ) {
      var operand1Id = IdVariable;
      var operand2Id = IdValuee2;
    }
    ///////////////
    if (
      $("#operandOptionsSelectOP").val() === "value" &&
      $("#operandOptionsSelectOP2").val() === "operation"
    ) {
      var operand1Id = IdValuee1;
      var operand2Id = IdOperation2;
    }
    if (
      $("#operandOptionsSelectOP").val() === "operation" &&
      $("#operandOptionsSelectOP2").val() === "value"
    ) {
      var operand1Id = IdOperation;
      var operand2Id = IdValuee2;
    }
    var operator = $("#calculationOperatorSelect2").val();

    var operationPayload = {
      initial_score: 0,
      operand_1_id: operand1Id,
      operand_1_type: $("#operandOptionsSelectOP").val(),
      operator: operator,
      operand_2_id: operand2Id,
      operand_2_type: $("#operandOptionsSelectOP2").val(),
      iteration: null,
    };
    // Send the POST request to add the operation
    $.ajax({
      url: WEBSERVERRules_URL + "operation/",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(operationPayload),
      dataType: "json",
      success: function (response) {
        // Handle the success response as needed
        console.log("Opération ajoutée avec succès !");
        Toast.fire({
          icon: "success",
          title: "Opération ajoutée avec succès",
        });
      },
      error: function (xhr, status, error) {
        // Handle the error response
        console.error("Erreur lors de l'ajout de l'opération:", error);
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
  const addButton2 = document.getElementById("addValuebouton2");
  const addvalueButton2 = document.getElementById("ajouterValuebouton2");
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
  ///////////
  document
    .getElementById("addValuebouton2")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Désactive l'action par défaut du bouton
      // Le reste de votre code ici
    });
  document
    .getElementById("addvalue")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Désactive l'action par défaut du bouton
      // Le reste de votre code ici
    });
});
///////////////////////////////////////////
// afficher les iterations pour iteration 2
$(document).ready(function () {
  // Gestionnaire d'événement pour le bouton "Définir formule"
  $("#formuleTable").on("click", ".define-formula-button", function () {
    var id = $(this).data("id");
    // Effectuer une requête AJAX pour obtenir les opérateurs d'itération depuis l'API
    $.ajax({
      // url: "http://54.36.177.119:8010/show/operators/iteration/",
      url: WEBSERVERRules_URL + "show/operators/iteration/",
      type: "GET",
      dataType: "json",
      success: function (response) {
        var iterationOperators = response.iteration_operators;
        // Remplir le <select> avec les options des opérateurs d'itération
        var selectOptions = "";
        $.each(iterationOperators, function (index, operator) {
          selectOptions +=
            '<option value="' + operator + '">' + operator + "</option>";
        });
        // Insérer les options dans le <select>
        $("#iterationOperatorSelectit2").html(selectOptions);
        // Ouvrir le modal
        $("#defineFormulaModal").modal("show");
      },
      error: function (xhr, status, error) {},
    });
  });
});
////////////////operand 2 dans operation
// afficher les operents
$(document).ready(function () {
  // Gestionnaire d'événement pour le bouton "Définir formule"
  $("#formuleTable").on("click", ".define-formula-button", function () {
    // Effectuer une autre requête AJAX pour obtenir les options d'opérande depuis l'API
    $.ajax({
      // url: "http://54.36.177.119:8010/show/operand-options/",
      url: WEBSERVERRules_URL + "show/operand-options/",
      type: "GET",
      dataType: "json",
      success: function (operandResponse) {
        var operandOptions = operandResponse.operand_options;

        // Remplir le <select> avec les options d'opérande
        var operandSelectOptions = "";
        $.each(operandOptions, function (index, option) {
          operandSelectOptions +=
            '<option value="' + option + '">' + option + "</option>";
        });
        // Insérer les options dans le <select> d'opérande
        $("#operandOptionsSelectOP2").html(operandSelectOptions);
        // Ouvrir le modal
        $("#defineFormulaModal").modal("show");
      },
      error: function (xhr, status, error) {},
    });
  });
});

// ///ajouter value //// pour operant 1 ///////////
// Gérez le bouton "Ajouter" pour l'option "value"
$("#ajoutervalue").on("click", function () {
  event.preventDefault();
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
$("#ajouterValuebouton2").on("click", function () {
  event.preventDefault();
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
