require("dotenv").config();
const server = require("./api/server.js");
// variables to print to server
const PORT = process.env.PORT || 5000;
 //this prints out on the console, feel free to add whatever messages you want
const randomMessage =[
  "Testing Is Good",
  "A Cypress is a tree like structure.",
  "The Matrix is what you make it.",
  "Welcome Developer",
  "ようこそ開発者",
  "Bienvenido Desarrollador",
  "Bienvenue Développeur",
  "Добро пожаловать разработчик",
  "Velkommen Udvikler"
]
let message = randomMessage[Math.floor(Math.random() * randomMessage.length)];
let now = new Date().toUTCString();

server.listen(PORT, () => {
  console.log(`\n=== ${message}\n=== Time is ${now}\n=== Server listening on port ${PORT} \n`);
});
