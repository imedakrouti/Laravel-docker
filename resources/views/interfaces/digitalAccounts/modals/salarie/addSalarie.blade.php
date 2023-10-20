<div class="modal fade" id="myModalsal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Ajouter un utilisateur</h4>
                <button type="button" class="close" data-bs-dismiss="modal">&times;</button>
            </div>
            <form id="userFormsal">
                <div class="modal-body">
                    <div class="form-group">

                        <label for="first_name">Nom:</label>
                        <input class="form-control" type="text" id="first_name" name="first_name">
                    </div>
                    <div class="form-group">
                        <label for="last_name">Prénom:</label>
                        <input class="form-control" type="text" id="last_name" name="last_name">
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input class="form-control" type="email" id="email" name="email">
                    </div>
                    <div class="form-group">
                        <label for="username">Nom d'utilisateur:</label>
                        <input class="form-control" type="text" id="username" name="username">
                    </div>
                    <div class="form-group">
                        <label for="password">Mot de passe:</label>
                        <div class="input-group">
                            <input class="form-control" type="password" id="password" name="password">
                            <button type="button" id="togglePasswordButton" class="btn btn-outline-secondary" onclick="togglePasswordVisibility()">
                                <i id="eyeIcon" class="fas fa-eye"></i>
                            </button>
                        </div>

                        <button type="button" id="generateButton"> <i class="fas fa-key"></i> Générer</button>
                    </div>

                    <div class="form-group" style="display: none;">
                        <label for="email_verification_url">Email Verification URL:</label>
                        <input class="form-control" type="text" id="email_verification_url" name="email_verification_url" value="web">
                    </div>
                    <div class="form-group" style="display: none;">
                        <label for="account_type">Rôle:</label>
                        <input class="form-control" type="text" id="account_type" name="account_type" value="2">
                    </div>
                    <div class="form-group">
                        <label for="departmentSelect">Departments:</label>
                        <select class="form-control" id="departmentSelect" name="departmentSelect">
                            <!-- Department options will be dynamically added here -->
                        </select>
                    </div>


                </div>
                <div id="errorMessage" style="color: red; display: none;"></div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-outline-primary">Ajouter</button>
                    <button type="button" class="btn btn-outline-secondary" id="retourButton">Fermer</button>
                </div>
            </form>
        </div>
    </div>
</div>