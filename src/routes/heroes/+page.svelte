<script lang="ts">
    import { heroService } from '$lib/hero.svelte';
    import { onMount } from 'svelte';

    // Викликаємо завантаження при першому відкритті сторінки
    onMount(() => {
        if (heroService.all.length === 0) {
            heroService.loadAll();
        }
    });

    let newHeroName = $state('');

    function add() {
        if (!newHeroName.trim()) return;
        heroService.add(newHeroName);
        newHeroName = '';
    }
</script>

<h2>My Heroes</h2>

<div>
    <label for="new-hero">Hero name: </label>
    <input id="new-hero" bind:value={newHeroName} />
    <button class="add-button" onclick={add}>Add hero</button>
</div>

<ul class="heroes">
    {#if heroService.loading}
        <li>Loading heroes...</li>
    {:else}
        {#each heroService.all as hero}
            <li>
                <a href="/detail/{hero.id}">
                    <span class="badge">{hero.id}</span> {hero.name}
                </a>
                <button class="delete" onclick={() => heroService.delete(hero.id)}>x</button>
            </li>
        {:else}
            <li>Список порожній. Додайте героя!</li>
        {/each}
    {/if}
</ul>

<style>
  .heroes {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  .heroes li {
    display: flex;
    align-items: center;
    background-color: #EEE;
    margin: .5em;
    padding: 0;
    border-radius: 4px;
    height: 1.6em;
  }
  .heroes li:hover {
    color: #2c3a41;
    background-color: #e6e6e6;
    left: .1em;
  }
  .heroes a {
    color: #333;
    text-decoration: none;
    padding: .3em 0;
    flex-grow: 1;
  }
  .heroes .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #405061;
    line-height: 1em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
    height: 1.8em;
  }
  .delete {
    background-color: #e6e6e6;
    color: #333;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 1.1rem;
  }
  .delete:hover {
    background-color: #525252;
    color: white;
  }
  .add-button {
    background-color: #eee;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    color: #333;
  }
  .add-button:hover {
    background-color: #cfd8dc;
  }
</style>