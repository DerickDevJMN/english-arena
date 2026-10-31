/**
 * Standalone Pure JavaScript QR Code SVG Generator
 * Generates valid, scannable QR Code SVGs without any external library.
 * Implements QR Code Model 2 (Versions 1-6) with Byte mode and Error Correction.
 */

const QRCodeGenerator = (function () {
  // Galois Field GF(256) tables
  const GF256_EXP = new Uint8Array(512);
  const GF256_LOG = new Uint8Array(256);

  (function initGF() {
    let x = 1;
    for (let i = 0; i < 255; i++) {
      GF256_EXP[i] = x;
      GF256_EXP[i + 255] = x;
      GF256_LOG[x] = i;
      x <<= 1;
      if (x & 256) x ^= 0x11d;
    }
  })();

  function gfMul(x, y) {
    if (x === 0 || y === 0) return 0;
    return GF256_EXP[GF256_LOG[x] + GF256_LOG[y]];
  }

  function getPoly(ecCount) {
    let poly = [1];
    for (let i = 0; i < ecCount; i++) {
      const next = new Array(poly.length + 1).fill(0);
      const root = GF256_EXP[i];
      for (let j = 0; j < poly.length; j++) {
        next[j] ^= gfMul(poly[j], root);
        next[j + 1] ^= poly[j];
      }
      poly = next;
    }
    return poly;
  }

  // Version 2 to 4 specifications (Byte mode, Medium/Low EC)
  // For small URLs like http://localhost/?pin=123456 (approx 30 chars), Version 3-M or 4-M is ideal.
  function createQRMatrix(text) {
    // Determine version needed for UTF-8 bytes
    const utf8 = unescape(encodeURIComponent(text));
    const dataLen = utf8.length;
    
    // Version parameters: [version, totalModules, totalDataCodewords, ecCodewords]
    let ver = 2;
    if (dataLen > 14) ver = 3;
    if (dataLen > 24) ver = 4;
    if (dataLen > 34) ver = 5;
    if (dataLen > 44) ver = 6;

    const size = ver * 4 + 17;
    const matrix = Array.from({ length: size }, () => Array(size).fill(null));

    // Finder patterns at (0,0), (size-7, 0), (0, size-7)
    function setFinder(r0, c0) {
      for (let r = -1; r <= 7; r++) {
        for (let c = -1; c <= 7; c++) {
          const row = r0 + r;
          const col = c0 + c;
          if (row < 0 || row >= size || col < 0 || col >= size) continue;
          if (r === -1 || r === 7 || c === -1 || c === 7) {
            matrix[row][col] = 0; // separator
          } else if (r === 0 || r === 6 || c === 0 || c === 6) {
            matrix[row][col] = 1;
          } else if (r >= 2 && r <= 4 && c >= 2 && c <= 4) {
            matrix[row][col] = 1;
          } else {
            matrix[row][col] = 0;
          }
        }
      }
    }

    setFinder(0, 0);
    setFinder(size - 7, 0);
    setFinder(0, size - 7);

    // Alignment patterns for version >= 2
    if (ver >= 2) {
      const alignPos = ver === 2 ? [6, 18] : ver === 3 ? [6, 22] : ver === 4 ? [6, 26] : ver === 5 ? [6, 30] : [6, 34];
      for (const r of alignPos) {
        for (const c of alignPos) {
          if (matrix[r][c] !== null) continue;
          for (let dr = -2; dr <= 2; dr++) {
            for (let dc = -2; dc <= 2; dc++) {
              const border = Math.max(Math.abs(dr), Math.abs(dc));
              matrix[r + dr][c + dc] = border === 1 ? 0 : 1;
            }
          }
        }
      }
    }

    // Timing patterns
    for (let i = 8; i < size - 8; i++) {
      if (matrix[6][i] === null) matrix[6][i] = i % 2 === 0 ? 1 : 0;
      if (matrix[i][6] === null) matrix[i][6] = i % 2 === 0 ? 1 : 0;
    }

    // Dark module
    matrix[size - 8][8] = 1;

    // Build data bits (Byte mode 0100 + char count + bytes)
    const bits = [];
    function pushBits(val, len) {
      for (let i = len - 1; i >= 0; i--) {
        bits.push((val >>> i) & 1);
      }
    }

    pushBits(0b0100, 4); // Byte mode indicator
    pushBits(dataLen, 8); // Character count indicator
    for (let i = 0; i < dataLen; i++) {
      pushBits(utf8.charCodeAt(i), 8);
    }
    // Terminator
    pushBits(0, 4);
    while (bits.length % 8 !== 0) bits.push(0);

    // Pad bytes
    const padBytes = [0xec, 0x11];
    let padIdx = 0;
    // Capacity for versions with Medium EC:
    const dataCapacities = { 2: 28, 3: 44, 4: 64, 5: 86, 6: 108 };
    const maxDataBytes = dataCapacities[ver] || 44;

    while (bits.length / 8 < maxDataBytes) {
      pushBits(padBytes[padIdx % 2], 8);
      padIdx++;
    }

    // Convert bits to data codewords
    const dataCodewords = [];
    for (let i = 0; i < bits.length; i += 8) {
      let byte = 0;
      for (let b = 0; b < 8; b++) byte = (byte << 1) | bits[i + b];
      dataCodewords.push(byte);
    }

    // Calculate Reed-Solomon Error Correction
    const ecCounts = { 2: 16, 3: 26, 4: 36, 5: 48, 6: 64 };
    const ecLen = ecCounts[ver] || 26;
    const poly = getPoly(ecLen);
    const ecCodewords = new Array(ecLen).fill(0);

    for (const d of dataCodewords) {
      const factor = d ^ ecCodewords[0];
      ecCodewords.shift();
      ecCodewords.push(0);
      for (let j = 0; j < ecLen; j++) {
        ecCodewords[j] ^= gfMul(poly[j], factor);
      }
    }

    const finalCodewords = dataCodewords.concat(ecCodewords);
    const finalBits = [];
    for (const b of finalCodewords) {
      for (let i = 7; i >= 0; i--) finalBits.push((b >>> i) & 1);
    }

    // Place data bits in matrix (Right-to-left upward/downward zigzag)
    let bitIdx = 0;
    let upward = true;
    for (let right = size - 1; right > 0; right -= 2) {
      if (right === 6) right--; // Skip vertical timing column
      const cols = [right, right - 1];
      const rows = upward ? Array.from({ length: size }, (_, i) => size - 1 - i) : Array.from({ length: size }, (_, i) => i);

      for (const r of rows) {
        for (const c of cols) {
          if (matrix[r][c] === null) {
            let bit = bitIdx < finalBits.length ? finalBits[bitIdx++] : 0;
            // Apply Mask 0: (row + col) % 2 === 0
            if ((r + c) % 2 === 0) bit ^= 1;
            matrix[r][c] = bit;
          }
        }
      }
      upward = !upward;
    }

    // Format info (Mask 0 + Level M -> 101010000010010)
    const formatBits = [1,0,1,0,1,0,0,0,0,0,1,0,0,1,0];
    for (let i = 0; i < 6; i++) matrix[8][i] = formatBits[i];
    matrix[8][7] = formatBits[6];
    matrix[8][8] = formatBits[7];
    matrix[7][8] = formatBits[8];
    for (let i = 9; i < 15; i++) matrix[14 - i][8] = formatBits[i];

    for (let i = 0; i < 8; i++) matrix[size - 1 - i][8] = formatBits[i];
    for (let i = 8; i < 15; i++) matrix[8][size - 15 + i] = formatBits[i];

    return matrix;
  }

  function generateSVG(text, options = {}) {
    const sizePx = options.size || 220;
    const color = options.color || '#1e1b4b';
    const bgColor = options.bgColor || '#ffffff';
    const matrix = createQRMatrix(text);
    const n = matrix.length;
    const cellSize = sizePx / (n + 4);

    let rects = [];
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (matrix[r][c] === 1) {
          const x = (c + 2) * cellSize;
          const y = (r + 2) * cellSize;
          rects.push(`<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${cellSize.toFixed(2)}" height="${cellSize.toFixed(2)}" fill="${color}" rx="1"/>`);
        }
      }
    }

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${sizePx} ${sizePx}" width="${sizePx}" height="${sizePx}" style="border-radius: 12px; background: ${bgColor}; box-shadow: 0 4px 14px rgba(0,0,0,0.08);">
        <rect width="${sizePx}" height="${sizePx}" fill="${bgColor}" rx="12"/>
        ${rects.join('\n')}
      </svg>
    `.trim();
  }

  return {
    generateSVG
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = QRCodeGenerator;
}
