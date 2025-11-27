const BASE = 'https://jsonplaceholder.typicode.com';

export async function getUsers() {
  const res = await fetch(`${BASE}/users`);
  if (!res.ok) throw new Error('Erro ao buscar usuários');
  return res.json();
}

export async function getUser(id) {
  const res = await fetch(`${BASE}/users/${id}`);
  if (!res.ok) throw new Error('Erro ao buscar usuário');
  return res.json();
}

export async function getUserPosts(id) {
  const res = await fetch(`${BASE}/users/${id}/posts`);
  if (!res.ok) throw new Error('Erro ao buscar posts');
  return res.json();
}
