import runDecorator from './components/runDecorator.js';

setTimeout(()=>{
    console.log('hit');
    var button = document.createElement('button');
    button.innerText="Trace IPs 🌍";
    button.addEventListener("click", runDecorator);
    button.style.background = "green";
    button.style.color = "white";
    document.querySelectorAll('[data-role="left-nav"]')[0].appendChild(button);
    
}, 5000)