<div class="modal fade" id="myModalp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Ajouter un utilisateur</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
               <form id="userFormp">
              <div class="modal-body">
    <div>
      <label for="first_name">Nom:</label>
      <input class="form-control" type="text" id="first_name" name="first_name">
    </div>
    <div>
      <label for="last_name">Prénom:</label>
      <input class="form-control" type="text" id="last_name" name="last_name">
    </div>
    <div>
      <label for="email">Email:</label>
      <input class="form-control" type="email" id="email" name="email">
    </div>
    <div>
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
      <button type="button" id="generateButtonc"> <i class="fas fa-key"></i> Générer</button>
    </div>
    <div class="form-group" style="display: none;">
      <label for="email_verification_url">Email Verification URL:</label>
      <input class="form-control" type="text" id="email_verification_url" name="email_verification_url" value="web">
    </div>
    <div class="form-group" style="display: none;">
      <label for="user_agent">User Agent:</label>
      <select class="form-control" id="user_agent" name="user_agent">
        <option value="web" selected>Web</option>
      </select>
    </div>
    <div class="form-group" style="display: none;">
      <label for="user_type">user_type:</label>
      <input class="form-control" type="text" id="user_type" name="user_type" value="parent">
    </div>
    <div>
      <label for="school">Ecole:</label>
      <select class="form-control" id="school" name="school">
        <!-- School options will be dynamically populated here using JavaScript -->
      </select>
    </div>
    <div>
      <label for="gender">Genre:</label>
      <select class="form-control" id="gender" name="gender">
        <option value="M">Homme</option>
        <option value="F">Femme</option>
        <option value="O">Autre</option>
      </select>
    </div>
    <div>
      <label for="birthday">Date de naissance:</label>
      <input class="form-control" type="date" id="birthday" name="birthday">
    </div>
  </div>
  <div id="errorMessage" style="color: red; display: none;"></div>
  <div class="modal-footer">
    <button type="submit" class="btn btn-outline-primary">Ajouter</button>
    <button type="button" class="btn btn-outline-secondary" id="retourButtonqq">Fermer</button>
  </div>
</form>

<script>
  document.getElementById('userFormp').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    var inputs = this.getElementsByTagName('input');
    var emptyInputs = [];

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value === '') {
        emptyInputs.push(inputs[i]);
      }
    }

    var errorMessage = document.getElementById('errorMessage');

    if (emptyInputs.length > 0) {
      errorMessage.style.display = 'block';
    } else {
      errorMessage.style.display = 'none';
      this.submit(); // Submit the form if all inputs are filled
    }

    // Remove existing error messages
    var existingErrorMessages = this.getElementsByClassName('error-message');
    while (existingErrorMessages.length > 0) {
      existingErrorMessages[0].remove();
    }

    // Display error messages for empty inputs
    for (var i = 0; i < emptyInputs.length; i++) {
      var input = emptyInputs[i];
      var errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.style.color = 'red';
      errorElement.textContent = 'Veuillez remplir ce champ.';
      input.parentNode.appendChild(errorElement);
    }
  });
</script>

        </div>
    </div>
</div>