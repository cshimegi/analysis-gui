# SPA by Angular for data visualization web app
* Angular 11
* Apache 2
* D3.js v6

## Requirements
1. [Virtualbox 6.1.16](https://www.virtualbox.org/wiki/Downloads)
2. [Vagrant 2.2.14](https://www.vagrantup.com/downloads)

## Installation from scratch
##### Steps
* Step 1
`git clone https://github.com/cshimegi/analysis-web.git`

* Step 2 (before using vagrant)
```bash
$  cd /to/Vagrantfile/path
$  npm install
$  ng add @angular/material (style should not be a problem but deeppurple-amber is used here)
$  ng build --prod --output-path dist 
```

* Step 3 (Use Vagrant)
```bash
$  vagrant up --provision
$  vagrant ssh
```

## Access to Project via WEB site
After Vagrant is booted, you can access web page from browser.

`http://192.168.33.10:1299`

## Useful Commands
### Vagrant
```bash
$  vagrant up  //  to strat
$  vagrant up --provision //  to strat and provision
$  vagrant ssh  //  to enter into vagrant
$  vagrant halt // to halt
```

### Ubuntu (bento/ubuntu-20.10)
```bash
$  cd /vagrant // go to project directory
$  ng serve --host='192.168.33.10' --port=1299 // serve Angular at dev env
$  ng serve --host='192.168.33.10' --port=1299 --poll=5000 // serve Angular and sync local file at dev env
```
