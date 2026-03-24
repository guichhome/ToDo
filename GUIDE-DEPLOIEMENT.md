# Guich'Home Atelier — Guide de déploiement GitHub Pages

## 🚀 Mise en ligne en 5 minutes

### Étape 1 — Créer le repo GitHub
1. Aller sur https://github.com/new
2. Nom du repo : `guichhome-atelier` (ou ce que tu veux)
3. Cocher **Public** (requis pour GitHub Pages gratuit)
4. Cliquer **Create repository**

### Étape 2 — Uploader les fichiers
Dans ton repo, clique **"uploading an existing file"** et glisse-dépose :
- `index.html`
- `sw.js`
- `manifest.json`
- `icon-192.png`
- `icon-512.png`

Puis clique **Commit changes**.

### Étape 3 — Activer GitHub Pages
1. Aller dans **Settings** → **Pages**
2. Source : **Deploy from a branch**
3. Branch : **main** / **(root)**
4. Cliquer **Save**

### Étape 4 — Accéder à l'app
URL : `https://TON-PSEUDO.github.io/guichhome-atelier`

✅ Accessible depuis n'importe quel téléphone ou ordi !

---

## 📱 Installer comme une vraie app

### Sur iPhone/iPad (Safari)
1. Ouvrir l'URL dans Safari
2. Appuyer sur le bouton **Partager** (carré avec flèche)
3. Choisir **"Sur l'écran d'accueil"**
4. L'app apparaît avec son icône comme une vraie application !

### Sur Android (Chrome)
1. Ouvrir l'URL dans Chrome
2. Menu ⋮ → **"Ajouter à l'écran d'accueil"**

### Sur PC/Mac (Chrome ou Edge)
1. Ouvrir l'URL
2. Cliquer l'icône d'installation dans la barre d'adresse (icône +)

---

## 📊 Connecter Google Sheets

### Préparer le Google Sheet
1. Créer un nouveau Google Sheet sur drive.google.com
2. Renommer l'onglet "Feuille 1" en **Taches**
3. En ligne 1, mettre les en-têtes :
   ```
   A: ID | B: Nom | C: Projet | D: Client | E: Priorite | F: Estimation | G: TempsTotal | H: Statut | I: Archivee | J: Notes
   ```
4. Copier l'**ID du Sheet** dans l'URL : `https://docs.google.com/spreadsheets/d/[ID_ICI]/edit`

### Créer une clé API Google
1. Aller sur https://console.cloud.google.com
2. Créer un projet (ou utiliser un existant)
3. Activer l'API : **Google Sheets API**
4. Aller dans **Identifiants** → **Créer des identifiants** → **Clé API**
5. Copier la clé

### Rendre le Sheet accessible
- Pour la **lecture** : Partager le Sheet en "Tout le monde avec le lien peut voir"
- Pour l'**écriture** : Il faut OAuth2 (plus complexe) — ou utiliser Apps Script

### Dans l'application
1. Coller l'ID du Sheet dans le champ "ID du Google Sheet"
2. Coller la clé API dans "Clé API Google"
3. Cliquer "Tester connexion"
4. Utiliser le bouton "Sync" dans le header

---

## 💾 Stockage des données
- Les données sont sauvegardées **automatiquement** dans le navigateur (localStorage)
- Chaque appareil a ses propres données locales
- Google Sheets sert de **sauvegarde centralisée** et de **synchronisation entre appareils**

---

## 🔄 Workflow recommandé
1. Travailler sur l'app (créer tâches, timers, etc.)
2. Le soir ou en fin de chantier : cliquer **Sync** → **Exporter vers Sheets**
3. Sur un autre appareil : **Sync** → **Importer depuis Sheets**
