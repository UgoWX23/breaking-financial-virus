# Guide du site (pour l'équipe)

Ce fichier n'apparaît pas sur le site (il est exclu dans `_config.yml`).

## Installer cette version (v6)

1. À la racine du repo, supprimer les fichiers qui ne servent plus :

       rm -f index.md origine.md contagion.md sectors.md regions.md regions.html methodes.md equipe.md secteur.md secteurs.md contexte.md navigation_snippet.yml assets/css/style.css _includes/rail.html _includes/ticker.html _includes/subnav.html

2. Copier tout le contenu du zip à la racine du repo, en écrasant.
3. Relancer `bundle exec jekyll serve` (après l'`export PATH` vers Ruby 3.3).

## Comment le site est construit

Le texte de chaque partie est écrit **une seule fois**, dans `_includes/story/` :
`context.html`, `intro.html`, `crises.html` (RQ1), `contagion.html` (RQ2), `sectors.html` (RQ3, secteurs puis régions), `conclusion.html`.

- La page **Home** (`index.html`) les appelle toutes, l'une après l'autre : c'est toute la data story d'un bloc.
- Chaque **onglet** (`crises.html`, `contagion.html`…) n'en appelle qu'une : on lit une seule partie.

Pour modifier un texte, on modifie donc le fichier de `_includes/story/`, et la Home comme la page de la partie changent ensemble.

| Fichier | Rôle |
|---|---|
| `_data/chapters.yml` | Les parties : nom de l'onglet, titre, chapeau, question, sous-parties (menu au survol et sommaire), bandeau BREAKING, phrase « Up next » |
| `_data/context.yml` | Les dates de la frise du contexte, avec texte, image et crédit |
| `_data/figures.yml` | Inventaire des 52 figures : question, priorité, effort, **qui**, statut, fichier |
| `_data/sectors.yml` | Les 11 couleurs des secteurs (une seule source pour tout le site et le notebook) |
| `_data/methods.yml` | Une fiche par méthode ; les boutons « Method » des sections y renvoient |
| `_data/ads.yml` | Les fausses pubs ADA |
| `_data/ticker.yml` | Le bandeau des cours avec mini-courbes (valeurs factices, à générer depuis le notebook) |
| `_data/annex.yml` | Les pages de l'onglet « More » |
| `_layouts/home.html`, `_layouts/default.html` | Mise en page de la Home et des pages de partie |

**Ajouter une sous-partie** : l'ajouter dans `_includes/story/<partie>.html` (avec `section.html`) **et** dans `sections:` de la partie dans `_data/chapters.yml`, avec le même `id`. Les `id` doivent être uniques sur tout le site, car la Home contient toutes les parties.

## Brancher une figure

1. Dans le notebook :

       fig.write_html("assets/figures/F1_1b.html", include_plotlyjs="cdn", full_html=True)

2. Dans `_data/figures.yml`, sur la figure F1.1b : `file: assets/figures/F1_1b.html`, `status: done`, et `height: 500` si besoin.

La galerie se met à jour toute seule (compteurs, statut, filtres).

## Utiliser les mêmes couleurs dans le notebook

    import yaml
    sectors = yaml.safe_load(open("_data/sectors.yml"))
    SECTOR_COLORS = {s["name"]: s["color"] for s in sectors}
    SECTOR_ORDER = [s["name"] for s in sectors]
    # plotly : px.scatter(..., color="gics_sector", color_discrete_map=SECTOR_COLORS,
    #                     category_orders={"gics_sector": SECTOR_ORDER})

Avec 11 couleurs, deux secteurs éloignés dans la liste peuvent se ressembler.
Chaque figure doit donc aussi montrer le secteur par sa position (un axe) ou par son nom.
Ne pas changer l'ordre de la liste : il est choisi pour que deux voisins restent distincts pour les daltoniens.

## Écrire une sous-section

Chaque sous-section suit le gabarit du plan : ce qu'on mesure, la figure, ce qu'on lit, ce qui reste ouvert, puis le dépliant « Go further ».
Le texte s'écrit en Markdown dans des `capture`, puis on appelle `section.html` (dans `_includes/story/`) :

    {% capture c11_m %}
    - **Onset**: ...
    {% endcapture %}
    {% include section.html id="onset" num="1.1" title="Who falls first?"
       question="..." measure=c11_m method="onset" figs="F1.1a,F1.1b"
       read=c11_r limit=c11_l deeper=c11_d deeper_figs="F1.1c" %}

- `figs` : une figure, ou plusieurs séparées par des virgules (elles s'affichent en onglets).
- `method` : identifiant(s) de `_data/methods.yml` : bouton « Method » qui ouvre la fiche dans un nouvel onglet.
- `wide="yes"` : figure en pleine largeur.
- Donner un nom unique à chaque `capture` (c11_m, c12_m…), sinon le texte d'une section peut réapparaître dans la suivante.

Quand un résultat arrive : remplacer le texte « *Expected...* » de `read` par la vraie lecture et changer `read_label`.


## Générer le bandeau des cours depuis le notebook

Chaque entrée : un nom, le niveau au creux (base 100 au pic), la variation pic-creux, et la courbe.

    import yaml
    rows = []
    for name, idx in sector_indices.items():   # idx : série pandas de l'indice équipondéré, fenêtre Covid
        base = idx / idx.iloc[0] * 100
        rows.append({"name": name, "value": round(float(base.iloc[-1]), 1),
                     "change": round(float(base.iloc[-1] - 100), 1),
                     "spark": [round(float(v), 1) for v in base]})
    yaml.safe_dump(rows, open("_data/ticker.yml", "w"), sort_keys=False, allow_unicode=True)

Les badges des titres de l'accueil (`{% include tk.html name="Energy" label="ENERGY" %}`) lisent ce même fichier :
garder les mêmes noms, ou adapter `index.html`.

## Les pubs ADA

Elles sont toutes dans `_data/ads.yml`. Elles apparaissent à trois endroits :
la bannière sous le bandeau des cours (toutes les pages), la colonne de droite des chapitres,
et les « Commercial break » dans les pages (`{% include ad.html n="3" %}` = la 4e pub ; sans `n`, elle tourne).
