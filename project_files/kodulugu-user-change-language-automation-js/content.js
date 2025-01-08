const languageBtns = document.querySelectorAll('.js__language-button');
    languageBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const selectedLanguage = '/' + this.dataset.lang + '/';;
            const currentLanguage = document.getElementById('js__current-lang').textContent;
            const newURL = window.location.href.replace(currentLanguage, selectedLanguage);
            window.location.href = newURL;
        });
    }
);