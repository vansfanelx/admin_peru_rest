
/// <reference types="vite/client" />
// Centraliza todas las llamadas a la API (login, salones, etc)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// --- LOGIN ---
export async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
}

export async function logout() {
  try {
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
  } catch (e) {
    // Ignorar errores de red o backend
  }
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
}

export async function loginMozo(code: string) {
  const response = await fetch(`${API_URL}/admin/multimozo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  return response.json();
}

// --- SALONES ---
function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
}

export async function getSalones() {
  const res = await fetch(`${API_URL}/ajuste/salones`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al obtener salones');
  return res.json();
}


export async function createSalon(nombre: string) {
  // El backend espera 'descripcion' como campo
  const res = await fetch(`${API_URL}/ajuste/salones`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ descripcion: nombre }),
  });
  if (!res.ok) throw new Error('Error al crear salón');
  return res.json();
}


export async function updateSalon(id: number, nombre: string) {
  // El backend espera 'descripcion' como campo
  const res = await fetch(`${API_URL}/ajuste/salones/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ descripcion: nombre }),
  });
  if (!res.ok) throw new Error('Error al editar salón');
  return res.json();
}

export async function deleteSalon(id: number) {
  const res = await fetch(`${API_URL}/ajuste/salones/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al eliminar salón');
  return res.json();
}

// --- MESAS ---
export async function getMesas() {
  const res = await fetch(`${API_URL}/ajuste/mesas`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al obtener mesas');
  return res.json();
}

export async function createMesa({ id_salon, nro_mesa, capacidad, descripcion, imagen, estado }) {
  const res = await fetch(`${API_URL}/ajuste/mesas`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ id_salon, nro_mesa, capacidad, descripcion, imagen, estado }),
  });
  if (!res.ok) throw new Error('Error al crear mesa');
  return res.json();
}

export async function updateMesa(id, { id_salon, nro_mesa, capacidad, descripcion, imagen, estado }) {
  const res = await fetch(`${API_URL}/ajuste/mesas/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ id_salon, nro_mesa, capacidad, descripcion, imagen, estado }),
  });
  if (!res.ok) throw new Error('Error al editar mesa');
  return res.json();
}

export async function deleteMesa(id) {
  const res = await fetch(`${API_URL}/ajuste/mesas/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al eliminar mesa');
  return res.json();
}

// --- RESERVAS ---
export async function getReservas(params: Record<string, any> = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/reservas${query ? `?${query}` : ''}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al obtener reservas');
  return res.json();
}

export async function createReserva(data: Record<string, any>) {
  const res = await fetch(`${API_URL}/reservas`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear reserva');
  return res.json();
}

export async function updateReserva(id: number, data: Record<string, any>) {
  const res = await fetch(`${API_URL}/reservas/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar reserva');
  return res.json();
}

export async function deleteReserva(id: number) {
  const res = await fetch(`${API_URL}/reservas/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al eliminar reserva');
  return res.json();
}