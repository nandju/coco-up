# Coco'Up — Site vitrine premium

Site vitrine multi-pages pour **Coco'Up**, marque ivoirienne de chips de noix de coco
100% naturelles. Conçu en **HTML5, CSS3 et JavaScript Vanilla** (aucun framework),
prêt pour la production sur **Vercel**.

> Produit développé et porté par **Prime Agence de Communication**.

---

## Présentation

- Design **tropical premium** (Playfair Display + DM Sans, palette coco/vert)
- **6 pages** + page 404 personnalisée
- **Dark mode** automatique (préférence système) + bascule manuelle persistante
- Glassmorphism, animations fluides, micro-interactions
- **Lazy loading** des images, **scroll progress bar**, **bouton retour en haut**, **loader d'entrée**
- **SEO complet** : meta tags, Open Graph, Twitter Cards, Schema.org JSON-LD, canoniques
- 100% **responsive** (desktop, laptop, tablette, mobile)
- Accessibilité : labels ARIA, focus visibles, `prefers-reduced-motion`

---

## Structure des dossiers

```
/
├── index.html          # Accueil
├── about.html          # Notre Histoire (timeline, valeurs, stats)
├── products.html       # Nos Saveurs (filtres, nutrition)
├── benefits.html       # Les Bienfaits du Coco
├── contact.html        # Contact (formulaire + carte + FAQ rapide)
├── faq.html            # FAQ (accordéon + recherche)
├── 404.html            # Page d'erreur premium
│
├── assets/
│   ├── css/style.css   # Styles (thèmes, composants, responsive)
│   ├── js/script.js    # Logique (dark mode, reveal, FAQ, form...)
│   ├── images/
│   │   ├── hero/       # Visuel hero
│   │   ├── products/   # Packshots produits
│   │   ├── brand/      # Logos Coco'Up + Prime Agence
│   │   └── icons/      # (réservé)
│   └── fonts/          # (réservé pour polices auto-hébergées)
│
├── vercel.json         # Config Vercel (cleanUrls, redirections, cache, sécurité)
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## Installation locale

Le site est 100% statique : aucune dépendance à installer.

**Option 1 — Ouvrir directement**
Ouvrez `index.html` dans votre navigateur.

**Option 2 — Serveur local (recommandé pour tester les chemins absolus)**

```bash
# Python 3
python -m http.server 5173

# ou Node.js
npx serve .
```

Puis ouvrez `http://localhost:5173`.

---

## Déploiement sur Vercel

1. Poussez le projet sur un dépôt **GitHub**.
2. Sur [vercel.com](https://vercel.com), cliquez sur **Add New > Project** et importez le dépôt.
3. **Framework Preset** : `Other` (site statique). Aucun build command nécessaire.
4. Cliquez sur **Deploy**.

Le fichier `vercel.json` active automatiquement :
- les **URLs propres** (`/products` au lieu de `/products.html`)
- des **redirections** (ex. `/produits` → `/products`)
- le **cache long** sur les assets
- des **en-têtes de sécurité**

> Pensez à remplacer `https://coco-up.vercel.app` par votre domaine final dans
> les balises `canonical`, `og:url`, `sitemap.xml` et `robots.txt`.

---

## Personnalisation du numéro WhatsApp

Le numéro est actuellement un **placeholder** : `2250700000000`.

Pour le remplacer partout en une fois (format international sans `+` ni espaces) :

- **VS Code** : `Ctrl+Shift+H` (Rechercher/Remplacer dans tous les fichiers)
  - Rechercher : `2250700000000`
  - Remplacer par : votre numéro, ex. `2250712345678`

Le formulaire de contact utilise aussi l'attribut `data-whatsapp` sur la balise
`<form id="contactForm">` dans `contact.html`.

---

## Remplacement des images

Les images se trouvent dans `assets/images/`. Conservez les mêmes noms de fichiers
pour ne rien casser, ou mettez à jour les attributs `src` correspondants.

| Emplacement | Fichier | Usage |
|---|---|---|
| `assets/images/brand/` | `coco-up-logo.png` | Logo principal (header, footer, favicon) |
| `assets/images/brand/` | `prime-agence.jpeg` | Logo Prime Agence |
| `assets/images/hero/` | `hero-section.jpeg` | Visuel hero accueil |
| `assets/images/products/` | `coco-up-gingembre.jpeg` | Produit Gingembre |
| `assets/images/products/` | `coco-up-ananas.jpeg` | Produit Ananas |
| `assets/images/products/` | `coco-up-lait.jpeg` | Produit Lait de Coco |

Certaines images d'ambiance (producteurs, lifestyle) utilisent des URLs **Unsplash**
en ligne, avec un *fallback* automatique (dégradé + 🥥) si l'image ne charge pas.
Remplacez-les par vos propres visuels pour une version 100% locale.

> Conseil performance : convertissez les `.jpeg/.png` en **WebP** et compressez-les
> (ex. [squoosh.app](https://squoosh.app)) pour viser un score Lighthouse 95+.

---

## Performance & Lighthouse

- Images en `loading="lazy"` (sauf hero en `fetchpriority="high"`)
- CSS/JS séparés et mis en cache longue durée via `vercel.json`
- Polices `display=swap` + `preconnect`
- Animations désactivées si `prefers-reduced-motion`

Objectifs : **Performance 95+**, **Accessibility 95+**, **SEO 100**.

---

## Compatibilité

Chrome, Firefox, Safari, Edge (versions récentes). Dégradations gracieuses
pour `IntersectionObserver` et le `loading="lazy"` natif.

---

© 2025 Coco'Up. Tous droits réservés. Produit par Prime Agence de Communication.
