<script>
//import {link} from 'svelte-spa-router'
//import Nav from '../../components/Navi.svelte';
import client from '../../apollo-client'
import { setClient } from "svelte-apollo";
import LibContent from '../../lib/LibContent';
//
setClient(client);
export let params = Params, item = {} , title =""
console.log(params.id)

const  get_item = async function (id){
  var row = await LibContent.get_item(id)
  title = row.values.title
}
get_item(params.id)
async function handleClick() {
//  alert('clicked')
  await save_item()
}
async function handleClickDelete() {
console.log('handleClickDelete')
  await delete_item()
}
async function delete_item(){
  try {
    const result = await LibContent.delete_item(params.id)
console.log(result)     
    window.location.href = '/#/tasks/'
  } catch (error) {
    console.error(error);
  }
}
async function save_item(){
  try {
    var title = document.getElementById('title');
    var item = {
      title: title.value
    }
    const result = await LibContent.update_item(
      params.id, "tasks", item
    )
//console.log(title.value)
console.log(result)     
    window.location.href = '/#/tasks/'
  } catch (error) {
    console.error(error);
  }    
}
</script>

<!-- -->
<div class="container">
	<h3>Tasks - edit</h3>
  ID : {params.id}
  <hr />
  <div class="form-group">
    <label>Title:</label>
    <input type="text" class="form-control" name="title" id="title" 
    value={title} />
    <hr />
    <button on:click={handleClick} class="btn btn-primary">Save</button>
    <hr />
    <button on:click={handleClickDelete} class="btn btn-outline-danger">Delete
    </button>
  </div>

  <hr />
</div>
