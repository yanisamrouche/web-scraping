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

async function loadInfluencers(){
    const res = await fetch('http://localhost:8080/influencers');
    const influencers = await res.json();
    const container = document.querySelector('.container');

    influencers.forEach(inf =>{
    
    const card = newElement('div', {class: 'card'});
    const name = newElement('h4', {innerText: inf.name});
    const username = newElement('h4', {innerText: inf.username})
    const img = newElement('img', {src: inf.img});
    const category = newElement('h4', {innerText: "category : "+inf.category});
    const followers = newElement('h4', {innerText: "followers : "+inf.followers})
    
    card.appendChild(name);
    card.appendChild(username);
    card.appendChild(img);
    card.appendChild(category);
    card.appendChild(followers);
    

    container.appendChild(card);
    });
}

loadInfluencers();

