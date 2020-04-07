[![CircleCI](https://circleci.com/gh/commity-cz/covid-liftago.svg?style=shield)](https://circleci.com/gh/commity-cz/covid-liftago)

## Local setup
Ask someone to add you to the `covid-liftago` Firebase project.

Install Firebase tools
```shell script
sudo npm install -g firebase-tools
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

## Deploy 

Master branch is automatically deployed to the staging environment.

Production branch is deployed to the production environment. Direct push to the production branch is forbidden.
Release to production is only possible via pull request.
