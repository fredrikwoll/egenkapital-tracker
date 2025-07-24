// For Client Components - HTTP requests
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export async function fetchAccounts() {
  const response = await fetch(`${baseUrl}/api/accounts`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch accounts: ${response.status}`)
  }
  
  return response.json()
}

export async function createAccount(data: { name: string; type: string }) {
  const response = await fetch(`${baseUrl}/api/accounts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    throw new Error('Failed to create account')
  }
  
  return response.json()
}