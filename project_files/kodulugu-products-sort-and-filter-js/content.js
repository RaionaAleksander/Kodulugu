document.addEventListener('DOMContentLoaded', () => {
    const minSlider = document.getElementById('js__min-slider');
    const maxSlider = document.getElementById('js__max-slider');
    const minPriceInput = document.getElementById('js__min-price');
    const maxPriceInput = document.getElementById('js__max-price');
    const nameInput = document.getElementById('js__name-input');
    const warningMessage = document.getElementById('js__name-warning');
    const sortSelector = document.getElementById('js__product-order');

    let filterTimeout;

    function formatToTwoDecimalPlaces(value) {
        return parseFloat(value).toFixed(2);
    }

    function syncSliderWithInput() {
        minPriceInput.value = formatToTwoDecimalPlaces(minSlider.value);
        maxPriceInput.value = formatToTwoDecimalPlaces(maxSlider.value);
    }

    function syncInputWithSlider() {
        minSlider.value = formatToTwoDecimalPlaces(minPriceInput.value);
        maxSlider.value = formatToTwoDecimalPlaces(maxPriceInput.value);
    }

    function updateURL() {
        const params = new URLSearchParams(window.location.search);

        const minValue = parseFloat(minPriceInput.value);
        const maxValue = parseFloat(maxPriceInput.value);

        const minInputValue = parseFloat(minPriceInput.getAttribute('min'));
        const maxInputValue = parseFloat(maxPriceInput.getAttribute('max'));

        const currentMinQuery = parseFloat(params.get('price_from'));
        const currentMaxQuery = parseFloat(params.get('price_to'));
        
        if (minValue <= minInputValue || (currentMinQuery !== undefined && currentMinQuery < minInputValue)) {
            params.delete('price_from');
        } else {
            params.set('price_from', minValue.toFixed(2));
        }

        if (maxValue >= maxInputValue || (currentMaxQuery !== undefined && currentMaxQuery > maxInputValue)) {
            params.delete('price_to');
        } else {
            params.set('price_to', maxValue.toFixed(2));
        }

        const nameValue = nameInput.value.trim();

        if (nameValue.length >= 3) {
            params.set('search', nameValue);
        } else {
            params.delete('search');
        }

        const selectedSort = params.get('product_list_order');

        const allowedValues = ["price-asc", "price-desc", "name-asc", "name-desc"];

        if (!selectedSort || !allowedValues.includes(selectedSort)) {
            params.delete('product_list_order');
        } else {
            params.set('product_list_order', selectedValue);
        }

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState(null, '', newUrl);
    }

    function scheduleReload() {
        clearTimeout(filterTimeout);
        filterTimeout = setTimeout(() => {
            updateURL();
            window.location.reload();
        }, 2000);
    }

    function handleSliderChange() {
        const minValue = parseFloat(minSlider.value);
        const maxValue = parseFloat(maxSlider.value);

        if (minValue > maxValue) {
            minSlider.value = maxValue;
            minPriceInput.value = formatToTwoDecimalPlaces(maxValue);
        } else if (maxValue < minValue) {
            maxSlider.value = minValue;
            maxPriceInput.value = formatToTwoDecimalPlaces(minValue);
        }

        syncSliderWithInput();
        scheduleReload();
    }

    function handleInputChange() {
        const minValue = parseFloat(minPriceInput.value) || parseFloat(minPriceInput.getAttribute('min'));
        const maxValue = parseFloat(maxPriceInput.value) || parseFloat(maxPriceInput.getAttribute('max'));

        if (minValue > maxValue) {
            minPriceInput.value = formatToTwoDecimalPlaces(maxValue);
            minSlider.value = formatToTwoDecimalPlaces(maxValue);
        }

        if (maxValue < minValue) {
            maxPriceInput.value = formatToTwoDecimalPlaces(minValue);
            maxSlider.value = formatToTwoDecimalPlaces(minValue);
        }

        syncInputWithSlider();
        scheduleReload();
    }

    function clearInvalidSearchParam() {
        const params = new URLSearchParams(window.location.search);
        const currentSearchValue = params.get('search');

        if (currentSearchValue && currentSearchValue.length < 3) {
            params.delete('search');
            const newUrl = `${window.location.pathname}?${params.toString()}`;
            window.history.replaceState(null, '', newUrl);
            window.location.reload();
        }
    }

    function handleNameInputChange() {
        clearTimeout(filterTimeout);

        const nameValue = nameInput.value.trim();
        if (nameValue.length >= 3 || nameValue.length == 0) {
            warningMessage.style.display = 'none';
            filterTimeout = setTimeout(() => {
                updateURL();
                window.location.reload();
            }, 2000);
        } else {
            warningMessage.style.display = 'block';
        }
    }

    function handleSortChange() {
        clearTimeout(filterTimeout);

        const selectedValue = sortSelector.value.trim();

        filterTimeout = setTimeout(() => {
            const params = new URLSearchParams(window.location.search);

            if (!selectedValue) {
                params.delete('product_list_order');
            } else {
                params.set('product_list_order', selectedValue);
            }
            const newUrl = `${window.location.pathname}?${params.toString()}`;
            window.history.replaceState(null, '', newUrl);
            window.location.reload();
        }, 2000);
    }

    minSlider.addEventListener('input', handleSliderChange);
    maxSlider.addEventListener('input', handleSliderChange);
    minPriceInput.addEventListener('input', handleInputChange);
    maxPriceInput.addEventListener('input', handleInputChange);
    nameInput.addEventListener('input', handleNameInputChange);
    sortSelector.addEventListener('change', handleSortChange);

    clearInvalidSearchParam();
    updateURL();
});