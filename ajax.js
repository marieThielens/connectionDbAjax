// ma fonction pour injecter l'html
function injectHtml(location, tache){ // les paramètres définissent 2 variables. Une pour le lieu où elle sera injectée. la tache représente un élément de ma bd
  // location représente dans un cas content.(ligne 34) Ici on défini juste la fonction.
  document.getElementById(location).innerHTML += '<div id="'+tache["id_post"]+'">' + tache['title_post'] + tache['content_post']  +  '<button type="submit" name="delete" value="'+tache['id_post']+'">DELETE</button></div>';
  // cibler mon bouton
  document.getElementById(tache['id_post']).querySelector('button').addEventListener('click', function () {
    // appel de la fonction et il prend l'id de l'element en paramètre
    deleteFunction(tache['id_post']);
  });
}

function montreToutFonction(){
  // 1) Préparer le requête et instancier un objet XHR
  var ajax = new XMLHttpRequest();
  // La préparation de la requete se fait par la méthode open()
  // 1e paramètre: méthode d'envoi (post)
  // 2eme paramètre: l'url ou le chemin vers votre dossier qui recoit la requete
  // true : la requete est asynchrone. synchrone = tant que la réponse n'est pas obtenue
  // le script est bloqué. Asynchrone= laisse continuer l'execution de notre script
  ajax.open('POST', 'core/request.php', true);

  /*préciser qu'il s'agit de données provenant d'un formulaire (même si, à la base, ce n'est pas le cas)*/
  ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  /* il nous faut spécifier une fonction de callback afin de savoir quand la requête s'est terminée.
  Pour cela, l'objet XHR possède un événement nommé readystatechange */
  ajax.addEventListener('readystatechange', function() {

    if (ajax.readyState === 4  && ajax.status === 200 /*0 en local*/) {// Si le fichier est chargé sans erreur
      // this.responseText. Quand on utilise de l'ajax, c'est comme ça que tu récupère ce que php t'envoie
      var recoitBD = JSON.parse(this.responseText);// dans recoit bd je recoit un tableau

      // comme recoitBd est un tableau il faut faire une boucle
      for (var i = 0; i < recoitBD.length; i++) {
        // injection de mon contenu. recoitBD[i][colonneDb] i= chaque index de mon tableau
        // + et pas des point car js et non php
        // document.getElementById("content").innerHTML += '<div>' + recoitBD[i]['title_post'] + recoitBD[i]['content_post']  +  '<button type="submit" name="delete" value="'+recoitBD[i]['id_post']+'">DELETE</button></div>';
        injectHtml("content", recoitBD[i]); // injectHtml=fonction, content= la location(lieu où ça va apparaitre), recoitBD c'est la tache
      }
    }
  });

  // envoie de la méhode send() prend en paramètre un argument obligatoire
  ajax.send("montreTout");
}




function deleteFunction(idElementAeffacer){

  // 1) Préparer le requête et instancier un objet XHR
  var ajaxDelete = new XMLHttpRequest();
  // La préparation de la requete se fait par la méthode open()
  // 1e paramètre: méthode d'envoi (post)
  // 2eme paramètre: l'url ou le chemin vers votre dossier qui recoit la requete
  // true : la requete est asynchrone. synchrone = tant que la réponse n'est pas obtenue
  // le script est bloqué. Asynchrone= laisse continuer l'execution de notre script
  ajaxDelete.open('POST', 'core/request.php', true);

  /*préciser qu'il s'agit de données provenant d'un formulaire (même si, à la base, ce n'est pas le cas)*/
  ajaxDelete.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  /* il nous faut spécifier une fonction de callback afin de savoir quand la requête s'est terminée.
  Pour cela, l'objet XHR possède un événement nommé readystatechange */
  ajaxDelete.addEventListener('readystatechange', function() {

    if (ajaxDelete.readyState === 4  && ajaxDelete.status === 200 /*0 en local*/) {// Si le fichier est chargé sans erreur
      // this.responseText. Quand on utilise de l'ajaxDelete, c'est comme ça que tu récupère ce que php t'envoie
      var deleteBD = this.responseText;// dans recoit bd je recoit un id
// je cree l'element
      var elementAEffacer = document.getElementById(deleteBD);
      console.log(elementAEffacer);

      // Je demande à son papa de l'effacer
      document.getElementById("content").removeChild(elementAEffacer);
    }
  });

  // envoie de la méhode send() prend en paramètre un argument obligatoire.  delete se transforme en $_POST["delete"] et possede la valeur de l id de l'element effacé
  ajaxDelete.send("delete=" + idElementAeffacer);

}

montreToutFonction();
