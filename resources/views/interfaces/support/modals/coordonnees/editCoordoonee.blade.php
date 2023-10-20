<div class="modal fade" id="editModalcoo" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
      <h4 class="modal-title">Modifier les coordonnées</h4>
      </div>
      <form id="editFormcoo">
        <div class="modal-body">
          <div class="form-group">
            <label for="editEmail">Email<span class="text-danger">*</span>:</label>
            <input type="email" class="form-control" id="editEmail" name="email" required>
          </div>
          <div class="form-group">
            <label for="editPhone">Téléphone<span class="text-danger">*</span>:</label>
            <input type="text" class="form-control" id="editPhone" name="phone" maxlength="30">
          </div>
          <div class="form-group">
            <label for="editAddress">Adresse<span class="text-danger">*</span>:</label>
            <input type="text" class="form-control" id="editAddress" name="address">
          </div>
          <div class="form-group">
  <label for="editCountry">Pays<span class="text-danger">*</span>:</label>
  <select class="form-control" id="editCountry" name="country"></select>
</div>

        </div>

        <div class="modal-footer">
          <button type="submit" class="btn btn-outline-success">Modifier</button>
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal" id="cancelReplyBtn2">Fermer</button>
        </div>
      </form>
    </div>
  </div>
</div>