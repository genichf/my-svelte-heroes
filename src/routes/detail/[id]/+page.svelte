<script lang="ts">
  import { page } from '$app/stores';
  import { heroService } from '$lib/hero.svelte';
  import { onMount } from 'svelte';
  import type { Hero } from '$lib/types';

  // 1. Отримуємо ID з параметрів URL (через вбудований стор page)
  const id = Number($page.params.id);

  // 2. Локальний стан для редагування героя
  let hero = $state<Hero | null>(null);

  onMount(async () => {
    // Шукаємо героя в сервісі або завантажуємо з API
    const existingHero = heroService.all.find((h) => h.id === id);
    if (existingHero) {
      hero = { ...existingHero }; // Робимо копію для редагування
    } else {
      // Якщо сторінку оновили і в пам'яті сервісу пусто - йдемо в API
      const response = await fetch(`/api/heroes/${id}`);
      if (response.ok) {
        hero = await response.json();
      }
    }
  });

  async function save() {
    if (hero) {
      await heroService.update(hero);
      goBack();
    }
  }

  function goBack() {
    window.history.back();
  }
</script>

{#if hero}
  <div>
    <h2>{hero.name.toUpperCase()} Details</h2>
    <div><span>id: </span>{hero.id}</div>
    <div>
      <label for="hero-name">Hero name: </label>
      <input id="hero-name" bind:value={hero.name} placeholder="name" />
    </div>
    <button onclick={goBack}>go back</button>
    <button onclick={save}>save</button>
  </div>
{:else}
  <p>Loading hero details...</p>
{/if}

<style>
  label {
    color: #435960;
    font-weight: bold;
  }
  input {
    font-size: 1em;
    padding: 0.5rem;
  }
  button {
    margin-top: 20px;
    margin-right: 0.5rem;
    background-color: #eee;
    padding: 1rem;
    border-radius: 4px;
    font-size: 1rem;
  }
  button:hover {
    background-color: #cfd8dc;
  }
  button:disabled {
    background-color: #eee;
    color: #ccc;
    cursor: auto;
  }
</style>
