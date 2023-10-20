<div class="modal fade" id="defineFormulaModal" tabindex="-1" role="dialog" aria-labelledby="defineFormulaModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="defineFormulaModalLabel">Définir une formule</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="row">
  <p style="font-weight: bold;">Exemple d'une itération : &nbsp; </p>
  <p style="font-weight: bold;">
    <span style="border: 1px solid black; padding: 5px;">Opérateur d'itération</span>
    <span style="border: 1px solid black; padding: 5px;">Opérant 1</span>
    <span style="border: 1px solid black; padding: 5px;">Opérateur de comparaison</span>
    <span style="border: 1px solid black; padding: 5px;">Opérant 2</span>
  </p>
</div>
  <form id="formulaForm">
    <div class="form-group">
    <!-- <div class="form-group row">
</div> -->
 <!--Ligne 1 Operand 1 dans iteration -->
 <div class="form-group row">
    <label for="iterationOperatorSelect" class="col-form-label text-center ">Opérateur d'itération :</label>
    <div class="col-sm-1"> 
        <select class="form-control" id="iterationOperatorSelect" name="iterationOperator"></select>
    </div>

    <label for="operandOptionsSelect" class="col-form-label text-center ">Opérant 1 :</label>
    <div class="col-sm-2">
        <select class="form-control" id="operandOptionsSelect" name="operandOption"></select> 
    </div>
        <label for="valueInput" id="labeloperation" class="col-form-label text-center" style="display: none;">Opération :</label>
        <label for="valueInput" id="labelvariable" class="col-form-label text-center" style="display: none;">Variable :</label>
    <div class="col-sm-2">
        <select class="form-control" id="variableSelect" name="variable" style="display: none;"></select>
        <select class="form-control" id="operationSelect" name="operation" style="display: none;"></select>
        <input type="text" placeholder="value" class="form-control" id="valueInput" name="value" style="display: none;">
    </div>
    <label for="valueTypeSelect" id="labeltype" class="col-form-label text-center" style="display: none;">Type :</label> 
    <div class="col-sm-2">
        <select class="form-control" id="valueTypeSelect" name="valueType" style="display: none;">
            <option value="integer">integer</option>
            <option value="float">float</option>
            <option value="text">text</option>
            <option value="boolean">boolean</option>
        </select>
    </div>
</div>
<!-- //// Fin Ligne 1 ///// -->
  <!-- ////Ligne 2 ///// -->
<div class="form-group row">
  <label for="iterationOperatorSelect" class="col-form-label text-center">Opérateur de comparaison:&nbsp;</label>
  <div class="col-sm-0"> 
  <select class="form-control" id="calculationOperatorSelect" name="calculationOperator">
</div>
    </select>
</div>

<div class="form-group row">
    <label for="iterationOperatorSelect" class="col-form-label text-center" >&nbsp; &nbsp;Opérant 2 :&nbsp;</label>
    <div class="col-sm-0">
        <select class="form-control" id="operandOptionsSelect2" name="operandOption"></select> 
    </div>
    <label for="valueInput" id="labelvariable2" class="col-form-label text-center" style="display: none;">&nbsp;Variable :</label>
    <label for="valueInput" id="labeloperation2" class="col-form-label text-center" style="display: none;">&nbsp;Opération :</label>
    <div class="col-sm-4">
        <select class="form-control" id="variableSelect2" name="variable" style="display: none;"></select>
        <select class="form-control" id="operationSelect2" name="operation" style="display: none;"></select>
        <input type="text" placeholder="value" class="form-control" id="valueInput2" name="value" style="display: none;">
        </div>
                <label for="valueInput" id="labeltype2" class="col-form-label text-center" style="display: none;">Type :&nbsp;</label>
            <div class="col-"> 
                <select class="form-control" id="valueTypeSelect2" name="valueType" style="display: none;">
                    <option value="integer">integer</option>
                    <option value="float">float</option>
                    <option value="text">text</option>
                    <option value="boolean">boolean</option>
                </select>
                </div>
         
 
</div>
<!-- //// Fin Ligne 2 ///// -->
</div>
      <hr class="my-4"> 
      <!-- //// Exemple d'une opération ///// -->
      <div class="row">
  <p style="font-weight: bold;">Exemple d'une opération  : &nbsp; </p>
  <p style="font-weight: bold;">
    <span style="border: 1px solid black; padding: 5px;">Opérant 1</span>
    <span style="border: 1px solid black; padding: 5px;">Opérateur &nbsp;</span>
    <span style="border: 1px solid black; padding: 5px;">Opérant 2</span>
  </p>
