import { atom } from 'jotai';

import { UserDto } from '@/types/apollo';

export const userAtom = atom<UserDto | null>(null);
