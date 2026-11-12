'use strict';

// Feste Erkundungsbereiche; konkrete Quelle und Inhalt sind je Eintrag benannt.
const AREAS = [
  {
    "id": "musik",
    "title": "Musik & Klang",
    "interests": [
      "musik"
    ],
    "skills": [
      "musik"
    ],
    "description": "Erkunde, wie Komposition, Produktion und Klangformen Geschichten hörbar machen.",
    "href": "../index.html#musik",
    "link": "Vorhandene Alben entdecken",
    "source": "PHOSBORTAE Master Blueprint, Kapitel 1, Seite 7 · Arbeitsfassung 1.0."
  },
  {
    "id": "texte",
    "title": "Texte & Erzählungen",
    "interests": [
      "texte"
    ],
    "skills": [
      "texte"
    ],
    "description": "Erkunde Sprache, Songtexte und erzählerische Ausdrucksformen.",
    "href": "../index.html#lesen",
    "link": "Texte und Erzählungen entdecken",
    "source": "PHOSBORTAE Master Blueprint, Kapitel 1, Seite 7 · Arbeitsfassung 1.0."
  },
  {
    "id": "gestaltung",
    "title": "Bilder & Gestaltung",
    "interests": [
      "gestaltung"
    ],
    "skills": [
      "gestaltung"
    ],
    "description": "Erkunde, wie Bildsprache, Cover und visuelle Konzepte eine Idee sichtbar machen.",
    "href": "../index.html#welten",
    "link": "Bildsprache im Blueprint erkunden",
    "source": "PHOSBORTAE Master Blueprint, Kapitel 1, Seite 7 · Arbeitsfassung 1.0."
  },
  {
    "id": "digital",
    "title": "Digitale Werkzeuge",
    "interests": [
      "digital"
    ],
    "skills": [
      "digital"
    ],
    "description": "Erkunde digitale Formate, Vorlagen und technische Bausteine mit praktischem Nutzen.",
    "href": "../index.html#welten",
    "link": "Digitale Formate im Blueprint erkunden",
    "source": "PHOSBORTAE Master Blueprint, Kapitel 1, Seiten 7 und 12 · Arbeitsfassung 1.0."
  },
  {
    "id": "zusammenarbeit",
    "title": "Projekte & Zusammenarbeit",
    "interests": [
      "zusammenarbeit"
    ],
    "skills": [
      "zusammenarbeit"
    ],
    "description": "Erkunde, wie eigene Fähigkeiten, Ideen und gemeinsame Verantwortung zusammenfinden können.",
    "href": "../index.html#mitwirken",
    "link": "Projekte und Zusammenarbeit erkunden",
    "source": "PHOSBORTAE Master Blueprint, Kapitel 1, Seiten 7, 9, 12 und 16 · Arbeitsfassung 1.0."
  }
];

const form=document.querySelector('#orakel-form');
const resultList=document.querySelector('#result-list');
const resultIntro=document.querySelector('#result-intro');
const heading=document.querySelector('#results-heading');
const description=document.querySelector('#description');
const noteBox=document.querySelector('#personal-note');
const noteText=document.querySelector('#note-text');
const selectionStatus=document.querySelector('#selection-status');
const counter=document.querySelector('#description-count');
const selectedPaths=new Set();

function create(tag,className,text){const element=document.createElement(tag);if(className)element.className=className;if(text!==undefined)element.textContent=text;return element;}
function checked(group){return [...document.querySelectorAll('#'+group+' input:checked')].map(input=>({value:input.value,label:input.closest('label').querySelector('span').textContent}));}
function updateSelection(){
  const names=AREAS.filter(area=>selectedPaths.has(area.id)).map(area=>area.title);
  selectionStatus.textContent=names.length?'Von dir ausgewählt: '+names.join(' · ')+'. Du kannst deine Wahl jederzeit ändern.':'Noch kein Weg ausgewählt. Du entscheidest, was du erkunden möchtest.';
}
function reasonFor(area,interests,skills){
  const explicitInterests=interests.filter(item=>area.interests.includes(item.value)).map(item=>item.label);
  const explicitSkills=skills.filter(item=>area.skills.includes(item.value)).map(item=>item.label);
  const reasons=[];
  if(explicitInterests.length)reasons.push('Du hast Interesse an „'+explicitInterests.join('“, „')+'“ gewählt.');
  if(explicitSkills.length)reasons.push('Du möchtest „'+explicitSkills.join('“, „')+'“ einbringen oder ausprobieren.');
  return reasons.length?reasons.join(' '):'Ein allgemeiner Erkundungsweg – du hast noch keine Interessen oder Fähigkeiten ausgewählt.';
}
function renderResults(){
  const interests=checked('interests');const skills=checked('skills');selectedPaths.clear();
  const hasSelections=interests.length>0||skills.length>0;
  const matching=AREAS.filter(area=>interests.some(item=>area.interests.includes(item.value))||skills.some(item=>area.skills.includes(item.value)));
  const areas=hasSelections?matching:AREAS;
  resultList.replaceChildren();
  resultIntro.textContent=hasSelections?'Diese Wege knüpfen an deine ausdrücklich gewählten Interessen und Fähigkeiten an. Ihre Reihenfolge ist keine Bewertung.':'Ohne Angaben kannst du alle allgemeinen Erkundungswege ansehen. Wähle selbst, was dich neugierig macht.';
  noteText.textContent=description.value.trim();noteBox.hidden=noteText.textContent.length===0;
  for(const area of areas){
    const article=create('article','result-card');article.dataset.area=area.id;
    article.append(create('h3','',area.title),create('p','reason',reasonFor(area,interests,skills)),create('p','content',area.description));
    const link=create('a','',area.link+' →');link.href=area.href;article.append(link,create('p','source',area.source));
    const label=create('label','choose-path');const input=create('input');input.type='checkbox';input.id='path-'+area.id;
    input.addEventListener('change',()=>{if(input.checked)selectedPaths.add(area.id);else selectedPaths.delete(area.id);updateSelection();});
    label.append(input,create('span','','Diesen Weg für mich auswählen'));article.append(label);resultList.append(article);
  }
  updateSelection();heading.focus();
}
function resetAll(){
  form.reset();description.value='';counter.textContent='0 / 800 Zeichen';selectedPaths.clear();resultList.replaceChildren();noteText.textContent='';noteBox.hidden=true;selectionStatus.textContent='';
  resultIntro.textContent='Lass dir Wege zeigen. Du erhältst zu jedem Vorschlag eine verständliche Begründung und einen konkreten Inhalt zum Erkunden.';
  document.querySelector('#angaben-titel').setAttribute('tabindex','-1');document.querySelector('#angaben-titel').focus();
}
form.addEventListener('submit',event=>event.preventDefault());
description.addEventListener('input',()=>{counter.textContent=description.value.length+' / 800 Zeichen';});
document.querySelector('#show-results').addEventListener('click',renderResults);
document.querySelector('#reset-all').addEventListener('click',resetAll);
