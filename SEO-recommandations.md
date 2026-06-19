# Recommandations SEO Lighthouse — Coco'Up

## Objectifs de score

| Categorie | Objectif | Action requise |
|-----------|----------|----------------|
| Performance | 95+ | Optimiser LCP, CLS, TBT |
| Accessibilite | 100 | Corriger contrastes, labels, navigation clavier |
| Best Practices | 100 | HTTPS, CSP, CSP, images modernes |
| SEO | 100 | Completer les points ci-dessous |

---

## 1. Performance (Objectif : 95+)

### LCP (Largest Contentful Paint)
- **Cible** : < 2.5s
- **Actions** :
  - Preload de l'image hero deja implemente (`fetchpriority="high"`)
  - Compresser les images JPEG en WebP/AVIF avec fallback
  - Mettre en place un CDN pour les images (Cloudinary ou Imgix)
  - Minifier le CSS et le JS

### CLS (Cumulative Layout Shift)
- **Cible** : < 0.1
- **Actions** :
  - Dimensions width/height deja presentes sur les images
  - Verifier que les polices ne causent pas de FOIT/FOUT
  - Reserver l'espace pour le loader et la barre de progression

### TBT (Total Blocking Time)
- **Cible** : < 200ms
- **Actions** :
  - Defer le script Lucide et script.js deja en place
  - Decouper script.js en modules charges a la demande
  - Utiliser `requestIdleCallback` pour les animations non critiques

### FID / INP (Interaction to Next Paint)
- **Cible** : < 200ms
- **Actions** :
  - Reduire le travail JS sur le thread principal
  - Lazy-load les sections en dessous de la ligne de flottaison

---

## 2. Accessibilite (Objectif : 100)

### Contraste de couleurs
- Verifier le ratio de contraste entre le texte et le fond
- S'assurer que `--green` (#3A7D2C) sur fond blanc passe WCAG AA
- S'assurer que `--brown-dark` (#4A2800) sur fond cream passe WCAG AA

### Navigation clavier
- S'assurer que tous les elements interactifs sont focusables
- Ajouter des `:focus-visible` styles visibles
- Verifier l'ordre de tabulation logique

### Images et medias
- Alt text deja present sur la plupart des images
- Ajouter des descriptions plus riches sur les images decoratives
- S'assurer que les icones Lucide ont des `aria-hidden="true"` ou des labels

### Formulaires
- Label associe a chaque input (deja present sur contact.html)
- Messages d'erreur descriptifs
- Groupement fieldset/legend si applicable

---

## 3. Best Practices (Objectif : 100)

### Securite
- **HTTPS** : deja actif sur Vercel
- **CSP (Content Security Policy)** : ajouter un header CSP dans vercel.json
- **HSTS** : deja gere par Vercel
- **X-Frame-Options** : deja present dans vercel.json

### Images modernes
- **Format** : convertir les JPEG en WebP avec fallback `<picture>`
- **Taille** : fournir des srcset responsives pour les images produits
- **Compression** : utiliser un outil comme Squoosh ou ImageOptim

### JavaScript
- **Minification** : minifier assets/js/script.js
- **Unused JS** : verifier que tout le JS est utilise
- **Polyfills** : ne pas charger de polyfills inutiles pour les navigateurs modernes

---

## 4. SEO (Objectif : 100)

### Deja implemente
- [x] Title tags optimises (< 60 caracteres)
- [x] Meta descriptions (< 155 caracteres)
- [x] Canonical URLs
- [x] Open Graph complet
- [x] Twitter Cards
- [x] Robots.txt optimise
- [x] Sitemap.xml avec images
- [x] Schema.org JSON-LD (Organization, LocalBusiness, Product, FAQPage, Article)
- [x] Meta geo-localisation
- [x] Favicon + apple-touch-icon + manifest
- [x] Preconnect et DNS-prefetch
- [x] Preload image hero
- [x] Lazy loading images
- [x] Loading="lazy" sur les images produits

### A implementer
- [ ] **Hreflang** : si version anglaise ou regionale ajoutee
- [ ] **BreadcrumbList JSON-LD** : sur toutes les pages (partiellement fait)
- [ ] **Review/Rating schema** : ajouter des avis clients sur les produits
- [ ] **Video schema** : si videos ajoutees
- [ ] **BreadCrumb navigation visuelle** : ajouter des fils d'Ariane HTML
- [ ] **Pagination schema** : si blog pagine
- [ ] **Site search schema** : si barre de recherche interne
- [ ] **Image sitemap separe** : creer image-sitemap.xml pour Google Images
- [ ] **AMP** : optionnel pour pages blog

### Contenu et structure
- [ ] Ajouter un fil d'Ariane visuel (breadcrumb) en haut de chaque page
- [ ] Creer une page blog avec les 30 articles proposes
- [ ] Ajouter des liens internes contextuels dans le contenu
- [ ] Optimiser les ancres de liens (eviter "cliquer ici")
- [ ] Ajouter une table des matieres sur les pages longues

---

## 5. Actions immediates prioritaires

1. **Compresser les images** : convertir JPEG -> WebP/AVIF (gain ~30-50%)
2. **Minifier CSS et JS** : utiliser un build tool ou en ligne
3. **Verifier le contraste** : tester avec WebAIM Contrast Checker
4. **Ajouter un header CSP** dans vercel.json
5. **Creer Google Search Console** + soumettre le sitemap
6. **Creer Google Business Profile** pour Abidjan
7. **Ajouter les pages blog** avec les 30 sujets proposes

---

## Outils recommandes pour le suivi

- **Google Search Console** : indexation, requetes, erreurs
- **Google Analytics 4** : trafic, comportement, conversions
- **Google PageSpeed Insights** : performance et Core Web Vitals
- **Lighthouse CI** : tests automatises a chaque deploy
- **Screaming Frog** : audit technique complet (gratuit jusqu'a 500 URLs)
- **Ahrefs / Ubersuggest** : suivi des positions et backlinks
