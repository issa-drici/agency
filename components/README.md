# Atomic Design

Arborescence UI generique:

- `atoms/` : briques elementaires (`Button`, `Input`, `Label`)
- `molecules/` : combinaisons simples (`FormField`, `ButtonLink`)
- `organisms/` : sections metier plus riches (`AuthCard`)
- `templates/` : layouts de page (`AuthPageLayout`)

Regle d'usage:

1. Commencer par composer avec `atoms`.
2. Monter en `molecules` si un pattern se repete.
3. Extraire en `organisms` quand la section devient metier.
4. Garder `templates` pour le squelette commun de pages.
