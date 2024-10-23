export function generateId() {
    return (
        performance.now().toString(24) +
        '-' +
        crypto.getRandomValues(new Uint32Array(1))[0].toString(24)
    );
}
