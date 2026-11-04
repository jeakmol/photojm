# photojm

Galerie photo construite avec Hugo. Pour ajouter des photos ou modifier un album, il suffit de manipuler des dossiers et un petit fichier texte : aucune modification de HTML, CSS ou JavaScript n’est nécessaire.

## Guide débutant : comprendre le fonctionnement

- **Hugo** transforme les photos et les textes en pages web.
- **Le dépôt** est le dossier du projet suivi par Git.
- **Git** conserve un historique des modifications.
- **GitHub** héberge cet historique et le partage en ligne.
- **Une branche** permet de préparer une version sans modifier immédiatement le site publié.
- **Un commit** enregistre un ensemble de modifications dans l’historique local.
- **Push** envoie ces commits sur GitHub.
- **GitHub Pages** publie le site lorsque les changements arrivent sur la branche `main`.

Le dossier `content/` est l’espace de travail du photographe. Les dossiers `layouts/`, `assets/`, `themes/` et `.github/` concernent le développement du site : vous n’avez pas besoin de les modifier pour gérer vos albums.

## Installer et ouvrir les outils

Ce guide utilise Windows 10 ou 11 :

1. Installez [GitHub Desktop](https://desktop.github.com/) pour gérer les versions avec des boutons.
2. Installez un éditeur de texte, par exemple [Visual Studio Code](https://code.visualstudio.com/). N’utilisez pas Word ou Pages pour les fichiers du site.
3. Ouvrez **PowerShell** depuis le menu Démarrer et installez Hugo Extended avec la commande ci-dessous, issue de [la documentation officielle Windows](https://gohugo.io/installation/windows/).
4. Vérifiez avec `hugo version` : la ligne doit contenir `extended`. Le projet utilise Hugo 0.169.0 en production ; une autre version peut afficher des différences ou des avertissements.

```powershell
winget install -e --id Hugo.Hugo.Extended
```

Après l’installation, fermez puis rouvrez PowerShell et Visual Studio Code avant de saisir `hugo version`. Si `winget` n’est pas reconnu, consultez la méthode d’installation manuelle dans la documentation Windows ci-dessus.

Pour récupérer le projet, ouvrez GitHub Desktop puis **File → Clone repository → URL**. Entrez `https://github.com/jeakmol/photojm.git`, choisissez un dossier local et cliquez sur **Clone**. Si le projet est déjà sur votre ordinateur, utilisez **File → Add local repository** pour sélectionner ce dossier, sans le cloner une seconde fois.

Dans GitHub Desktop, **Repository → Open in Visual Studio Code** ouvre les fichiers. Dans Visual Studio Code, **Terminal → New Terminal** ouvre un terminal dans le dossier du projet ; choisissez PowerShell si plusieurs profils sont disponibles.

Dans l’Explorateur de fichiers Windows, activez **Affichage → Afficher → Extensions de noms de fichiers** (Windows 11), ou cochez **Extensions de noms de fichiers** dans l’onglet Affichage (Windows 10). Cela évite de créer accidentellement `index.md.txt` au lieu de `index.md`.

Avant de commencer, choisissez la branche de travail dans **Current Branch**. La refonte est sur `agent/photojm-gallery-refactor`. Cliquez sur **Fetch origin**, puis **Pull origin** si proposé, avant vos modifications. Si vos changements locaux empêchent la mise à jour, conservez-les et demandez de l’aide plutôt que de les supprimer.

## Voir le site sur son ordinateur

Dans le terminal ouvert à la racine du projet :

```sh
hugo server --buildDrafts --buildFuture
```

Ouvrez [http://localhost:1313/photojm/](http://localhost:1313/photojm/) dans le navigateur. Gardez le terminal ouvert : Hugo met la page à jour lorsque vous enregistrez les fichiers. Ce serveur est une prévisualisation locale ; il ne publie rien.

Pour arrêter : cliquez dans le terminal et appuyez sur **Ctrl+C**. Si le port 1313 est déjà utilisé, fermez l’ancien serveur ou lancez `hugo server --port 1314 --buildDrafts --buildFuture`, puis ouvrez l’adresse affichée par Hugo.

Pour entrer manuellement dans le projet avec PowerShell, adaptez cet exemple au dossier choisi lors du clonage :

```sh
cd "C:\Users\VotreNom\Documents\GitHub\photojm"
```

Les guillemets permettent d’utiliser un chemin contenant des espaces. Le dossier courant doit contenir `hugo.toml`. Vous pouvez aussi ouvrir directement le dossier dans Visual Studio Code et utiliser son terminal intégré.

## Ajouter un album, pas à pas

### 1. Préparer les photos

Exportez des copies JPEG depuis votre logiciel photo. Gardez vos RAW et vos fichiers maîtres dans votre photothèque. Une largeur de l’ordre de 2 000 à 3 000 pixels est suffisante pour commencer ; vérifiez la netteté et le poids avant d’ajouter de gros volumes.

Choisissez des noms simples, par exemple `001-plage.jpg`, `002-port.jpg`, `003-falaise.jpg`. Les numéros à trois chiffres garantissent l’ordre souhaité. Évitez les caractères spéciaux, les noms contenant des données personnelles et les renommages de photos déjà publiées : leurs liens directs peuvent changer.

### 2. Créer le dossier

Dans `content/`, créez un dossier, par exemple `bretagne-2026`. Copiez-y les JPEG et créez un fichier nommé exactement `index.md`.

```text
content/
└── bretagne-2026/
    ├── index.md
    ├── 001-plage.jpg
    ├── 002-port.jpg
    └── 003-falaise.jpg
```

Le nom du dossier détermine l’adresse : ici `/photojm/bretagne-2026/`. Choisissez-le avec soin, puis conservez-le.

### 3. Renseigner la fiche de l’album

Copiez ce modèle dans `index.md` :

```yaml
---
title: "Bretagne 2026"
date: 2026-07-18
description: "Une sélection de photographies de la côte bretonne."
cover: "001-plage.jpg"
draft: true
---
```

Remplacez les exemples par vos informations réelles. Les lignes `---` délimitent la fiche de l’album. Conservez-les. Le format s’appelle **YAML** : respectez les espaces et évitez les tabulations.

| Champ | Rôle |
| --- | --- |
| `title` | Titre affiché, modifiable sans changer l’URL. |
| `date` | Date de la série, au format année-mois-jour. Sans poids personnalisé, les albums sont classés du plus récent au plus ancien. |
| `description` | Texte court présenté avec l’album. Vous pouvez retirer cette ligne. |
| `cover` | Nom exact d’une photo du dossier, avec extension et majuscules identiques. Préférez une photo horizontale. |
| `draft` | `true` conserve l’album en brouillon ; `false` le rend publiable. |

Enregistrez le fichier (**Ctrl+S**). L’album apparaît automatiquement dans l’aperçu local, avec le compteur et la galerie. Il faut au moins une image pour qu’il apparaisse à l’accueil.

Les deux petites photos d’aperçu sont sélectionnées automatiquement parmi les photos horizontales, hors couverture. S’il y en a moins de deux, le site en affiche seulement le nombre disponible. Il n’est pas nécessaire de créer des miniatures.

### 4. Vérifier et rendre publiable

Vérifiez l’accueil, la couverture, le nombre de photos et leur ordre. Cliquez sur une photo pour tester la visionneuse. Réduisez la largeur du navigateur pour examiner le rendu mobile.

Lorsque tout est prêt, remplacez `draft: true` par `draft: false`. Attention : le serveur lancé avec `--buildDrafts --buildFuture` affiche aussi les brouillons et dates futures ; la publication normale les exclut. Pour contrôler la version réellement publiable, arrêtez-le puis lancez `hugo server`.

## Modifier un album existant

Ouvrez le dossier de l’album dans `content/`, puis son `index.md`.

- **Modifier le titre ou la description** : changez le texte entre guillemets.
- **Changer la couverture** : ajoutez ou modifiez `cover: "nom-exact.jpg"`. Ce champ est prioritaire sur l’ancien marquage `resources.params.cover`.
- **Ajouter des photos** : copiez les nouveaux JPEG dans le même dossier ; le compteur se met à jour automatiquement.
- **Retirer une photo** : déplacez-la hors du projet. Vérifiez qu’elle n’est pas la couverture et retirez sa fiche `resources` si elle en possède une. Cette action enlève aussi son accès après publication.
- **Remplacer une photo** : utilisez le même nom si vous voulez conserver son identifiant. Vérifiez le résultat local avant publication.
- **Changer l’ordre des photos** : elles suivent par défaut l’ordre alphabétique des noms. Pour une nouvelle série, utilisez `001-`, `002-`, etc. Pour une série déjà publiée, préférez les poids décrits ci-dessous afin de conserver les noms.
- **Retirer tout un album du site publié** : mettez `draft: true`. Les photos restent dans le dépôt ; ce n’est pas une protection de confidentialité.

Ne renommez pas le dossier d’un album existant : cela changerait son adresse publique. Modifier uniquement son `title` est sans risque pour l’URL.

### Choisir l’ordre des albums

Ajoutez `weight: 10` dans la fiche d’un album, `weight: 20` dans le suivant, etc. Les poids les plus petits passent avant les plus grands. Pour un classement explicite cohérent, attribuez un poids à chaque album.

### Ajouter des descriptions de photos et un ordre personnalisé

La section `resources` reste une fiche de contenu, pas du code de mise en page. Chaque `src` doit correspondre exactement à un fichier. S’il existe déjà une section `resources`, complétez-la au lieu d’en créer une seconde.

```yaml
---
title: "Bretagne 2026"
date: 2026-07-18
description: "Photographies de la côte bretonne."
cover: "001-plage.jpg"
draft: false
sort_by: "Params.weight"
resources:
  - src: "002-port.jpg"
    title: "Bateaux dans le port au petit matin."
    params:
      weight: 10
  - src: "001-plage.jpg"
    title: "La plage à marée basse."
    params:
      weight: 20
  - src: "003-falaise.jpg"
    title: "La falaise vue depuis le sentier côtier."
    params:
      weight: 30
---
```

Avec `sort_by: "Params.weight"`, donnez un poids à toutes les photos. Les titres servent de textes alternatifs et de légendes dans la visionneuse. Décrivez ce qui est réellement visible. Le site n’affiche pas les noms techniques comme légendes.

## Enregistrer et publier avec GitHub Desktop

1. Vérifiez le site local, puis revenez dans GitHub Desktop.
2. Dans **Changes**, relisez les fichiers modifiés : pour une mise à jour d’album, vous devriez surtout voir les photos et `index.md`.
3. Écrivez un résumé clair, par exemple « Ajoute l’album Bretagne 2026 », puis cliquez sur **Commit to…**. Le commit reste d’abord sur votre ordinateur.
4. Cliquez sur **Push origin** pour envoyer votre branche sur GitHub.
5. Si vous travaillez sur une branche autre que `main`, ouvrez une **Pull Request** vers `main` : c’est une demande d’intégration. Le push de la branche refactor ne met pas le site public à jour.
6. Après validation et fusion dans `main`, ouvrez l’onglet **Actions** du dépôt GitHub et suivez **Deploy Hugo site to Pages**. Une coche verte indique la réussite du workflow.
7. Consultez [le site public](https://jeakmol.github.io/photojm/). Si vous voyez l’ancienne version, actualisez sans cache (**Ctrl+F5**, ou **Ctrl+Shift+R** selon le navigateur).

Un push direct sur `main` déclenche lui aussi la publication. Pour éviter une publication accidentelle, préparez les changements sur une branche dédiée.

## Dépannage courant

| Problème | À vérifier |
| --- | --- |
| Album absent | Dossier dans `content/`, fichier `index.md`, au moins un JPEG, `draft: false`, date non future pour la production. |
| Fichier reconnu comme texte simple | Vérifiez que le nom est `index.md`, et non `index.md.txt`, en affichant les extensions dans l’Explorateur. |
| `hugo` n’est pas reconnu | Rouvrez le terminal après l’installation ; vérifiez l’installation et le PATH avec la documentation officielle Windows. |
| Couverture incorrecte | Nom exact, extension et majuscules ; `cover` doit se trouver entre les deux lignes `---`. |
| Ordre inattendu | Noms de fichiers ou `sort_by`/poids ; la disposition masonry peut décaler les colonnes visuellement. |
| Erreur YAML | Guillemets fermés, deux-points après le champ, indentation par espaces. |
| Site local inaccessible | Terminal toujours ouvert, Hugo démarré, bonne adresse et bon port. |
| Photos absentes sur GitHub | Commit et push des fichiers image effectués, pas seulement de `index.md`. |
| Ancien design visible | Actualisation sans cache ; vérifiez aussi si vous consultez localhost ou le site public. |
| `WARN deprecated` | Avertissement connu du thème ; si le build se termine et que le serveur démarre, il ne bloque pas l’aperçu. Une ligne `ERROR` demande en revanche une correction. |

En cas d’erreur, copiez le message complet du terminal pour demander de l’aide. Ne supprimez pas les dossiers du projet au hasard.

## Confidentialité et sauvegarde

Les versions web sont générées automatiquement ; les ressources originales ne sont pas copiées sur GitHub Pages. **Les photos ajoutées au dépôt restent néanmoins visibles dans GitHub si le dépôt est public, et les fichiers supprimés peuvent rester dans l’historique Git.** N’y mettez donc aucune photographie confidentielle.

Conservez une sauvegarde indépendante de votre photothèque. Ne modifiez jamais `public/` pour mettre le site à jour : ce dossier est recréé par Hugo.

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
- fond principal blanc (#FFFFFF) et police système ; aucun CDN ni bibliothèque supplémentaire ;
- palette neutre : texte anthracite (#20252A), texte secondaire gris (#606971), surfaces gris clair (#F1F3F5), accent bleu ardoise (#375E78) pour le focus et les liens survolés ;
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
