
import { gql} from '@apollo/client';

const task = {
  get_gql_add : function(title){
    return gql`
      mutation {
        addTask( title: "${title}") {
          id
          title
        }                
      }      
    `   
  },
  GET_TASKS: function(){
    return  gql`
    query {
      tasks {
        id
        title
      }
    }
    `
  },
  GET_TASK: function(id){
    return  gql`
    query {
      task(id: "${id}"){
        id
        title
      }      
    }
    `
  },
  UPDATE_TASK : function(id, title){
    return gql`
      mutation {
        updateTask(id:"${id}" , title: "${title}") {
          id
          title
        }                        
      }      
    `   
  },   
  DELETE_TASK : function(id){
    return gql`
      mutation {
        deleteTask(id: "${id}") {
          id
        }        
      }      
    `   
  },

}
export default task;
