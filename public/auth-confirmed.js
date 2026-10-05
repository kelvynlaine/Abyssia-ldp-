// Supabase ajoute parfois ?error=... ou #error=... si le lien est invalide
// ou expiré. On affiche alors un message clair plutôt qu'une page "OK".
(function () {
  var params = new URLSearchParams(window.location.search);
  var hash = new URLSearchParams((window.location.hash || '').replace(/^#/, ''));
  var error = params.get('error') || hash.get('error') ||
    params.get('error_description') || hash.get('error_description');

  if (error) {
    var card = document.getElementById('card');
    var title = document.getElementById('title');
    var message = document.getElementById('message');
    card.classList.add('error');
    title.textContent = 'Lien invalide ou expiré';
    message.innerHTML =
      "Ce lien de confirmation n'est plus valide. Ouvrez l'application " +
      "<strong>Abyss IA</strong> et demandez un nouvel email de confirmation.";
  }
})();
