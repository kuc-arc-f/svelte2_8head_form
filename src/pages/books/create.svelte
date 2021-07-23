<script>
import Nav from '../../components/Navi.svelte';
import client from '../../apollo-client'
import { setClient } from "svelte-apollo";
//import QGL_TASK from '../../graphql/task';
import LibContent from '../../lib/LibContent';

export let select_list = [], radio_items = [], check_items = [], radio_1 = '';
export let select_list_id = "", selected_tags = []; 
setClient(client);

const init_items = async function (){
  try {
    const types = await LibContent.get_items("book_types")
    const book_category = await LibContent.get_items("book_category")
    const book_tags = await LibContent.get_items("book_tags")
    var type = types.filter(item => (item.values.name === 'select_1'));
    var category = book_category.filter(item => (item.values.name === 'food'));
//console.log(book_tags) 
    select_list = types;
    select_list_id = type[0].id
    radio_items = book_category;
    check_items = book_tags;
    radio_1 = category[0].id
  } catch (error) {
    console.error(error);
  }  
}
init_items()

function onChangeCategory(event) {
  radio_1 = event.currentTarget.value;
console.log("selected=", radio_1)
}
async function handleClick() {
//  alert('clicked')
  await add_item()
}
async function add_item(){
  try {
    var elemTitle = document.getElementById('title');
    var elemContent = document.getElementById('content');
    var csv = await LibContent.array_to_csv(selected_tags) 
    var item = {
      title: elemTitle.value,
      content: elemContent.value,
      type_1: select_list_id,
      radio_1: radio_1,
      check_1: csv,
    }
console.log(item)
    const result = await LibContent.add_item(
      "books", item, ""
    )
//console.log(result)
    window.location.href = '/#/books/'
  } catch (error) {
    console.error(error);
  }    
}
</script>

<!-- -->
<div class="container">
	<h3>Books - Create</h3>
  <hr />
  <div class="form-group w-50">
    <label>Title:</label><br />
    <input type="text" class="form-control w-full" name="title" id="title" />
    <label>Content:</label>
    <input type="text" name="content" id="content" class="form-control" />
    <hr />
    <div class="col-md-6 form-group">
      <label>BookType:</label>
      <select class="form-select" name="type_1" id="type_1" bind:value ={select_list_id}>
        {#each select_list as item}
          <option value={item.id}>{item.values.name}</option>
        {/each}          
      </select>
    </div>
    <hr class="my-2" />     
    <div class="form-group mt-1">
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
  </div>
  <hr />
  <button on:click={handleClick} class="btn btn-primary">Save</button>
</div>
