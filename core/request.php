<?php

include 'connect.php';

if(isset($_POST['montreTout'])){
  $reponse = $bdd->prepare('SELECT * FROM post');
  $reponse->execute();

  //  je boucle les réponses
  $donnees = $reponse->fetchAll();
  // envoi des réponses qui sera recupéré par js (a cause du ajax.send montre tout)
  echo json_encode($donnees); // Je le transforme en Json(texte) car php ne recoit et n'envoie que du texte

}




// DELETE...........................................
if(isset($_POST['delete'])){ // la valeur de mon ajax.send
echo 'iuiuy';

  $delete = $bdd->prepare("DELETE FROM post WHERE id_post = :idrecu");//
  $delete->bindParam(":idrecu", $_POST['delete'], PDO::PARAM_INT); // PARAM_INT = un entier(sans virgule)
  $delete->execute();

  echo $_POST['delete'];
}

// INSERT....................................
if(isset($_POST['ajout'])){ // ajout = name du bouton
  $title_post = $_POST['title_post'];
  $content_post = $_POST['content_post'];

  $insert = $bdd->prepare('INSERT INTO post (title_post, content_post) VALUES (:title_post, :content_post )');
  $insert->bindParam(":title_post", $title_post, PDO::PARAM_STR);
  $insert->bindParam(":content_post", $content_post, PDO::PARAM_STR);
  $insert->execute();

   header('Location:../index.php');
}


// $reponse->closeCursor(); // Termine le traitement de la requête

 ?>
