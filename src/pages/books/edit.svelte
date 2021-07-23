<script>
//import {link} from 'svelte-spa-router'
import client from '../../apollo-client'
import { setClient } from "svelte-apollo";
import LibContent from '../../lib/LibContent';
//
setClient(client);
export let params = Params, item = {} , title ="", select_list = [], radio_items = [], check_items = [], radio_1 = '';
export let Content = "", select_list_id, selected_tags = []; ;
//console.log(params.id)

const  get_item = async function (id){
  try{
    const types = await LibContent.get_items("book_types")
    const book_category = await LibContent.get_items("book_category")
    const book_tags = await LibContent.get_items("book_tags")  
    let row = await LibContent.get_item(id)
    item = row
console.log(item)
    Content = item.values.content
    title = row.values.title
    let item_type_1 = row.values.type_1
    const type = types.filter(item => (item.id === item_type_1));    
    select_list = types;    
    select_list_id = type[0].id
    radio_items = book_category;
    check_items = book_tags;
    let arr = await LibContent.csv_to_array(item.values.check_1)
//console.log(arr)
    selected_tags = arr
    radio_1 = item.values.radio_1   
  } catch (error) {
    console.error(error);
  }
}
get_item(params.id)

function onChangeCategory(event) {
  radio_1 = event.currentTarget.value;
console.log("selected=", radio_1)
}
async function handleClick() {
  await save_item()
}
async function handleClickDelete() {
//console.log('handleClickDelete')
  await delete_item()
}
async function delete_item(){
  try {
    const result = await LibContent.delete_item(params.id)
console.log(result)     
    window.location.href = '/#/books/'
  } catch (error) {
    console.error(error);
  }
}
async function save_item(){
  try {
    var title = document.getElementById('title');
    var elemContent = document.getElementById('content');
    var csv = await LibContent.array_to_csv(selected_tags)
    var item = {
      title: title.value,
      content: elemContent.value,
      type_1: select_list_id,
      radio_1: radio_1,
      check_1: csv,
    }
//console.log(item)   
    const result = await LibContent.update_item(
          params.id, "books", item
        )
console.log(result) 
    window.location.href = '/#/books/'
  } catch (error) {
    console.error(error);
  }    
}
</script>

<!-- -->
<div class="container">
	<h3>Books - edit</h3>
  ID : {params.id}
  <hr />
  <div class="form-group">
    <label>Title:</label>
    <input type="text" class="form-control" name="title" id="title" 
    value={title} />
    <label class="w-100">Content:
      <input type="text" class="form-control" name="content" id="content"
      value={Content} />
    </label>    
    <hr />
    <div class="col-md-6 form-group">
      <label>BookType:
        <select class="form-select" name="type_1" id="type_1" bind:value ={select_list_id}>
          {#each select_list as item}
            <option value={item.id}>{item.values.name}</option>
          {/each}          
        </select>
      </label>
    </div>
    <hr class="my-2" />     
    <div class="col-md-6 form-group mt-1">
      <p class="my-1">Category:</p>
      {#each radio_items as item}
      <span class="mx-1"> 
        <input checked={radio_1===item.id } type="radio"
          name="category_id" value={item.id} on:change={onChangeCategory} />{item.values.name}
      </span>
      {/each}
    </div>
    <hr class="my-2" />
    Tag選択:<br />
    {#each check_items as item}
    <label class="mx-1"> 
      <input type="checkbox" bind:group={selected_tags} value={item.id} />{item.values.name}
    </label>
    {/each} 
    <hr />    
    <button on:click={handleClick} class="btn btn-primary">Save</button>
    <hr />
    <button on:click={handleClickDelete} class="btn btn-outline-danger">Delete
    </button>
  </div>

  <hr />
</div>
