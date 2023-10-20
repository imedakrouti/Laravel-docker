<div class="modal fade" id="ajoutuserform" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Ajouter une formule</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      <form id="userF" >
        <div class="modal-body">
          <div class="form-group">
            <label for="name">Nom <span class="text-danger">*</span>:</label>
            <input type="text" class="form-control" id="username" name="username" >
          </div>
          <div class="form-group">
            <label for="description">Description:</label>
            <input type="textarea" class="form-control" id="first_name" name="first_name" >
          </div>
        </div>
         <div id="errorMessage" style="color: red; display: none;"></div>
         <div class="modal-footer">
          <button type="submit" class="btn btn-outline-primary">Ajouter</button>
          <button type="button" class="btn btn-outline-secondary" id="annulerButton" data-dismiss="modal">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</div>