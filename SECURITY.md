# Sécurité

## Signalement

Pour signaler une vulnérabilité, ouvrez un avis privé via la fonction **Report a vulnerability** de l’onglet **Security** du dépôt GitHub.

Ne publiez pas de mot de passe, de clé API, de donnée personnelle ou de photo confidentielle dans une issue publique.

## Mesures appliquées

- aucun secret ou fichier `.env` n’est versionné ;
- les sorties Hugo (`public/`, `resources/_gen/`) sont ignorées ;
- les coordonnées GPS EXIF sont supprimées des transformations d’image ;
- les shortcodes inline et le HTML Goldmark non sûr sont désactivés ;
- le workflow GitHub Pages utilise des permissions minimales et ne déploie que depuis `main` ;
- les dépendances externes côté navigateur sont évitées.
