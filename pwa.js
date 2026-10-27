(()=>{
 if(!('serviceWorker' in navigator)||location.protocol==='file:')return;
 let updateRequested=false;
 navigator.serviceWorker.addEventListener('controllerchange',()=>{if(updateRequested)location.reload();});
 window.addEventListener('load',async()=>{
  try{
   const reg=await navigator.serviceWorker.register('/sw.js',{scope:'/',updateViaCache:'none'});
   function offer(){if(!reg.waiting||!navigator.serviceWorker.controller||document.getElementById('updateApp'))return;const b=document.createElement('button');b.id='updateApp';b.textContent='Nova versão disponível';b.title='Salve os formulários antes de atualizar';b.onclick=()=>{if(document.querySelector('dialog[open]')){alert('Salve ou feche o formulário antes de atualizar.');return;}if(!document.getElementById('storageWarning').hidden){alert('Exporte os dados pendentes antes de atualizar.');return;}updateRequested=true;reg.waiting.postMessage({type:'ACTIVATE_UPDATE'});};document.querySelector('.workspace-meta').append(b);}
   offer();reg.addEventListener('updatefound',()=>{const worker=reg.installing;worker?.addEventListener('statechange',()=>{if(worker.state==='installed')offer();});});
  }catch(e){console.warn('Modo offline indisponível:',e.message);const s=document.getElementById('connectionStatus');if(s)s.textContent='Online · modo offline indisponível';}
 });
 let installPrompt;
 window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;const b=document.createElement('button');b.textContent='Instalar aplicativo';b.id='installApp';b.onclick=async()=>{await installPrompt.prompt();const answer=await installPrompt.userChoice;if(answer.outcome==='accepted')b.remove();installPrompt=null;b.disabled=true;};document.querySelector('.workspace-meta').append(b);});
})();
