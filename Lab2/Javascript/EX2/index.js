document.getElementById('generate').addEventListener('click', generateTable);
document.getElementById('rows').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    generateTable();
  }
});
document.getElementById('cols').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    generateTable();
  }
});

function generateTable() {
  const rows = parseInt(document.getElementById('rows').value);
  const cols = parseInt(document.getElementById('cols').value);

  if (rows > 0 && cols > 0) {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = ''; // Clear any existing table

    const table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < cols; j++) {
        const cell = document.createElement('td');
        cell.textContent = `(${i + 1}, ${j + 1})`;
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
    tableContainer.appendChild(table);
  } else {
    alert('Please enter valid row and column values.');
  }
}