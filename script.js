// Verificar resolucion de pantalla
function screenCheck() {
    var deviceAgent = navigator.userAgent.toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);   // Identificador de dispositivos

    if (agentID || $(window).width() <= 1023) {
        // Es un dispositivo movil

    }
    else {
        // Es una computadora de escritorio
    }
}

// Evento en caso de cambio de resolucion de la pagina
onresize = (event) => {
    screenCheck();
    readjustSideNav();
};

// Barra lateral de navegacion -  Dispositivos Mobiles
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openSideNav() {
    const portrait = window.matchMedia("(orientation: portrait)").matches;
    const btnOpenSideNav = document.getElementById("BtnOpenSideNav");

    if (btnOpenSideNav.getAttribute("data-value") === "false") {
        if (portrait === true) {
            sideNavMobile.style.marginLeft = "450px";
            btnOpenSideNav.setAttribute("data-value", "true");
        } else {
            sideNavMobile.style.marginLeft = "250px";
            btnOpenSideNav.setAttribute("data-value", "true");
        }

        // Establecer la posición fija y la altura máxima para el desplazamiento
        sideNavMobile.style.position = "fixed";
        sideNavMobile.style.maxHeight = "100%";
        // Prevenir el desplazamiento del body
        document.body.style.overflow = "hidden";
        
    } else {
        sideNavMobile.style.marginLeft = "0px";
        btnOpenSideNav.setAttribute("data-value", "false");

        // Restaurar el estilo del sideNavMobile y permitir el desplazamiento del body
        sideNavMobile.style.position = "";
        sideNavMobile.style.maxHeight = "";
        document.body.style.overflow = "visible";
    }
}

// Cerrar barra lateral si se toca fuera del area
document.onclick = function (e) {

    // Si el usuario hace click fuera del algunos de esos marcos
    if (e.target.id !== 'sideNavMobile' &&
        e.target.id !== 'topBar' && 
        e.target.id !== 'BtnOpenSideNav' &&
        e.target.id !== 'btnDarkModeSide' &&
        e.target.id !== 'btnLanguage'
    ) {
        document.getElementById("sideNavMobile").style.marginLeft = "0px";;
        document.getElementById("BtnOpenSideNav").setAttribute("data-value", "false");
        document.body.style.overflow = "visible";
    }
}

// Reajustar Margen
function readjustSideNav() {
    const portrait = window.matchMedia("(orientation: portrait)").matches;

    if (document.getElementById("BtnOpenSideNav").getAttribute("data-value") === "true") {
        if (portrait == true) {
            document.getElementById("sideNavMobile").style.marginLeft = "450px";
        }
        else {
            document.getElementById("sideNavMobile").style.marginLeft = "250px";
        }
    }
}

// Obtendra el dato de modo oscuro en la memoria
if (localStorage.getItem('darkMode') == null || localStorage.getItem('darkMode') == undefined)
{
    localStorage.setItem('darkMode', false);
    document.getElementById("btnDarkModeTop").name = "_darkMode";
}

var darkMode = localStorage.getItem('darkMode');

// Se obtendrá el valor del idioma almacenado en memoria
if (localStorage.getItem('language') == null || localStorage.getItem('language') == undefined) {
    var lng = window.navigator.userLanguage || window.navigator.language;
    localStorage.setItem('language', lng);
}

var lang = localStorage.getItem('language');

// Cargar Modo Oscuro al inicio de la pagina
if (darkMode == 'false')
{
    document.getElementById("btnDarkModeTop").name = "_darkMode";
    document.getElementById("btnDarkModeSide").name = "_darkMode";
}
else
{
    document.body.classList.toggle("darkMode");
    document.getElementById("btnDarkModeTop").name = "_lightMode";
    document.getElementById("btnDarkModeSide").name = "_lightMode";
}

// Cambiar a Modo Oscuro
function toggleDarkMode() {
    lang = localStorage.getItem('language');
    darkMode = localStorage.getItem('darkMode')

    document.body.classList.toggle("darkMode");

    if (darkMode == 'false')
    {
        localStorage.setItem('darkMode', true);
        document.getElementById("btnDarkModeTop").name = "_lightMode";
        document.getElementById("btnDarkModeSide").name = "_lightMode";

        if (
            (lang.charAt(0) == 'e' && lang.charAt(1) == 's') ||
            (lang.charAt(0) == 'E' && lang.charAt(1) == 'S')
        ) {
            document.getElementById("btnDarkModeTop").textContent = "Modo Claro";
            document.getElementById("btnDarkModeSide").textContent = "Modo Claro";
        }
        else
        {
            document.getElementById("btnDarkModeTop").textContent = "Light Mode";
            document.getElementById("btnDarkModeSide").textContent = "Light Mode";
        }
    }
    else
    {
        localStorage.setItem('darkMode', false);
        document.getElementById("btnDarkModeTop").name = "_darkMode";
        document.getElementById("btnDarkModeSide").name = "_darkMode";

        if (
            (lang.charAt(0) == 'e' && lang.charAt(1) == 's') ||
            (lang.charAt(0) == 'E' && lang.charAt(1) == 'S')
        ) {
            document.getElementById("btnDarkModeTop").textContent = "Modo Oscuro";
            document.getElementById("btnDarkModeSide").textContent = "Modo Oscuro";
        }
        else
        {
            document.getElementById("btnDarkModeTop").textContent = "Dark Mode";
            document.getElementById("btnDarkModeSide").textContent = "Dark Mode";
        }
    }
}

if (
    (lang.charAt(0) == 'e' && lang.charAt(1) == 's') ||
    (lang.charAt(0) == 'E' && lang.charAt(1) == 'S')
) {
    var elements = document.getElementsByClassName("_lang");
    fetch('./languages/es-es.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Usamos los datos que provienen de "data" para el "for"
            for (var i = 0; i < elements.length; i++) {
                elements[i].textContent = data[elements[i].getAttribute("name")];
            }
        })
        .catch(function (error) {
            console.log('Hubo un error al cargar el archivo JSON:', error);
        });

    document.getElementById("_idioma").value = "_langEnglish";
}
else {
    localStorage.setItem('language', "en");

    var elements = document.getElementsByClassName("_lang");
    fetch('./languages/en-us.json')
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

        document.getElementById("_idioma").value = "_langSpanish";
}


// Cambiará el idioma del la pagina
function changeLang() {
    if (document.getElementById("_idioma").value == "_langEnglish")
    {
        localStorage.setItem('language', "en");

        var elements = document.getElementsByClassName("_lang");
        fetch('./languages/en-us.json')
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

        document.getElementById("_idioma").value = "_langSpanish";
    }
    else
    {
        localStorage.setItem('language', "es");

        var elements = document.getElementsByClassName("_lang");
        fetch('./languages/es-es.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // Usamos los datos que provienen de "data" para el "for"
                for (var i = 0; i < elements.length; i++) {
                    elements[i].textContent = data[elements[i].getAttribute("name")];
                }
            })
            .catch(function (error) {
                console.log('Hubo un error al cargar el archivo JSON:', error);
            });

        document.getElementById("_idioma").value = "_langEnglish";
    }
}


