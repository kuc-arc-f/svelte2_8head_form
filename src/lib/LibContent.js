import client from '../apollo-client'
import Content from '../graphql/content'
import LibApiFind from '../lib/LibApiFind';
import Config from '../../app_config'
//
const LibContent = {
  get_items: async function(content_name){
    try {
//console.log(Config.get_config().MY_GQL_URL)
      const site_id= Config.get_config().MY_SITE_ID
      const data = await client.query({
        query: Content.get_query_contents(site_id , content_name) ,
        fetchPolicy: "network-only"
      })
//console.log(site_id)
//console.log(data)
      var items = LibApiFind.convert_items(data.data.contents)
      return items      
    } catch (error) {
      alert("Error, get_items")
      console.error(error);
    }    
  },
  get_items_uid: async function(content_name, user_id){
    try {
      const site_id= Config.get_config().MY_SITE_ID
//      const site_id= process.env.REACT_APP_SITE_ID;
      const data = await client.query({
        query: Content.get_query_contents_uid(site_id , content_name, user_id) ,
        fetchPolicy: "network-only"
      })
      var item = LibApiFind.convert_items(data.data.contents_uid )
      return item      
    } catch (error) {
      alert("Error, get_items_uid")
      console.error(error);
    }    
  },  
  get_item: async function(id){
    try {
      var data = await client.query({
        query: Content.get_query_content(id) ,fetchPolicy: "network-only"
      })
      var item = data.data.content
      var row = LibApiFind.convertItemOne(item)      
      return row      
    } catch (error) {
      alert("Error, get_item")
      console.error(error);
    }    
  },
  add_item: async function(content_name, values, user_id){
    try {
      const apikey= Config.get_config().MY_API_KEY
      var json= JSON.stringify( values );
      json = json.replace(/"/g , "'")
//console.log(json)
      const result = await client.mutate({
        mutation: Content.get_gql_add(apikey, content_name , json,
        user_id)
      })
      return result
    } catch (error) {
      alert("Error, add_item")
      console.error(error);
    }    
  },
  update_item: async function(id, content_name, values){
    try {
      const apikey= Config.get_config().MY_API_KEY
      var json= JSON.stringify( values );
      var s = json.replace(/"/g , "'")   
//console.log(s)  
      const result = await client.mutate({
        mutation: Content.get_gql_update(apikey, id, content_name, s)
      })      
      return result
//console.log(result)
    } catch (error) {
      alert("Error, update_item")
      console.error(error);
    }    
  },  
  delete_item: async function(id){
    try {
      const apikey= Config.get_config().MY_API_KEY
      const result = await client.mutate({
        mutation: Content.get_gql_delete(apikey, id)
      })           
      return result
//console.log(result)
    } catch (error) {
      alert("Error, delete_item")
      console.error(error);
    }    
  },
  array_to_csv: async function(items){
    try {
      var formatCSV = '';
      for (var i = 0; i < items.length; i++) {
        var value = items[i];
        formatCSV += value + ',';
      }
      return formatCSV
//console.log(result)
    } catch (error) {
      alert("Error, array_to_csv")
      console.error(error);
    }    
  },
  csv_to_array: async function(items){
    try {
      var ret = []
      var arr = items.split(',');
      for(var i = 0; i < arr.length; i++){
        if(arr[i] === '') break;
        ret.push(arr[i])
      }
      return ret
//console.log(result)
    } catch (error) {
      alert("Error, array_to_csv")
      console.error(error);
    }      
  },

}
export default LibContent