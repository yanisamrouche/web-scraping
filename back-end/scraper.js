const puppeteer = require('puppeteer')

async function scrapeURL(social_media){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();


    await page.goto(`https://hypeauditor.com/top-${social_media}/`);

    for(i=1; i<=50;i++){
        await page.click(
            `#__layout > div > div.page__content > div > div.main > div > div.tab_3MsJF > table > tbody > tr:nth-child(${i}) > td:nth-child(3) > div > div.avatar.cont__avatar > img`,
            `#__layout > div > div.page__content > div > div.main > div > div.tab_3MsJF > table > tbody > tr:nth-child(${i}) > td:nth-child(4) > div > div`
          )
        await page.waitForTimeout(1000) // fait une pause d'une seconde
    }


    await page.waitForTimeout(1000) 
    const data = await page.evaluate(()=>{
        const images = [];
        const category = [];
        const followers = [];
        for(i=1; i<=50;i++){
            images[i] = {img: ""}
            images[i].img = document.querySelector(`#__layout > div > div.page__content > div > div.main > div > div.tab_3MsJF > table > tbody > tr:nth-child(${i}) > td:nth-child(3) > div > div.avatar.cont__avatar > img`).src
            category[i] = {category: ""}
            if((document.querySelector(`#__layout > div > div.page__content > div > div.main > div > div.tab_3MsJF > table > tbody > tr:nth-child(${i}) > td:nth-child(4) > div > div`)) != null){
              category[i].category = document.querySelector(`#__layout > div > div.page__content > div > div.main > div > div.tab_3MsJF > table > tbody > tr:nth-child(${i}) > td:nth-child(4) > div > div`).innerText;
            }else{
              category[i].category = 'None'
            }
            followers[i] = {followers: ""}
            followers[i].followers = document.querySelector(`#__layout > div > div.page__content > div > div.main > div > div.tab_3MsJF > table > tbody > tr:nth-child(${i}) > td:nth-child(5)`).innerText;
        }
       
           
        const table = document.querySelector('.table .tbody');
        const influencers = [];
        for(i=0; i<table.childElementCount;i++){
            
            influencers[i]= {
                username:"",
                name:"",
                img: "",
                category: "",
                followers: "",
            };
            influencers[i].username = table.childNodes[i].cells[2].innerText.split("\n")[0];
            if(influencers[i].username === "kingjames"){
                influencers[i].name = "king james"
            }else{
             influencers[i].name = table.childNodes[i].cells[2].innerText.split("\n")[2].split("🤍")[0].split(" ")[0];
            }    
            influencers[i].img = images[i+1].img;  
            influencers[i].category = category[i+1].category;     
            influencers[i].followers = followers[i+1].followers;

        

        }
        return {influencers, images, category, followers};

    })



    //console.log(data.influencers);
    browser.close();
    return data.influencers;


}
//scrapeURL('instagram')
module.exports = {
    scrapeURL
}