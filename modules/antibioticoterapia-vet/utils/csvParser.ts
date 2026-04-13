
export function parseCSV(text: string): string[][] {
  // Normalize BOM and EOL
  text = String(text || '').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  const rows: string[][] = [];
  let i = 0, currentCell = '', inQuotes = false;
  
  const pushCell = () => {
    if (rows.length === 0 || rows[rows.length - 1].length > 0 || currentCell) {
        if (rows.length === 0) rows.push([]);
        rows[rows.length - 1].push(currentCell);
        currentCell = '';
    }
  };
  
  const newRow = () => {
      if (rows.length > 0 && (rows[rows.length - 1].length > 0 || currentCell)) {
        pushCell();
      }
      if (rows.length === 0 || rows[rows.length-1].length > 0) {
        rows.push([]);
      }
  };
  
  newRow();

  while (i < text.length) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          currentCell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        currentCell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        pushCell();
      } else if (char === '\n') {
        newRow();
      } else {
        currentCell += char;
      }
    }
    i++;
  }
  
  pushCell();

  // Clean up empty trailing rows
  return rows.filter(row => row.length > 0 && row.some(cell => cell.length > 0));
}
