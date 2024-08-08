# Kani BOUEBASSIHOU 

# 📦 Projet WordPress avec Docker et ACF

Ce projet est un environnement WordPress développé avec Docker, incluant des configurations spécifiques pour gérer la personnalisation de thème et la création de blocs gutenberg avec les fichiers JSON d'Advanced Custom Fields (ACF). Ce guide vous aidera à configurer, développer et déployer le projet.

## 🛠️ Prérequis

- Docker et Docker Compose installés sur votre machine.
- Un accès au dépôt Git du projet.
- Accès à l'interface d'administration de cPanel pour le déploiement.

## 🚀 Installation et Configuration

### 1. Cloner le dépôt

```bash
git clone https://github.com/kaniBoueb/faf-cicd.git
cd ton-projet
```

### 2. Configurer l'environnement avec Docker

Le projet utilise Docker pour créer un environnement local de développement. Voici comment le configurer :

1. Créer un fichier `docker-compose.yml` 
2. Démarrer les services Docker :

    ```bash
    docker-compose up -d
    ```

3. Accéder à WordPress :
   - Frontend : [http://localhost:8000](http://localhost:8000)
   - phpMyAdmin : [http://localhost:8080](http://localhost:8080)

### 3. Configurer ACF JSON

Pour que les configurations des champs ACF soient sauvegardées et chargées via des fichiers JSON :

1. Ajouter le code suivant dans `functions.php` de votre thème :

    ```php
    add_filter('acf/settings/save_json', 'my_acf_json_save_point');
    add_filter('acf/settings/load_json', 'my_acf_json_load_point');

    function my_acf_json_save_point( $path ) {
        $path = get_stylesheet_directory() . '/acf-json';
        return $path;
    }

    function my_acf_json_load_point( $paths ) {
        unset($paths[0]);
        $paths[] = get_stylesheet_directory() . '/acf-json';
        return $paths;
    }
    ```

2. Synchroniser les fichiers JSON :
   - Les fichiers JSON seront automatiquement générés et sauvegardés dans le dossier `acf-json` après chaque modification des champs ACF.

### 4. Déploiement sur le serveur cPanel

Pour déployer le projet sur un serveur via FTP :

1. Configurer le workflow GitHub Actions pour déployer uniquement `wp-content` :

2. Pousser vos modifications :
   - Les modifications du dossier `wp-content` seront synchronisées sans supprimer les fichiers existants sur le serveur.

### 5. Gestion des pages administratives avec ACF

#### Créer un menu d'administration "Infos & Détails du site"

### 6. Conclusion

Ce projet est maintenant configuré pour un développement fluide avec Docker, des créations faciles de blocks gutenberg et de personnalisation de thème grâce aux champs ACF via JSON, et des déploiements automatisés. Bonne continuation !

## 📝 Notes

- Accès MySQL root : Par défaut, le mot de passe root de MySQL est défini dans le fichier `docker-compose.yml`. Il peut être modifié selon vos besoins.
- Erreurs fréquentes : Si vous rencontrez des erreurs MySQL (comme des tables manquantes), assurez-vous de bien suivre le processus d'initialisation.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une pull request ou à soumettre un problème pour toute question ou amélioration.

--- 