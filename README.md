<h1 align="center">
	Words Api
</h1>

<h3 align="center">
	<b>Typing Test:</b> type.ethanhaque.ca<br>
	<b>Frontend:</b> https://github.com/Ethan-Haque/typing-test-react
</h4>

<h4 align="center">
	Version: 2.0
</h4>

<p align="center">
	<a href="#demo">Demo</a> •
	<a href="#features">Features</a> •
	<a href="#tech-stack">Tech Stack</a>
</p>

## Overview
Words API provides secure backend services for user authentication, score management, and dynamic sentence generation for my Typing Test site.

## Features
* <b>User Authentication:</b> Session-based authentication for secure account management.
* <b>Score Management:</b> Saves and retrieves scores, ensuring only high scores are updated.
* <b>Dynamic Sentences:</b> Supplies randomized sentences from a customizable word pool.

## Routes
## API Routes  

### Sentence Routes (`/sentences`)  
- `GET /:amount`  
  **Description**: Fetch a specified number of random sentences.  

### User Routes (`/user`)  
- `POST /`  
  **Description**: Create a new user account.  

- `GET /session`  
  **Description**: Check if the user is logged in.  

- `GET /:username`  
  **Description**: Verify if a username exists.  

- `POST /login`  
  **Description**: Log in an existing user.  

- `POST /logout`  
  **Description**: Log out the current session.  

### Score Routes (`/score`)  
- `GET /all`  
  **Description**: Retrieve all scores for the leaderboard.  

- `POST /`  
  **Description**: Submit a new score (only saves if it’s the highest).  


## Tech Stack
Built with <b>Node.js</b> and <b>Express.js</b>, using <b>PostgreSQL</b> for persistent data storage.
Password security is ensured with BCrypt, while sessions are managed using Connect-PG-Simple.
Hosted on my personal VPS.

<p align="center">
<img src="https://img.shields.io/badge/Node.js-05122A?style=flat&logo=node.js" alt="Node.js Badge" height="25">&nbsp;
<img src="https://img.shields.io/badge/Javascript-05122A?style=flat&logo=javascript" alt="javascript Badge" height="25">&nbsp;
<img src="https://img.shields.io/badge/Express.js-05122A?logo=Express" alt="Express.js Badge" height="25">&nbsp;
<img src="https://img.shields.io/badge/Postgres-05122A?style=flat&logo=Postgresql" alt="PostgreSQL Badge" height="25">&nbsp;
<img src="https://img.shields.io/badge/Self Hosted-05122A?style=flat" alt="Self Hosted Badge" height="25">&nbsp;
</p>
