const typeorm = require('typeorm');

class Influencer {
    constructor(id, username, name, img, category, followers, url){
        this.id = id;
        this.username = username;
        this.name = name;
        this.img = img;
        this.category = category;
        this.followers = followers;
        this.url = url;
    }
}

const EntitySchema = require("typeorm").EntitySchema;

const InfluencerSchema = new EntitySchema({
    name: "Influencer",
    target: Influencer,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        username: {
            type: "text"
        },
        name: {
            type: "text"
        },
        img: {
            type: "text"
        },
        category: {
            type: "text"
        },
        followers:{
            type: "text"
        },
        url: {
            type: "text"
        },
    }
});

async function getConnection(){
    return await typeorm.createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "yanis",
        database: "scraping_project",
        synchronize: true,
        logging: false,

        entities: [
            InfluencerSchema
        ],
        keepConnectionAlive: true,
    })
}

async function getAllInfluencers(){
    const connection = await getConnection();
    const influencerRepo = connection.getRepository(Influencer);
    const influencers = await influencerRepo.find();
    connection.close();
    return influencers;
}

async function insertInfluencer(influencers, url ){
    const connection = await getConnection();
    const allInfluencers = [];
    for(i=0; i<50;i++){
        
            const influencer = new Influencer();
            influencer.username = influencers[i].username;
            influencer.name = influencers[i].name;
            influencer.img = influencers[i].img;
            influencer.category = influencers[i].category;
            influencer.followers = influencers[i].followers;
            influencer.url = url;
            const influencerRepo = connection.getRepository(Influencer);
            const res = await influencerRepo.save(influencer);
            allInfluencers.push(await influencerRepo.find());
        
    }
    connection.close();
    return allInfluencers;

}
module.exports = {
    getAllInfluencers,
    insertInfluencer
}