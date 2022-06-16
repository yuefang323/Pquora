<h1 align="center">pQuora</ha>

<h3 align="center">A Place where just you and a handful of parents can ask questions and exchange experience in the journey of raising infants. It is inspired by <a href="https://www.quora.com/">Quora<a>.</h3>

<p align="center"><a  href="https://pquora.herokuapp.com/">pQuora Live Demo</a></p>

# Technologies Used

## Frontend

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
</br>

## Backend

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

# Getting started

1. Clone this repository

```
git clone https://github.com/yuefang323/pQuora
```

2. Install dependencies

-   In root folder, install Python server.

```
pipenv install
```

-   Navigate to react-app folder, install React

```
cd react-app
npm install
```

3. Setup your PostgreSQL user, password and database

```
psql
CREATE USER pquora_app_dev WITH PASSWORD 'password';
CREATE DATABASE pquora_app WITH OWNER pquora_app_dev;

```

4. create a .env file in root folder, based on the .env.example with proper settings for your development environment

5. Migrate and seed your database in root folder

```
pipenv run flask db upgrade
pipenv run flask seed all

```

6. Start the server

-   In root folder

```
pipenv run flask run
```

-   Navigate to React-app folder

```
npm start
```

7. Have fun!

# Features

## Detail

-   [Feature List](https://github.com/yuefang323/pQuora/wiki)

## ScreenShot

### Splash/Login Page

![login](https://user-images.githubusercontent.com/94598069/173999362-48732e9b-bf67-4f32-97d3-73a9c1cb7b38.png)

### Signup Page

![signup](https://user-images.githubusercontent.com/94598069/173999442-a171fbf5-6554-46fa-bee3-ad881ef00436.png)
  
### Home Page

![home-page](https://user-images.githubusercontent.com/94598069/173951575-4c8773f9-faaf-46ed-8600-4297224e3b82.png)

### Question Page

![question_page](https://user-images.githubusercontent.com/94598069/173951648-7c987ea7-aff3-4e4c-a8c6-974984b9d0f0.png)

### About Page

![about_page](https://user-images.githubusercontent.com/94598069/173951061-043db5c0-4297-43ad-b0ba-39f7e7ee6754.png)

# Future Features

-   Tags feature
-   Search feature
-   User profile
