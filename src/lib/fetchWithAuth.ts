import { redirect } from 'next/navigation';

export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, {
    ...init,
    credentials: 'include'
  });

  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      window.location.href = '/auth'; // redireciona no client
    } else {
      // em caso de SSR (Server-Side Rendering), pode lançar ou tratar de forma diferente
      redirect('/auth');
    }
  }

  return res;
}
