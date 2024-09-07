// src/utils/safeStringify.ts
export function safeStringify(obj: any) {
    const seen = new WeakSet();
    return JSON.stringify(obj, function (_key, value) {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return; // Discard circular references
            }
            seen.add(value);
        }
        return value;
    });
}
