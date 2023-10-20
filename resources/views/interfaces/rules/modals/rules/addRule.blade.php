<div class="modal fade" id="ModalAjouterRegle" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Ajouter une règle</h4>
        <button type="button" class="close" data-bs-dismiss="modal">&times;</button>
      </div>
      <form id="rulesForm">
        <div class="modal-body">
          <div class="form-group">
            <label for="sample_name">Nom de la règle<span class="text-danger">*</span>:</label>
            <input type="text" class="form-control" id="nom" name="nom" >
          </div>
          <div class="form-group">
            <label for="sample_name">Description<span class="text-danger"></span>:</label>
           <input type="text" class="form-control" id="description" name="description" >
           </div>
          <div class="form-group">
            <label for="individual_type">Type de règle:</label>
            <select class="form-control" id="type_regle" name="type_regle" >
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
            <select class="form-control" id="type_clause" name="type_clause" >
              <option >StatsRuleClause</option>
            </select>
          </div>

          <div class="form-group">
    <label for="individual_id">Contexte info:</label>
</div>

<div class="form-group" style="display: flex; align-items: center;">
    <label for="genre" style= "margin-right: 10px;">Genre:</label>
    <select class="form-control" id="genre" name="genre">
        <option>Mâle</option>
        <option>Femelle</option>
    </select>
    <label for="age" style="margin-left: 20px; margin-right: 10px;">Âge:</label>
    <select class="form-control" id="age" name="age">
        <option>Enfant</option>
        <option>Adolescent</option>
        <option>Jeune adulte</option>
    </select>
    <!-- <label for="pays" style="margin-left: 20px; margin-right: 10px;">Pays:</label>
    <select class="form-control" id="pays" name="pays">
        <option>Cultures orientales</option>
        <option>Cultures occidentales</option>
    </select> -->
</div>
<div class="form-group">
      <label for="country">Pays:</label>
      <select class="form-control" id="country">
        <!-- Country options will be dynamically populated using JavaScript -->
      </select>
    </div>
<div class="form-group" >
    <label for="culture" style= "margin-right: 10px;">Culture:</label>
    <input class="form-control" id="culture" name="culture" />
</div>
<div class="form-group">     
    <label for="professionnelle" style= "margin-right: 10px;">Professionnelle:</label>
    <input class="form-control" id="professionnelle" name="professionnelle" />
</div>
        </div>
        <div id="errorMessage" style="color: red; display: none;"></div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-outline-primary">Ajouter</button>
          <button type="button" class="btn btn-outline-secondary" id="annulerButton" data-bs-dismiss="modal">Annuler</button>
          <script> 
          document.getElementById("annulerButton").addEventListener("click", function() {
          $("#ModalAjouterRegle").modal("hide");});
          </script>
        </div>
      </form>
    </div>
  </div>
  <div class="alert alert-success position-fixed" role="alert" id="successAlert" style="display: none; top: 20px; right: 20px; z-index: 999;">
    Règle ajoutée avec succès !
  </div> 
</div>