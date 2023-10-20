<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Modifier Echantillon</h4>
            </div>
            <form id="editForm1">
                <div class="modal-body">

                    <div class="form-group">
                        <label for="edit_name">Nom d'échantillon:</label>
                        <input type="text" class="form-control" id="edit_name" name="edit_name" >
                        <div class="alert alert-danger" style="display: none;">Veuillez saisir un nouveau nom d'échantillon.</div>
                    </div>
                    <div class="form-group">
                        <label for="edit_context">Contexte :</label>
                      <select class="form-control" id="edit_context" name="edit_context">
                      <option value="">Liste des contextes</option>
                      </select>
                            
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button"  class="btn btn-outline-success"id="updateEchantillon">Modifier</button>
                    <button type="button" class="btn btn-outline-secondary" id="retourButtonm1" data-bs-dismiss="modal">Fermer</button>
                </div>
            </form>
        </div>
    </div>
</div>