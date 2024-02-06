// const script = document.createElement('script');
// script.src = "https://cdn.socket.io/4.7.4/socket.io.min.js";

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }
  
const token = getCookie('jwt');

const socket = io('http://localhost:3000',{
    auth: {
        token: token, // Replace with your actual token
      },
});

var id = "";


socket.on('connect', () => {
    console.log('Connected to server');
});

let container = document.getElementById('div');

function handleclick(){
    let value = document.getElementById('inp').value;
    if (value === "") return;
    socket.emit('message', { id : id, message: value});
    container.innerHTML += `<div class="d2">${value}</div>`;
    document.getElementById('inp').value = "";
} 
// socket.emit('message', { id : 'John', message: '30'});
document.getElementById('btn').addEventListener('click', handleclick);
document.getElementById('inp').addEventListener('keyup', (event) => {
    if(event.key === 'Enter'){
        handleclick();
    }
});

function getUserName(userName, image){
    console.log(userName, image);
    id = userName;
    document.getElementById('message').style.display = 'block';
    document.getElementById('span1').innerText = userName;
    document.getElementById('myImage').src = image;
    document.getElementById('div').innerHTML = "";
}

document.getElementById('inp').addEventListener('input', () => {
    console.log('typing');
    socket.emit('typing', { id : id});
});

socket.on('message', (data) => {  
    container.innerHTML += `<div class="d1">${data.message}</div>`;
  });
  
  socket.on('typing', (data) => {
   if (container.lastChild && container.lastChild.classList && container.lastChild.classList.contains('typing')) {
      console.log('Container has the "typing" class');
    } else {
      container.innerHTML += `<div class="typing d1">
        <span></span>
        <span></span>
        <span></span>
      </div>`;
      setTimeout(() => {
            const childElements = container.getElementsByClassName('typing');
            const childArray = Array.from(childElements);
            childArray.forEach((child) => {
            container.removeChild(child);
});
      }, 1000);
    }
  });