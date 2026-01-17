# VEGA STORE — Sport E‑Commerce (React + Tailwind + Bootstrap)

Ce dossier contient un site e‑commerce sport **responsive** avec:
- Boutique (matériel + t‑shirts sport + kits équipe)
- **Personnalisation**: nom + numéro sur tenue (preview)
- Panier (localStorage) + checkout **démo**
- Page **Compétitions** (lead gen)
- Page **Contact** avec téléphone **0600209000** + Google Maps link/embed
- Animations (Framer Motion)
- Mini assistant "VegaCoach" (règles locales, sans API)

## Démarrer

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Images

Les images sont chargées dynamiquement via **Unsplash Source** (URLs query‑based). C'est volontaire pour éviter les problèmes de liens instables / droits.
- Pour changer, remplacez `imageQuery` / `imageUrl` dans `src/data/products.js`.

## Paiement en ligne

Le checkout est une **démo** (pas de backend). Pour un paiement réel:
- Stripe Checkout (recommandé): créer une API (Node/Express / serverless) pour générer une session checkout.
- PayPal: intégrer le SDK côté client + validation serveur.

## Personnalisation (nom/numéro)

Le rendu est fait en overlay (SVG + texte) côté client (facile, rapide, compatible).

## Astuces business (pour "faire rentrer du cash")

- Ajoutez une page "Promos" + codes promo.
- Ajoutez tracking (Meta Pixel / Google Analytics).
- Ajoutez un formulaire connecté (email + WhatsApp) pour capturer les leads.
- Ajoutez un backoffice simple (produits + commandes) via Firebase/Supabase.
