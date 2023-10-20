<div class="modal fade" id="addclause" tabindex="-1" aria-labelledby="modallabeladd" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modallabeladd">Ajouter une clause</h5>
                <button type="button" class="close" data-bs-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <form class="row g-3 needs-validation" novalidate id="add_clause_form">
                    <!-- Clause Type Selection -->
                    <div class="col-md-12">
                        <label for="type" class="form-label">Type</label>
                        <select class="form-control" id="type" name="type">
                            <option selected value="StatsRuleClause">StatsRuleClause</option>
                        </select>
                        <div class="invalid-feedback">
                            Veuillez choisir un modèle, s'il vous plaît.
                        </div>
                    </div>
                    
                    <!-- Status Selection -->
                    <div class="col-md-12">
                        <label for="disabled" class="form-label">Statut</label>
                        <select class="form-control" id="disabled" name="disabled">
                            <option selected value="false">Active</option>
                            <option value="true">Désactiver</option>
                        </select>
                        <div class="invalid-feedback">
                            Veuillez choisir un modèle, s'il vous plaît.
                        </div>
                    </div>
                    
                    <!-- Unique Label Per Image Selection -->
                    <div class="col-md-12">
                        <label for="unique_label_per_image" class="form-label">unique_label_per_image</label>
                        <select class="form-control" id="unique_label_per_image" name="unique_label_per_image">
                            <option selected value="false">Vrai</option>
                            <option value="true">Faux</option>
                        </select>
                        <div class="invalid-feedback">
                            Veuillez choisir un modèle, s'il vous plaît.
                        </div>
                    </div>
                    
                    <!-- Service Selection -->
                    <div class="col-md-12">
                        <label for="service_id" class="form-label">Service</label>
                        <select class="form-control" id="service_id" name="service_id" required>
                            <option selected value="">Sélectionnez un service ...</option>
                            <!-- Add options for services here -->
                        </select>
                        <div class="invalid-feedback">
                            Veuillez sélectionner un service.
                        </div>
                    </div>
                    
                    <!-- Label Selection -->
                    <div class="col-md-12">
                        <label for="label_id" class="form-label">Label</label>
                        <select class="form-control" id="label_id" name="label_id" required>
                            <option value="">Sélectionnez un label ...</option>
                            <!-- Add options for labels here -->
                        </select>
                        <div class="invalid-feedback">
                            Veuillez sélectionner un label.
                        </div>
                    </div>
                    
                    <!-- Number of Occurrences -->
                    <div class="col-md-12">
                        <label for="occurence" class="form-label">Nombre d'occurrence</label>
                        <input type="number" min="0" class="form-control" id="occurence" value="1" name="nb-occ" required>
                        <div class="invalid-feedback">
                            Veuillez saisir un nombre supérieur ou égal à 1.
                        </div>
                    </div>
                    
                    <!-- Operator for Number of Occurrences Threshold -->
                    <div class="col-md-12">
                        <label for="nb_occu_threshold_operator" class="form-label">Operateur nombre d'occurrence threshold</label>
                        <select class="form-control" id="nb_occu_threshold_operator" name="nb_occu_threshold_operator" required>
                            <option selected value="">Sélectionnez ...</option>
                            <option value=">=">>=</option>
                            <option value="=">=</option>
                            <option value=">">></option>
                            <option value="<="><=</option>
                            <option value="<"><</option>
                        </select>
                        <div class="invalid-feedback">
                            Veuillez sélectionner un opérateur.
                        </div>
                    </div>
                    
                    <!-- Value Threshold -->
                    <div class="col-md-12">
                        <label for="value_threshold" class="form-label">value_threshold</label>
                        <input type="number" min="0" class="form-control" value="0" id="value_threshold" name="value_threshold">
                        <div class="invalid-feedback">
                            Veuillez saisir une valeur.
                        </div>
                    </div>
                    
                    <!-- Operator for Value Threshold -->
                    <div class="col-md-12">
                        <label for="value_thresh_operator" class="form-label">value_thresh_operator</label>
                        <select class="form-control" id="value_thresh_operator" name="value_thresh_operator" required>
                            <option selected value="">Sélectionnez ...</option>
                            <option value=">=">>=</option>
                            <option value="=">=</option>
                            <option value=">">></option>
                            <option value="<="><=</option>
                            <option value="<"><</option>
                        </select>
                        <div class="invalid-feedback">
                            Veuillez sélectionner un opérateur.
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-outline-primary" id="add_Clause">Ajouter</button>
                <button type="button" class="btn btn-outline-secondary" id="annulerButton" data-bs-dismiss="modal">Annuler</button>
            </div>
        </div>
    </div>
</div>
