let types = document.getElementById('types');
let reset = document.getElementById('reset');
let filter = document.getElementById('filter');
let search = document.getElementById('search');
let pika = document.getElementById('pika');
let cont = document.getElementsByClassName('pokemon-cont')[0];

let cardarr = [];

let colorobj = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    dark: "#8A8A8A",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
    steel: "#71797E"
  };
async function fetchPokemon(i) {
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    let response = await data.json();
    return response;
}

function formCard(info) {
    let div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <div class="card-front">
        <div class="img">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${info.id}.svg" alt="${info.species.name}">
        </div>    
        <h2>${info.species.name}</h2>
        <div class="pok-type">
        </div>
        <div class="abilities">
            <div class="ab">
                <p class="head">Attack</p>
                <p class="type">${info.stats[1].base_stat}</p>
            </div> 
            <div class="ab">
                <p class="head">Defence</p>
                <p class="type">${info.stats[2].base_stat}</p>
            </div> 
            <div class="ab">
                <p class="head">Speed</p>
                <p class="type">${info.stats[5].base_stat}</p>
            </div> 
        </div>
    </div>
    <div class="card-back">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${info.id}.png"/>
         <h2 class="type">${info.species.name}</h2>
         <div class="back-info">
            <p>${info.abilities[0].ability.name}</p>
         </div>
    </div>
    `
    let poktype = div.querySelector('.pok-type');
    
    info.types.forEach(type => {
        let span = document.createElement('span');
        span.style.backgroundColor = colorobj[type.type.name];
        span.innerText = type.type.name;
        div.setAttribute(`data-${type.type.name}`,type.type.name);
        poktype.appendChild(span);

    });
    cont.appendChild(div);
}

async function getData() {
    for(let i = 1; i < 50; i++) {
        let res = await fetchPokemon(i);
        cardarr.push(res);
        formCard(res);
    }
}
getData();

 function filterCards(type) {
    cont.innerHTML ='';
        cardarr.forEach((pok)=>{
            if(pok.types.some(t=>t.type.name === type)){
                formCard(pok);
            }
        });
       
    }
filter.addEventListener('click', ()=>{
    filterCards(types.value);
});

search.addEventListener('keypress', ()=>{
    let val = search.value.toLowerCase();
    cont.innerHTML ='';
    cardarr.forEach((pok)=>{
       //searching with it names
        if(pok.species.name.toLowerCase().includes(val)){
           formCard(pok);
        }
        //resetting search when deleting characters
        if(val === ''){
            cont.innerHTML ='';
            cardarr.forEach((pok)=>{
                formCard(pok);
            });
        }
        //searching with abilities
        if(pok.abilities.some(a=>a.ability.name.toLowerCase().includes(val))){
            formCard(pok);
        }
        //searching with types
        if(pok.types.some(t=>t.type.name.toLowerCase().includes(val))){
            formCard(pok);
        }
        
    });

});

pika.addEventListener('click', (e)=>{
    e.preventDefault();
})