<template>
    <div>
         <header>
          <h1>Search Beer</h1>
         </header>     
         <div class="container">
          <div class="row">
            <div class="col">
              
            </div>
            <div class="col-6">
              <div class="mb-3 mt-3">              
              <input type="text" v-model="beer_name" class="form-control" id="beer_name" placeholder="Type a name">
            </div>
            <div class="col-auto">
            <button type="submit" @click="searchBeer()" class="btn btn-primary mb-3">Search</button>
          </div>
            </div>
            <div class="col">
              
            </div>
          </div>
          <div class="row">
            <div class="col">
              
            </div>
            <div class="col-6">
              <div class="list-group" v-for="beer in beers" v-bind:key="beer.id">
                <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{beer.name}}</h5>
                    <small><strong>{{beer.first_brewed}}</strong></small>
                  </div>
                  <p class="mb-1">{{beer.description}}</p>
                  <hr />
                  <div class="row">
                    <div class="col-8">
                      <small>                    
                      <span v-for="food_pairing in beer.food_pairings" v-bind:key="food_pairing">                        
                          <span class="badge text-bg-info rounded-pill pr-2">{{food_pairing}}</span>                        
                      </span>                    
                      </small>
                    </div>
                    <div class="col-4">
                      <button type="button" class="btn btn-primary btn-sm">Comment</button>
                    </div>
                  </div>                  
                </a>               
                <hr />
              </div>
              <div v-if="beers.length == 0">
                Search result not found
              </div>
            </div>
            <div class="col">
              
            </div>
          </div>
         </div>      
    </div>
  </template>
  
  <script>  
    import axios from 'axios';  
    export default {
      name: 'HomePage',
      data(){
        return {
          beers: [],
          beer_name: '',
          stars: this.star,
          rating: 0,
          comment: '',
          beer_id: 0,          
        }
      },
      props: {
        star: {
          type: Number
        },
        max_stars: {
          type: Number,
          default: 5
        }
      },
      methods: {
        async searchBeer(){
          try{
           const response = await axios.get("http://localhost:3001/api/v1/beers/searchByName?beer_name=" + this.beer_name, {headers: {'x-user': 'thang@123.com'}});
           this.beers = response.data.data;           
          }catch(err){
            this.beers = [];
            console.log(err);
          }
        },
        async addRating(){
          try{
            const bodyRequest = {
              rating: this.rating,
              comments: this.comment
            }
           await axios.post("http://localhost:3001/api/v1/rating/" + this.beer_id , bodyRequest, {headers: {'x-user': 'thang@123.com'}});                      
          }catch(err){            
            console.log(err);
          }
        },
        async getRatingByBeerId(){
          try{
           const response = await axios.get("http://localhost:3001/api/v1/rating/" + this.beer_name, {headers: {'x-user': 'thang@123.com'}});           
          }catch(err){            
            console.log(err);
          }
        },
        rate(star){
          if(star <= this.max_stars && star >=0){
            this.stars = this.stars === star ? star -1 : star;
          }
        }        
      },      
    }
  </script>

  <style>
  
    header{
      display: grid;
      color: white;
      background: #6D25BC;
      padding: 20px 0px 15px 0px;
    }

    header h1{
      place-self: center;
      font-size: 42px;
    }

    #app-beersearch {
      place-self: center;
      margin-top: 30px;
      width: 600px;
    }
  </style>