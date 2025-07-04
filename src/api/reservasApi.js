// --- RESERVAS ---
import { getAuthHeaders } from './api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export async function getReservas(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/reservas${query ? `?${query}` : ''}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al obtener reservas');
  return res.json();
}

export async function createReserva(data) {
  const res = await fetch(`${API_URL}/reservas`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear reserva');
  return res.json();
}

export async function updateReserva(id, data) {
  const res = await fetch(`${API_URL}/reservas/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar reserva');
  return res.json();
}

export async function deleteReserva(id) {
  const res = await fetch(`${API_URL}/reservas/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al eliminar reserva');
  return res.json();
}
