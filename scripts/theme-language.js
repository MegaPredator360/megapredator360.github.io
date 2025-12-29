function isSpanish(lang) {
    return lang && lang.toLowerCase().startsWith('es');
}

function updateDarkModeLabels(enabled, langCode) {
    var label = "";
    var nameValue = enabled ? "_lightMode" : "_darkMode";
    var isEs = isSpanish(langCode);

    if (enabled) {
        label = isEs ? "Modo Claro" : "Light Mode";
    } else {
        label = isEs ? "Modo Oscuro" : "Dark Mode";
    }

    document.getElementById("btnDarkModeTop").name = nameValue;
    document.getElementById("btnDarkModeSide").name = nameValue;
    document.getElementById("btnDarkModeTop").textContent = label;
    document.getElementById("btnDarkModeSide").textContent = label;
}

function setDarkMode(enabled, langCode) {
    document.body.classList.toggle("darkMode", enabled);
    localStorage.setItem('darkMode', enabled ? "true" : "false");
    updateDarkModeLabels(enabled, langCode);
}

function applyTranslations(langCode) {
    var elements = document.getElementsByClassName("_lang");
    var fileMap = {
        es: "./languages/es-es.json",
        en: "./languages/en-us.json"
    };
    var filePath = fileMap[langCode] || fileMap.en;

    fetch(filePath)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].textContent = data[elements[i].getAttribute("name")];
            }
        })
        .catch(function (error) {
            console.log('Hubo un error al cargar el archivo JSON:', error);
        });
}

function updateLanguageToggle(langCode) {
    document.getElementById("_idioma").value = langCode === "es" ? "_langEnglish" : "_langSpanish";
}

function setLanguage(langCode) {
    localStorage.setItem('language', langCode);
    applyTranslations(langCode);
    updateLanguageToggle(langCode);
    updateDarkModeLabels(document.body.classList.contains("darkMode"), langCode);
}

// Inicializar modo oscuro e idioma
if (localStorage.getItem('darkMode') == null || localStorage.getItem('darkMode') == undefined) {
    localStorage.setItem('darkMode', "false");
}

var darkMode = localStorage.getItem('darkMode') === "true";
var lang = localStorage.getItem('language');

if (lang == null || lang == undefined) {
    var lng = window.navigator.userLanguage || window.navigator.language;
    lang = isSpanish(lng) ? "es" : "en";
    localStorage.setItem('language', lang);
} else {
    lang = isSpanish(lang) ? "es" : "en";
    localStorage.setItem('language', lang);
}

setDarkMode(darkMode, lang);
setLanguage(lang);

// Cambiar a Modo Oscuro
function toggleDarkMode() {
    var currentLang = localStorage.getItem('language') || "en";
    var currentDarkMode = localStorage.getItem('darkMode') === "true";
    setDarkMode(!currentDarkMode, currentLang);
}

// Cambiará el idioma del la pagina
function changeLang() {
    var currentLang = localStorage.getItem('language') || "en";
    var nextLang = currentLang === "es" ? "en" : "es";
    setLanguage(nextLang);
}
