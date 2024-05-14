### 1. Création d'une Google Cloud Function via le Dashboard Google Cloud

#### A. Prérequis
- Un compte Google Cloud avec les permissions appropriées pour créer des fonctions.
- Avoir installé et configuré le SDK Google Cloud (`gcloud`).

#### B. Configuration du projet
1. **Connectez-vous à Google Cloud Console** : Accédez à [Google Cloud Console](https://console.cloud.google.com/) et sélectionnez ou créez un projet.
2. **Activation des API** : Activez l'API Cloud Functions et l'API Cloud Build si elles ne sont pas déjà actives.

#### C. Création de la fonction
1. **Accédez à Cloud Functions** : Dans le menu de navigation, allez à "Compute > Cloud Functions".
2. **Créez une nouvelle fonction** :
   - Cliquez sur "Create function".
   - Nommez votre fonction et choisissez une région (us-east-1 de préférence).
   - Choisissez "HTTPS" pour le type de déclencheur.
   - Saisissez votre code dans l'éditeur en ligne ou téléchargez votre fichier de code source.
   - Cliquez sur "Deploy" pour déployer la fonction.

### 2. Automatisation du déploiement avec GitHub Actions

#### A. Prérequis
- Un dépôt GitHub contenant le code de votre projet Node.js.
- Les droits administratifs sur le dépôt pour configurer les secrets et les GitHub Actions.

#### B. Configuration des secrets de dépôt
1. **Configurer les secrets dans GitHub**:
   - Accédez à votre dépôt GitHub.
   - Allez à "Settings > Secrets" et ajoutez les secrets suivants:
     - `gcp_project`: Votre ID de projet Google Cloud.
     - `gcp_credentials`: Base64 de la clé JSON de votre compte de service Google Cloud.

#### C. Création du workflow GitHub Actions
1. **Créez un fichier de workflow** :
   - Dans votre dépôt GitHub, créez un dossier `.github/workflows`.
   - Créez un fichier YAML, par exemple `build.yml`.
2. **Écrivez le workflow** :
   ```yaml
   name: Deploy Cloud Function

    on:
      push:
        branches:
          - main
    jobs:
      deploy:
        name: Deploy to Google Cloud Functions
        runs-on: ubuntu-latest

        steps:
          - name: Checkout code
            uses: actions/checkout@v2
    
          - name: Set up Cloud SDK
            uses: google-github-actions/setup-gcloud@v0.2.0
            with:
              version: 'latest'
              project_id: ${{ secrets.gcp_project }}
              service_account_key: ${{ secrets.gcp_credentials }}
              export_default_credentials: true
    
          - name: Deploy Function
            run: |
              gcloud functions deploy YOUR_CLOUD_FUNCTION_NAME \
                --entry-point YOUR_ENTRY_POINT \
                --runtime YOUR_NODE_VERSION \
                --region=YOUR_REGION \
                --source=. \
                --trigger-http \
                --allow-unauthenticated
    
          - name: Install Dependencies
            run: npm install
   ```
   - Modifiez les informations selon votre Google Cloud Function
