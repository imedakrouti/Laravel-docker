<div class="modal fade" id="addrulecomplex_rule" tabindex="-1" aria-labelledby="modalcomplex_ruleaddrulecomplex_rules" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="addrulecomplex_rule">Attribuer une regle</h4>
                
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
            </div>
            <div class="modal-body">
                <div class="spinner-border" id="loader" role="status" style="display:none; position: absolute;top: 30%;left: 40%; width:6rem!important; height:6rem!important;z-index:100;">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <form class="" id="addrulecomplex_rule_form">
                    <div class="form-group">
                    <label for="name_complex_rule_addrulecomplex_rules" class="form-label">Nom de la règle complexe</label>
                        <input type="text" class="form-control" id="name_complex_rule_addrulecomplex_rules" required disabled>
                    </div>
                    <div id="list_rule">
                 
          <div class="form-group">
            <label for="individual_type">Règles :</label>
            <select class="form-control" id="rules" name="rules" >
            <option  value="">Liste des regles ...</option>
            </select>
          </div>
          <div class="form-group">
                                <label for="weight" class="form-label">Poids</label>
                                <input type="number" min='0.0' step='0.1' class="form-control" id="weight">
                                
                            </div>
                    </div>
                    <div class="modal-footer">
                    <button type="submit" class="btn btn-outline-primary">Ajouter</button>
                    <button type="button" class="btn btn-outline-secondary"data-bs-dismiss="modal" aria-label="Close">Annuler</button>
      </div>
                </form>
            </div>
        </div>
    </div>
</div>