// src/routes/api/heroes/[id]/+server.ts
import { json } from '@sveltejs/kit';
import { heroes } from '$lib/server/db';

// GET /api/heroes/[id] - Отримання одного героя за ID (getHero)
export async function GET({ params }) {
    const id = Number(params.id);
    const hero = heroes.find(h => h.id === id);

    if (hero) {
        return json(hero);
    }

    return json({ message: 'Hero not found' }, { status: 404 });
}

// DELETE /api/heroes/[id] - Видалення героя (deleteHero)
export async function DELETE({ params }) {
    const id = Number(params.id);
    const index = heroes.findIndex(h => h.id === id);

    if (index !== -1) {
        // Видаляємо з масиву
        heroes.splice(index, 1);
        return json(null, { status: 204 });
    }

    // Навіть якщо героя не знайдено, зазвичай повертають 204 або 404
    return json({ message: 'Hero not found' }, { status: 404 });
}