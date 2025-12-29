<script lang="ts">
    import { heroService } from '$lib/hero.svelte';
    import HeroSearch from '$lib/components/HeroSearch.svelte';
    import { onMount } from 'svelte';

    // Створюємо реактивний список топ-4 героїв
    let topHeroes = $derived(heroService.all.slice(1, 5));

    onMount(() => {
        // Завантажуємо дані, якщо їх ще немає в сервісі
        if (heroService.all.length === 0) {
            heroService.loadAll();
        }
    });
</script>

<h2>Top Heroes</h2>

<div class="grid">
    {#each topHeroes as hero}
        <a href="/detail/{hero.id}" class="card">
            {hero.name}
        </a>
    {/each}
</div>

<HeroSearch />

<style>
    .grid {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
    }
    .card {
        padding: 1.5rem;
        background-color: #3f51b5;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        text-align: center;
        flex: 1;
        transition: background-color 0.3s;
    }
    .card:hover {
        background-color: #303f9f;
    }
</style>