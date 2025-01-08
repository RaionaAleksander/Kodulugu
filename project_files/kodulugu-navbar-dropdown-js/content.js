document.addEventListener("DOMContentLoaded", function() {
    const dropdowns = document.querySelectorAll(".js__nav-dropdown");

    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector(".js__nav-dropdown-button");
        const menu = dropdown.querySelector(".js__nav-dropdown-menu");

        function toggleMenu() {
            const isMenuOpen = menu.classList.contains("show");
            closeAllDropdowns();
            if (!isMenuOpen) {
                menu.classList.add("show");
            }
        }

        button.addEventListener("click", function(event) {
            event.stopPropagation();
            toggleMenu();
        });
    });

    function closeAllDropdowns() {
        dropdowns.forEach(d => {
            const menuToClose = d.querySelector(".js__nav-dropdown-menu");
            menuToClose.classList.remove("show");
        });
    }

    window.onclick = function(event) {
        if (!event.target.closest('.js__nav-dropdown-button')) {
            closeAllDropdowns();
        }
    };
});