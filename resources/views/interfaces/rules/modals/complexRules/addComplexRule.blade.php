<div class="modal fade" id="addrcomplexModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Ajouter une règle complexe</h4>
        <button type="button" class="close" data-bs-dismiss="modal">&times;</button>
      </div>
      <form id="rulescompForm">
        <div class="modal-body">
          <div class="form-group">
            <label for="sample_name">Nom de la règle complexe<span class="text-danger">*</span>:</label>
            <input type="text" class="form-control" id="nomrc" name="nomrc" >
          </div>
          <div class="form-group">
            <label for="sample_name">Description<span class="text-danger"></span>:</label>
            <input type="text" class="form-control" id="descriptionrc" name="descriptionrc" >
          </div>
          <div class="form-group">
            <label  for="sample_name">Type de règle complexe :</label>
            <select class="form-control" id="type_reglec" name="type_reglec" >
              <option >ComplexRuleForBasic </option>
            </select>
          </div>
          
          <div class="form-group">
            <label  for="sample_name">Type de règle associées :</label>
            <select class="form-control" id="type_regle_ass" name="type_regle_ass" >
              <option >PublicationBasedRule</option>
              <option >ProfilePicBasedRule</option>
              <option>CoverPicBasedRule</option>
              <option>DescriptionBasedRule</option>
              <option >AuthorPicTrustBasedRule </option>
              <option >AuthorCommentTrustBasedRule  </option>
            </select>
          </div>
        </div>
        <div id="errorMessage" style="color: red; display: none;"></div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-outline-primary">Ajouter</button>
          <button type="button" class="btn btn-outline-secondary"data-bs-dismiss="modal" aria-label="Close">Annuler</button>        </div>
      </form>
    </div>
  </div>
</div>