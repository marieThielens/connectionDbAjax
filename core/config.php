<?php

function debug($var){
  echo '<pre>';
  print_r($var);
    echo '</pre>';
}
function dd($var){
  debug($var);
  die();
}


$tableau = array(
  "database" => array(
  "host" => 'localhost' ,
  "user" => 'root' ,
  "password" => '' ,
  "dbname" => 'connexion'
  )
);




 ?>
