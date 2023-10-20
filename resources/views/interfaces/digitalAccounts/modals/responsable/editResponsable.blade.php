<div class="modal fade" id="editModalres" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Modifier le Responsable</h4>

            </div>
            <form id="editFormres">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="edit_username">username:</label>
                        <input type="text" class="form-control" id="edit_username" name="edit_username">
                    </div>
                    <div class="form-group">
                        <label for="edit_first_name">Prénom:</label>
                        <input type="text" class="form-control" id="edit_first_name" name="edit_first_name">
                    </div>
                    <div class="form-group">
                        <label for="edit_last_name">Nom de famille:</label>
                        <input type="text" class="form-control" id="edit_last_name" name="edit_last_name">
                    </div>

                    <div class="form-group">
                        <label for="department">Department:</label>
                       <select class="form-control" id="department" name="department">       </select>
                    </div>


                </div>

                <div class="modal-footer">
                    <button type="submit" class="btn btn-outline-success">Modifier</button>
                    <button type="button" class="btn btn-outline-secondary" id="retourButtonm">Fermer</button>
                </div>
            </form>
        </div>
    </div>
</div>