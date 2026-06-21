# Instructions Git pour MMstack

## Commits automatiques
- Après chaque fonctionnalité ou correction terminée, commit automatiquement
- Utilise le format Conventional Commits (feat:, fix:, style:, refactor:, docs:)
- Garde la première ligne sous 50 caractères
- Exemple : "feat: add dark mode toggle to navbar"

## Push automatique
- Push automatiquement vers `origin main` après chaque commit
- Si un push échoue, explique pourquoi avant de réessayer

## Règles de sécurité
- Ne jamais faire de force push
- Ne jamais commit le dossier node_modules, .env, ou .claude/
- Toujours vérifier `git status` avant de commit
