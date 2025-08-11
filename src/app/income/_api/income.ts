// For Client Components - HTTP requests
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export async function fetchIncome() {
  const response = await fetch(`${baseUrl}/api/income`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch income: ${response.status}`);
  }
  
  return response.json();
}

export async function createIncome(data: { name: string; frequency: string, amount: number }) {
  const response = await fetch(`${baseUrl}/api/income`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create income')
  }
  
  return response.json();
}


export async function updateIncome(data: { id: string, name: string, frequency: string, amount: number}) {
  const response = await fetch(`${baseUrl}/api/income/${data.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name,
      frequency: data.frequency,
      amount: data.amount
    }),
  });

    if (!response.ok) {
    throw new Error('Failed to update income');
  }
  
  return response.json()

}


export async function deleteIncome(data: { id: string }) {

  
  const response = await fetch(`${baseUrl}/api/income/${data.id}`, {
    method: 'DELETE'
  });

    if (!response.ok) {
    throw new Error('Failed to delete income');
    }
  
  return response.json()

}