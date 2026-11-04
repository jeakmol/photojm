# photojm

## Choisir une couverture

Chaque album peut définir directement une image dans son `index.md` :

```yaml
cover: 'nom-exact-de-la-photo.JPG'
```

Le marquage existant `resources.params.cover: true` reste reconnu. Sans choix explicite, l’accueil sélectionne la première photo horizontale (orientation EXIF prise en compte), puis la première photo disponible si l’album ne contient que des portraits. Les couvertures s’affichent au format 3:2 ; les images de la galerie conservent leurs proportions.

## Options de présentation P0

Dans `hugo.toml`, `params.showDescriptions`, `showCounts` et `showIntro` commandent les textes facultatifs. `enableDownload` permet de télécharger uniquement la version web et `enableAnimations` contrôle la transition PhotoSwipe.

`params.gallery.boxSpacing` et `mobileSpacing` définissent les espacements desktop/mobile. La galerie utilise une disposition masonry de deux à quatre colonnes, avec certaines images horizontales sur deux colonnes. Les proportions sont conservées. `showCaptions` active les titres disponibles ; aucun nom technique n'est utilisé comme légende.

Les couvertures se choisissent avec `resources.params.cover` dans chaque album. Les originaux et les URL des albums sont conservés.

Site personnel de photographie, construit avec [Hugo](https://gohugo.io/) et le thème [Gallery](https://github.com/nicokaiser/hugo-theme-gallery).

## Développement local

Prérequis : Hugo Extended `0.169.0` (version du workflow).

```sh
hugo server --buildDrafts --buildFuture
```

Le site est disponible à l’adresse indiquée par Hugo, généralement `http://localhost:1313/photojm/`.

## Production

Le déploiement est réalisé automatiquement sur GitHub Pages à chaque push sur `main` via [`.github/workflows/hugo.yaml`](.github/workflows/hugo.yaml).

```sh
hugo --gc --cleanDestinationDir --minify --baseURL 'https://jeakmol.github.io/photojm/'
```

Le dossier `public/` est généré à la compilation et n’est pas versionné.

## Organisation

- `content/` : albums et photos source ;
- `assets/` : personnalisations du thème traitées par Hugo Pipes ;
- `layouts/` : surcharges minimales des templates du thème ;
- `themes/gallery/` : thème vendored, conservé pour des builds reproductibles ;
- `.github/workflows/` : build et déploiement GitHub Pages.

Les métadonnées GPS sont désactivées dans la configuration d’imagerie Hugo.

## Design retenu — évolutions validées

La note initiale ci-dessous est conservée comme référence historique. Les décisions suivantes, validées pendant les itérations, remplacent ses propositions d’accueil et de galerie :

- en-tête commun : photojm et sous-titre à côté, puis empilés sur mobile ;
- accueil : un aperçu par série, composé de la couverture choisie et de deux photos horizontales non recadrées ; alternance gauche/droite sur desktop ;
- albums : grille masonry à deux, trois ou quatre colonnes, avec des images de tailles différentes et proportions intégralement conservées ;
- couvertures choisies : Ironwoman 1, Lisbonne 4, Riga 15 ;
- PhotoSwipe conservé : navigation, zoom, compteur, hash et téléchargement de la version web ;
- palette claire et police système ; aucun CDN ni bibliothèque supplémentaire ;
- ne pas publier les originaux, ne pas modifier les photographies ni les URL existantes.

Les options ultérieures (mode sombre, filtres, carte et journal) restent hors périmètre.

## Note de design initiale

# PhotoJM — Spécifications de refonte design

Version 1.0 — 4 novembre 2026

Site : https://jeakmol.github.io/photojm/

## 1. Objectif

Faire évoluer le portfolio Hugo vers une **galerie photographique éditoriale, minimaliste et contemporaine**, adaptée aux paysages, à la nature et aux voyages, mais suffisamment neutre pour accueillir d'autres sujets.

Références d'intention :

- https://jonathanknight.net/ — collections sobres, photographies au premier plan.
- https://bartoszfink.com/portfolio — univers naturel et séparation portfolio/journal.
- https://philippelverfeld.com/ — narration par séries photographiques.

S'inspirer des principes, sans copier les sites à l'identique.

## 2. État observé sur le site publié

- Accueil : trois albums visibles, Ironwoman (11 photos), Lisbonne 2026 (9 photos), Riga 2019 (16 photos).
- Cartes de couvertures de tailles identiques, avec titre et compteur.
- Titres centrés, grands et gras ; fond blanc ; présentation très sobre.
- Galerie Lisbonne : grille dense à proportions variables et faibles espacements.
- Visionneuse déjà présente avec compteur, zoom, navigation précédente/suivante et téléchargement.

Ce constat concerne le **site publié**, pas le code source. Codex doit inspecter le dépôt avant de choisir les fichiers ou bibliothèques.

## 3. Principes de conception

1. La photographie prime sur l'interface.
2. Espace généreux, typographie discrète et hiérarchie claire.
3. Aucun filtre colorimétrique ou recadrage arbitraire des images de galerie.
4. Animations rares, courtes et fonctionnelles.
5. Maintenance simple et expérience accessible sur mobile.

## 4. Exigences prioritaires — P0

### 4.1 Identité graphique

Définir des tokens CSS centralisés, avec valeurs initiales proposées :

| Token | Valeur |
| --- | --- |
| Fond principal | `#F8F7F4` |
| Fond secondaire | `#EAE7E1` |
| Texte principal | `#17191A` |
| Texte secondaire | `#666A67` |
| Accent discret | `#66776C` |

- Police sans-serif sobre : système, Inter ou Manrope ; éviter une dépendance inutile.
- Graisses 400 à 600 en priorité.
- Titres : environ 40–56 px pour l'accueil et 36–48 px pour un album sur grand écran, avec `clamp()` pour les petits écrans.
- Texte courant : 15–17 px ; métadonnées : 12–14 px.
- Échelle d'espacement : 4, 8, 12, 16, 24, 32, 48, 64, 96 px.
- Aucun dégradé, ombre de carte ni effet décoratif gratuit.

### 4.2 En-tête et navigation

- Nom `photojm` à gauche ; navigation légère à droite uniquement pour les rubriques réellement présentes.
- En-tête desktop de l'ordre de 76–88 px, sans ombre.
- Liens de retour explicites (`← Albums`) et utilisables au clavier, plutôt qu'une flèche seule sans libellé accessible.
- Ne pas inventer de liens, de biographie ou de nouvelles rubriques sans contenu.

### 4.3 Page d'accueil

- Introduction alignée à gauche, moins imposante que le titre actuel.
- Titre `photojm` et sous-titre facultatif, par exemple « Photographies, lieux et instants. » ; sous-titre désactivable.
- Présenter les albums sous forme de grille éditoriale : deux colonnes sur desktop, une sur mobile.
- Option de mise en avant du premier album sur toute la largeur ; ne pas imposer cette option.
- Chaque carte : image de couverture, titre, description facultative, compteur facultatif.
- Texte sous les images ; carte entière cliquable, sans superposition opaque.
- Espace entre cartes de 32–56 px sur desktop ; marges extérieures généreuses.
- Angles droits ou rayon maximal de 3 px ; pas d'ombre.
- Effet hover discret (luminosité/contraste, 200–300 ms) sans zoom agressif.
- Couverture explicitement configurable par album ; fallback déterministe en l'absence de choix.
- Gérer correctement 1, 2, 3 ou de nombreux albums sans trou ni déséquilibre majeur.

### 4.4 Page d'album

- Titre à gauche, moins gras, accompagné de description et compteur facultatifs.
- Lien clair vers les albums ; conserver l'URL existante.
- Largeur maximale indicative de la galerie : 1 500 px.
- **Mode prioritaire : grille justified**, en rangées de hauteur visuelle homogène et largeur variable selon les ratios, sans découper les photographies.
- Espacement de 16–24 px sur desktop et 8–12 px sur mobile, ajustable par token.
- Respecter paysage, portrait et panoramique ; ne pas déformer ni recadrer les images affichées dans la galerie.
- Prévoir légendes facultatives (titre, lieu, date si disponibles) ; ne jamais afficher les noms de fichiers techniques comme légendes par défaut.
- Si la grille justified exige une dépendance lourde, proposer une alternative légère et justifier le compromis.

### 4.5 Visionneuse

Conserver la visionneuse existante si elle est fonctionnelle et accessible. Vérifier :

- Précédent/suivant, zoom, fermeture, compteur et téléchargement existants.
- Flèches du clavier, Échap, focus visible et rendu du focus au déclencheur à la fermeture.
- Utilisation tactile et contrôles suffisamment grands sur mobile.
- Image agrandie sans déformation, fond sombre neutre, contrôles discrets.
- Conservation des liens directs/hash existants si possible.
- Pas de régression des fonctionnalités actuelles.

### 4.6 Responsive

Valider au minimum à 375, 768, 1280 et 1920 px :

- Aucun débordement horizontal.
- Une seule colonne d'albums sur smartphone.
- Photos suffisamment grandes et navigation utilisable à une main.
- Espacements et tailles de police fluides.
- Photographies verticales, horizontales et panoramiques testées.

### 4.7 Performance et accessibilité

- Exploiter le traitement d'images Hugo lorsque les ressources sont compatibles.
- Générer des images adaptées à l'affichage avec `srcset` et `sizes`, dimensions déclarées et lazy loading hors écran.
- Prioriser uniquement la ou les images initialement visibles ; ne pas servir des originaux pleine résolution pour les vignettes.
- Textes alternatifs pertinents lorsque disponibles, titres HTML hiérarchisés, navigation clavier, focus visible et contrastes suffisants.
- Respecter `prefers-reduced-motion` ; transitions typiques de 150–300 ms.
- Éviter parallaxe, curseur personnalisé, bibliothèque JS lourde et effets de scroll inutiles.

### 4.8 Intégration Hugo / GitHub Pages

- Inspecter la version Hugo, le thème, `hugo.toml`/config, `layouts/`, `assets/`, les bundles et la configuration de déploiement avant modification.
- Préserver tous les albums, photos, métadonnées et URL publiques.
- Utiliser des layouts/partials réutilisables et des surcharges du thème si possible.
- Centraliser les options : affichage des compteurs, descriptions, mode de grille, couverture, mise en avant, espacements, animations.
- Assurer le fonctionnement sous le sous-chemin `/photojm/` : ne pas coder les chemins d'assets ou liens internes en dur depuis `/`.
- Conserver le générateur statique et la chaîne GitHub Pages.

## 5. Options ultérieures — P2 (hors première implémentation)

- Mode sombre.
- Grille éditoriale asymétrique alternative à la grille justified.
- Filtres par destination ou thème.
- Album suivant en bas de galerie.
- Carte de localisation ou journal de voyage.

## 6. Phasage

1. **Diagnostic** : architecture, dépendances, chemins GitHub Pages, visionneuse, images.
2. **Fondations** : variables graphiques, typographie, en-tête, navigation.
3. **Accueil** : grille éditoriale et cartes d'albums.
4. **Galeries** : mise en page justified, entêtes, légendes facultatives, visionneuse.
5. **Validation** : build, responsive, accessibilité, performance, non-régression.

## 7. Critères d'acceptation

- Les trois albums visibles et leurs 36 photos restent accessibles, sans disparition ni modification des fichiers originaux.
- Les URL des albums restent stables et les liens fonctionnent sous `/photojm/`.
- Les photographies ne sont ni étirées ni recadrées arbitrairement dans les galeries.
- L'accueil possède une hiérarchie éditoriale claire, avec cartes élégantes et responsives.
- Les galeries sont plus aérées, sans trous gênants ni débordement.
- La visionneuse conserve ses contrôles et fonctionne au clavier comme au tactile.
- Les tests 375/768/1280/1920 px ne révèlent pas de problème bloquant.
- Compilation Hugo et génération des assets sans erreur ; publication GitHub Pages vérifiée en prévisualisation avec `baseURL` adéquate.
- Aucun contenu factuel inventé ; aucune suppression de photo, changement d'URL ou déploiement non demandé.

## 8. Livrables attendus de Codex

- Diagnostic bref et liste des fichiers envisagés **avant** toute implémentation.
- Validation humaine de ce plan avant changement.
- Code documenté uniquement lorsque nécessaire ; changements faciles à relire.
- Rapport des fichiers modifiés, tests effectués, limites éventuelles et captures avant/après si possible.
- Aucun commit, push ou déploiement sans demande explicite.
