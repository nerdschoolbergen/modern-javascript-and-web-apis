const helloWorldApiResponse = await fetch('/helloworld');
const helloWorldData = await helloWorldApiResponse.json();

const { message } = helloWorldData;

const body = document.querySelector('body');
var paragraph = document.createElement('p');
paragraph.innerText = `Message from API: '${message}'`;
body.appendChild(paragraph);
