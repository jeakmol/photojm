# photojm

Site personnel de photographie, construit avec [Hugo](https://gohugo.io/) et le thème [Gallery](https://github.com/nicokaiser/hugo-theme-gallery).

## Développement local

Prérequis : Hugo Extended `>= 0.168.0`.

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
