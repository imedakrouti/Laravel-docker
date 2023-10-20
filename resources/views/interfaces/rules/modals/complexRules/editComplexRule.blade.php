<div class="modal fade" id="editModalRuleC" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Modifier une règle complexe </h4>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
              </div>
            <form id="editForm3">
                <div class="modal-body">
                <script>
    // Attendre que le DOM soit chargé
    document.addEventListener("DOMContentLoaded", function() {
        var editButton = document.getElementById("btnEditModal");
        var editForm = document.getElementById("editForm3");
        editForm.addEventListener("submit", function(event) {
            // Réinitialiser les messages d'alerte
            resetAlerts();
            // Vérifier les champs et afficher les alertes si nécessaire
            var nameField = document.getElementById("edit_name");
            var descriptionField = document.getElementById("edit_description");
            var typeComplexField = document.getElementById("edit_type_regle_complex");
            var typeregleField = document.getElementById("edit_type_regle");
            if (nameField.value.trim() === "") {
                displayAlert(nameField);
                event.preventDefault(); // Empêcher l'envoi du formulaire
            }
            if (descriptionField.value.trim() === "") {
                displayAlert(descriptionField);
                event.preventDefault(); // Empêcher l'envoi du formulaire
            }
            if (typeComplexField.value.trim() === "") {
                displayAlert(typeComplexField);
                event.preventDefault(); // Empêcher l'envoi du formulaire
            }
            if (typeregleField.value.trim() === "") {
                displayAlert(typeregleField);
                event.preventDefault(); // Empêcher l'envoi du formulaire
            }
        });
        function displayAlert(inputField) {
            var alertDiv = inputField.nextElementSibling;
            alertDiv.style.display = "block";
        }
        function resetAlerts() {
            var alertDivs = document.querySelectorAll(".alert.alert-danger");
            alertDivs.forEach(function(alertDiv) {
                alertDiv.style.display = "none";
            });
        }
    });
                </script>
                    <div class="form-group">
                        <label for="edit_name">Nom :</label>
                        <input type="text" class="form-control" id="edit_name" name="edit_name" >
                        <div class="alert alert-danger" style="display: none;">Veuillez saisir un nouveau nom d'échantillon.</div>
                    </div>
                    <div class="form-group">
                        <label for="edit_context">Description :</label>
                        <input type="text" class="form-control" id="edit_description" name="edit_description">
                        <div class="alert alert-danger" style="display: none;">Veuillez saisir un nouveau contexte.</div>
                    </div>
          <div class="form-group">
            <label for="individual_type">Type de règle complexe :</label>
            <select class="form-control" id="edit_type_regle_complex" name="edit_type_regle_complex" >
              <option >ComplexRuleForBasic</option>
            </select>
          </div>
          <div class="form-group">
            <label for="individual_type">Type de règle associées :</label>
            <select class="form-control" id="edit_type_regle" name="edit_type_regle" >
              <option >PublicationBasedRule</option>
              <option >ProfilePicBasedRule</option>
              <option>CoverPicBasedRule</option>
              <option>DescriptionBasedRule</option>
              <option >AuthorPicTrustBasedRule </option>
              <option >AuthorCommentTrustBasedRule  </option>
            </select>
          </div>
                </div>
                <div class="modal-footer">
                    <!-- <button type="submit" id="saveChangesButton" class="btn btn-outline-success">Modifier</button> -->
                    <button type="submit"  class="btn btn-outline-success">Modifier</button>
                    <button type="button" class="btn btn-outline-secondary"data-bs-dismiss="modal" aria-label="Close">Annuler</button>
                </div>
            </form>
        </div>
    </div>
    <div class="alert alert-success position-fixed" role="alert" id="successAlert1" style="display: none; top: 20px; right: 20px; z-index: 999;">
    Règle complexe modifiée avec succès !
  </div> 
</div>