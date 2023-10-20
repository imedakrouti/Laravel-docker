<div class="modal fade" id="updateclause" tabindex="-1" aria-labelledby="modallabelupdate" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"  >Modifier une clause</h5>
                <button type="button" class="close" data-bs-dismiss="modal">&times;</button>            </div>
            <div class="modal-body">
                <div class="spinner-border" id="loader" role="status"
                    style="display:none; position: absolute;top: 30%;left: 40%; width:6rem!important; height:6rem!important; z-index: 100;">
                    <span class="visually-hidden">Loading...</span>
                </div>

             <form id="form_update_clause" class="row g-3 needs-validation" novalidate> 
                    <div class="col-md-12">
                        <label for="model" class="form-label">Type</label>
                        <select class="form-control" id="type_update" name="type_update">
                        
                            <option  value="StatsRuleClause">StatsRuleClause</option>
                        </select>
                        <div class="invalid-feedback">
                            Veuillez choisir un model svp.
                        </div>
                    </div>

                    <div class="col-md-12">
                        <label for="model" class="form-label">Statut</label>
                        <select class="form-control" id="disabled_update" name="disabled_update">
                            <option selected value="false">Active</option>
                            <option selected value="true">Desactiver</option>
                        </select>
                        <div class="invalid-feedback">
                            Veuillez choisir un model svp.
                        </div>
                    </div>
                    <div class="col-md-12">
                        <label for="model" class="form-label">unique_label_per_image</label>
                        <select class="form-control" id="unique_label_per_image_update" name="unique_label_per_image_update">
                            <option selected value="false">True </option>
                            <option selected value="true">False</option>
                        </select>
                        <div class="invalid-feedback">
                            Veuillez choisir un model svp.
                        </div>
                    </div>
                    <div class="col-md-12">
                        <label for="service_update_id" class="form-label">Service</label>
                        <select class="form-control" id="service_update_id" name="service_update_id" required>
                            <option value="">Selectionnez un service ...</option>
                        </select>

                        <div class="invalid-feedback">
                            Veuillez selectionner un service.
                    </div>
                    </div>
                    <div class="col-md-12">
                        <label for="label_update_id" class="form-label">Label</label>
                        <select class="form-control" id="label_update_id" name="label_update_id" required>
                            <option value="">Selectionnez un label ...</option>
                        </select>

                        <div class="invalid-feedback">
                            Veuillez selectionner un label.
                    </div>
                    </div>
                    <div class="col-md-12">
                        <label for="occurence" class="form-label">Nombre d'occurence</label>
                        <input type="number" min=1 class="form-control" id="occurence_update" value="1" name="nb-occ_update" required>
                        <div class="invalid-feedback">
                            Veuillez saisir un nombre supérieur ou égale à 1.
                        </div>
                    </div>
                    <div class="col-md-12">
                        <label for="occurence" class="form-label">Operateur nombre d'occurence threshol</label>
                        <select class="form-control" id="nb_occu_threshold_operator_update" name="nb_occu_threshold_operator_update" required>
                            <option selected value="">Selectionnez  ...</option>
                            <option value=">=">>=</option>
                            <option  value="=">=</option>
                            <option  value=">">></option>
                            <option  value="<="><=</option>
                            <option value="<"><</option>
                        </select>
                        <div class="invalid-feedback">
                            Veuillez saisir un nombre supérieur ou égale à 1.
                        </div>
                    </div>

                    <div class="col-md-12">
                        <label for="occurence" class="form-label">value_threshold</label>
                        <input type="number" step="0.1" min=0 class="form-control" id="value_threshold_update"  name="value_threshold_update">
                        <div class="invalid-feedback">
                            Veuillez saisir un nombre supérieur ou égale à 1.
                        </div>
                    </div>
                    <div class="col-md-12">
                        <label for="occurence" class="form-label">value_thresh_operator</label>
                        <select class="form-control" id="value_thresh_operator_update" name="value_thresh_operator_update" required>
                            <option selected value="">Selectionnez  ...</option>
                            <option value=">=">>=</option>
                            <option  value="=">=</option>
                            <option  value=">">></option>
                            <option  value="<="><=</option>
                            <option value="<"><</option>
                        </select>
                        <div class="invalid-feedback">
                            Veuillez saisir une valeur .
                        </div>
                    </div>
                    <div class="modal-footer">
                    <button type="submit" class="btn btn-outline-primary">Modifier</button>
                    <button type="button" class="btn btn-outline-secondary" id="annulerButton" data-bs-dismiss="modal">Annuler</button>
                </div>
                </form> 

            </div>
        </div>
    </div>
</div>