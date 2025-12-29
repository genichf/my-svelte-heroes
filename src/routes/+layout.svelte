<script lang="ts">
    import { messageService } from '$lib/message.svelte';
    import favicon from '$lib/assets/favicon.svg';
    // import '../app.css'; // Розкоментуй, коли створиш файл у папці src/

    let { children } = $props(); // Це обов'язково для Svelte 5
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <title>Tour of Heroes</title>
</svelte:head>

<h1>Tour of Heroes</h1>
<nav>
    <a href="/">Dashboard</a>
    <a href="/heroes">Heroes</a>
</nav>

{@render children()}

{#if messageService.all.length}
    <div class="messages">
        <h2>Messages</h2>
        <button onclick={() => messageService.clear()}>Clear messages</button>
        {#each messageService.all as message}
            <div>{message}</div>
        {/each}
    </div>
{/if}

<style>
    /* Можеш додати трохи стилів прямо сюди для перевірки */
    nav a {
        margin-right: 10px;
        padding: 5px 10px;
        text-decoration: none;
        background: #eee;
        border-radius: 4px;
    }
    .messages {
        margin-top: 20px;
        color: #8d1b1b;
    }
</style>