</div>
<div class="form-group row">
    <label for="iterationOperatorSelect" class="col-form-label text-center" >Opérant 1 :</label>
    <div class="col-sm-2">
        <select class="form-control" id="operandOptionsSelectOP" name="operandOption"></select> 
    </div>
    <label for="valueInput" id="labelvariableOP" class="col-form-label text-center" style="display: none;">Variable :</label>
    <label for="valueInput" id="labeloperationOP" class="col-form-label text-center" style="display: none;">Opération :</label>
    <label for="valueInput" id="labelvalueOP" class="col-form-label text-center" style="display: none;">Valeur :</label>
    <div class="col-sm-2">
        <select class="form-control" id="variableSelectOP" name="variable" style="display: none;"></select>
        <select class="form-control" id="operationSelectOP" name="operation" style="display: none;"></select>
        <select class="form-control" id="valueSelect" name="value" style="display: none;"></select>
       
    </div>
    <label for="valueTypeSelect" id="labeltypeOP" class="col-form-label text-center"  style="display: none;">Type :</label>
    <div class="col-sm-2">
    <button id="addvalue" type="submit" class="btn btn-outline-primary"  style="display: none;">Ajouter valeur </button>
    <input type="text" placeholder="value" class="form-control" id="valueInputOP" name="value" style="display: none;">
        <select class="form-control" id="valueTypeSelectOP" name="valueType" style="display: none;">
            <option value="integer">integer</option>
            <option value="float">float</option>
            <option value="text">text</option>
            <option value="boolean">boolean</option>
        </select>
        <button id="ajoutervalue" type="submit" class="btn btn-outline-primary" style="display: none;">Ajouter</button>
    </div>
</div>
 <!-- //// Fin Exemple d'une opération ///// -->
      <button type="button" class="btn btn-outline-primary" id="addAnotherOperandButton">Ajouter un autre operand</button>
<script>
  document.getElementById("addAnotherOperandButton").addEventListener("click", function() {
    var additionalOperand = document.getElementById("additionalOperand");
    additionalOperand.style.display = additionalOperand.style.display === "none" ? "block" : "none";
  });
</script>
<div id="additionalOperand" style="display: none;">
  
<br>
  <div class="form-group row">
    <label for="iterationOperatorSelect" class="col-form-label text-center">Opérateur :</label>
    <div class="col-sm-2">
    <select class="form-control" id="calculationOperatorSelect2" name="calculationOperator2">
    </select> 
    </div>
    </div>
    <hr class="my-4"> 
    <div class="row">
  <p style="font-weight: bold;">Exemple d'une itération : &nbsp; </p>
  <p style="font-weight: bold;">
    <span style="border: 1px solid black; padding: 5px;">Opérateur d'itération</span>
    <span style="border: 1px solid black; padding: 5px;">Opérant 1</span>
    <span style="border: 1px solid black; padding: 5px;">Opérateur de comparaison</span>
    <span style="border: 1px solid black; padding: 5px;">Opérant 2</span>
  </p>
</div>
 <!-- Exemple d'une itération 2  -->
 <div class="form-group row">
  <label for="iterationOperatorSelect" class="col-form-label text-center">Opérateur d'itération :</label>
  <div class="col-sm-2"> 
    <select class="form-control" id="iterationOperatorSelectit2" name="iterationOperator">
    </select>
  </div>
  <label for="iterationOperatorSelect" class="col-form-label text-center">Opérant 1 :</label>
  <div class="col-sm-2">
    <select class="form-control" id="operandOptionsSelect4" name="operandOption">
    </select> 
  </div>
  <label for="valueInput" id="labelvariable4" class="col-form-label text-center" style="display: none;">Variable :</label>
    <label for="valueInput" id="labeloperation4" class="col-form-label text-center" style="display: none;">Opération :</label>
    <div class="col-sm-2">
        <select class="form-control" id="variableSelect4" name="variable" style="display: none;"></select>
        <select class="form-control" id="operationSelect4" name="operation" style="display: none;"></select>
        <input type="text" placeholder="value" class="form-control" id="valueInput4" name="value" style="display: none;">
    </div>
    <label for="valueTypeSelect" id="labeltype4" class="col-form-label text-center"  style="display: none;">Type :</label>
    <div class="col-sm-2">
        <select class="form-control" id="valueTypeSelect4" name="valueType" style="display: none;">
            <option value="integer">integer</option>
            <option value="float">float</option>
            <option value="text">text</option>
            <option value="boolean">boolean</option>
        </select>
    </div>
