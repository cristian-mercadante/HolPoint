# Development

| SW      | version |
| :------ | ------: |
| python  |   3.7.3 |
| node.js | 12.13.1 |
| npm     |  6.12.1 |

## Backend
```bash
cd backend
# your Pyhton 3
python -m virtalenv venv
# on Unix
source venv/bin/activate
# on Windows
source venv/Scripts/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Secrets
Create a `secrets.py` file with these variables:
```python
EMAIL_HOST_USER = 'your_google_account@gmail.com'
EMAIL_HOST_PASSWORD = 'your_google_account_password'
SECRET_KEY = 'very_strong_django_key'
```
Then, move this file into `/backend/backend/`. `settings.py` will retrieve these variables and use them. These will not be saved in GitHub, because of a `.gitignore` line.

## Frontend
```bash
cd frontend
npm install
npm start
```

## Native

```bash
cd native
npm install
npm start
```

# Production
## DynDNS configuration
- Open ports `80` and `443` from Raspberry Pi's local IP address (mine was `192.168.1.226`) in home router.
- Setup a FREE subscription to [DynDNS.it](https://dyndns.it/login/?usedef=0&redirect_to=%2Forder%2F%3Fservice%3Dfree%26newone%3D1%26opt%3D).
- Chose host name: `holpoint.ns0.it` in my case.
- Setup home router with parameters given from the website.


## System configuration

Setup Raspberry Pi:
```bash
sudo apt-get update && sudo apt-get upgrade -y

# clone git repo
git clone https://github.com/cristian-mercadante/HolPoint.git

# update node.js
sudo apt-get install build-essential checkinstall libssl-dev
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
# CLOSE and reopen terminal
nvm install 12.13.1 # desired node.js version
```

Prepare `frontend` and `backend`

```bash
# FRONTEND BUILD
cd frontend
npm install
npm run build
# actually, in build we got 'out_of_memory' error
# so I copy-pasted the build from PC at HolPoint/backend/build

# BACKEND
# create secrets.py file as described before.
# then:
cd backend
pip3 install virtualenv
python3 -m virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic
```

Run dev-server with `python manage.py runserver` and go to `http://127.0.0.1:8000/admin/sites/site/` ad edit `example.com` as:
- Domain name: `holpoint.ns0.it`
- Display name: `HolPoint`

Edit `settings.py`:
- add `holpoint.ns0.it` IP to ALLOWED_HOSTS
- set `DEBUG=False`

In `frontend/src/server.js` set:
```javascript
export const server = "http://holpoint.ns0.it";
```

Edit `backend/backend/wsgi.py`:
```python
import os
import sys

path='/home/pi/HolPoint/backend'
if path not in sys.path:
    sys.path.append(path)

from django.core.wsgi import get_wsgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
application = get_wsgi_application()

from django.contrib.auth.handlers.modwsgi import check_password
```

## Apache web server configuration
Install `apache2` and `mod_wsgi`
```bash
sudo apt-get update
sudo apt-get install apache2 libapache2-mod-wsgi-py3
```

