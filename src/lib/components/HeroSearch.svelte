<script lang="ts">
  import type { Hero } from '$lib/types';

  let searchTerm = $state('');
  let searchResults = $state<Hero[]>([]);

  // ⚡️ Реактивний пошук з дебаунсом (затримкою)
  $effect(() => {
    const term = searchTerm.trim();
    if (!term) {
      searchResults = [];
      return;
    }

    // Встановлюємо таймер на 300мс
    const timer = setTimeout(async () => {
      const response = await fetch(`/api/heroes?name=${term}`);
      if (response.ok) {
        searchResults = await response.json();
      }
    }, 300);

    // Функція очищення (якщо searchTerm зміниться швидше ніж за 300мс, попередній запит скасується)
    return () => clearTimeout(timer);
  });
</script>

<div id="search-component">
  <label for="search-box">Hero Search</label>
  <input id="search-box" bind:value={searchTerm} />

  <ul class="search-result">
    {#each searchResults as hero}
      <li>
        <a href="/detail/{hero.id}">{hero.name}</a>
      </li>
    {/each}
  </ul>
</div>

<style>
  label {
    display: block;
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
  input {
    padding: 0.5rem;
    width: 100%;
    max-width: 600px;
    box-sizing: border-box;
    display: block;
  }

  input:focus {
    outline: #336699 auto 1px;
  }

  li {
    list-style-type: none;
  }
  .search-result li a {
    border-bottom: 1px solid gray;
    border-left: 1px solid gray;
    border-right: 1px solid gray;
    display: inline-block;
    width: 100%;
    max-width: 600px;
    padding: 0.5rem;
    box-sizing: border-box;
    text-decoration: none;
    color: black;
  }

  .search-result li a:hover {
    background-color: #435a60;
    color: white;
  }

  ul.search-result {
    margin-top: 0;
    padding-left: 0;
  }
</style>
