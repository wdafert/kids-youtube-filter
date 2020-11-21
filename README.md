# KidsTube MERN fullstack Project 

## Disclaimer
This project was made as part of a MERN Bootcamp.
It shows a minimum viable product and is not a production ready final result.

## Project Description
Youtube offers a kids version, but this service still includes hidden advertising, violence even for toddlers and other unwanted content.
Also there is no possibility to select only videos with a certain language.
I created a full stack MERN app that showcases how one could build a 100% human reviewed KidsTube page where 
parents can set up appropriate filters that limit content their kids will see.

## Goals
1. A manual review process starts with a search for kids youtube videos
2. The reviewer will make a categorization of content by language and other factors
3. Parents simply set up their filter one time and from then on kids can only see selected videos

### Tools used
- User registration and authorization with JWT.
- Mongo Atlas Database that stores users and each categorized video information
- React + Redux

### Deployed Version

[Heroku Deploy](https://kids-youtube-filter.herokuapp.com)

### Instructions
Use any email and password to create a new user
Choose Reviewer in settings to be able to also add new videos

### Local install - Available Scripts

In the project directory, you can run:
`npm run dev`

This will run both the client app and the server app in development mode with nodemon.<br>
