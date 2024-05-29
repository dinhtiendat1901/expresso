export function convertDateTime(input: string): string {
    const date = new Date(input);

    const pad = (num: number) => num.toString().padStart(2, '0');

    const hours = pad(date.getUTCHours());
    const minutes = pad(date.getUTCMinutes());
    const seconds = pad(date.getUTCSeconds());

    const day = pad(date.getUTCDate());
    const month = pad(date.getUTCMonth() + 1); // Months are zero-based
    const year = date.getUTCFullYear();

    return `Time: ${hours}:${minutes}:${seconds} Date: ${day}-${month}-${year}`;
}


