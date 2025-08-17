// For Client Components - HTTP requests
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export async function fetchSettings() {
  const response = await fetch(`${baseUrl}/api/settings`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch settings: ${response.status}`);
  }
  
  return response.json();
}


export async function updateSettings(data: { id: string, currency: string, dateFormat: string, numberFormat: string, currencyDisplay: string, capitalGoal: number}) {
  const response = await fetch(`${baseUrl}/api/settings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      currency: data.currency,
      dateFormat: data.dateFormat,
      numberFormat: data.numberFormat,
      currencyDisplay: data.currencyDisplay,
      capitalGoal: data.capitalGoal
    }),
  });

    if (!response.ok) {
    throw new Error('Failed to update settings');
  }
  
  return response.json()

}