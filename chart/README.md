# moup.app Chart
Deploys [moup.app](https://github.com/jadenkhuu/moup)

## Managed by ArgoCD
The Argo App is located in `./infra/argo-cd-apps/apps/moup-app.yaml`

## Manual install (do not use, for reference only)
```shell
helm upgrade --install -n prod moup-app .
```
