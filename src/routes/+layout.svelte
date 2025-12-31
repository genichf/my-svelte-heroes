<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import Messages from '$lib/components/Messages.svelte';
  import '../app.css';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Tour of Heroes</title>
</svelte:head>

<header>
  <h1>Tour of Heroes</h1>
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/heroes">Heroes</a>
  </nav>
</header>

<main>
  {@render children()}
</main>

<Messages />

<style>
  h1 {
    margin-bottom: 0;
  }
  nav a {
    padding: 1rem;
    text-decoration: none;
    margin-right: 10px;
    margin-top: 10px;
    display: inline-block;
    background-color: #e8e8e8;
    color: #3d3d3d;
    border-radius: 4px;
  }

  nav a:last-child {
    margin-right: 0;
  }

  nav a:hover {
    color: white;
    background-color: #42545c;
  }
</style>
