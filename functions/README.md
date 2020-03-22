# Cloud functions

**Note:** All commands bellow should be run in the `/functions` directory.

## Local development

Create file with config variables

```shell script
firebase functions:config:get > .runtimeconfig.json
```

Start cloud functions locally:

```shell script
npm run serve
```

Start Firebase Shell that allows invoking cloud functions locally:

```shell script
npm run shell
```

Note: It looks like there is an off-by-one error in port number in certain Firebase Tools versions. If the command above 
returns error `Port 5000 is not open on localhost, could not start functions emulator.`, try this command instead:

```shell script
npm run shell -- --port 5002
``` 

## Deployment

Deploy all cloud functions

```shell script
npm run deploy
```

## Environment variables

Available variables
* liftago.url
* liftago.token

Setting environment variable 

```shell script
firebase functions:config:set <VARIABLE_NAME>="<VARIABLE_VALUE>"

```
