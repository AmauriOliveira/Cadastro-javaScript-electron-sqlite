<p align="center">
  <a href="" rel="noopener">
 <img width=682px height=360px src="https://i.imgur.com/Rfne2HV.png" alt="Project logo"></a>
</p>

<h3 align="center">Prototipo</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Few lines describing your project.
    <br> 
</p>

## 📝 Menu

- [Sobre](#about)
- [Iniciando](#getting_started)
- [Feito com](#built_using)
- [Autor](#authors)
- [Print](#prints)

## 🧐 Sobre <a name = "about"></a>

Este pequeno Prototipo que fiz em **ElectronJS** os CRUDS basicos são um Database **Sqlite** com uso  do **Knex**

## 🏁 Iniciando <a name = "getting_started"></a>

### Clone o repositorio
`git clone https://github.com/AmauriOliveira/javaScript-electron-sqlite.git`

### Entre no repositorio
`cd javaScript-electron-sqlite`

### Install dependencies
`npm install`

### Migrate
`npx knex init`
`npx knex migrate:make users`
`npx knex migrate:latest`
`npx knex migrate:rollback`

### Execultar o app
`npm start`
  caso de algum erro nos pacotes SQLite3 use o comando:
`nmp postinstall`


## ⛏️ Feito com <a name = "built_using"></a>

- [SQLITE](https://www.sqlite.org/index.html) - Database
- [ElectronJs](https://www.electronjs.org/)
- [KnexJs](http://knexjs.org/)
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [Amauri Oliveira](https://github.com/amaurioliveira) - Idea & Initial work

## 📷 Print <a name = "prints"></a>

 <img src="https://i.imgur.com/Dlzdd36.png" alt="Tela"></a>