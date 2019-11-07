# Réponses aux questions

1) Réalisation du CRUD

Voir commit : Etape 1

2) Le principe de conception qui favorise le découplage et les potentiels futurs “refactoring” du modèle des commandes est le "I" du S.O.L.I.D., à savoir le "Integration Segregation Principle".

Voir commit : Etape 2

3) La séparation de la couche HTTP, recevant les requêtes et
traitant les erreurs, de la couche “service” qui elle s’occupe de la logique “métier” et
renvoie des erreurs “métier” doit respecter le principe du S du S.O.L.I.D, à savoir le "Single Responsibility Principle".
Le Design Pattern pouvant être utilisé ici est l'Adapter, qui permet à différents objets incompatibles/ 

https://refactoring.guru/design-patterns/adapter/typescript/example#lang-features

Voir commit : Etape 3

4) Le Design Pattern qui va nous permettre de mieux contrôler les données qui constituent nos commandes est le Builder. D'après Refactoring Guru, c'est un Design Pattern qui permet de construire des objets complexes pas à pas et est particulièrement utile pour créer des objets qui ont beaucoup d'options de configuration possibles. 

https://refactoring.guru/design-patterns/builder/typescript/example#lang-features

Voir commit : Etape 4

5) Utilisation d'une classe Order qui sert de modèle et qui va appeler le Builder.

6) Diagramme de classes

Voir commit : Etape 6



# TypeScript Express server - Starter

## Get started

Ensure you have `make` installed on your system.

After cloning te repository run:
```bash
make init
```

Now you can start|stop|restart your server by running:
```bash
make start|stop|restart
```

Your server will listen by default on port `3000` of your `$DOCKER_HOST`

You can access the server logs by running:
```bash
make log
```

If you want to stop and destroy your docker containers:
```bash
make down
```

Launch dependencies install with:
```bash
make install
```

## Running a command in a running container

To run a command in your container, run the following:
```bash
docker exec <container_name> <command>
```
eg:

```bash
docker exec starter-back_server sudo rm -rf /
```

## Running a command in a stopped/failed container

You will have to run a command through `docker-compose`:
```bash
docker-compose run --rm <service_name> <command>
```
eg:

```bash
docker-compose run --rm node npm install --save-dev typescript
```

## Access your container

To connect to a container, run:
```bash
docker exec -ti <container_name> sh
```