Configure Apache:
```bash
sudo nano /etc/apache2/sites-available/000-default.conf
```
Copy-paste this (we will also setup for HTTPS):
```apache
WSGIDaemonProcess holpoint python-path=/home/pi/HolPoint/backend:/home/pi/HolPoint/backend/venv/lib/python3.7/site-packages
WSGIProcessGroup holpoint
WSGIApplicationGroup holpoint

<VirtualHost *:80>
	WSGIScriptAlias / /home/pi/HolPoint/backend/backend/wsgi.py
	WSGIPassAuthorization On
	
	<Directory /home/pi/HolPoint/backend/backend>
	<Files wsgi.py>
		Require all granted
	</Files>
	</Directory>

	Alias /static /home/pi/HolPoint/backend/static
	<Directory /home/pi/HolPoint/backend/static>
		Require all granted
	</Directory>

	Alias /media /home/pi/HolPoint/backend/media
	<Directory /home/pi/HolPoint/backend/media>
		Require all granted
	</Directory>

	# The ServerName directive sets the request scheme, hostname and port that
	# the server uses to identify itself. This is used when creating
	# redirection URLs. In the context of virtual hosts, the ServerName
	# specifies what hostname must appear in the request's Host: header to
	# match this virtual host. For the default virtual host (this file) this
	# value is not decisive as it is used as a last resort host regardless.
	# However, you must set it for any further virtual host explicitly.
	ServerName holpoint.ns0.it

	ServerAdmin webmaster@localhost
	DocumentRoot /var/www/html

	# Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
	# error, crit, alert, emerg.
	# It is also possible to configure the loglevel for particular
	# modules, e.g.
	#LogLevel info ssl:warn

	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined

	# For most configuration files from conf-available/, which are
	# enabled or disabled at a global level, it is possible to
	# include a line for only one particular virtual host. For example the
	# following line enables the CGI configuration for this host only
	# after it has been globally disabled with "a2disconf".
	#Include conf-available/serve-cgi-bin.conf
RewriteEngine on
RewriteCond %{SERVER_NAME} =holpoint.ns0.it
RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>

<VirtualHost *:443>
	WSGIScriptAlias / /home/pi/HolPoint/backend/backend/wsgi.py
	WSGIPassAuthorization On
	
	<Directory /home/pi/HolPoint/backend/backend>
	<Files wsgi.py>
		Require all granted
	</Files>
	</Directory>

	Alias /static /home/pi/HolPoint/backend/static
	<Directory /home/pi/HolPoint/backend/static>
		Require all granted
	</Directory>

	Alias /media /home/pi/HolPoint/backend/media
	<Directory /home/pi/HolPoint/backend/media>
		Require all granted
	</Directory>

	# The ServerName directive sets the request scheme, hostname and port that
	# the server uses to identify itself. This is used when creating
	# redirection URLs. In the context of virtual hosts, the ServerName
	# specifies what hostname must appear in the request's Host: header to
	# match this virtual host. For the default virtual host (this file) this
	# value is not decisive as it is used as a last resort host regardless.
	# However, you must set it for any further virtual host explicitly.
	ServerName holpoint.ns0.it

	ServerAdmin webmaster@localhost
	DocumentRoot /var/www/html

	# Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
	# error, crit, alert, emerg.
	# It is also possible to configure the loglevel for particular
	# modules, e.g.
	#LogLevel info ssl:warn

	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined

	# For most configuration files from conf-available/, which are
	# enabled or disabled at a global level, it is possible to
	# include a line for only one particular virtual host. For example the
	# following line enables the CGI configuration for this host only
	# after it has been globally disabled with "a2disconf".
	#Include conf-available/serve-cgi-bin.conf
SSLCertificateFile /etc/letsencrypt/live/holpoint.ns0.it/fullchain.pem
SSLCertificateKeyFile /etc/letsencrypt/live/holpoint.ns0.it/privkey.pem
Include /etc/letsencrypt/options-ssl-apache.conf
</VirtualHost>

# vim: syntax=apache ts=4 sw=4 sts=4 sr noet
```

To run Apache, do `sudo service apache2 restart`

## Data ownership to Apache
```bash
cd /home/pi/HolPoint
chmod g+w ./backend/db.sqlite3
chmod g+w ./backend
sudo chown :www-data ./backend/db.sqlite3
sudo chown :www-data ./backend
```

## HTTPS
```bash
#sudo apt-get install software-properties-common
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install python-certbot-apache
sudo cerbot --apache
# enter email and agree to terms
```

In `frontend/src/server.js` set `https` instead of `http`:
```javascript
export const server = "https://holpoint.ns0.it";
```

# Troubleshooting
- Error logs are in `/var/log/apache2`
- After changes, restart Apache with `sudo service apache2 restart`
- If you edit `frontend` (like `server.js` file), remember that effective changes are displayed after `npm run build` and after moving `build` directory into `backend`. Also do `python manage.py collectstatic`.
