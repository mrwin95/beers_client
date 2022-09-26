import {$api} from '@services/api';

export default function(store) {
    try{
        store.$api = $api;
    }catch(err){
        console.error(err);
    }
}