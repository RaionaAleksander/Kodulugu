document.addEventListener('DOMContentLoaded', function () {
    const quantityInput = document.getElementById('js__quantity');
    const productPriceElement = document.getElementById('js__product-price');
    const totalPriceElement = document.getElementById('js__total-price');

    const basePrice = parseFloat(productPriceElement.textContent);

    function updateTotalPrice() {
        const quantity = parseInt(quantityInput.value) || 1;
        const totalPrice = basePrice * quantity;
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    quantityInput.addEventListener('input', updateTotalPrice);

    updateTotalPrice();
});