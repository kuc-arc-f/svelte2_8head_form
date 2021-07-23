<script>
//import {link} from 'svelte-spa-router'
import client from '../../apollo-client'
import { setClient } from "svelte-apollo";
import QGL_TASK from '../../graphql/task';
import LibContent from '../../lib/LibContent';

//
setClient(client);
export let params = Params, item = {} , title = "", content = "", type_1 = "" 
export let CategoryName = "", Tags = ""

const  get_item = async function (id){
  let row = await LibContent.get_item(id)
console.log(row)
  item = row  
  title = item.values.title
  content = item.values.content
  const types = await LibContent.get_items("book_types")
  let item_type_1 = item.values.type_1
  const type = types.filter(item => (item.id === item_type_1));
  type_1 = type[0].values.name
  const book_category = await LibContent.get_items("book_category")
  let item_radio_1 = item.values.radio_1
  const item_category = book_category.filter(item => (item.id === item_radio_1));
  CategoryName = item_category[0].values.name
  Tags = item.values.check_1
console.log(Tags)
}
console.log(params.id)
get_item(params.id)
</script>

<!-- -->
<div class="container">
	<h3>Books - show</h3>
  ID : {params.id}
  <hr />
  {title}
  <hr />
  Content : <br />
  <pre>{content}</pre>
  <hr />
  type_1: {type_1}
  <hr />
  Category : {CategoryName}
  <hr />
  Tags: {Tags}

</div>
