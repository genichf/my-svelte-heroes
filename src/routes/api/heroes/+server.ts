import { json } from '@sveltejs/kit';
import { heroes, genId } from '$lib/server/db';

// GET /api/heroes - Отримання списку або пошук
export async function GET({ url }) {
  // Імітуємо затримку мережі
  await new Promise(resolve => setTimeout(resolve, 500));

  const name = url.searchParams.get('name');

  if (name) {
    // Логіка пошуку (searchHeroes)
    const filteredHeroes = heroes.filter(h =>
      h.name.toLowerCase().includes(name.toLowerCase())
    );
    return json(filteredHeroes);
  }

  // Повертаємо всіх героїв (getHeroes)
  return json(heroes);
}

// POST /api/heroes - Додавання нового героя (addHero)
export async function POST({ request }) {
  const { name } = await request.json();

  if (!name) {
    return json({ message: 'Name is required' }, { status: 400 });
  }

  const newHero = { id: genId(), name };
  // Оновлюємо масив у нашому "db.ts"
  // Ми використовуємо push, бо в db.ts масив оголошений через let/export
  heroes.push(newHero);

  return json(newHero, { status: 201 });
}

// PUT /api/heroes - Оновлення існуючого героя (updateHero)
export async function PUT({ request }) {
  const updatedHero = await request.json();
  const index = heroes.findIndex(h => h.id === updatedHero.id);

  if (index !== -1) {
    heroes[index] = updatedHero;
    return new Response(null, { status: 204 }); // 204 No Content - успіх без тіла відповіді
  }

  return json({ message: 'Hero not found' }, { status: 404 });
}