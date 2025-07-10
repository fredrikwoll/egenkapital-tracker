import { Decimal } from '@prisma/client/runtime/library';

type WithDecimalAmount = {
    amount: Decimal;
};

type WithNumberAmount<T> = Omit<T, 'amount'> & { amount: number };

// Overloads for bedre type inference
export function transformAmount<T extends WithDecimalAmount>(data: T[]): WithNumberAmount<T>[];
export function transformAmount<T extends WithDecimalAmount>(data: T): WithNumberAmount<T>;
export function transformAmount<T extends WithDecimalAmount>(
    data: T | T[]
): WithNumberAmount<T> | WithNumberAmount<T>[] {
    const transform = (item: T): WithNumberAmount<T> => ({
        ...item,
        amount: item.amount.toNumber()
    });
    
    if (Array.isArray(data)) {
        return data.map(transform);
    }
    
    return transform(data);
}