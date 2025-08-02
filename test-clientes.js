// Script para probar la carga de clientes
const API_URL = 'http://localhost:8000/api';

async function testClientes() {
  console.log('🧪 Probando carga de clientes...');
  
  try {
    // Primero hacer login para obtener token
    const loginResponse = await fetch(`${API_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'admin' })
    });
    
    if (!loginResponse.ok) {
      console.error('❌ Error en login:', loginResponse.status, loginResponse.statusText);
      const errorData = await loginResponse.text();
      console.error('❌ Error body:', errorData);
      return;
    }
    
    const loginData = await loginResponse.json();
    console.log('✅ Login exitoso:', loginData);
    
    const token = loginData.token;
    
    // Ahora obtener clientes
    const clientesResponse = await fetch(`${API_URL}/usuarios-clientes`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
    
    console.log('📡 Respuesta de clientes:', clientesResponse.status, clientesResponse.statusText);
    
    if (!clientesResponse.ok) {
      console.error('❌ Error obteniendo clientes:', clientesResponse.status, clientesResponse.statusText);
      const errorData = await clientesResponse.text();
      console.error('❌ Error body:', errorData);
      return;
    }
    
    const clientesData = await clientesResponse.json();
    console.log('👥 Datos de clientes completos:', JSON.stringify(clientesData, null, 2));
    
    // Analizar estructura
    if (Array.isArray(clientesData)) {
      console.log(`📊 Clientes encontrados: ${clientesData.length}`);
      if (clientesData.length > 0) {
        console.log('🔍 Primer cliente:', JSON.stringify(clientesData[0], null, 2));
      }
    } else if (clientesData && typeof clientesData === 'object') {
      console.log('📊 Estructura de respuesta:', Object.keys(clientesData));
      if (clientesData.data) {
        console.log(`📊 Clientes en data: ${Array.isArray(clientesData.data) ? clientesData.data.length : 'No es array'}`);
        if (Array.isArray(clientesData.data) && clientesData.data.length > 0) {
          console.log('🔍 Primer cliente en data:', JSON.stringify(clientesData.data[0], null, 2));
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Error en prueba:', error);
  }
}

testClientes();
