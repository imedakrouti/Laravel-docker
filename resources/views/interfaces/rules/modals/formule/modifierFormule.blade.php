<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Modifier Formule</h4>
            </div>
            <form id="editForm1">
                <div class="modal-body">
                <script>
    // Attendre que le DOM soit chargé
    document.addEventListener("DOMContentLoaded", function() {
        var editButton = document.getElementById("editbutton");
        var editForm = document.getElementById("editForm1");
        editForm.addEventListener("submit", function(event) {
            // Réinitialiser les messages d'alerte
            resetAlerts();
            // Vérifier les champs et afficher les alertes si nécessaire
            var nameField = document.getElementById("edit_name");
            var descriptionField = document.getElementById("edit_description");
            if (nameField.value.trim() === "") {
                displayAlert(nameField);
                event.preventDefault(); // Empêcher l'envoi du formulaire
            }
            if (descriptionField.value.trim() === "") {
                displayAlert(descriptionField);
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
                        <label for="edit_name">Nom Formule :</label>
                        <input type="text" class="form-control" id="edit_name" name="edit_name" >
                        <div class="alert alert-danger" style="display: none;">Veuillez saisir un nouveau nom de la formule .</div>
                    </div>
                    <div class="form-group">
                        <label for="edit_context">Description :</label>
                        <input type="text" class="form-control" id="edit_description" name="edit_description">
                        <div class="alert alert-danger" style="display: none;">Veuillez saisir une nouvelle description.</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <!-- <button type="submit" id="saveChangesButton" class="btn btn-outline-success">Modifier</button> -->
                    <button type="submit"  class="btn btn-outline-success">Modifier</button>
                    <button type="button" class="btn btn-outline-secondary" id="retourButtonm1" data-dismiss="modal">Fermer</button>
                </div>
            </form>
        </div>
    </div>
    <!-- <div class="alert alert-success position-fixed" role="alert" id="successAlert" style="display: none; top: 20px; right: 20px; z-index: 999;">
    Formule modifiée avec succès !
  </div>  -->
</div>