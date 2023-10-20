const serviceSelect = document.getElementById("service_id");
const labelSelect = document.getElementById("label_id");
const serviceUpdateSelect = document.getElementById("service_update_id");
const labelUpdateSelect = document.getElementById("label_update_id");
let serviceData = []; // Declare a variable to store the service data

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  iconColor: "white",
  customClass: {
    popup: "colored-toast",
  },
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

// Function to create and append options to a select element
function createOptions(selectElement, data) {
  //selectElement.innerHTML = '<option value="">Selectionnez un label</option>';
  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.service_id;
    option.textContent = item.service_nom;
    selectElement.appendChild(option);
  });
}
function getAllLabelsInfoByServiceId(serviceData, serviceId) {
  const filteredServices = serviceData.filter(
    (item) => item.service_id === serviceId
  );
  const labelsInfo = [];

  filteredServices.forEach((service) => {
    labelsInfo.push(...service.labels_info);
  });

  return labelsInfo;
}
fetch(WEBSERVERRules_URL + "services/registry/")
  .then((response) => response.json())
  .then((data) => {
    if (!data || data.length === 0) {
      console.log("No data available.");
    } else {
      serviceData = data; // Store the data in the serviceData variable
      console.log(data);

      createOptions(serviceSelect, serviceData);
      createOptions(serviceUpdateSelect, serviceData);

      serviceSelect.addEventListener("change", () => {
        const selectedServiceId = serviceSelect.value;
        labelSelect.innerHTML =
          '<option value="">Selectionnez un label</option>'; // Clear
        if (selectedServiceId) {
          const labelsForService = serviceData
            .filter((item) => item.service_id === parseInt(selectedServiceId))
            .flatMap((item) => item.labels_info);

          labelsForService.forEach((label) => {
            const option = document.createElement("option");
            option.value = label.label_id;
            option.textContent = label.label_name;
            labelSelect.appendChild(option);
          });
        }
      });

      serviceUpdateSelect.addEventListener("change", () => {
        const selectedServiceId = serviceUpdateSelect.value;
        labelUpdateSelect.innerHTML =
          '<option value="">Selectionnez un label</option>'; //
        if (selectedServiceId) {
          const labelsForService = serviceData
            .filter((item) => item.service_id === parseInt(selectedServiceId))
            .flatMap((item) => item.labels_info);

          labelsForService.forEach((label) => {
            const option = document.createElement("option");
            option.value = label.label_id;
            option.textContent = label.label_name;
            labelUpdateSelect.appendChild(option);
          });
        }
      });
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

$(document).ready(function () {
  var lastSelectedRow = null;
  var selectedRowData;
  $("#datatable-clause").on("click", "tr", handleTableRowClick);
  $("#add_clause_form").on("submit", hundleAddClause);
  $("#BtnEditClause").on("click", function () {
    if (selectedRowData) {
      // Pré-remplir le formulaire de modification avec les données récupérées
      const labelsInfo = getAllLabelsInfoByServiceId(
        serviceData,
        selectedRowData.service_id
      );
      console.log(labelsInfo);
      labelsInfo.forEach((label) => {
        const option = document.createElement("option");
        option.value = label.label_id;
        option.textContent = label.label_name;
        labelUpdateSelect.appendChild(option);
      });

      $("#type_update").val(selectedRowData.type);
      $("#disabled_update").val(selectedRowData.disabled.toString());
      $("#unique_label_per_image_update").val(
        selectedRowData.unique_label_per_image.toString()
      );
      $("#label_update_id").val(selectedRowData.label_id);
      $("#service_update_id").val(selectedRowData.service_id);
      $("#occurence_update").val(selectedRowData.nb_occu_threshold);
      $("#nb_occu_threshold_operator_update").val(
        selectedRowData.nb_occu_threshold_operator
      );
      $("#value_threshold_update").val(selectedRowData.value_threshold);
      $("#value_thresh_operator_update").val(
        selectedRowData.value_thresh_operator
      );
      $("#updateclause").modal("show");
    } else {
      Toast.fire({
        icon: "warning",
        title: "Veuillez séléctionner la clause à modifier",
        position: "center center",
      });
    }
    $("#form_update_clause").on("submit", function (e) {
      e.preventDefault(); // Prevent the default form submission
      e.stopPropagation(); // Stop event propagation

      // Add an event listener for form submission inside this click event
      // Récupérer les valeurs modifiées depuis le formulaire
      var typeValue = $("#type_update").val();
      var disabledValue = $("#disabled_update").val();
      var uniqueLabelPerImageValue = $("#unique_label_per_image_update").val();
      var labelValue = $("#label_update_id").val();
      var serviceValue = $("#service_update_id").val();
      var occurenceValue = $("#occurence_update").val();
      var nbOccuThresholdOperatorValue = $(
        "#nb_occu_threshold_operator_update"
      ).val();
      var valueThresholdValue = $("#value_threshold_update").val();
      var valueThreshOperatorValue = $("#value_thresh_operator_update").val();
      // Check form validity using the checkValidity() method
      var form = document.getElementById("form_update_clause");
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      // Form is valid, proceed with AJAX call
      var data = {
        type: typeValue,
        disabled: disabledValue,
        unique_label_per_image: uniqueLabelPerImageValue,
        nb_occu_threshold: occurenceValue,
        nb_occu_threshold_operator: nbOccuThresholdOperatorValue,
        value_threshold: valueThresholdValue,
        value_thresh_operator: valueThreshOperatorValue,
        label_id: labelValue,
        service_id: serviceValue,
      };
      var apiUrl =
        WEBSERVERRules_URL +
        "clauses/" +
        selectedRowData.id +
        "/?service_id=" +
        serviceValue +
        "&label_id=" +
        labelValue;
      console.log("data to send to add ", data);
      console.log(selectedRowData);
      // Perform the AJAX call
      $.ajax({
        url: apiUrl,
        type: "Put",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
          console.log(response);
          //$("form_update_clause")[0].reset();
          datatable.ajax.reload();
          $("#updateclause").modal("hide");
          Toast.fire({
            icon: "success",
            title: "clauses modifiée avec succès",
          });
        },
        error: function (data) {
          console.log("error ajout clauses");
          console.log(data);
          Swal.fire({
            icon: "error",
            title: "Une erreur s'est produite",
          });
        },
      });
    });
  });
  $("#btndeleteClause").on("click", function () {
    if (selectedRowData) {
      $("#deleteclause").modal("show");
      handleDeleteClause(selectedRowData);
    } else {
      Toast.fire({
        icon: "warning",
        title: "Veuillez séléctionner la clause à supprimer",
        position: "center center",
      });
    }
  });

  var datatable = $("#datatable-clause").DataTable({
    ajax: {
      url: WEBSERVERRules_URL + "clauses/",

      type: "GET",

      dataType: "json",

      dataSrc: {},
    },
    columns: [
      /*  { data: "id",
        visible: true,
    
     }, */
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
        data: "created_at", // Utilisez directement "created_at" ici
        render: function (data, type, row) {
          var date = new Date(data);
          var formattedDate = date.toLocaleDateString(); // Formatage de la date
          return formattedDate;
        },
      },
      /* { data: "label_service" }, */

      // { data: "unique_label_per_image" },
      {
        data: null,
        render: function (data, type, row) {
          var id = row.rule_id;
          var infoIcon = '<i class="fas fa-info-circle"></i>'; // Font Awesome info icon
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
            '<button type="button" class="btn ' +
            "</button>" +
            "</div>"
          );
        },
      },
    ],

    columnDefs: [
      /*  {
            targets: -1,
            width: "80px",
        }, */
    ],

    responsive: true,

    language: {
      // French language configuration here

      sProcessing: "Traitement en cours...",

      sSearch: "Rechercher&nbsp;:",

      sLengthMenu: "_MENU_ clauses",

      sInfo: "Affichage de clause _START_ &agrave; _END_ sur _TOTAL_ clauses",

      sInfoEmpty: "Affichage de clause 0 &agrave; 0 sur 0 clauses",

      sInfoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",

      sInfoPostFix: "",

      sLoadingRecords: "Chargement en cours...",

      sZeroRecords: "Aucun clause &agrave; afficher",

      /*  sEmptyTable:
  
          "Veuillez choisir un élément dans le tableau des noms d'utilisateur.", */

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
  });
  //colorer ligne selectionnée /////
  /*   show clause detail modal*/
  $("#datatable-clause").on("click", ".info-button", function () {
    let row = $(this).closest("tr");
    let rowData = datatable.row(row).data();
    handleInfoButton(rowData);
  });
  function hundleAddClause(e) {
    // Get the specific fo
    e.preventDefault();
    e.stopPropagation();
    form = document.getElementById("add_clause_form");
    var type = document.getElementById("type");
    var value_threshold = document.getElementById("value_threshold");
    var disabled = document.getElementById("disabled");
    var value_thresh_operator = document.getElementById(
      "value_thresh_operator"
    );
    var nb_occu_threshold = document.getElementById("occurence");
    var nb_occu_threshold_operator = document.getElementById(
      "nb_occu_threshold_operator"
    );
    var unique_label_per_image = document.getElementById(
      "unique_label_per_image"
    );
    var label = document.getElementById("label_id");
    var service = document.getElementById("service_id");
    if (form) {
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      data = {
        type: type.value,
        value_threshold: value_threshold.value,
        disabled: disabled.value,
        value_thresh_operator: value_thresh_operator.value,
        nb_occu_threshold: nb_occu_threshold.value,
        nb_occu_threshold_operator: nb_occu_threshold_operator.value,
        unique_label_per_image: unique_label_per_image.value,
        service_id: service.value,
        label_id: label.value,
      };
      console.log("data to send to add ", data);
      $.ajax({
        url:
          WEBSERVERRules_URL +
          "clauses/?service_id=" +
          service.value +
          "&label_id=" +
          label.value,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
          console.log(response);
          datatable.ajax.reload();
          $("#add_clause_form")[0].reset();

          $("#addclause").modal("hide");
          Toast.fire({
            icon: "success",
            title: "clauses ajoutée avec succé",
          });
        },
        error: function (data) {
          console.log("error ajout clauses");
          console.log(data);
          Swal.fire({
            icon: "error",
            title: "Une erreur s'est produite",
          });
        },
      });
    }
  }
  // ... handle row selection and data retrieval
  function handleTableRowClick() {
    if (lastSelectedRow !== null) {
      $(lastSelectedRow).removeClass("selected");
    }
    // Sélectionner la nouvelle ligne en ajoutant la classe 'selected'
    $(this).addClass("selected");
    // Mettre à jour la variable avec la nouvelle ligne sélectionnée
    lastSelectedRow = this;
    // Vous pouvez accéder aux données de la ligne sélectionnée et effectuer des actions supplémentaires ici
    selectedRowData = datatable.row(".selected").data();
    console.log(selectedRowData); // Exemple : Afficher les données de la ligne sélectionnée dans la console
  }

  function handleInfoButton(rowData) {
    console.log(rowData);
    var createdDate = new Date(rowData.created_at);

    var formattedDate = createdDate.toLocaleDateString();
    // Show the Bootstrap modal with the user information and statistics
    $("#label_name").html(`
                            <div class="row">
                              <div class="col-6 font-weight-bold">Label:</div>
                              <div class="col-6">
                                <h5 class="m-0 p-0"><span class="badge badge-pill badge-primary">${rowData.label_id_name}</span></h5>
                              </div>
                            </div>
                          `);

    $("#service_name").html(`
                            <div class="row">
                              <div class="col-6 font-weight-bold">Service:</div>
                              <div class="col-6">
                              <h5 class="m-0 p-0"><span class="badge badge-pill badge-primary">${rowData.service_id_name}</span></h5>
                              </div>
                            </div>
                          `);

    $("#status_clause").html(`
                            <div class="row">
                              <div class="col-6 font-weight-bold">Statut Clause:</div>
                              <div class="col-6">
                              <h5 class="m-0 p-0"> <span class="badge badge-pill ${
                                rowData.disabled
                                  ? "badge-danger"
                                  : "badge-success"
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

    /*   $("#label_service_clause").html(`
                            <div class="row">
                              <div class="col-6 font-weight-bold">Label service:</div>
                              <div class="col-6">
                              <h5 class="m-0 p-0"> <span class="badge badge-pill badge-primary">${rowData.label_service}</span></h5>
                              </div>
                            </div>
                          `); */

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
  }
  //Function update clause
  function handleEditClause(selectedRowData) {}
  //Function delete Clause
  function handleDeleteClause(selectedRowData) {
    // Add an event listener for the delete button click
    $("#confirmDeletesClause").on("click", function () {
      // Make an API request to delete the selected element
      $.ajax({
        url: WEBSERVERRules_URL + "clauses/" + selectedRowData.id, // Update the URL to your delete endpoint
        type: "DELETE",
        // data: { id: selectedIds }, // Pass the array of selected IDs to the server
        success: function (response) {
          // Elements deleted successfully
          console.log("Elements deleted:", response);
          // Reload the DataTable to reflect the changes
          datatable.ajax.reload();
          // Close the delete confirmation modal
          $("#deleteclause").modal("hide");
          Toast.fire({
            icon: "success",
            title: "Clause supprimée avec succès",
          });
        },
        error: function (xhr, status, error) {
          console.log("Error deleting elements:", error);
        },
      });
    });
  }
});
