// src/app/env-injector.ts
export const Env = {
    apiUrl: (window as any).__env?.apiUrl || 'http://localhost:8030'
  };
  