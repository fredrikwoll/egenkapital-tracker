// Format øre amount to kroner display (e.g., 12595 øre -> "125.95 kr")
export function formatAmount(øreAmount: number): string {
    return `${(øreAmount / 100).toFixed(2)} kr`;
}

// Parse kroner input to øre (e.g., "125.95" -> 12595 øre)
export function parseAmount(kronerInput: string | number): number {
    const amount = typeof kronerInput === 'string' ? parseFloat(kronerInput) : kronerInput;
    return Math.round(amount * 100);
}