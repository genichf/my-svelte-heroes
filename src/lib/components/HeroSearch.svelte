<script lang="ts">
    import { heroService } from '$lib/hero.svelte';
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
    #search-component {
        margin-top: 1rem;
    }
    #search-box {
        width: 200px;
        height: 2rem;
    }
    .search-result {
        border-left: 1px solid gray;
        border-right: 1px solid gray;
        border-bottom: 1px solid gray;
        width: 205px;
        padding: 0;
        margin: 0;
        list-style-type: none;
        background-color: white;
    }
    .search-result li {
        border-bottom: 1px solid gray;
        padding: 5px;
    }
    .search-result li a {
        text-decoration: none;
        color: #333;
        display: block;
    }
    .search-result li a:hover {
        background-color: #607D8B;
        color: white;
    }
</style>