import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
    // 307 - це тимчасовий редірект, 308 - постійний
    throw redirect(307, '/dashboard');
};