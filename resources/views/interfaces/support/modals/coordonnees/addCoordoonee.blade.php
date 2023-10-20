  <!-- Add Coordinate Modal -->
  <div class="modal fade" id="addModalcoo" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Ajouter un coordonnée</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <form id="addForm">
          <div class="modal-body">
            <div class="form-group">
              <label for="email">Email<span class="text-danger">*</span>:</label>
              <input type="email" class="form-control" id="email" name="email" >
            </div>
            <div class="form-group">
              <label for="phone">Téléphone<span class="text-danger">*</span>:</label>
              <input type="text" class="form-control" id="phone" name="phone" maxlength="30">
            </div>
            <div class="form-group">
              <label for="address">Adresse<span class="text-danger">*</span>:</label>
              <input type="text" class="form-control" id="address" name="address">
            </div>
            <div class="form-group">
              <label for="country">Pays<span class="text-danger">*</span>:</label>
              <select class="form-control" id="country" name="country" >
              <option value="">Choisir Pays</option>
  <option value="Afghanistan">Afghanistan</option>
  <option value="Åland Islands">Åland Islands</option>
  <option value="Albania">Albania</option>
  <option value="Algeria">Algeria</option>
  <option value="American Samoa">American Samoa</option>
  <option value="Andorra">Andorra</option>
  <option value="Angola">Angola</option>
  <option value="Anguilla">Anguilla</option>
  <option value="Antarctica">Antarctica</option>
  <option value="Antigua and Barbuda">Antigua and Barbuda</option>
  <option value="Argentina">Argentina</option>
  <option value="Armenia">Armenia</option>
  <option value="Aruba">Aruba</option>
  <option value="Australia">Australia</option>
  <option value="Austria">Austria</option>
  <option value="Azerbaijan">Azerbaijan</option>
  <option value="Bahamas">Bahamas</option>
  <option value="Bahrain">Bahrain</option>
  <option value="Bangladesh">Bangladesh</option>
  <option value="Barbados">Barbados</option>
  <option value="Belarus">Belarus</option>
  <option value="Belgium">Belgium</option>
  <option value="Belize">Belize</option>
  <option value="Benin">Benin</option>
  <option value="Bermuda">Bermuda</option>
  <option value="Bhutan">Bhutan</option>
  <option value="Bolivia">Bolivia</option>
  <option value="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</option>
  <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
  <option value="Botswana">Botswana</option>
  <option value="Bouvet Island">Bouvet Island</option>
  <option value="Brazil">Brazil</option>
  <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
  <option value="Brunei">Brunei</option>
  <option value="Bulgaria">Bulgaria</option>
  <option value="Burkina Faso">Burkina Faso</option>
  <option value="Burundi">Burundi</option>
  <option value="Cabo Verde">Cabo Verde</option>
  <option value="Cambodia">Cambodia</option>
  <option value="Cameroon">Cameroon</option>
  <option value="Canada">Canada</option>
  <option value="Cayman Islands">Cayman Islands</option>
  <option value="Central African Republic">Central African Republic</option>
  <option value="Chad">Chad</option>
  <option value="Chile">Chile</option>
  <option value="China">China</option>
  <option value="Christmas Island">Christmas Island</option>
  <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
  <option value="Colombia">Colombia</option>
  <option value="Comoros">Comoros</option>
  <option value="Congo">Congo</option>
  <option value="Congo (the Democratic Republic of the)">Congo (the Democratic Republic of the)</option>
  <option value="Cook Islands">Cook Islands</option>
  <option value="Costa Rica">Costa Rica</option>
  <option value="Côte d'Ivoire">Côte d'Ivoire</option>
  <option value="Croatia">Croatia</option>
  <option value="Cuba">Cuba</option>
  <option value="Curaçao">Curaçao</option>
  <option value="Cyprus">Cyprus</option>
  <option value="Czechia">Czechia</option>
  <option value="Denmark">Denmark</option>
  <option value="Djibouti">Djibouti</option>
  <option value="Dominica">Dominica</option>
  <option value="Dominican Republic">Dominican Republic</option>
  <option value="Ecuador">Ecuador</option>
  <option value="Egypt">Egypt</option>
  <option value="El Salvador">El Salvador</option>
  <option value="Equatorial Guinea">Equatorial Guinea</option>
  <option value="Eritrea">Eritrea</option>
  <option value="Estonia">Estonia</option>
  <option value="Eswatini">Eswatini</option>
  <option value="Ethiopia">Ethiopia</option>
  <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
  <option value="Faroe Islands">Faroe Islands</option>
  <option value="Fiji">Fiji</option>
  <option value="test">Amir</option>
  <option value="Finland">Finland</option>
  <option value="France">France</option>
  <option value="French Guiana">French Guiana</option>
  <option value="French Polynesia">French Polynesia</option>
  <option value="French Southern Territories">French Southern Territories</option>
  <option value="Gabon">Gabon</option>
  <option value="Gambia">Gambia</option>
  <option value="Georgia">Georgia</option>
  <option value="Germany">Germany</option>
  <option value="Ghana">Ghana</option>
  <option value="Gibraltar">Gibraltar</option>
  <option value="Greece">Greece</option>
  <option value="Greenland">Greenland</option>
  <option value="Grenada">Grenada</option>
  <option value="Guadeloupe">Guadeloupe</option>
  <option value="Guam">Guam</option>
  <option value="Guatemala">Guatemala</option>
  <option value="Guernsey">Guernsey</option>
  <option value="Guinea">Guinea</option>
  <option value="Guinea-Bissau">Guinea-Bissau</option>
  <option value="Guyana">Guyana</option>
  <option value="Haiti">Haiti</option>
  <option value="Heard Island and McDonald Islands">Heard Island and McDonald Islands</option>
  <option value="Holy See">Holy See</option>
  <option value="Honduras">Honduras</option>
  <option value="Hong Kong">Hong Kong</option>
  <option value="Hungary">Hungary</option>
  <option value="Iceland">Iceland</option>
  <option value="India">India</option>
  <option value="Indonesia">Indonesia</option>
  <option value="Iran">Iran</option>
  <option value="Iraq">Iraq</option>
  <option value="Ireland">Ireland</option>
  <option value="Isle of Man">Isle of Man</option>
  <option value="Israel">Israel</option>
  <option value="Italy">Italy</option>
  <option value="Jamaica">Jamaica</option>
  <option value="Japan">Japan</option>
  <option value="Jersey">Jersey</option>
  <option value="Jordan">Jordan</option>
  <option value="Kazakhstan">Kazakhstan</option>
  <option value="Kenya">Kenya</option>
  <option value="Kiribati">Kiribati</option>
  <option value="Kuwait">Kuwait</option>
  <option value="Kyrgyzstan">Kyrgyzstan</option>
  <option value="Laos">Laos</option>
  <option value="Latvia">Latvia</option>
  <option value="Lebanon">Lebanon</option>
  <option value="Lesotho">Lesotho</option>
  <option value="Liberia">Liberia</option>
  <option value="Libya">Libya</option>
  <option value="Liechtenstein">Liechtenstein</option>
  <option value="Lithuania">Lithuania</option>
  <option value="Luxembourg">Luxembourg</option>
  <option value="Macao">Macao</option>
  <option value="Madagascar">Madagascar</option>
  <option value="Malawi">Malawi</option>
  <option value="Malaysia">Malaysia</option>
  <option value="Maldives">Maldives</option>
  <option value="Mali">Mali</option>
  <option value="Malta">Malta</option>
  <option value="Marshall Islands">Marshall Islands</option>
  <option value="Martinique">Martinique</option>
  <option value="Mauritania">Mauritania</option>
  <option value="Mauritius">Mauritius</option>
  <option value="Mayotte">Mayotte</option>
  <option value="Mexico">Mexico</option>
  <option value="Micronesia (Federated States of)">Micronesia (Federated States of)</option>
  <option value="Moldova">Moldova</option>
  <option value="Tunisia">Tunisia</option>
  <option value="Türkiye">Türkiye</option>
    <option value="Turkmenistan">Turkmenistan</option>
  <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
  <option value="Tuvalu">Tuvalu</option>
  <option value="Uganda">Uganda</option>
  <option value="Ukraine">Ukraine</option>
  <option value="United Arab Emirates">United Arab Emirates</option>
  <option value="United Kingdom">United Kingdom</option>
  <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
  <option value="United States of America">United States of America</option>
  <option value="Uruguay">Uruguay</option>
  <option value="Uzbekistan">Uzbekistan</option>
  <option value="Vanuatu">Vanuatu</option>
  <option value="Venezuela">Venezuela</option>
  <option value="Vietnam">Vietnam</option>
  <option value="Virgin Islands (British)">Virgin Islands (British)</option>
  <option value="Virgin Islands (U.S.)">Virgin Islands (U.S.)</option>
  <option value="Wallis and Futuna">Wallis and Futuna</option>
  <option value="Western Sahara">Western Sahara</option>
  <option value="Yemen">Yemen</option>
  <option value="Zambia">Zambia</option>
  <option value="Zimbabwe">Zimbabwe</option>
              </select>
            </div>
          </div>
          <div id="errorMessage" style="color: red; display: none;"></div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-outline-primary">Ajouter</button>
            <button id="fermert" type="button" class="btn btn-outline-secondary" data-dismiss="modal">Fermer</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>