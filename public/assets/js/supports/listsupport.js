$(document).ready(function () {
  var subjectMap = {}; // Variable pour stocker les sujets

  // Fetch the subject list and populate the map
  $.ajax({
    url: WEBSERVER_URL + "api/support/subject_support/",
    type: "GET",
    dataType: "json",
    success: function (response) {
      response.forEach(function (subject) {
        subjectMap[subject.id] = subject.subject;
      });
    },
    error: function () {
      console.log("Error fetching subjects");
    },
  });

  //{
  var supportTable = $("#supportTable").DataTable({
    ajax: {
      url: WEBSERVER_URL + "api/support/help_support/",
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
      { data: "username" },
      { data: "email" },
      {
        data: "message",
        render: function (data, type, row) {
          var words = data.split(" ");
          var truncatedMessage = words.slice(0, 7).join(" "); // Display only the first 7 words of the message
          var displayMessage =
            truncatedMessage +
            ' <span class="view-more" onclick="openModal(this)" data-message="' +
            data +
            '">         Voir Plus...</span>';

          return displayMessage;
        },
      },
      {
        data: "subject",
        render: function (data) {
          return subjectMap[data] || "";
        },
      },
      {
        data: "created_at",
        render: function (data) {
          var date = new Date(data);
          var formattedDate = date.toISOString().split("T")[0];
          return formattedDate;
        },
      },
      {
        data: "status",
        render: function (data, type, row) {
          var statusText = data ? "Résolu" : "Ouvert";
          var statusClass = data ? "badge-success" : "badge-danger";

          return `<span class="badge ${statusClass}">${statusText}</span>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          var id = row.id;
          var status = row.status;
          var buttonText = status ? "Supprimer" : "Repondre";
          var buttonClass = status
            ? "btn-outline-danger deleted"
            : "btn-outline-success repondred";
          var buttonStyle = "width: 100px;";
          return (
            '<div class="btn-group" role="group">' +
            '<button type="button" class="btn ' +
            buttonClass +
            ' action-button mr-2" data-username="' +
            id +
            '"style="' +
            buttonStyle +
            '">' +
            buttonText +
            "</button>" +
            "</div>"
          );
        },
      },
    ],
    responsive: true,
    language: {
      decimal: "",
      emptyTable: "Aucune donnée disponible dans le tableau",
      info: "Affichage _START_ à _END_ sur _TOTAL_ entrées",
      infoEmpty: "Affichage 0 à 0 sur 0 entrée",
      infoFiltered: "(filtré à partir de _MAX_ entrées au total)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Afficher _MENU_ entrées",
      loadingRecords:
        '<div class="text-center"><i class="fas fa-spinner fa-spin"></i> Chargement en cours...</div>',
      search: "Rechercher :",
      zeroRecords: "Pas de résultat trouvé pour ce sujet !",
      paginate: {
        first: "Premier",
        last: "Dernier",
        next: "Suivant",
        previous: "Précédent",
      },
      aria: {
        sortAscending: ": activer pour trier la colonne par ordre croissant",
        sortDescending: ": activer pour trier la colonne par ordre décroissant",
      },
    },
    createdRow: function (row, data, dataIndex) {
      $(row).data("created-at", data.created_at);
      $(row)
        .find(".respond")
        .on("click", function () {
          var id = $(this).data("id");
          openResponseModal(id);
        });
    },
    initComplete: function () {
      var api = this.api();
      api.order([5, "desc"]).draw();

      // Fetch the subject list and populate the filter dropdown
      $.ajax({
        url: WEBSERVER_URL + "api/support/subject_support/",
        type: "GET",
        dataType: "json",
        success: function (response) {
          var subjectFilter = $("#subjectFilter");
          response.forEach(function (subject) {
            var option = $("<option>")
              .text(subject.subject)
              .val(subject.subject);
            subjectFilter.append(option);
          });

          // Apply the filter on subject change
          subjectFilter.on("change", function () {
            var selectedSubject = $(this).val();
            console.log("Selected Subject ID:", selectedSubject);

            supportTable
              .column(4)
              .search(selectedSubject || "", false, true, false)
              .draw();
          });
        },
        error: function () {
          console.log("Error fetching subjects");
        },
      });
    },
  });
  $("#statusFilters").on("change", function () {
    var selectedValue = $(this).val();

    if (selectedValue === "all") {
      supportTable.column(6).search("").draw();
    } else {
      // Filter based on selected status value
      supportTable.column(6).search(selectedValue).draw();
    }
  });

  //}

  function showaddss() {
    toastr.success("reponse envoyé avec succés");
  }
  function showdeletecoo() {
    toastr.error("contact supprimé avec succés");
  }

  // Add a click event listener to each "Repondre" button
  $(document).on("click", ".repondred", function () {
    var id = $(this).data("username");
    var apiUrl =WEBSERVER_URL + "api/support/help_support/answer_demand/";
    $("#replyModals").modal("show");

    $("#cancelReplyBtns").on("click", function () {
      $("#replyMessages").val("");

      $("#replyMessages").removeClass("is-invalid");
      $("#replyMessageErrors").hide();

      $("#replyModals").modal("hide");
      supportTable.reload();
    });

    $("#replyForms").on("submit", function (event) {
      event.preventDefault();

      var message = $("#replyMessages").val().trim();

      // Perform input validation
      if (message === "") {
        // Show error message and add invalid class to the textarea
        $("#replyMessages").addClass("is-invalid");
        $("#replyMessageErrors").show();
      } else {
        $("#confirmationModals").modal("show");
      }
    });

    $("#sendReplyBtns").on("click", function () {
      Swal.fire({
        title: "Confirmation",
        text: "Êtes-vous sûr de vouloir envoyer cette réponse ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, envoyer",
        cancelButtonText: "Annuler",
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#6c757d",
      }).then((result) => {
        if (result.isConfirmed) {
          var message = $("#replyMessages").val();

          var formData = new FormData();
          formData.append("id_demand", id);
          formData.append("message", message);
          console.log("formData:", formData);
          $.ajax({
            url: apiUrl,
            type: "PATCH",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
              console.log("Reply sent successfully");
              supportTable.ajax.reload();
              showaddss();
            },
            error: function (xhr, status, error) {
              console.error(error);
            },
          });

          $("#replyMessages").val("");

          $("#replyMessages").removeClass("is-invalid");
          $("#replyMessageErrors").hide();

          $("#replyModals").modal("hide");

          $("#confirmationModals").modal("hide");
        }
      });
    });
  });

  // Open modal when the button is clicked
  $("#openModalBtnsup").on("click", function () {
    $("#myModalsup").modal("show");
  });

  // Close modal when the close button is clicked
  $(".modal .close").on("click", function () {
    $("#myModalsup").modal("hide");
  });

  $(document).on("submit", "#addFormsup", function (e) {
    e.preventDefault();
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
      url: WEBSERVER_URL + "api/support/subject_support/",
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
    supportTable.reload();
  });

  $(document).on("click", ".deleted", function () {
    var id = $(this).data("username");
    var apiUrl =
      WEBSERVER_URL + "api/support/help_support/" + id + "/";

    // Show the confirmation modal
    $("#deleteModalsup").modal("show");

    // Handle the delete confirmation
    $("#confirmDeletes").on("click", function () {
      // Use the appropriate AJAX method to send the delete request
      $.ajax({
        url: apiUrl,
        type: "DELETE",
        success: function (response) {
          // Handle the success response here
          console.log("Item deleted successfully");
          supportTable.ajax.reload();
          showdeletecoo();
          $("#deleteModalsup").modal("hide");
        },
        error: function (xhr, status, error) {
          // Handle the error response here
          console.error(error);
          // You can display an error message or perform other actions if needed
        },
      });
    });
    $("#delbtnsupp").on("click", function () {
      $("#deleteModalsup").modal("hide");
    });
  });
});
