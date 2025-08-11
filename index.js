const colorDisplay = document.getElementById('color-display');
const colorSelectionForm = document.querySelector('.color-selection-form');
const colorPaletteSelect = document.getElementById('color-palette-select');
const schemeModeSelect = document.getElementById('scheme-mode-select');
const submitButton = document.getElementById('submit-button');
const displayPalette = document.getElementById('display-palette');

async function fetchColorScheme(hexValue, mode) {
   const cleanHexValue = hexValue.startsWith('#') ? hexValue.substring(1) : hexValue;
    const count = 6;
    const apiUrl = `https://www.thecolorapi.com/scheme?hex=${cleanHexValue}&mode=${mode}&count=${count}&format=json`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (colorDisplay && data.seed && data.seed.hex && data.seed.hex.value) {
            colorDisplay.style.backgroundColor = data.seed.hex.value;
        }

        displayPalette.innerHTML = '';

        if (data.colors && data.colors.length > 0) {
            data.colors.forEach(color => {
                const colorColumn = document.createElement('div');

                const colorBlock = document.createElement('div');
                colorBlock.className = 'color-block';
                colorBlock.style.backgroundColor = color.hex.value;

                const hexText = document.createElement('p');
                hexText.className = 'hex-text';
                hexText.textContent = color.hex.value;
                hexText.style.color = '#000000';
                
                colorColumn.appendChild(colorBlock);
                colorColumn.appendChild(hexText);
                displayPalette.appendChild(colorColumn);
            });
        } else {
            displayPalette.textContent = "No color scheme found for the selected color.";
        }
        return data;
    } catch (error) {
        console.error("Error fetching color scheme:", error);
        displayPalette.textContent = "Failed to load color scheme. Please try again later.";
    }
}

colorPaletteSelect.addEventListener('change', (event) => {
    const selectedColorHex = event.target.value;
    colorDisplay.style.backgroundColor = selectedColorHex;
});

colorSelectionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const selectedColorHex = colorPaletteSelect.value;
    const selectedMode = schemeModeSelect.value;
    fetchColorScheme(selectedColorHex, selectedMode);
});

document.addEventListener('DOMContentLoaded', () => {
    const initialHex = colorPaletteSelect.value;
    const initialMode = schemeModeSelect.value;
    colorDisplay.style.backgroundColor = initialHex;
    fetchColorScheme(initialHex, initialMode);
});
