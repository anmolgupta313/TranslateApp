import { createContext } from 'react';

export const MyContext = createContext({ languages: [], setLanguages: (languages: []) => { } });