<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Modifier Concept</h4>
            </div>
            <form id="editForm1">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="edit_name">Nom du concept:</label>
                        <input type="text" class="form-control" id="edit_name" name="edit_name" >
                        <div class="alert alert-danger" style="display: none;">Veuillez saisir un nouveau nom du concept.</div>
                    </div>
                    <div class="form-group">
                        <label for="edit_context">Description :</label>
                        <input type="text" class="form-control" id="edit_description" name="edit_description">
                        <div class="alert alert-danger" style="display: none;">Veuillez saisir une nouvelle description.</div>
                    </div>
                    <div class="form-group">
                         <label for="individual_id">Type :</label>
                         <select class="form-control" id="edit_type" name="edit_type">
                            <option>rule</option>
                             <option >rules_group</option>
                          </select>
                    </div>
                    <div class="form-group">
            <label for="individual_type">Formule</label>
            <select class="form-control" id="formule_update_id" name="formule_update_id" >
            <option  value="">Liste des formules ...</option>
            </select>
          </div>
                </div>
                <div class="modal-footer">
                    <button type="submit"  class="btn btn-outline-success">Modifier</button>
                    <button type="button" class="btn btn-outline-secondary" id="retourButtonm1" data-bs-dismiss="modal">Fermer</button>
                </div>
            </form>
        </div>
    </div> 
</div>