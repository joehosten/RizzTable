async function updateTable() {
    const rizzTable = document.getElementById('rizzTable');
    rizzTable.innerHTML = ''; 

    try {
        const response = await fetch('https://api.rizz.joehosten.me/api/rizz');
        
        if (!response.ok) {
            console.error('Failed to fetch data:', response.statusText);
            return;
        }

        const data = await response.json();

        data.sort((a, b) => b.rizz - a.rizz);

        data.forEach(entry => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const rizzCell = document.createElement('td');

            nameCell.textContent = entry.name;
            rizzCell.textContent = entry.rizz;

            row.appendChild(nameCell);
            row.appendChild(rizzCell);
            rizzTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.getElementById('rizzForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const nameInput = document.getElementById('name').value.trim();

    if (!nameInput) {
        alert('Please enter a valid name.');
        return;
    }

    const randomRizzValue = Math.floor(Math.random() * 100) + 1;

    try {
        const response = await fetch('https://api.rizz.joehosten.me/api/rizz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: nameInput, rizz: randomRizzValue })
        });

        if (response.ok) {
            await updateTable(); 
        } else {
            const errorData = await response.json();
            alert(errorData.message); 
        }
    } catch (error) {
        console.error('Error submitting data:', error);
        alert('Failed to submit data, please try again later.');
    }
});

document.addEventListener('DOMContentLoaded', updateTable);
