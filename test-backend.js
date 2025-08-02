// Script de prueba para verificar la conexión con el backend
const API_URL = 'http://localhost:8000/api';

async function testBackendConnection() {
  console.log('🔗 Probando conexión con:', API_URL);
  
  try {
    // Probar endpoint de salones
    const salonesResponse = await fetch(`${API_URL}/ajustes/salones`);
    console.log('📡 Respuesta de salones:', salonesResponse.status, salonesResponse.statusText);
    
    if (salonesResponse.ok) {
      const salonesData = await salonesResponse.json();
      console.log('📋 Datos crudos de salones:', salonesData);
      
      // Procesar datos
      const salonesProcessed = Array.isArray(salonesData) ? salonesData : 
                               (salonesData.data && Array.isArray(salonesData.data)) ? salonesData.data : [];
      console.log('📋 Datos procesados de salones:', salonesProcessed);
    }
    
    // Probar endpoint de mesas
    const mesasResponse = await fetch(`${API_URL}/ajustes/mesas`);
    console.log('📡 Respuesta de mesas:', mesasResponse.status, mesasResponse.statusText);
    
    if (mesasResponse.ok) {
      const mesasData = await mesasResponse.json();
      console.log('🍽️ Datos crudos de mesas:', mesasData);
      
      // Procesar datos
      const mesasProcessed = Array.isArray(mesasData) ? mesasData : 
                             (mesasData.data && Array.isArray(mesasData.data)) ? mesasData.data : [];
      console.log('🍽️ Datos procesados de mesas:', mesasProcessed);
    }
    
    // Probar endpoint de clientes
    const clientesResponse = await fetch(`${API_URL}/ajustes/clientes`);
    console.log('📡 Respuesta de clientes:', clientesResponse.status, clientesResponse.statusText);
    
    if (clientesResponse.ok) {
      const clientesData = await clientesResponse.json();
      console.log('👥 Datos crudos de clientes:', clientesData);
      
      // Procesar datos
      const clientesProcessed = Array.isArray(clientesData) ? clientesData : 
                                (clientesData.data && Array.isArray(clientesData.data)) ? clientesData.data : [];
      console.log('👥 Datos procesados de clientes:', clientesProcessed);
    }
    
    // Probar endpoint de reservas
    const reservasResponse = await fetch(`${API_URL}/reservas`);
    console.log('📡 Respuesta de reservas:', reservasResponse.status, reservasResponse.statusText);
    
    if (reservasResponse.ok) {
      const reservasData = await reservasResponse.json();
      console.log('📅 Datos crudos de reservas:', reservasData);
      
      // Procesar datos
      const reservasProcessed = Array.isArray(reservasData) ? reservasData : 
                                (reservasData.data && Array.isArray(reservasData.data)) ? reservasData.data : [];
      console.log('📅 Datos procesados de reservas:', reservasProcessed);
    }
    
    console.log('✅ Prueba de conexión completada');
    
  } catch (error) {
    console.error('❌ Error en la prueba de conexión:', error);
  }
}

// Ejecutar la prueba
testBackendConnection();
