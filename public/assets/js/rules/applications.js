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
  let selectedRow = null;
  let selectedcol = null;
  var echantillonTable = $("#echantillonsTable").DataTable({
    ajax: {
      url: WEBSERVERRules_URL + "sample",
      type: "GET",
      dataType: "json",
      dataSrc: function (data) {
        // Modifier les données récupérées depuis le serveur
        // pour inclure le résultat de l'API dans la colonne "context"
        for (var i = 0; i < data.length; i++) {
          var contextId = data[i].context; // Récupérer l'ID du contexte
          var apiURL =
            WEBSERVERRules_URL +
            "show/condition/?condition_id=" +
            contextId;

          // Faire une requête Ajax pour récupérer les données de l'API
          $.ajax({
            url: apiURL,
            type: "GET",
            dataType: "json",
            async: false, // Assurez-vous que la requête est synchrone
            success: function (apiData) {
              // apiData contient les données de l'API
              // Vous pouvez extraire la condition ici
              var condition = apiData[contextId];
              data[i].context = condition; // Remplacez les données de la colonne "context"
            },
            error: function (xhr, status, error) {
              console.log(
                "Erreur lors de la récupération du contexte :",
                error
              );
              data[i].context = "Pas de contexte !"; // En cas d'erreur, afficher "Pas de contexte !"
            },
          });
        }
        return data;
      },
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
      { data: "context" }, // Cette colonne sera remplie avec les données de l'API
    ],
    columnDefs: [
      {
        targets: -1,
        width: "100px",
      },
    ],
    responsive: true,
    language: {
      // French language configuration here
      sProcessing: "Traitement en cours...",
      sSearch: "Rechercher&nbsp;:",
      sLengthMenu: "Afficher _MENU_ &eacute;l&eacute;ments",
      sInfo:
        "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
      sInfoEmpty:
        "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
      sInfoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
      sInfoPostFix: "",
      sLoadingRecords: "Chargement en cours...",
      sZeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",
      sEmptyTable: "Chargement en cours....",
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
        if (selectedRow === this) {
          // If the clicked row is already selected, deselect it
          $(this).removeClass("selected");
          selectedRow = null;
          $("#getsample").text(""); // Clear the selected name
        } else {
          // Deselect the previously selected row
          if (selectedRow !== null) {
            $(selectedRow).removeClass("selected");
          }

          // Select the clicked row
          $(this).addClass("selected");
          selectedRow = this;

          // Display the selected name in the  table
          const selectedName = data.name;
          const getsampleID = data.id;
          $("#getsampleID").val(getsampleID);
          $("#getsample").val(selectedName);
        }
      });

      // Reset selectedRow when a DataTable page is changed
      echantillonTable.on("page.dt", function () {
        $(selectedRow).removeClass("selected");
        selectedRow = null;
        $("#getsample").text(""); // Clear the selected name
      });
    },

    lengthMenu: [5, 10, 25, 50], // Set the options for the number of rows per page
    pageLength: 5, // Set the default number of rows per pageù
    dom: '<"top"l<"float-left"f>rtip>',
  });

  /////////////
  // Handle the "Info" button click event
  $("#echantillonsTable").on("click", ".info-button", function () {
    var row = $(this).closest("tr");
    var rowData = echantillonTable.row(row).data();
    var createdDate = new Date(rowData.created_at);
    var formattedDate = createdDate.toLocaleDateString();
    console.log(rowData);

    // Faire appel à l'API
    $.ajax({
      url:
        WEBSERVERRules_URL +
        "show/condition/?condition_id=" +
        rowData.context,
      method: "GET",
      dataType: "json",
      success: function (response) {
        // Stocker la réponse de l'API dans la variable "condition"
        var condition = response[rowData.context];
        // Afficher les données dans le modal Bootstrap
        $("#EchantillonName").text("Nom :  " + rowData.name);
        $("#dateCreate").text("Date de création : " + formattedDate);
        $("#EchantillonContext").text("Contexte : " + condition);

        // Afficher le modal Bootstrap
        $("#show-echantillions").modal("show");
      },
      error: function (error) {
        console.error("Erreur lors de l'appel à l'API : " + error);
        // Afficher le modal Bootstrap
        $("#show-echantillions").modal("show");
        // Afficher "pas de contexte !" dans #EchantillonContext
        $("#EchantillonName").text("Nom :  " + rowData.name);
        $("#dateCreate").text("Date de création : " + formattedDate);
        $("#EchantillonContext").text("Contexte : pas de contexte !");
      },
    });
  });
  ///////////
  var conceptTableName = $("#conceptTable").DataTable({
    ajax: {
      url: WEBSERVERRules_URL + "concept",
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
    ],
    language: {
      // French language configuration here
      sProcessing: "Traitement en cours...",
      sSearch: "Rechercher&nbsp;:",
      sLengthMenu: "Afficher _MENU_ &eacute;l&eacute;ments",
      sInfo:
        "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
      sInfoEmpty:
        "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
      sInfoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
      sInfoPostFix: "",
      sLoadingRecords: "Chargement en cours...",
      sZeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",

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
    // To keep track of the currently selected row

    rowCallback: function (row, data) {
      // Make the table rows clickable and selected in blue
      $(row).on("click", function () {
        if (selectedcol === this) {
          // If the clicked row is already selected, deselect it
          $(this).removeClass("selected");
          selectedcol = null;
          $("#getconcept").text(""); // Clear the selected name
        } else {
          // Deselect the previously selected row
          if (selectedcol !== null) {
            $(selectedcol).removeClass("selected");
          }

          // Select the clicked row
          $(this).addClass("selected");
          selectedcol = this;

          // Display the selected name in the  table
          const selectedName = data.name;
          const getIdconcept = data.id;
          $("#getIdconcept").val(getIdconcept);
          $("#getconcept").val(selectedName);
        }
      });

      // Reset selectedRow when a DataTable page is changed
      echantillonTable.on("page.dt", function () {
        $(selectedRow).removeClass("selected");
        selectedcol = null;
        $("#getconcept").text("");
      });
    },

    lengthMenu: [5, 10, 25, 50],
    pageLength: 5,
    dom: '<"top"l<"float-left"f>rtip>',
  });
  var qualificationTableName = $("#qualificationTable").DataTable({
    ajax: {
      url: WEBSERVERRules_URL + "qualification/context",
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
      { data: "quality" },
      { data: "context_min_score" },
      { data: "context_max_score" },
      {
        data: "created_at",
        render: function (data) {
          // Format the date as YYYY-MM-DD
          return moment(data).format("DD-MM-YYYY");
        },
      },
      {
        data: "concept",
        render: function (data) {
          // Utilisez une balise <span> pour afficher le nom du concept
          return (
            '<span class="concept-name" data-concept-id="' + data + '"></span>'
          );
        },
      },
    ],
    createdRow: function (row, data) {
      // Récupérez l'ID du concept à partir des données
      const conceptId = data.concept;

      // Sélectionnez la balise <span> avec la classe "concept-name"
      const conceptNameElement = $(row).find(".concept-name");

      // Faites une requête AJAX pour obtenir le nom du concept à partir de l'API
      $.ajax({
        url: WEBSERVERRules_URL + "concept/" + conceptId,
        type: "GET",
        dataType: "json",
        success: function (conceptData) {
          // Mettez à jour le contenu de la balise <span> avec le nom du concept
          conceptNameElement.text(conceptData.name);
        },
        error: function (error) {
          console.error(
            "Erreur lors de la récupération des détails du concept :",
            error
          );
        },
      });
    },

    language: {
      // French language configuration here
      sProcessing: "Traitement en cours...",
      sSearch: "Rechercher&nbsp;:",
      sLengthMenu: "Afficher _MENU_ &eacute;l&eacute;ments",
      sInfo:
        "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
      sInfoEmpty:
        "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
      sInfoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
      sInfoPostFix: "",
      sLoadingRecords: "Chargement en cours...",
      sZeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",

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
    // To keep track of the currently selected row

    rowCallback: function (row, data) {
      // Make the table rows clickable and selected in blue
      $(row).on("click", function () {
        if (selectedcol === this) {
          // If the clicked row is already selected, deselect it
          $(this).removeClass("selected");
          selectedcol = null;
          // $("#getqualification").text(""); // Clear the selected name
        } else {
          // Deselect the previously selected row
          if (selectedcol !== null) {
            $(selectedcol).removeClass("selected");
          }

          // Select the clicked row
          $(this).addClass("selected");
          selectedcol = this;

          // Display the selected name in the  table
          const selectedqualification = "test";
          const getIdqualification = data.id;
          $("#getIdqualification").val(getIdqualification);
          $("#getqualification").val(selectedqualification);
        }
      });

      // Reset selectedRow when a DataTable page is changed
      echantillonTable.on("page.dt", function () {
        $(selectedRow).removeClass("selected");
        selectedcol = null;
        // $("#getqualification").text("");
      });
    },

    lengthMenu: [5, 10, 25, 50],
    pageLength: 5,
    dom: '<"top"l<"float-left"f>rtip>',
  });
  var servicesTableName = $("#serviceTable").DataTable({
    ajax: {
      url: WEBSERVERRules_URL + "services",
      type: "GET",
      dataType: "json",
      dataSrc: "",
    },
    columns: [
      { data: "name" },
      {
        data: "disabled",
        render: function (data, type, row) {
          var status = data === false ? "Active" : "Inactive";
          var badgeClass = data === false ? "badge-success" : "badge-danger";
          return '<span class="badge ' + badgeClass + '">' + status + "</span>";
        },
      },
    ],
    language: {
      // French language configuration here
      sProcessing: "Traitement en cours...",
      sSearch: "Rechercher&nbsp;:",
      sLengthMenu: "Afficher _MENU_ &eacute;l&eacute;ments",
      sInfo:
        "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
      sInfoEmpty:
        "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
      sInfoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
      sInfoPostFix: "",
      sLoadingRecords: "Chargement en cours...",
      sZeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",

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
    // To keep track of the currently selected row

    rowCallback: function (row, data) {
      // Make the table rows clickable and selected in blue
      $(row).on("click", function () {
        if (selectedcol === this) {
          // If the clicked row is already selected, deselect it
          $(this).removeClass("selected");
          selectedcol = null;
          $("#getservice").text(""); // Clear the selected name
        } else {
          // Deselect the previously selected row
          if (selectedcol !== null) {
            $(selectedcol).removeClass("selected");
          }

          // Select the clicked row
          $(this).addClass("selected");
          selectedcol = this;

          // Display the selected name in the  table
          const selecteservices = data.name;
          const getservicesStatus = data.disabled;
          $("#getservice").val(selecteservices);
          // $("#getserves").val(getservicesStatus);
        }
      });

      // Reset selectedRow when a DataTable page is changed
      echantillonTable.on("page.dt", function () {
        $(selectedRow).removeClass("selected");
        selectedcol = null;
        $("#getservice").text("");
      });
    },

    lengthMenu: [5, 10, 25, 50],
    pageLength: 5,
    dom: '<"top"l<"float-left"f>rtip>',
  });

  var applicationsTable = $("#applicationTable").DataTable({
    language: {
      // French language configuration here
      sProcessing: "Traitement en cours...",
      sSearch: "Rechercher&nbsp;:",
      sLengthMenu: "Afficher _MENU_ &eacute;l&eacute;ments",
      sInfo:
        "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
      sInfoEmpty:
        "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
      sInfoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
      sInfoPostFix: "",
      sLoadingRecords: "Chargement en cours...",
      sZeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",

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

    lengthMenu: [5, 10, 25, 50],
    pageLength: 5,
    dom: '<"top"l<"float-left"f>rtip>',
  });

  echantillonTable.draw();
  conceptTableName.draw();
  qualificationTableName.draw();
  servicesTableName.draw();
  applicationsTable.draw();

  $("#deleteAllButton").on("click", function () {
    if (selectedIds.length > 0) {
      $("#deleteModalsup").modal("show");
    } else {
    }
  });

  $("#echantillonsTable").on("click", ".edit-button", function () {
    var row = $(this).closest("tr");
    var rowData = echantillonsTable.row(row).data();

    // Your code to handle row editing here
    // For example, display a form to edit the data in the row and update the changes
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
  $("#echantillonsTable").on("click", ".edit-button", function () {
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
    echantillonsTable.ajax.reload();
  }

  // Open modal when the button is clicked
  $("#openModalBtnsup").on("click", function () {
    $("#myModalsup").modal("show");
  });

  // Close modal when the close button is clicked
  $(".modal .close").on("click", function () {
    $("#myModalsup").modal("hide");
  });

  $(document).on("submit", "#addFormsup", function (e) {
    // e.preventDefault();
    var subject = $("#subjectInput").val();

    // Perform input validation
    if (subject === "") {
      // Show error message and add invalid class to the input field
      $("#subjectInput").addClass("is-invalid");
      return;
    }

    // Construct the data object
    var requestData = {
      subject: subject,
      language: 1,
    };

    $.ajax({
      url: globalConfig.WEBSERVER_URL + "api/support/subject_support/",
      type: "POST",
      dataType: "json",
      data: requestData,
      success: function (response) {
        // Subject created successfully
        console.log("Subject created:", response);
        $("#myModalsup").modal("hide");
        location.reload();

        showSuccesssujMessage();
      },
      error: function (xhr, status, error) {
        console.log("Error creating subject:", error);
      },
    });
  });

  $("#retourButtonsubj").on("click", function () {
    $("#myModalsup").modal("hide");
  });

  $("#myModalsup").on("hidden.bs.modal", function () {
    echantillonsTable.reload();
  });

  $("#applyservice").on("click", function () {
    var selectedRows = echantillonTable.rows(".selected").data();

    if (selectedRows.length === 0) {
      // Si aucune ligne n'est sélectionnée, affichez le message d'alerte
      Toast.fire({
        icon: "warning",
        title:
          "Veuillez sélectionner un échantillon avant d'appliquer les services",
        position: "center-center",
      });
    } else {
      // Récupérer le nom de l'échantillon sélectionné
      var selectedSampleName = selectedRows[0].name; // Supposons que 'name' est la colonne contenant le nom de l'échantillon

      // Effectuer l'appel AJAX pour appliquer les services à l'échantillon sélectionné
      $.ajax({
        url:
          WEBSERVERRules_URL +
          "apply/sample/services/?sample_name=" +
          encodeURIComponent(selectedSampleName), // Assurez-vous d'encoder correctement le nom de l'échantillon
        type: "POST",
        dataType: "json",
        // success: function (response) {
        //   // Gérer la réponse de l'API en cas de succès
        //   console.log("Application service !!!"),
        //     Toast.fire({
        //       icon: "success",
        //       title:
        //         "Les services ont été appliqués à l'échantillon sélectionné",
        //       position: "center-center",
        //     });

        //   // Vous pouvez effectuer d'autres actions ici si nécessaire en fonction de la réponse de l'API
        // },
        success: function (response) {
          console.log("Subject created:", response);
          response.forEach(function (item) {
            var rowData =
              "<tr>" +
              "<td>" +
              item.Data_Content +
              "</td>" +
              "<td>" +
              item.Service_name +
              "</td>" +
              "<td>" +
              item.Label_name +
              "</td>" +
              "<td>" +
              item.Value;
            // +
            // "</td>" +
            // "<td>" +
            // item.logic_value +
            // "</td>" +
            // "<td>" +
            // item.ressource_id +
            // "</td>" +
            // "<td>" +
            // item.ressource_type_id +
            "</td>" + "</tr>";
            $("#responseServiceTableBody").append(rowData);
          });
          // Gérer la réponse de l'API en cas de succès
          console.log("Application des services !!!"),
            Toast.fire({
              icon: "success",
              title:
                "Les services appliqués à l'échantillon sélectionné avec succès ",
              position: "center-center",
            });

          // Vous pouvez effectuer d'autres actions ici si nécessaire en fonction de la réponse de l'API
        },
        error: function (xhr, status, error) {
          // Gérer les erreurs de l'API en cas d'échec
          console.error("Erreur lors de l'application des services :", error);
          Toast.fire({
            icon: "error",
            title: "Erreur lors de l'application des services",
            position: "center-center",
          });
        },
      });
    }
  });
  $("#apply").on("click", function () {
    var selectedEchantillonRows = echantillonTable.rows(".selected").data();
    var selectedConceptRows = conceptTableName.rows(".selected").data();

    if (selectedEchantillonRows.length === 0) {
      // Si aucune ligne n'est sélectionnée dans l'une ou l'autre des tables, affichez le message d'alerte
      Toast.fire({
        icon: "warning",
        title:
          "Veuillez sélectionner un échantillon avant d'appliquer le concept",
        position: "center-center",
      });
    } else if (
      selectedEchantillonRows.length === 0 ||
      selectedConceptRows.length === 0
    ) {
      // Si aucune ligne n'est sélectionnée dans l'une ou l'autre des tables, affichez le message d'alerte
      Toast.fire({
        icon: "warning",
        title:
          "Veuillez sélectionner un échantillon et un concept avant d'appliquer le concept",
        position: "center-center",
      });
    } else {
      // Récupérer le nom de l'échantillon sélectionné
      var selectedSampleName = selectedEchantillonRows[0].name; // Supposons que 'name' est la colonne contenant le nom de l'échantillon

      // Récupérer le nom du concept sélectionné
      var selectedConceptName = selectedConceptRows[0].name; // Supposons que 'name' est la colonne contenant le nom du concept

      // Effectuer l'appel AJAX pour appliquer le concept à l'échantillon sélectionné
      $.ajax({
        url:
          WEBSERVERRules_URL +
          "apply/sample/concept/?sample_name=" +
          encodeURIComponent(selectedSampleName) +
          "&concept_name=" +
          encodeURIComponent(selectedConceptName),
        type: "POST",
        dataType: "json",
        success: function (response) {
          console.log("Subject created:", response);
          response.forEach(function (item) {
            var rowData =
              "<tr>" +
              "<td>" +
              item.id +
              "</td>" +
              "<td>" +
              item.score +
              "</td>" +
              "<td>" +
              item.nb_data +
              "</td>" +
              "<td>" +
              item.nb_concerned_data +
              "</td>" +
              "<td>" +
              item.logic_value +
              "</td>" +
              "<td>" +
              item.ressource_id +
              "</td>" +
              "<td>" +
              item.ressource_type_id +
              "</td>" +
              "</tr>";
            $("#responseTableBody").append(rowData);
          });
          // Gérer la réponse de l'API en cas de succès
          console.log("Application du concept !!!"),
            Toast.fire({
              icon: "success",
              title: "Le concept a été appliqué à l'échantillon sélectionné",
              position: "center-center",
            });

          // Vous pouvez effectuer d'autres actions ici si nécessaire en fonction de la réponse de l'API
        },
        error: function (xhr, status, error) {
          // Gérer les erreurs de l'API en cas d'échec
          console.error("Erreur lors de l'application du concept :", error);
          Toast.fire({
            icon: "error",
            title: "Erreur lors de l'application du concept",
            position: "center-center",
          });
        },
      });
    }
  });
  $("#applyQ").on("click", function () {
    var selectedEchantillonRows = echantillonTable.rows(".selected").data();
    var selectedQualificationRows = qualificationTableName
      .rows(".selected")
      .data();

    if (
      selectedEchantillonRows.length === 0 ||
      selectedQualificationRows.length === 0
    ) {
      // Si aucune ligne n'est sélectionnée dans l'une ou l'autre des tables, affichez le message d'alerte
      Toast.fire({
        icon: "warning",
        title:
          "Veuillez sélectionner un échantillon et une qualification avant d'appliquer la qualification",
        position: "center-center",
      });
    } else {
      // Récupérer le nom de l'échantillon sélectionné
      var selectedSampleName = selectedEchantillonRows[0].name; // Supposons que 'name' est la colonne contenant le nom de l'échantillon

      // Récupérer la ligne de la qualification sélectionnée
      var selectedQualificationRow = selectedQualificationRows[0];

      // Récupérer le nom du concept de la ligne de qualification
      var selectedConceptId = selectedQualificationRow.id; // Supposons que 'id' est la colonne contenant l'ID du concept

      // Effectuer une requête AJAX pour obtenir les détails du concept et ensuite appliquer la qualification
      $.ajax({
        url: WEBSERVERRules_URL + "concept/" + selectedConceptId,
        type: "GET",
        dataType: "json",
        success: function (conceptData) {
          // Récupérer le nom du concept à partir de la réponse de l'API
          var selectedConceptName = conceptData.name;

          // Effectuer l'appel AJAX pour appliquer le concept à l'échantillon sélectionné
          $.ajax({
            url:
              WEBSERVERRules_URL +
              "apply/sample/qualification/?sample_name=" +
              encodeURIComponent(selectedSampleName) +
              "&concept_name=" +
              encodeURIComponent(selectedConceptName),
            type: "POST",
            dataType: "json",
            success: function (response) {
              // Gérer la réponse de l'API en cas de succès
              console.log("Application de la qualification !!!"),
                Toast.fire({
                  icon: "success",
                  title:
                    "La qualification a été appliquée à l'échantillon sélectionné",
                  position: "center-center",
                });
            },
            error: function (xhr, status, error) {
              // Gérer les erreurs de l'API en cas d'échec
              console.error(
                "Erreur lors de l'application de la qualification :",
                error
              );
              Toast.fire({
                icon: "error",
                title: "Erreur lors de l'application de la qualification",
                position: "center-center",
              });
            },
          });
        },
        error: function (xhr, status, error) {
          // Gérer les erreurs lors de la récupération des détails du concept
          console.error(
            "Erreur lors de la récupération des détails du concept :",
            error
          );
          Toast.fire({
            icon: "error",
            title: "Erreur lors de la récupération des détails du concept",
            position: "center-center",
          });
        },
      });
    }
  });
});
// bouton info table concept //
function show_concept(rowId) {
  $.get(WEBSERVERRules_URL + "concept/" + rowId, function (data) {
    // Populate modal fields with data
    var createdDate = new Date(data.created_at);

    var formattedDate = createdDate.toLocaleDateString();
    console.log(rowId);
    $("#nameconcept").text("Nom :  " + data.name);
    $("#description").text("Description :  " + data.description);
    $("#created").text("Date de création :  " + formattedDate);
    $("#type").text("Type :  " + data.type);
    // $("#formule").text("Formule associée  :  " + formulaInClear);
    $("#show-concept").modal("show");
    console.log("well done");
  });
}
// bouton info table service //
function show_service(rowId) {
  $.get(WEBSERVERRules_URL + "services/" + rowId, function (data) {
    console.log(rowId);
    $("#nameservice").text("Nom :  " + data.name);
    $("#urlservice").text("URL :  " + data.url);
    $("#classpath").text("Class_Path:  " + data.class_path);
    $("#show-service").modal("show");
    console.log("well done");
  });
}
$("#serviceButton").on("click", function () {
  // Remove the active-tab-button class from all buttons
  $(".tab-button").removeClass("active-tab-button");
  // Add the active-tab-button class to the clicked button
  $(this).addClass("active-tab-button");
  // Clear the table with id "applyTab"
  $("#responseTableBody").empty();
});
$("#conceptButton").on("click", function () {
  // Remove the active-tab-button class from all buttons
  $(".tab-button").removeClass("active-tab-button");
  // Add the active-tab-button class to the clicked button
  $(this).addClass("active-tab-button");
  // Clear the table with id "applyTab"
  $("#responseTableBody").empty();
});
$("#qualificationButton").on("click", function () {
  // Remove the active-tab-button class from all buttons
  $(".tab-button").removeClass("active-tab-button");
  // Add the active-tab-button class to the clicked button
  $(this).addClass("active-tab-button");
  // Clear the table with id "applyTab"
  $("#responseTableBody").empty();
});
// Récupérez tous les boutons
var serviceButton = document.getElementById("serviceButton");
var conceptButton = document.getElementById("conceptButton");
var qualificationButton = document.getElementById("qualificationButton");
// Function to show a tab and update button styles
function openTab(tabName, button) {
  var tabs = document.getElementsByClassName("tab");
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
  // Supprimez la classe "active" de tous les boutons
  serviceButton.classList.remove("active");
  conceptButton.classList.remove("active");
  qualificationButton.classList.remove("active");

  // Ajoutez la classe "active" au bouton actuel
  button.classList.add("active");
}

// Set the default active tab and button
openTab("service", serviceButton);

// Add event listeners to the buttons
serviceButton.addEventListener("click", function () {
  openTab("service", this);
});

conceptButton.addEventListener("click", function () {
  openTab("concept", this);
});

qualificationButton.addEventListener("click", function () {
  openTab("qualification", this);
});
