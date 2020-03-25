# Holpoint

## Requirements

Developed with these versions:

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
python manage.py runserver
```

## Secrets

Create a `secrets.py` file with these variables:

```py
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

## Web deploy

```bash
cd frontend
npm run build
```

Move build directory into `backend` directory, then:

```bash
python manage.py collectstatic
```

## Native

```bash
cd native
npm install
npm start
```
