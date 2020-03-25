# Holpoint

## Requirements
| SW      | version |
| :------ | ------: |
| python  |   3.6.9 |
| node.js | 12.15.0 |
| npm     |  6.13.7 |

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
python manage.py runserver
```

## Mail
Edit a file, e.g. `/etc/environment` (maybe open it with `sudo`), adding these lines:
```bash
export EMAIL_HOST_USER="your_google_account@gmail.com"
export EMAIL_HOST_PASSWORD="your_google_account_password"
```
Edit `.bashrc` in your home directory, adding this line:
```bash
source /etc/environment
```
Then, close and re-open terminal.

## Frontend
```bash
cd frontend

npm install
npm start
```

## Deploy
```bash
cd frontend
npm run build
```
Move build directory into `backend` directory, then:
```bash
python manage.py collectstatic
```
