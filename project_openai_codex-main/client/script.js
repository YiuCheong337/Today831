import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelect('#chat_container');

let loadInterval;

function loader(element){
    element.textContent = '';

    loadInterval = setInterval(() =>{
        element.textContent += '.';
        if (element.content === '...'){
            element.content = ''
        }
    }, 300)
}

function typeText(element, text){
    
}