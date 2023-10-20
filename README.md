# RULES-PROFILES-MANAGEMENT

# Release 0.1.0

This project was generated with [Laravel](https://laravel.com/docs/10.x/installation) version 10.x

# Project structure

```
.
├── app                     # Core Application.             
│   ├── Http                
│   │ ├── Controllers               # Controllers Directory.
│   │ ├── Middleware                # Middleware Classes.
│   ├── Providers               # Provider Classes.
│   ├── helpers.php               # Helpers Functions
├── bootstrap               # Bootstrap Files.
├── config                  # Configuration directory                  
├── public                  # Template Ressources.
│    ├── img                    # Images resources.
│    ├── assets                 # Js and css resources.
│    └── index.php              # Entry Point Application.
│                                 
├── resources               # Resources Project.
│    ├── views                  # Tempalate views. 
│      ├── interfaces               #  Interfaces Application.
│      ├── layouts                  #  Main Layout.
│      └── partial                  #  Partial Layout.
│                
├── routes                   # Routes  Directory
├── storage                  # Log Files Directory                       
├── docker-compose.yml       # Docker-cmpose file configuration.
```

# Requirements
## Docker Desktop
Follow these steps (https://docs.docker.com/desktop/wsl/#turn-on-docker-desktop-wsl-2)

## Ubuntu on wsl2
Make sure you already install ubuntu on wsl2 or follow these steps (https://ubuntu.com/tutorials/install-ubuntu-on-wsl2-on-windows-11-with-gui-support#2-install-wsl)
## PHP
PHP (https://www.php.net/) version 8.1.0
## Composer installation
Download and Configure Composer (https://getcomposer.org/download/)

## Node and Npm Installation 

Download and run the installation (https://nodejs.org/fr)
# How to launch

1. Clone this Repository

```
 https://gitlab.kaisens.fr/kaisensdata/apps/4inshield/front/web/rules-profiles-management
```
2. Go to the project folder
3. Install Composer Dependencies

```
composer install
```
4. Install NPM Dependencies
```
npm install
```
5. Create .env file

```
cp .env.example .env
```
6. Add Urls on .env
```
WEBSERVER_URL= 
WEBSERVERD_URL= 
WEBSERVERRules_URL= 
CRAWLSERVER_URL=
PROFIL_SEARCH_URL= 
```

7. Generate key application
```
php artisan key:generate
```
8. Open Ubuntu Terminal
9. Go to the project folder
```
cd /mnt/PATH_TO_PROJECT
```
10. Run CMD SAIL
```
./vendor/bin/sail up
```
11. Navigate to `http://localhost`

