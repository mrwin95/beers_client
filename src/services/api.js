class BaseApiService {
    baseUrl = ``;
    resource;

    constructor(resource) {
        if(!resource) throw new Error("Resource is not provided")
        this.resource = resource;
    }

    getUrl(id=""){
        return `${this.baseUrl}/${this.resource}/${id}`
    }

    handleErrors(err){
        console.log(`Error is handle here` + err);
    }
}

class ReadOnlyApiService extends BaseApiService {
    constructor(resource){
        super(resource);
    }

    async fetch(config ={}){
        try{
            const response = await fetch(this.getUrl(), config);  
            return await response.json();      
        }catch(err){
            this.handleErrors(err);
        }        
    }

    async get(id){
        try{
            if(!id) throw Error('The id not provided');
            const response = await fetch(this.getUrl());
            return await response.json();
        }catch(err){
            this.handleErrors(err);
        }
    }
}

class ModelApiService extends ReadOnlyApiService {

    constructor(resource){
        super(resource);
    }

    async post(data = {}){
        try{
            const response = await fetch(this.getUrl(), {
                method: "POST",
                body: JSON.stringify(data)
            });

            const {id} = response.json();
            return id;

        }catch(err){
            this.handleErrors(err);
        }
    }

    async put(id, data = {}){
        try{
            const response = await fetch(this.getUrl(id), {
                method: "PUT",
                body: JSON.stringify(data)
            });

            const {id: responseId} = response.json();
            return responseId;
        }catch(err){
            this.handleErrors(err);
        }
    }

    async delete(id){
        if(!id) throw new Error('The id not provided');
        try{
            await fetch(this.getUrl(id), {
                method: "DELETE"
            });

            return true;
        }catch(err){
            this.handleErrors(err);
        }
    }
}

class BeerApiService extends ModelApiService {
    constructor(){
        super("Beers");
    }    
}

export const $api = {
    beers: new BeerApiService()
}