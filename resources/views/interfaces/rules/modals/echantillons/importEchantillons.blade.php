<div class="modal fade" id="importmodal" tabindex="-1" role="dialog" aria-labelledby="importmodalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="importmodalLabel">Importer Un Echantillon</h5>
      </div>
      <div class="modal-body">
        <div class="form-group text-center">
           <label for="fileInput" class="btn btn-outline-primary">
              <i class="fas fa-file-upload"></i> choisir un fichier
              <input type="file" id="fileInput" style="display: none;" />
            </label>
          <span id="fileLabel"class="d-block"> Veuillez choisir un fichier excel</span>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" id="retourButtonm1" data-bs-dismiss="modal">Fermer</button>
        <button id="submitButton" type="button" class="btn btn-outline-info" disabled>
          <i class="fas fa-download"></i> Importer
        </button>
      </div>
    </div>
  </div>
</div>