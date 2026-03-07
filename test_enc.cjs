const str = 'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¡';
function decodeRecursive(s, depth) {
    if (depth === 0) return s;
    try {
        let b = Buffer.from(s, 'utf8').toString('latin1');
        let res = decodeRecursive(b, depth - 1);
        return res;
    } catch (e) { return s; }
}

for (let i = 1; i <= 5; i++) {
    console.log(`Depth ${i}:`, decodeRecursive(str, i));
}
