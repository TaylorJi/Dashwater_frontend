export function isRealNumber(value: string): boolean {
    return /^-?\d+(\.\d+)?$/.test(value);
}
