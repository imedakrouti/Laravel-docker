<div class="modal fade" id="modalAddConcept" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-bs-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Ajouter un concept</h4>
        <button type="button" class="close" data-bs-dismiss="modal">&times;</button>
      </div>
      <form id="userFormconcept">
        <div class="modal-body">
          <div class="form-group">
            <label for="name">Nom <span class="text-danger">*</span>:</label>
            <input type="text" class="form-control" id="name_concept" name="name_concept">
          </div>
          <div class="form-group">
            <label for="description">Description :</label>
            <input type="text" class="form-control" id="description_concept" name="description_concept">
          </div>
          <div class="form-group">
            <label for="type_concept">Type :</label>
            <select class="form-control" id="type_concept" name="type_concept">
              <option value="">Sélectionner un type de règle</option>
              <option>rule</option>
              <option>rules_group</option>
            </select>
          </div>
        </div>
        <div id="errorMessage" style="color: red; display: none;"></div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-outline-primary">Ajouter</button>
          <button type="button" class="btn btn-outline-secondary" id="annulerButton" data-bs-dismiss="modal">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</div>
