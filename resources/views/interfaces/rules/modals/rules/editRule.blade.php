<div class="modal fade" id="editRegleModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Modifier une règle</h4>
            </div>
            <form id="editFormRule">
                <div class="modal-body">
                <script>
    // Attendre que le DOM soit chargé
    document.addEventListener("DOMContentLoaded", function() {
        var editButton = document.getElementById("BtnEditRegle");
        var editForm = document.getElementById("editFormRule");
        editForm.addEventListener("submit", function(event) {
            // Réinitialiser les messages d'alerte
            resetAlerts();
            // Vérifier les champs et afficher les alertes si nécessaire
            var nameField = document.getElementById("edit_name");
            var descriptionField = document.getElementById("edit_description");
            var typeField = document.getElementById("edit_type_regle");
            var typeclauseField = document.getElementById("edit_type_clause");
            var typegenreField = document.getElementById("edit_genre");
            var typeageField = document.getElementById("edit_age");
            if (nameField.value.trim() === "") {
                displayAlert(nameField);
                event.preventDefault(); // Empêcher l'envoi du formulaire
            }
            if (descriptionField.value.trim() === "") {
                displayAlert(descriptionField);
                event.preventDefault(); // Empêcher l'envoi du formulaire
            }
            if (typeField.value.trim() === "") {
                displayAlert(typeField);
                event.preventDefault(); // Empêcher l'envoi du formulaire
            }
            if (typeclauseField.value.trim() === "") {
                displayAlert(typeclauseField);
                event.preventDefault(); // Empêcher l'envoi du formulaire
            }
            if (typegenreField.value.trim() === "") {
                displayAlert(typegenreField);
                event.preventDefault(); // Empêcher l'envoi du formulaire
            }
            if (typeageField.value.trim() === "") {
                displayAlert(typeageField);
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
                        <div class="alert alert-danger" style="display: none;">Veuillez saisir un nouveau nom de règle .</div>
                    </div>
                    <div class="form-group">
                        <label for="edit_context">Description :</label>
                        <input type="text" class="form-control" id="edit_description" name="edit_description">
                        <div class="alert alert-danger" style="display: none;">Veuillez saisir une nouvelle description .</div>
                    </div>
                    <div class="form-group">
            <label for="individual_type">Type de règle:</label>
            <select class="form-control" id="edit_type_regle" name="edit_type_regle" >
              <option >PublicationBasedRule</option>
              <option >ProfilePicBasedRule</option>
              <option>CoverPicBasedRule</option>
              <option>DescriptionBasedRule</option>
              <option >AuthorPicTrustBasedRule </option>
              <option >AuthorCommentTrustBasedRule  </option>
            </select>
          </div>
          <div class="form-group">
            <label for="individual_type">Type de clause:</label>
            <select class="form-control" id="edit_type_clause" name="edit_type_clause" >
              <option >StatsRuleClause</option>
            </select>
          </div>
          <div class="form-group">
    <label for="individual_id">Contexte info:</label>
     </div>

        <div class="form-group" style="display: flex; align-items: center;">
    <label for="genre" style= "margin-right: 10px;">Genre:</label>
    <select class="form-control" id="edit_genre" name="edit_genre">
        <option>Mâle</option>
        <option>Femelle</option>
    </select>
    <label for="age" style="margin-left: 20px; margin-right: 10px;">Âge:</label>
    <select class="form-control" id="edit_age" name="edit_age">
        <option>Enfant</option>
        <option>Adolescent</option>
        <option>Jeune adulte</option>
    </select>
      </div>
      <div class="form-group">
      <label for="countryMod">Pays:</label>
      <select class="form-control" id="countryMod">
        <!-- Country options will be dynamically populated using JavaScript -->
      </select>
    </div>
<div class="form-group" >
    <label for="cultureMod" style= "margin-right: 10px;">Culture:</label>
    <input class="form-control" id="cultureMod" name="cultureMod" />
</div>
<div class="form-group">     
    <label for="professionnelleMod" style= "margin-right: 10px;">Professionnelle:</label>
    <input class="form-control" id="professionnelleMod" name="professionnelleMod" />
</div>
                </div>
                <div class="modal-footer">
                    <!-- <button type="submit" id="saveChangesButton" class="btn btn-outline-success">Modifier</button> -->
                    <button type="submit"  class="btn btn-outline-success">Modifier</button>
                    <button type="button" class="btn btn-outline-secondary" id="hideEditModal" data-bs-dismiss="modal">Fermer</button>
                </div>
            </form>
        </div>
    </div>
    <div class="alert alert-success position-fixed" role="alert" id="successAlert1" style="display: none; top: 20px; right: 20px; z-index: 999;">
    Règle modifiée avec succès !
  </div> 
</div>