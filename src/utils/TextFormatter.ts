export const capitalizeWords = (value: string): string =>
    value.trim().toLowerCase().replace(/(^|\s)\p{L}/gu, letra => letra.toUpperCase());