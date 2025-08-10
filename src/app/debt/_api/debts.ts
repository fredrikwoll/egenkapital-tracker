// For Client Components - HTTP requests
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export async function fetchDebts() {
  const response = await fetch(`${baseUrl}/api/debt`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch debts: ${response.status}`);
  }
  
  return response.json();
}

export async function createDebt(data: { name: string; type: string, amount: number }) {
  const response = await fetch(`${baseUrl}/api/debt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create debt')
  }
  
  return response.json();
}


export async function updateDebt(data: { id: string, name: string, type: string, amount: number}) {
  const response = await fetch(`${baseUrl}/api/debt/${data.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name,
      type: data.type,
      amount: data.amount
    }),
  });

    if (!response.ok) {
    throw new Error('Failed to update debt');
  }
  
  return response.json()

}


export async function deleteDebt(data: { id: string }) {

  
  const response = await fetch(`${baseUrl}/api/debt/${data.id}`, {
    method: 'DELETE'
  });

    if (!response.ok) {
    throw new Error('Failed to delete debt');
    }
  
  return response.json()

}