</div>
 <!-- //////////////////// -->
      <!-- fin Apres click bouton Ajouter un autre operand -->
       <!--operand 2 interation 2   -->
       <div class="row">
    <div class="form-group row">
    <label for="iterationOperatorSelect" class="col-form-label"> &nbsp; Opérateur de comparaison : &nbsp;</label>
  <div class="col-sm-0">
    <select class="form-control" id="calculationOperatorSelect4" name="calculationOperator">
    </select>
  </div>
    <label for="iterationOperatorSelect" class="col-form-label text-center">&nbsp;Opérant 2:&nbsp;</label>
    <div class="col-sm-0">
    <select class="form-control" id="operandOptionsSelectl3" name="operandOptionsSelectl3">
    </select> 
    </div>
    </div>
    <div class="form-group row">
    <label for="valueInput" id="labelvariablel3" class="col-form-label text-center" style="display: none;">&nbsp; &nbsp; &nbsp;Variable : </label>
    <label for="valueInput" id="labeloperationl3" class="col-form-label text-center" style="display: none;">&nbsp; &nbsp; &nbsp; Opération :</label>
    <div class="col-sm-8">
    <select class="form-control" id="variableSelectl3" name="variablel3" style="display: none;" >
    </select>
    <select class="form-control" id="operationSelectl3" name="operationSelectl3" style="display: none;">
    </select>
  </div>
  <div class="col-0 mb-1">
    <input type="text" placeholder="value" class="form-control" id="valueInputl3" name="valuel3" style="display: none;">
    </div>
    <label for="valueTypeSelect2" id="labeltypel3" class="col-form-label text-center"  style="display: none;">&nbsp; Type:</label>
    <div class="col-4">
    <select class="form-control" id="valueTypeSelectl3" name="valueTypel3" style="display: none;">
      <option value="integer">integer</option>
      <option value="float">float</option>
      <option value="text">text</option>
      <option value="boolean">boolean</option>
    </select>
  </div>
  </div>
      </div>
      <hr class="my-4"> 
      <!-- operand 2 dans exemple operation  -->
      <div class="form-group row">
    <label for="iterationOperatorSelect" class="col-form-label text-center" >Opérant 2:</label>
    <div class="col-sm-2">
        <select class="form-control" id="operandOptionsSelectOP2" name="operandOption"></select> 
    </div>
    <label for="valueInput" id="labelvariableOP2" class="col-form-label text-center" style="display: none;">Variable :</label>
    <label for="valueInput" id="labeloperationOP2" class="col-form-label text-center" style="display: none;">Opération :</label>
    <label for="valueInput" id="labelvalueOP2" class="col-form-label text-center" style="display: none;">Valeur :</label>
    <div class="col-sm-2">
        <select class="form-control" id="variableSelectOP2" name="variable" style="display: none;"></select>
        <select class="form-control" id="operationSelectOP2" name="operation" style="display: none;"></select>
        <select class="form-control" id="valueSelect2" name="value" style="display: none;"></select>
    </div>
    <!-- <label for="valueTypeSelect" id="labeltypeOP2" class="col-form-label text-center"  style="display: none;">Type :</label> -->
    <div class="col-sm-2">
    <button id="addValuebouton2" type="submit" class="btn btn-outline-primary"  style="display: none;">Ajouter valeur </button>
    <input type="text" placeholder="value" class="form-control" id="valueInputOP2" name="value" style="display: none;">
        <select class="form-control" id="valueTypeSelectOP2" name="valueType" style="display: none;">
            <option value="integer">integer</option>
            <option value="float">float</option>
            <option value="text">text</option>
            <option value="boolean">boolean</option>
        </select>
        <button id="ajouterValuebouton2" type="submit" class="btn btn-outline-primary" style="display: none;">Ajouter</button>
    </div>
</div>


       <!--fin operand 2 dans exemple operation  -->
      <!-- fin ligne 3   -->
</div>
    </div>
  </form>
</div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-outline-primary" id="addOperationButton">Ajouter l'opération</button>
        <!-- <button type="submit" class="btn btn-outline-primary">Associer à la formule </button> -->
        <button type="button" class="btn btn-outline-secondary" id="annulerButton" data-dismiss="modal">Annuler</button>
         
      </div>
    </div>
  </div>
