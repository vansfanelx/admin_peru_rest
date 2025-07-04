/// <reference types="vite/client" />
// Aquí puedes centralizar las llamadas a la API relacionadas al login
const API_URL = import.meta.env.VITE_API_URL + 'admin' || 'http://localhost:8000/api/';


export async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
}

export async function logout() {
  // Obtener el token de autenticación (ajusta la clave según cómo lo guardes)
  const token = localStorage.getItem('token');
  return fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  });
}

// Login para MultiMozo
export async function loginMozo(codigo: string) {
  const response = await fetch(`${API_URL}/multimozo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ codigo }),
  });
  return response.json();
}
