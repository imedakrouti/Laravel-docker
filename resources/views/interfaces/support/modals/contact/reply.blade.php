<div id="replyModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="replyModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal header -->
        <div class="modal-header">
          <h5 class="modal-title" id="replyModalLabel">Formulaire de réponse</h5>

        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <form id="replyForm">
            <div class="form-group">
              <label for="replyMessage">Message :</label>
              <textarea class="form-control" id="replyMessage" rows="3" placeholder="Entrez votre message de réponse"></textarea>
              <div id="replyMessageError" class="invalid-feedback">Veuillez entrer un message de réponse.</div>
            </div>



        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="submit" class="btn btn-outline-primary" id="sendReplyBtn">Envoyer</button>
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal" id="cancelReplyBtn">Fermer</button>
          </form>
        </div>
      </div>
    </div>
  </div>