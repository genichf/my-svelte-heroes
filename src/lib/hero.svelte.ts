import type { Hero } from './types';
import { messageService } from './message.svelte';

// Створюємо реактивний стан
let heroes = $state<Hero[]>([]);
let isLoading = $state(false);

export const heroService = {
  // Геттери для доступу до стану
  get all() { return heroes; },
  get loading() { return isLoading; },

  // 1. Завантаження всіх героїв
  async loadAll() {
    isLoading = true;
    try {
      const response = await fetch('/api/heroes');
      if (!response.ok) throw new Error('Failed to fetch');

      heroes = await response.json();
      messageService.add('HeroService: fetched heroes');
    } catch (error) {
      console.error('Fetch failed', error);
      messageService.add('HeroService: Error fetching heroes');
    } finally {
      isLoading = false;
    }
  },

  // 2. Додавання нового героя
  async add(name: string) {
    try {
      const response = await fetch('/api/heroes', {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Failed to add hero');

      const newHero = await response.json();
      heroes.push(newHero);
      messageService.add(`HeroService: added hero w/ id=${newHero.id}`);
    } catch (error) {
      messageService.add('HeroService: Error adding hero');
    }
  },

  // 3. Видалення героя
  async delete(id: number) {
    try {
      const response = await fetch(`/api/heroes/${id}`, { method: 'DELETE' });

      if (!response.ok) throw new Error('Failed to delete hero');

      heroes = heroes.filter(h => h.id !== id);
      messageService.add(`HeroService: deleted hero id=${id}`);
    } catch (error) {
      messageService.add(`HeroService: Error deleting hero id=${id}`);
    }
  },

  // 4. Оновлення героя
  async update(updatedHero: Hero) {
    try {
      const response = await fetch(`/api/heroes`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedHero)
      });

      if (response.ok) {
        const index = heroes.findIndex(h => h.id === updatedHero.id);
        if (index !== -1) {
          heroes[index] = updatedHero;
          messageService.add(`HeroService: updated hero id=${updatedHero.id}`);
        }
      } else {
        throw new Error('Update failed on server');
      }
    } catch (error) {
      console.error('Update failed', error);
      messageService.add(`HeroService: Error updating hero id=${updatedHero.id}`);
    }
  }
};