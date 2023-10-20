<div class="modal fade" id="editModalcont" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Modifier les Contact</h4>

        </div>
        <form id="editFormcont">
          <div class="modal-body">
            <div class="form-group">
              <label for="editsubject">Objet<span class="text-danger">*</span>:</label>
              <input type="text" class="form-control" id="editsubject" name="subject" required>
            </div>
            <div class="form-group">
              <label for="editmessage">Message<span class="text-danger">*</span>:</label>
              <input type="text" class="form-control" id="editmessage" name="message" maxlength="30">
            </div>
            <div class="form-group">
              <label for="editusername">Username:</label>
              <input type="text" class="form-control readonly" id="editusername" name="username" readonly>
            </div>
            <div class="form-group">
              <label for="editemail">Email:</label>
              <input type="text" class="form-control readonly" id="editemail" name="email" readonly>
            </div>
          </div>

          <div class="modal-footer">
            <button type="submit" class="btn btn-outline-primary">Enregistrer</button>
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Fermer</button>
          </div>
        </form>
      </div>
    </div>
  </div>