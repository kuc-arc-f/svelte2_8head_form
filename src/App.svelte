<script>
import Router from 'svelte-spa-router'
import Nav from './components/Navi.svelte';
import index from './pages/index.svelte'
import about from './pages/about.svelte'

/* tasks */
import tasks from './pages/tasks/index.svelte'
import tasks_create from './pages/tasks/create.svelte'
import tasks_show from './pages/tasks/show.svelte'
import tasks_edit from './pages/tasks/edit.svelte'
/* books */
import books from './pages/books/index.svelte'
import book_create from './pages/books/create.svelte'
import book_show from './pages/books/show.svelte'
import book_edit from './pages/books/edit.svelte'

export const routes = {
  '/': index,
  '/about': about,  
  /* tasks */
  '/tasks/': tasks,
  '/tasks/create': tasks_create,
  '/tasks/show/:id': tasks_show, 
  '/tasks/edit/:id': tasks_edit, 
  /* books */
  '/books/': books,
  '/books/create': book_create,
  '/books/show/:id': book_show,
  '/books/edit/:id': book_edit,

}
</script>

<main>
  <Nav />
  <Router {routes} />
  <hr />
</main>

<style>
</style>