// Funciones para el scrollify
function applyScroll() {
    $.scrollify({
        section: '.scroll',     // Nombre de la clase
        sectionName: 'section-name',
        //standardScrollElements: 'section',  // Desactivar autoredireccionamiento
        easing: 'easeOutExpo',
        scrollSpeed: 100,
        offset: 0,
        scrollbars: true,
        setHeights: true,
        overflowScroll: true,
        updateHash: false,
        touchScroll: true,
    });
}

document.addEventListener("DOMContentLoaded", () => {       // Cuando la pagina termina termine de cargar
    screenCheck();

    // Barra de navegacion superior
    $('.topbar .one').click(function () {
        $.scrollify.move('#s-one');
    });

    $('.topbar .two').click(function () {
        $.scrollify.move('#s-two');
    });

    $('.topbar .three').click(function () {
        $.scrollify.move('#s-three');
    });

    $('.topbar .four').click(function () {
        $.scrollify.move('#s-four');
    });

    // Barra de navegacion lateral
    $('.scroll-control .one').click(function () {
        $.scrollify.move('#s-one');
    });

    $('.scroll-control .two').click(function () {
        $.scrollify.move('#s-two');
    });

    $('.scroll-control .three').click(function () {
        $.scrollify.move('#s-three');
    });

    $('.scroll-control .four').click(function () {
        $.scrollify.move('#s-four');
    });
});

// Verificar resolucion de pantalla
function screenCheck() {
    var deviceAgent = navigator.userAgent.toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);   // Identificador de dispositivos

    if (agentID || $(window).width() <= 1023) {
        // Es un dispositivo movil
        $.scrollify.destroy();
        $('section').removeClass('scroll').removeAttr('style');
    }
    else {
        // Es una computadora de escritorio
        $('section').addClass('scroll');
        applyScroll();
        $.scrollify.enable();
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
        sideNavMobile.style.maxHeight = "100vh";
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
    if (e.target.id !== 'sideNavMobile' && e.target.id !== 'topBar' && e.target.id !== 'BtnOpenSideNav' && e.target.id !== 'btnDarkMode' && e.target.id !== 'btnLanguage') {
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

// Detectar Idioma
if (localStorage.getItem('language') == null || localStorage.getItem('language') == undefined) {
    var lng = window.navigator.userLanguage || window.navigator.language;
    console.log(lng);
    localStorage.setItem('language', lng);
}
// Se obtendrá el valor del idioma almacenado en memoria
var lang = localStorage.getItem('language');

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
        //location.reload();

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
        //location.reload();

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

// Cambiar a Modo Oscuro
function toggleDarkMode() {
    document.body.classList.toggle("darkMode");
}
