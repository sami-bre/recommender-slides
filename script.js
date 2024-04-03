const sliderElements = document.querySelectorAll('input[type="range"]');
var sliderValues = [20, 20, 20, 10, 10]; // Initial values (modify as needed)

const updateDisplay = () => {
    sliderElements.forEach((slider, index) => {
        slider.value = sliderValues[index].toFixed(2); // Set value with 2 decimals
        slider.nextElementSibling.textContent = slider.value;
    });
};

updateDisplay(); // Set initial display

sliderElements.forEach(slider => {
    slider.addEventListener('mouseup', (event) => {
        const changedIndex = event.target.dataset.index;
        const delta = parseFloat(event.target.value) - sliderValues[changedIndex];

        sliderValues = update_slider_values(sliderValues, changedIndex, delta);

        updateDisplay();
    });
});

// Add data-index attribute to each slider (optional, but helps identify the changed slider)
sliderElements.forEach((slider, index) => {
    slider.dataset.index = index;
});



function update_slider_values(slider_values, slider_index, delta) {
    
    if(delta > 0) {
        // slider value increased
        spaces = slider_values.slice(); // creating a copy
        total_space = 0;
        for(i = 0; i < spaces.length; i++) {
            if(i != slider_index) {
                total_space += spaces[i];
            }
        }
        for(i = 0; i < spaces.length; i++) {
            if(i != slider_index) {
                slider_values[i] = slider_values[i] - (delta * spaces[i] / total_space);
            }
        }
    } else {
        // slider value decreased
        spaces = slider_values.map(x => 80.0 - x);
        total_space = 0;
        for(i = 0; i < spaces.length; i++) {
            if(i != slider_index) {
                total_space += spaces[i];
            }
        }
        for(i = 0; i < spaces.length; i++) {
            if(i != slider_index) {
                slider_values[i] = slider_values[i] - (delta * spaces[i] / total_space);
            }
        }
    }

    slider_values[slider_index] = slider_values[slider_index] + delta;
  
    // Return the updated slider values
    return slider_values;
  }