<script lang="ts">
  import { messageService } from '$lib/message.svelte';
</script>

{#if messageService.all.length}
  <div class="messages">
    <h2>Messages</h2>
    <button class="clear" onclick={() => messageService.clear()}
      >Clear messages</button
    >
    {#each messageService.all as message}
      <div>{message}</div>
    {/each}
  </div>
{/if}

<style>
  /* MessagesComponent's private CSS styles */
  h2 {
    color: #a80000;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
  }

  .clear {
    color: #333;
    background-color: #eee;
    margin-bottom: 12px;
    padding: 1rem;
    border-radius: 4px;
    font-size: 1rem;
  }
  .clear:hover {
    color: white;
    background-color: #42545c;
  }
</style>
