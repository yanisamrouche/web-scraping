function newElement(type, attrs={}){
    const el = document.createElement(type);
    for(let attr in attrs){
        const value = attrs[attr];
        if (attr == 'innerText'){
            el.innerText = value;
        }
        else{
            el.setAttribute(attr, value);
        }
    }
    return el;
}

const influencers = [
    {name: 'Cristiano Ronaldo', img: 'http://'},
    {name: 'Justin Bieber', img: 'http://'},
    {name: 'Ariana Grande', img: 'http://'},
    {name: 'Selena Gomez', img: 'http://'}
];

const container = document.querySelector('.container');

influencers.forEach(inf =>{
    
    const card = newElement('div', {class: 'card'});
    const title = newElement('h4', {innerText: inf.name});
    const img = newElement('img', {src: inf.img});
    
    card.appendChild(title);
    card.appendChild(img);

    container.appendChild(card);
});