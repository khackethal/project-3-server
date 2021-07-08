![General Assembly Logo](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) GENERAL ASSEMBLY — SOFTWARE ENGINEERING IMMERSIVE 2021

# Memory Map
## Project 3

A platform to connect with places through other people's memories. Share and uplaod a memory and mark it on a map, search other people's memories of a specific place. 

[Try it out.](insert link to deployed app)

For the best user experience we would recommend to register and to create a new memory, to fully see all features that are avialble to a a registered, logged in owner of a memory.

## Authors
- [Anthony Graham](https://github.com/databoy5000)
- [Antoinette Demonceaux](https://github.com/Ant0inette)
- Kat Hackethal


## Table of Contents

1. [Brief](https://github.com/khackethal/project-3-client#brief)
2. [Approach](https://github.com/khackethal/project-3-client#brief)
   - [MVP](https://github.com/khackethal/project-3-client#mvp)
   - [Technologies](https://github.com/khackethal/project-3-client#technologies)
   - [Methodologies](https://github.com/khackethal/project-3-client#methodologies)
3. [Planning](https://github.com/khackethal/project-3-client#planning)
   - [Back End](https://github.com/khackethal/project-3-client#back-end)
   - [Front End](https://github.com/khackethal/project-3-client#front-end)
4. [Challenges](https://github.com/khackethal/project-3-client#challenges)
5. [Key Learnings](https://github.com/khackethal/project-3-client#key-learnings)
6. [Conclusions & Future Features](https://github.com/khackethal/project-3-client#conclusions)

## Brief

Create a working full-stack app that will be deployed online, with it's own Back End and Front End, using an Express API to serve your data from a Mongo database.
The app must be a complete product, meaning multiple relationships and CRUD functionality for your models. Implement thoughtful user stories and leave time to style the app.

## Approach

As we were working in a group, we had a clear joint excel google document with an overview of the project, detailing and assigning all tasks.
We would mark off tasks in the document as completed, and use it to ask questions or raise queries to the other group members.
This is in additon to being in a zoom breakout room together and therefore being able to ask quick questions right away, as well as help each other with debugging through screensharing.

We had one common Git repository, which I was responsible for settin up alongside with the initial project structure to make the first commit, with two branches, "main" and "dev". <br/>
Further to this we each had two branches, one "own branch" and one "dev branch".<br/>
We would work in our "own branch" and before comitting any changes navigate to the "dev branch" and pull from the git main, then merge the updated "dev branch" with our own branch, resolving all conflicts, before finally pushing to the "dev branch" on git. I merged the "dev branch" into "main" at the very end of the project, at which time the other group members forked the repository. <br/>
This process helped to avoid any merging conflicts or unknowingly overwriting other people's code, and was a useful insight to how an actual dev team might work.


### MVP

We kept out MVP fairly simple with the option to add future features later on. <br/>
Our main requirements were:

- User authentication - Register & Login
- An Index Page for all Memories including a search function
- A Page showing all memories on a map, including a serach function
- A single memory view, with the option to edit and delete if the user has created the memory
- The ability to add tags to a memory
- A comment function, with the ability to delete the comment if the user has created it

### Technologies/ Frameworks/ APIs

#### Back End
- Axios
- Babel-ESlint
- Bcrypt
- Express
- Jest
- Supertest
- Json webtoken
- Mongo DB
- Mongoose
- Mongoose-Hidden
- Mongoose-Unique-Validator

- Back End deployment: Heroku

#### Front End
- Axios
- Cloudinary
- Bulma
- React
- React Router Dom
- Mapbox
- React Map GL
- React Map Gl Geocoder
- React Confirm Alert
- React Loader Spinner
- Moment
- Node.js

- Front End deployment: Netlify

### Methodologies
- Write readable, simple, DRY code per KISS
- Create reuseable components that have a clear, specific task 


## Planning

We worked through initial models and wireframes as a group, before dividing up the first set of tasks. 
We did end up changing our models as our requirements changes once we had implemented all mapbox functionality, however the wireframes have largely stayed the same.

### Back End 

### Front End