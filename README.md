# Analysis WEB App with SPA
* Angular 11
* Apache 2
* D3.js v6

## Requirements
1. [Virtualbox 6.1.16](https://www.virtualbox.org/wiki/Downloads)
2. [Vagrant 2.2.14](https://www.vagrantup.com/downloads)

## Installation from scratch
##### Notification
If you want to install from scratch, please refer to branch **master**.
If you just want to look what this App is, please refer to branch **built**.

##### Steps
* Step 1
`git clone https://github.com/cshimegi/analysis-web.git`

* Step 2
```bash
$  cd /to/Vagrantfile/path
$  vagrant up --provision
```

* Step 3
```bash
$  vagrant ssh
```

## Access to Django WEB
After Vagrant is booted, you can access API page from browser.

`http://192.168.33.10:1299`

## Useful Commands
### Vagrant
```bash
$  vagrant up  //  to strat
$  vagrant up --provision //  to strat and provision
$  vagrant ssh  //  connect by SSH
$  vagrant halt // to halt
```

### Ubuntu (bento/ubuntu-20.10)
```bash
$  cd /vagrant // go to project directory
$  ng serve --host='192.168.33.10' --port=1299 // serve Angular
$  ng serve --host='192.168.33.10' --port=1299 --poll=5000 // serve Angular and sync local file
```
