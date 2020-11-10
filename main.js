import decoratingManager from './components/decoratingManager.js';

setTimeout(()=>{
    console.log('hit');
    var el1 = document.createElement('div')
    el1.innerText="Trace IPs 🌍"
    el1.addEventListener("click", decoratingManager);
    document.querySelectorAll('[data-role="left-nav"]')[0].appendChild(el1);
    
}, 5000)