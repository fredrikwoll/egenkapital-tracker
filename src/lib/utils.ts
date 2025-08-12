// Currency symbols mapping
const CURRENCY_SYMBOLS: Record<string, string> = {
    'NOK': 'kr',
    'USD': '$',
    'EUR': '€',
    'GBP': '£'
};

// Settings type (until we have proper context)
type FormatSettings = {
    currency: string;
    numberFormat: string;
    currencyDisplay: string;
}

// Format number according to user's number format setting
function formatNumber(amount: number, numberFormat: string): string {
    const absAmount = Math.abs(amount);
    const formatted = absAmount.toFixed(2);
    
    switch (numberFormat) {
        case '1,234.56': // US/UK format
            return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        case '1 234,56': // Norwegian/French format
            return formatted.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        case '1.234,56': // German/Italian format
            return formatted.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        case '1\'234.56': // Swiss format
            return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, '\'');
        default:
            return formatted;
    }
}

// Format øre amount with user settings (e.g., 12595 øre -> "125,95 kr" based on settings)
export function formatAmountWithSettings(øreAmount: number, settings: FormatSettings): string {
    const kronerAmount = øreAmount / 100;
    const formattedNumber = formatNumber(kronerAmount, settings.numberFormat);
    const symbol = CURRENCY_SYMBOLS[settings.currency] || settings.currency;
    
    switch (settings.currencyDisplay) {
        case 'symbol': // kr 1,234
            return `${symbol} ${formattedNumber}`;
        case 'code': // NOK 1,234
            return `${settings.currency} ${formattedNumber}`;
        case 'symbol-after': // 1,234 kr
            return `${formattedNumber} ${symbol}`;
        case 'code-after': // 1,234 NOK
            return `${formattedNumber} ${settings.currency}`;
        default:
            return `${formattedNumber} ${symbol}`;
    }
}

// Legacy function for backward compatibility (uses Norwegian defaults)
export function formatAmount(øreAmount: number): string {
    const defaultSettings: FormatSettings = {
        currency: 'NOK',
        numberFormat: '1 234,56',
        currencyDisplay: 'symbol-after'
    };
    return formatAmountWithSettings(øreAmount, defaultSettings);
}

// Parse kroner input to øre (e.g., "125.95" -> 12595 øre)
export function parseAmount(kronerInput: string | number): number {
    const amount = typeof kronerInput === 'string' ? parseFloat(kronerInput) : kronerInput;
    return Math.round(amount * 100);
}