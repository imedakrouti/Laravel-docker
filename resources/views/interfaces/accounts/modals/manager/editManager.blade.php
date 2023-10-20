<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Modifier le profil</h4>

            </div>
            <form id="editForm">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="edit_username">Nom d'utilisateur<span class="text-danger">*</span>:</label>
                        <input type="text" class="form-control readonly" id="edit_username" name="edit_username" required readonly>
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
                        <label for="edit_email">Email<span class="text-danger">*</span>:</label>
                        <input type="email" class="form-control readonly" id="edit_email" name="edit_email" required readonly>
                    </div>
                    <div class="form-group">
                        <label for="edit_gender">Genre:</label>
                        <select class="form-control" id="edit_gender" name="edit_gender">
                            <option value="M">Masculin</option>
                            <option value="F">Féminin</option>
                            <option value="O">Autre</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="edit_user_role">Rôle<span class="text-danger">*</span>:</label>
                        <select class="form-control readonly" id="edit_user_role" name="edit_user_role" disabled>
                            <option value="manager">Manager</option>
                            <option value="parent">Parent</option>
                            <option value="enfant">Enfant</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="edit_birthday">Date de naissance:</label>
                        <input type="date" class="form-control" id="edit_birthday" name="edit_birthday" required>
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