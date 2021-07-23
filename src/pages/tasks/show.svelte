<script>
//import {link} from 'svelte-spa-router'
import client from '../../apollo-client'
import { setClient } from "svelte-apollo";
import QGL_TASK from '../../graphql/task';
import LibContent from '../../lib/LibContent';

//
setClient(client);
export let params = Params, item = {} , title =""

const  get_item = async function (id){
  var row = await LibContent.get_item(id)
  console.log(row)
  item = row  
  title = item.values.title
}
console.log(params.id)
get_item(params.id)
</script>

<!-- -->
<div class="container">
	<h3>Tasks - show</h3>
  ID : {params.id}
  <hr />
  {title}

</div>
