<div class="modal fade" id="addModalcont" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Ajouter un contact</h4>
        </div>
        <form id="addFormcont">
          <div class="modal-body">
            <div class="form-group">
              <label for="subject">Objet<span class="text-danger">*</span>:</label>
              <input type="text" class="form-control" id="subject" name="subject" required>
            </div>
            <div class="form-group">
              <label for="message">Message<span class="text-danger">*</span>:</label>
              <input type="text" class="form-control" id="message" name="message" maxlength="30">
            </div>
            <div class="form-group">
              <label for="username">Username<span class="text-danger">*</span>:</label>
              <input type="text" class="form-control" id="username" name="username">
            </div>
            <div class="form-group">
              <label for="email">Email<span class="text-danger">*</span>:</label>
              <input type="text" class="form-control" id="email" name="email">
            </div>
          </div>

          <div class="modal-footer">
            <button type="submit" class="btn btn-outline-success">Enregistrer</button>
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Fermer</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>