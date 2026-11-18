'use strict';
(()=>{
const data=window.PHOSBORTAE_DESIGNS,dialog=document.querySelector('#detail-dialog'),search=document.querySelector('#search'),historyBox=document.querySelector('#include-history'),count=document.querySelector('#result-count'),cards=[...document.querySelectorAll('.design-card')],viewport=document.querySelector('#image-viewport'),image=document.querySelector('#detail-image'),zoom=document.querySelector('#zoom-image');
let filter='Alle',shown=data.slice(),current=null,opener=null,internalHash=false;
const byId=id=>data.find(d=>d.id===id);
function applyFilter(){const q=search.value.trim().toLocaleLowerCase('de');shown=data.filter(d=>(filter==='Alle'||d.category===filter)&&(historyBox.checked||!d.historical)&&(!q||(d.title+' '+d.description+' '+d.stage).toLocaleLowerCase('de').includes(q)));const ids=new Set(shown.map(d=>d.id));cards.forEach(c=>c.hidden=!ids.has(c.dataset.id));count.textContent=`${shown.length} von ${data.length} Entwürfen`;document.querySelector('#empty-state').hidden=shown.length!==0;}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));applyFilter();}));search.addEventListener('input',applyFilter);historyBox.addEventListener('change',applyFilter);
document.querySelector('#reset-filters').addEventListener('click',()=>{filter='Alle';search.value='';historyBox.checked=true;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter==='Alle')));applyFilter();});
function resetZoom(){viewport.classList.remove('zoomed');viewport.style.removeProperty('--zoom-width');zoom.setAttribute('aria-pressed','false');zoom.textContent='Vergrößern +';viewport.scrollTop=0;viewport.scrollLeft=0;}
function show(id){const d=byId(id);if(!d)return;current=id;resetZoom();image.src=d.image;image.alt=d.title+' · '+d.stage+' · Vorschau';document.querySelector('#detail-title').textContent=d.title;document.querySelector('#detail-stage').textContent=d.stage;document.querySelector('#detail-description').textContent=d.description;document.querySelector('#detail-text').textContent=d.detail;document.querySelector('#detail-limits').textContent=d.limits;document.querySelector('#detail-source').textContent='Herkunft: '+d.source_label;document.querySelector('#original-image').href=d.image;const list=shown.some(x=>x.id===id)?shown:data;document.querySelector('#detail-position').textContent=`Entwurf ${list.findIndex(x=>x.id===id)+1} von ${list.length}`;if(!dialog.open)dialog.showModal();}
function close(){if(dialog.open)dialog.close();current=null;resetZoom();if(location.hash.startsWith('#entwurf=')){history.replaceState(null,'',location.pathname+location.search);}if(opener&&document.contains(opener)){opener.focus();opener=null;}}
document.querySelectorAll('[data-open]').forEach(a=>a.addEventListener('click',event=>{event.preventDefault();opener=a;internalHash=true;location.hash='entwurf='+encodeURIComponent(a.dataset.open);show(a.dataset.open);}));
document.querySelector('#close-detail').addEventListener('click',close);dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
function syncHash(){if(location.hash.startsWith('#entwurf=')){let id;try{id=decodeURIComponent(location.hash.slice(9));}catch{return;}show(id);}else if(dialog.open){dialog.close();current=null;if(opener){opener.focus();opener=null;}}internalHash=false;}
window.addEventListener('hashchange',syncHash);
function step(direction){const list=shown.some(x=>x.id===current)?shown:data;const index=list.findIndex(x=>x.id===current),next=list[(index+direction+list.length)%list.length];history.replaceState(null,'','#entwurf='+encodeURIComponent(next.id));show(next.id);dialog.scrollTop=0;}
document.querySelector('#previous-design').addEventListener('click',()=>step(-1));document.querySelector('#next-design').addEventListener('click',()=>step(1));
dialog.addEventListener('keydown',event=>{if(event.target===viewport&&viewport.classList.contains('zoomed'))return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();step(event.key==='ArrowRight'?1:-1);}});
zoom.addEventListener('click',()=>{const enlarged=viewport.classList.toggle('zoomed');zoom.setAttribute('aria-pressed',String(enlarged));zoom.textContent=enlarged?'Ansicht anpassen −':'Vergrößern +';if(enlarged){viewport.style.setProperty('--zoom-width',Math.max(image.naturalWidth||1400,viewport.clientWidth*2)+'px');}else{viewport.scrollTop=0;viewport.scrollLeft=0;}});
const requestedCategory = new URLSearchParams(location.search).get('bereich');
const categoryButton = [...document.querySelectorAll('[data-filter]')].find(button => button.dataset.filter === requestedCategory);
if (categoryButton) categoryButton.click();
else applyFilter();
syncHash();
})();
