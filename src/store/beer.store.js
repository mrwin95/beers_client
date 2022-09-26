// import Vue from 'vue';
import {createStore} from 'vuex';
// import axios from 'axios';

// Vue.use(Vuex);

// create status object
const store = createStore({
    state: {
        beers: []
    },
    // creating getters property determine derived states based on store states
    getters: {
        beers: state => {
            return state.beers;
        }
    },
    // creating a mutation property that where you can change the state in the Vuex store
    mutations: {
        SET_ITEMS(state, beers) {
            state.beers = beers
        }
    },

    // creating an actions property
    actions: {
        async loadBeers({commit}) {
            try{
                const response = await this.$http.get('http://localhost:3001/api/v1/beers/searchByName?beer_name=Libertine Porter')
                commit('SET_ITEMS', response.data)
            }catch(ex){
                console.log(ex);
            }
        }
    }
})

export default store;

