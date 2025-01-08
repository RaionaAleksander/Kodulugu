document.addEventListener("DOMContentLoaded", function () {
  const cartPanel = document.getElementById("cart-panel");
  const toggleButton = document.getElementById("toggle-cart");

  toggleButton.addEventListener("click", function () {
    const isHidden = cartPanel.classList.toggle("hidden");
    toggleButton.classList.toggle("hidden");

    toggleButton.innerHTML = isHidden ? "&larr;" : "&rarr;";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cartPanel = document.getElementById("cart-panel");
  const footer = document.querySelector("footer");

  function adjustCartHeight() {
    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const cartTopOffset = 80;

    if (footerRect.top < windowHeight) {
      cartPanel.style.height = `${footerRect.top - cartTopOffset}px`;
    } else {
      cartPanel.style.height = `${windowHeight - cartTopOffset}px`;
    }
  }
  adjustCartHeight();
  window.addEventListener("resize", adjustCartHeight);
  window.addEventListener("scroll", adjustCartHeight);
});

document.addEventListener('DOMContentLoaded', function () {
    let totalCost = 0;

    const productPrices = document.querySelectorAll('.js__cart-product-price');
    const productAmounts = document.querySelectorAll('.js__cart-product-amount');

    productPrices.forEach((priceElement, index) => {
        const price = parseFloat(priceElement.textContent);
        const amount = parseInt(productAmounts[index].textContent, 10);

        if (!isNaN(price) && !isNaN(amount)) {
            totalCost += price * amount;
        }
    });

    const totalCostElement = document.getElementById('js__total-cost');
    if (totalCostElement) {
        totalCostElement.textContent = totalCost.toFixed(2);
    }
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.cart-actions').forEach(cartItem => {
    const productAmountSpan = cartItem.querySelector('.js__cart-product-amount');
    const productAmountInput = cartItem.querySelector('.js__product-amount');
    const form = cartItem.querySelector('.js__update-form');

    cartItem.addEventListener('click', (event) => {
      const target = event.target;

      if (target.classList.contains('increase-btn')) {
        let currentAmount = parseInt(productAmountInput.value, 10) || 0;
        currentAmount++;
        updateAmount(currentAmount);
      }

      if (target.classList.contains('decrease-btn')) {
        let currentAmount = parseInt(productAmountInput.value, 10) || 0;
        if (currentAmount > 1) {
          currentAmount--;
          updateAmount(currentAmount);
        } else {
          alert('Minimum quantity is 1');
        }
      }

      if (target.classList.contains('remove-btn')) {
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