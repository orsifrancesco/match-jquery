function generateShades(baseColor, numberOfShades) {

    const shades = [];

    function hexToRgb(hex) {
        hex = hex.replace(/^#/, '');
        const bigint = parseInt(hex, 16);
        return [
            (bigint >> 16) & 255,
            (bigint >> 8) & 255,
            bigint & 255,
        ];
    }

    function rgbToHex(r, g, b) {
        return (
            '#' +
            ((1 << 24) + (r << 16) + (g << 8) + b)
                .toString(16)
                .slice(1)
                .toUpperCase()
        );
    }

    const [r, g, b] = hexToRgb(baseColor);

    for (let i = 0; i < numberOfShades; i++) {
        const factor = i / numberOfShades;
        const newR = Math.round(r + (255 - r) * factor);
        const newG = Math.round(g + (255 - g) * factor);
        const newB = Math.round(b + (255 - b) * factor);
        shades.push(rgbToHex(newR, newG, newB));
    }

    return shades;
}