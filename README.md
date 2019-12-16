# EffectiveDonate
A nonprofit discovery and donation tool, using data from [GlobalGiving's API](https://www.globalgiving.org/api/)

EffectiveDonate allows users to filter active projects by theme and find them on a world map (desktop). It also enables users to save their favorite projects.

View the website in production [here](https://effectivedonate.herokuapp.com/).
View backend repo [here](https://github.com/milandhar/mod5-project-backend).


### Demo
![EffectiveDonate Demo](https://media.giphy.com/media/WOHREdgquCDPSrClJN/giphy.gif)

View full demo video [here](https://youtu.be/kSz0PQtufXE)


### Getting Started

* Clone this repo to get started running EffectiveDonate's frontend locally:
```
git clone https://github.com/milandhar/mod5-project-frontend.git
```
* Then, `npm install` to install all required dependencies
* `npm start` to start the local server (this project uses [create-react-app](https://github.com/facebook/create-react-app))
The local web server will use Port 8000 instead of React's Port 3000 to prevent any conflict with the Rails backend. You can configure the default start port in the `package.json` file. 

## Project Overview 
EffectiveDonate is an immersive website where users can explore and donate to nonprofit projects from around the world. Users create a profile where they can specify their top-3 project themes (Education, Children, Environment, etc), and a default country. The landing page is a world map where users can hover and discover how many available projects they can donate to in every country. They can filter by any of the project themes to visualize which countries have the highest concentration of projects. The user can click on a country to view summaries of all of the projects, and can star individual projects or donate to them (payment feature still under development). 

### User Stories
EffectiveDonate was developed with the following user stories in mind: 
* As a salaried technology professional with cash on hand, I want to quickly find a project that I care about and immediately donate my hard-earned money to it.
* As a frugal student, I want to learn about charitable projects so that I can save it to my favorites and eventually donate to it once I have a job.
* As a person who cares about Subsaharan Africa, I want to visually find projects that are serving that region so that I can learn more and donate.
* As an environmentalist, I want to find projects in countries around the world so that I can learn about them and discuss them with my friends.
* As someone who is curious about how my donated money will be spent, I want a breakdown of donation amounts by description (ex. $10 will pay for safe water for one child), so that I know where my dollars will go if I donate.
* As someone who has never considered donating money, I want to learn about what impact even a small donation can make so that I will understand a new way of helping someone in need.

### Front End Technologies Used:
* [React](https://reactjs.org/) - User Interface 
* [Semantic UI React](https://react.semantic-ui.com/) - Theme + Style
* [D3 React](https://react-d3-library.github.io/) - Data Visualization 
* [React DataMaps](https://www.npmjs.com/package/react-datamaps) - Choropleth World Map 
* [React Beautiful DnD](https://react-beautiful-dnd.netlify.com/?path=/story/single-vertical-list--basic) - Drag and Drop Table Component

