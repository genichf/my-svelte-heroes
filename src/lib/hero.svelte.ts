// src/lib/hero.svelte.ts
import type { Hero } from './types';
import { messageService } from './message.svelte';

// Створюємо реактивний стан (аналог heroesSignal в Angular)
let heroes = $state<Hero[]>([]);
let isLoading = $state(false);

export const heroService = {
    // Геттери для доступу до стану (read-only)
    get all() { return heroes; },
    get loading() { return isLoading; },

    // Методи (аналоги методів з Angular HeroService)
    async loadAll() {
        isLoading = true;
        // Тут буде запит до API, поки що імітуємо завантаження
        const response = await fetch('/api/heroes');
        heroes = await response.json();
        isLoading = false;
    },

    async add(name: string) {
        const response = await fetch('/api/heroes', {
            method: 'POST',
            body: JSON.stringify({ name }),
            headers: { 'Content-Type': 'application/json' }
        });
        const newHero = await response.json();
        // В Svelte 5 ми просто мутуємо масив або перепризначаємо його
        heroes.push(newHero);
    },

    async delete(id: number) {
        await fetch(`/api/heroes/${id}`, { method: 'DELETE' });
        heroes = heroes.filter(h => h.id !== id);
    },

    async update(updatedHero: Hero) {
        try {
            const response = await fetch(`/api/heroes`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }, // 🟢 Важливо для API
                body: JSON.stringify(updatedHero)
            });

            if (response.ok) {
                const index = heroes.findIndex(h => h.id === updatedHero.id);
                if (index !== -1) {
                    heroes[index] = updatedHero;
                    // 🟢 Додаємо повідомлення, як в Angular версії
                    messageService.add(`HeroService: updated hero id=${updatedHero.id}`);
                }
            }
        } catch (error) {
            console.error('Update failed', error);
            messageService.add(`HeroService: update failed for id=${updatedHero.id}`);
        }
    }
};