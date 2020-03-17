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

## Frontend
```bash
cd frontend

npm install
npm start
```
