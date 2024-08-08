<?php

// URL de l'API
$apiUrl = "http://applis.matmut.fr/DevisMRSQInternet/devis.mcp/";

// Genres
$genres = array('Voiture' => '5');

// Options
$options = array();

foreach ($genres as $genre => $codeGenre) {
  // Obtenir les marques
  $brands = json_decode(file_get_contents($apiUrl . "GetListeMarques?genreVehicule=$codeGenre"), true);

  // Options de modèle
  $modelOptions = "";
  foreach ($brands as $brand) {
    // Obtenir les modèles
    $urlModel = "GetListeModeles?anneeDebut=&anneeFin=" . date('Y') . "&genreVehicule=$codeGenre&marque=" . urlencode($brand['Text']);
    $models = json_decode(file_get_contents($apiUrl . $urlModel), true);

    // Ajouter les modèles aux options
    $modelOptions .= '<option value="' . $model['Text'] . '">' . $model['Text'] . '</option>';
  }

  // Ajouter les options au tableau
  $options[$genre] = $modelOptions;
}

// Obtenir l'identifiant du formulaire Contact Form 7
// $formId = get_option('contact_form_7_default_form');

$formId = get_form_id('vendre');

// Mettre à jour les champs du formulaire
foreach ($options as $genre => $modelOptions) {
  update_field('marques', $genre, $formId);
  update_field('modeles', $modelOptions, $formId);
}

?>
