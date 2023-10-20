<div class="modal fade" id="myModalc" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Ajouter un Enfant</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      <form id="userFormc">
        <div class="modal-body">
          <div class="form-group">
            <label for="first_name">Nom:</label>
            <input type="text" class="form-control" id="first_name">
          </div>
          <div class="form-group">
            <label for="last_name">Prénom:</label>
            <input type text="text" class="form-control" id="last_name">
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input class="form-control" type="email" id="emailc" name="emailc">
          </div>
              <div>
      <label for="username">Nom d'utilisateur:</label>
      <input class="form-control" type="text" id="usernamec" name="usernamec">
    </div>
          <div class="form-group" style="display: none;">
           <label for="user_agentc">User Agent:</label>
           <select class="form-control" id="user_agentc" name="user_agentc">
           <option value="web" selected>Web</option>
            </select>
          </div>
          <div class="form-group" style="display: none;">
           <label for="user_typec">user_type:</label>
           <input class="form-control" type="text" id="user_typec" name="user_typec" value="child">
          </div>
          <div class="form-group">
          <label for="password">Mot de passe:</label>
           <div class="input-group">
        <input class="form-control" type="password" id="passwordc" name="passwordc">
        <button type="button" id="togglePasswordButtonChild" class="btn btn-outline-secondary" onclick="togglePasswordVisibility()">
          <i id="eyeIcon" class="fas fa-eye"></i>
        </button>
      </div>
      <button type="button" id="generateButtoncc"> <i class="fas fa-key"></i> Générer</button>
    </div>
          <div class="form-group">
            <label for="birthday">Date de naissance:</label>
            <input type="date" class="form-control" id="birthday">
          </div>
          <div class="form-group">
            <label for="genderc">Genre:</label>
            <select class="form-control" id="genderc">
              <option value="M">Homme</option>
              <option value="F">Femme</option>
              <option value="O">Autre</option>
            </select>
          </div>
          <div class="form-group">
            <label for="street">Rue:</label>
            <input type="text" class="form-control" id="street">
          </div>
          <div class="form-group">
            <label for="country">Pays:</label>
            <select class="form-control" id="country">
            </select>
          </div>
          <div class="form-group">
            <label for="postal_code">Code Postal:</label>
            <input type="text" class="form-control" id="postal_code">
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
