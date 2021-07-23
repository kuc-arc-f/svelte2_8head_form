<script>
import {link} from 'svelte-spa-router'
import LibContent from '../../lib/LibContent';
import client from '../../apollo-client'
import { setClient } from "svelte-apollo";
//
export let items = []
setClient(client);

const  get_items = async function (){
  const task_items = await LibContent.get_items("tasks")
console.log(task_items) 
  items = task_items 
}
get_items()
</script>
<!-- -->
<div class="container">
	<h3>Tasks - index</h3>
  <a href="/tasks/create" use:link class="btn btn-primary">Create
  </a>
  <hr />
  {#each items as item}
  <h3><a href={`/tasks/show/${item.id}`} use:link>{item.values.title}</a>
  </h3>
  <p>ID : {item.id}
    <a href={`/tasks/edit/${item.id}`} use:link class="ml-2 btn btn-outline-primary">
      Edit</a>
  </p>
  <hr />
  {/each}

</div>
