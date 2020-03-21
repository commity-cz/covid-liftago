## Local setup
Ask someone to add you to the `covid-liftago` Firebase project.

Install Firebase tools
```shell script
npm install -g firebase-tools
```

Login to Firebase:

 ```shell script
 firebase login
 ```

Run local development:

```shell script
firebase serve
```

### Cloud functions

See [Cloud functions readme](functions/README.md).

### Frontend

See [Frontend readme](frontend/README.md).

## Deploy staging

```shell script
npm run deploy:staging
```

## Deploy production

```shell script
npm run deploy:production
```
