document.addEventListener("DOMContentLoaded", function () {
    const priceElements = document.querySelectorAll(".js__payment-cart-item-price");
    const amountElements = document.querySelectorAll(".js__payment-cart-item-ammount");

    let totalItems = 0;
    let totalPrice = 0;

    priceElements.forEach((priceElement, index) => {
        const price = parseFloat(priceElement.textContent.trim());
        const amount = parseInt(amountElements[index].textContent.trim());

        totalItems += amount;
        totalPrice += price * amount;
    });

    document.getElementById("js__payment-total-items").textContent = totalItems;
    document.getElementById("js__payment-total-price").textContent = totalPrice.toFixed(2);
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.payment-cart-actions').forEach(cartItem => {
        const productAmountSpan = cartItem.querySelector('.js__payment-cart-item-ammount');
        const productAmountInput = cartItem.querySelector('.js__payment-product-amount');
        const form = cartItem.querySelector('form');

        cartItem.addEventListener('click', (event) => {
            const target = event.target;
        
            if (target.classList.contains('increment-btn')) {
                let currentAmount = parseInt(productAmountInput.value, 10) || 0;
                currentAmount++;
                updateAmount(currentAmount);
            }

            if (target.classList.contains('decrement-btn')) {
                let currentAmount = parseInt(productAmountInput.value, 10) || 0;
                if (currentAmount > 1) {
                currentAmount--;
                updateAmount(currentAmount);
                } else {
                alert('Minimum quantity is 1');
                }
            }

            if (target.classList.contains('delete-btn')) {
                productAmountInput.value = 0;
                form.submit();
            }
        });

        function updateAmount(newAmount) {
            productAmountSpan.textContent = newAmount;
            productAmountInput.value = newAmount;
            form.submit();
        }
    });
});
