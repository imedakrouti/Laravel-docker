<div class="modal fade" id="Ajouterechantillon" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Ajouter un échantillon</h4>
        <button type="button" class="close" data-bs-dismiss="modal">&times;</button>
      </div>
      <form id="ajoutechantillon">
        <div class="modal-body">
          <div class="form-group">
            <label for="sample_name">Nom d'échantillon<span class="text-danger">*</span>:</label>
            <input type="text" class="form-control" id="echname" name="echname" >
          </div>
          <div class="form-group">
            <label for="sample_name">Contexte:</label>
            <!-- <input type="number" class="form-control" id="context" name="context" > -->
            <select class="form-control" id="addcontext" name="context">
            <option value="">Liste des contextes</option>
            </select>
          
          </div>
        </div> 
        <div id="errorMessage" style="color: red; display: none;"></div>
        <div class="modal-footer">
        <button type="submit" class="btn btn-outline-primary">Ajouter</button>
        <button type="button" data-bs-dismiss="modal" class="btn btn-outline-secondary" id="" data-bs-dismiss="modal">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</div>