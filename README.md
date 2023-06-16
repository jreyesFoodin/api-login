# api-Login
Api de Login


Use development enviroment
```
npm run watch
```
---

Stack

* NodeJS
* Knex
* Mysql SQL
* Ansible
* Vagrant
* ES6
* NPM

Dependencies

* Koa

---

Para crear una migración

```
knex migrate:make migration_name
```

Para correr las migraciones pendientes

```
knex migrate:latest
```

Para crear un seed

```
knex seed:make seed_name
```

Aplicar un seed en especifico

```
knex seed:run --specific=nombre-seed.js
```
