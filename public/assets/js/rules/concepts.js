const formulaSelect = document.getElementById("formule_id");
const formulaUpdateSelect = document.getElementById("formule_update_id");
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  width: "300px",
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
console.log(WEBSERVERRules_URL);
fetch(WEBSERVERRules_URL + "formula/")
  .then((response) => response.json())
  .then((data) => {
    if (!data || data.length === 0) {
      console.log("No data available.");
    } else {
      formuleData = data; // Store the data in the serviceData variable
      console.log(data);
      formuleData.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.name;
        formulaSelect.appendChild(option);
      });
      formuleData.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.name;
        formulaUpdateSelect.appendChild(option);
      });
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

$(document).ready(function () {
  var lastSelectedRow = null;
  var selectedRowData;
  //Add Concept
  $("#userFormconcept").on("submit", hundleAddConcept);
  // Ajouter un écouteur d'événement pour la sélection de ligne
  $("#conceptTable tbody").on("click", "tr", handleTableRowClick);
  /* hundle associate button */
  $("#btnaddFormuleModal").on("click", function () {
    console.log(selectedRowData);
    if (selectedRowData) {
      $("#formuleModal").modal("show");
    } else {
      Toast.fire({
        icon: "warning",
        title: "Veuillez séléctionner le concept à associer",
        position: "center center",
      });
    }
  });
  //Associate formule to concept
  $("#add_formule_concept").on("submit", function (e) {
    e.preventDefault();
    hundleAddformuleConcept(selectedRowData);
  });
  /* Edit Concept */
  $("#editbutton").on("click", function () {
    if (selectedRowData) {
      hundleFillUpdate(selectedRowData);
      $("#editModal").modal("show");
    } else {
      Toast.fire({
        icon: "warning",
        title: "Veuillez sélectionner le concept à modifier",
        position: "center center",
      });
    }
  });

  /* handle delete formula modal*/
  $("#delete_concept_modal").on("click", function () {
    if (selectedRowData) {
      $("#deleteModalsup").modal("show");
      hundleDeleteConcept(selectedRowData);
    } else {
      Toast.fire({
        icon: "warning",
        title: "Veuillez sélectionner le concept à supprimer",
        position: "center center",
      });
    }
  });
  /* Concept Datatable */
  var conceptTable = $("#conceptTable").DataTable({
    ajax: {
      url: WEBSERVERRules_URL + "concept",
      // url: "http://51.89.21.5:8010/concept/",
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
        data: "description",
      },
      {
        data: "created_at",
        render: function (data) {
          // Format the date as YYYY-MM-DD
          // return moment(data).format("YYYY-MM-DD");
          return moment(data).format("DD/MM/YYYY");
        },
      },
      /*  {
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
      }, */
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
      sLengthMenu: " _MENU_ Concepts affichés ",
      sInfo: " _START_ &agrave; _END_ sur _TOTAL_ Concepts  ",
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
      /*   // Make the table rows clickable and selected in blue
      $(row).on("click", function () {
        $(this).toggleClass("selected");
        if ($(this).hasClass("selected")) {
          selectedIds.push(data.id);
        } else {
          selectedIds = selectedIds.filter((id) => id !== data.id);
        }
      }); */

      // Reset selectedIds when a DataTable page is changed
      conceptTable.on("page.dt", function () {
        selectedRowData = null;
      });
    },
    lengthMenu: [5, 10, 25, 50], // Set the options for the number of rows per page
    pageLength: 5, // Set the default number of rows per page
    dom: '<"top"l<"float-left"f>rtip>',
  });
  /* Formules Datatable */
  var formulaTable = $("#formulaTable").DataTable({
    columns: [{ data: "name" }, { data: "formula" }],
    language: {
      // French language configuration here
      sProcessing: "Traitement en cours...",
      sSearch: "Rechercher&nbsp;:",
      sLengthMenu: "_MENU_ Formules affichées ",
      sInfo: "Affichage de formule _START_ &agrave; _END_ sur _TOTAL_ formules",
      sInfoEmpty: "Affichage de formule 0 &agrave; 0 sur 0 formules",
      sInfoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
      sInfoPostFix: "",
      sLoadingRecords: "Chargement en cours...",
      sZeroRecords: "Aucun formule &agrave; afficher",
      sEmptyTable: "Veuillez selectionner un concept.",
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
  formulaTable.draw();
  function handleTableRowClick() {
    if (lastSelectedRow !== null) {
      $(lastSelectedRow).removeClass("selected");
    }
    // Sélectionner la nouvelle ligne en ajoutant la classe 'selected'
    $(this).addClass("selected");
    // Mettre à jour la variable avec la nouvelle ligne sélectionnée
    lastSelectedRow = this;
    // Vous pouvez accéder aux données de la ligne sélectionnée et effectuer des actions supplémentaires ici
    selectedRowData = conceptTable.row(".selected").data();
    formulaTable.clear().draw();
    if (
      selectedRowData.formula &&
      Object.keys(selectedRowData.formula).length !== 0
    ) {
      console.log(selectedRowData.formula);
      let formulaName = selectedRowData.formula.name;
      $("#formulaTable tbody").html(
        '<tr><td colspan="8" class="text-center"><i class="fas fa-spinner fa-spin"></i> Chargement en cours...</td></tr>'
      );
      let url =
        WEBSERVERRules_URL +
        "show/formula/?formula_name=" +
        selectedRowData.formula.name;
      $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (response) {
          console.log(response);
          var formula = response[formulaName].replace(/\{|\}/g, "");
          console.log(formula);
          let formuleData = {
            name: formulaName,
            formula: formula,
          };
          formulaTable.row.add(formuleData).draw();
        },
        error: function (xhr, status, error) {
          console.log("Error fetching rule details:", error);
        },
      });
    } else {
      $("#formulaTable tbody").html(
        '<tr><td colspan="8" class="text-center"><i class="fas fa-exclamation-triangle mr-2 text-danger"></i> Pas de formule associée</td></tr>'
      );
      console.log("pas de formula");
    }

    console.log(selectedRowData);
    // Enable/Disable associate button based on selectedRowData
    if (selectedRowData && selectedRowData.concept_formula_id == null) {
      console.log("enabled");
      $("#btnaddFormuleModal").prop("disabled", false);
    } else {
      console.log("disabled");
      $("#btnaddFormuleModal").prop("disabled", true);
    }
  }
  $("#editForm1").on("submit", function (e) {
    e.preventDefault();
    hundleUpdateConcept(selectedRowData);
  });
  function hundleAddConcept(e) {
    e.preventDefault(); // Prevent the default form submission
    // Remove any previous validation classes and messages
    $(".form-control").removeClass("is-invalid");
    $(".invalid-feedback").remove();
    // Get the values of input fields
    var lname = $("#name_concept").val();
    var ldescription = $("#description_concept").val();
    var ltypeconcept = $("#type_concept").val();
    // Perform input validation
    var isValid = true;
    if (lname.trim() === "") {
      isValid = false;
      $("#name_concept").addClass("is-invalid");
      $("#name_concept").after(
        '<div class="invalid-feedback">Veuillez remplir ce champ</div>'
      );
    }
    if (ldescription.trim() === "") {
      isValid = false;
      $("#description_concept").addClass("is-invalid");
      $("#description_concept").after(
        '<div class="invalid-feedback">Veuillez remplir ce champ</div>'
      );
    }
    if (ltypeconcept.trim() === "") {
      isValid = false;
      $("#type_concept").addClass("is-invalid");
      $("#type_concept").after(
        '<div class="invalid-feedback">Veuillez remplir ce champ</div>'
      );
    }
    if (!isValid) {
      return; // Don't proceed with the AJAX request if there are validation errors
    }
    // If all inputs are valid, construct the data object and make the AJAX request
    var requestData = {
      name: lname,
      description: ldescription,
      type: ltypeconcept,
      instance_id: 0,
    };

    console.log(requestData);

    $.ajax({
      url: WEBSERVERRules_URL + "concept/",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(requestData),
      success: function (response) {
        // $("#successAlert").text("Concept ajouté avec succès");
        // $("#successAlert").fadeIn(300).delay(2000).fadeOut(400); // Show for 2 seconds
        console.log("Subject created:", response);
        table = $("#conceptTable").DataTable();
        table.ajax.reload();
        $("#userFormconcept")[0].reset();
        $("#modalAddConcept").modal("hide");
        Toast.fire({
          icon: "success",
          title: "Concept ajouté avec succès",
        });
      },
      error: function (xhr, status, error) {
        if(xhr.status===400){
          Toast.fire({
            icon: "warning",
            title: "Concept dejà existe vérifier le nom",
          });
        }
        console.log("Error creating:", error);
      },
    });
  }
  function hundleFillUpdate(selectedRowData) {
    $("#edit_name").val(selectedRowData.name);
    $("#edit_description").val(selectedRowData.description);
    $("#edit_type").val(selectedRowData.type);
    $("#formule_update_id").val(selectedRowData.formula.id);

    if (selectedRowData.concept_formula_id == null) {
      console.log("disabled");
      $("#formule_update_id").prop("disabled", true);
    } else {
      $("#formule_update_id").prop("disabled", false);
    }
  }
  function hundleUpdateConcept(selectedRowData) {
    var editedName = $("#edit_name").val();
    var editedDescription = $("#edit_description").val();
    var editedType = $("#edit_type").val();
    var editedFormule = $("#formule_update_id").val();
    var formula_name = $("#formule_update_id option:selected").text();
    var isValid = true;
    if (editedName.trim() === "") {
      isValid = false;
      $("#edit_name").addClass("is-invalid");
      $("#edit_name").after(
        '<div class="invalid-feedback">Veuillez remplir ce champ</div>'
      );
    }
    if (editedDescription.trim() === "") {
      isValid = false;
      $("#edit_description").addClass("is-invalid");
      $("#edit_description").after(
        '<div class="invalid-feedback">Veuillez remplir ce champ</div>'
      );
    }

    if (editedType.trim() === "") {
      isValid = false;
      $("#edit_type").addClass("is-invalid");
      $("#edit_type").after(
        '<div class="invalid-feedback">Veuillez remplir ce champ</div>'
      );
    }

    if (!isValid) {
      return; // Don't proceed with the AJAX request if there are validation errors
    }

    // Faire appel à l'API PUT pour modifier l'échantillon

    var apiUrl =
      WEBSERVERRules_URL + "concept/" + selectedRowData.id + "/";
    $.ajax({
      url: apiUrl,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify({
        name: editedName,
        description: editedDescription,
        type: editedType,
      }),
      success: function (response) {
        if (selectedRowData.concept_formula_id == null) {
          conceptTable.ajax.reload();
          // formulaTable.ajax.reload();
          $("#editForm1")[0].reset();
          console.log("Concept modifié :", response);
          $("#editModal").modal("hide");
          Toast.fire({
            icon: "success",
            title: "Concept modifié avec succès",
          });
        } else {
          console.log(selectedRowData.concept_formula_id);
          data = {
            concept: selectedRowData.id,
            formula: editedFormule,
          };
          console.log(data);
          console.log(formula_name);
          $.ajax({
            url:
              WEBSERVERRules_URL +
              "concepts/formula/" +
              selectedRowData.concept_formula_id +
              "/",
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (response) {
              conceptTable.ajax.reload();
              formulaTable.clear().draw();
              $("#formulaTable tbody").html(
                '<tr><td colspan="8" class="text-center"><i class="fas fa-spinner fa-spin"></i> Chargement en cours...</td></tr>'
              );
              let url =
                WEBSERVERRules_URL +
                "show/formula/?formula_name=" +
                formula_name;
              $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                success: function (response) {
                  console.log(response);
                  var formula = response[formula_name].replace(/\{|\}/g, "");
                  console.log(formula);
                  let formuleData = {
                    name: formula_name,
                    formula: formula,
                  };
                  formulaTable.row.add(formuleData).draw();
                },
                error: function (xhr, status, error) {
                  console.log("Error fetching rule details:", error);
                },
              });
              $("#editForm1")[0].reset();
              console.log("Concept formula modifié:", response);
              $("#editModal").modal("hide");
              Toast.fire({
                icon: "success",
                title: "Concept modifié avec succès",
              });
            },
            error: function (xhr, status, error) {
              if (xhr.status === 400) {
                // This is a Bad Request error (status code 400)
                // Parse the error response JSON to get the error message
                var errorResponse = JSON.parse(xhr.responseText);
                var errorMessage = errorResponse.message;

                // Display the error message to the user
                Swal.fire({
                  icon: "error",
                  title: errorMessage,
                  //text: errorMessage, // Display the error message
                });
              } else {
                // Handle other types of errors
                Swal.fire({
                  icon: "error",
                  title: "erreur d'association",
                });
                console.log("Error creating:", error);
              }
            },
          });
        }
      },
      error: function (xhr, status, error) {
        console.log("Erreur lors de la modification du concept:", error);
      },
    });
  }
  function hundleDeleteConcept(selectedRowData) {
    $("#delete_concept").on("click", function () {
      if (selectedRowData) {
        console.log(selectedRowData);
        console.log(selectedRowData.id);
        console.log("delete button");
        // Make an API request to delete the selected elements
        $.ajax({
          url:
            WEBSERVERRules_URL + "concept/" + selectedRowData.id, // Update the URL to your delete endpoint
          type: "DELETE",
          data: { ids: selectedRowData.id }, // Pass the array of selected IDs to the server
          success: function (response) {
            // Elements deleted successfully
            console.log("Elements deleted:", response);
            // Reload the DataTable to reflect the changes
            conceptTable.ajax.reload();
            // Close the delete confirmation modal
            $("#deleteModalsup").modal("hide");
            Toast.fire({
              icon: "success",
              title: "Concept supprimé avec succès",
            });
          },
          error: function (xhr, status, error) {
            console.log("Error deleting elements:", error);
          },
        });
      }
    });
  }

  function hundleAddformuleConcept(selectedRow) {
    // Remove any previous validation classes and messages
    $(".form-control").removeClass("is-invalid");
    $(".invalid-feedback").remove();
    var isValid = true;
    var formule_id = $("#formule_id").val();
    var formula_name = $("#formule_id option:selected").text();
    // Validate input fields
    if (formule_id.trim() === "") {
      isValid = false;
      $("#formule_id").addClass("is-invalid");
      $("#formule_id").after(
        '<div class="invalid-feedback">Veuillez remplir ce champ</div>'
      );
    }
    if (!isValid) {
      return;
    }
    var requestData = {
      concept: selectedRow.id,
      formula: formule_id,
    };
    console.log(requestData, formula_name);
    $.ajax({
      url: WEBSERVERRules_URL + "concepts/formula/",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(requestData),
      success: function (response) {
        console.log("formule associated:", response);
        //table = $("#conceptTable").DataTable();
        // table.ajax.reload();
        conceptTable.ajax.reload();
        $("#formuleModal").modal("hide");
        Toast.fire({
          icon: "success",
          title: "Formule associée avec succès",
        });
        formulaTable.clear().draw();
        $("#formulaTable tbody").html(
          '<tr><td colspan="8" class="text-center"><i class="fas fa-spinner fa-spin"></i> Chargement en cours...</td></tr>'
        );
        let url =
          WEBSERVERRules_URL +
          "show/formula/?formula_name=" +
          formula_name;
        $.ajax({
          type: "GET",
          url: url,
          dataType: "json",
          success: function (response) {
            console.log(response);
            var formula = response[formula_name].replace(/\{|\}/g, "");
            console.log(formula);
            let formuleData = {
              name: formula_name,
              formula: formula,
            };
            formulaTable.row.add(formuleData).draw();
          },
          error: function (xhr, status, error) {
            console.log("Error fetching rule details:", error);
          },
        });
      },
      error: function (xhr, status, error) {
        if (xhr.status === 400) {
          // This is a Bad Request error (status code 400)
          // Parse the error response JSON to get the error message
          var errorResponse = JSON.parse(xhr.responseText);
          var errorMessage = errorResponse.message;

          // Display the error message to the user
          Swal.fire({
            icon: "error",
            title: errorMessage,
            //text: errorMessage, // Display the error message
          });
        } else {
          // Handle other types of errors
          Swal.fire({
            icon: "error",
            title: "erreur d'association",
          });
          console.log("Error creating:", error);
        }
      },
    });
  }
});
