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

    if (document.getElementById("BtnOpenSideNav").value == "false") {
        if (portrait == true) {
            document.getElementById("sideNavMobile").style.marginLeft = "450px";
            document.getElementById("BtnOpenSideNav").value = "true";
            // Prevenirá la pantalla de moverse si el menú esta abierto
            document.body.style.overflow = "hidden";
        }
        else {
            document.getElementById("sideNavMobile").style.marginLeft = "250px";
            document.getElementById("BtnOpenSideNav").value = "true";
            document.body.style.overflow = "hidden";
        }

    }
    else if (document.getElementById("BtnOpenSideNav").value == "true") {
        document.getElementById("sideNavMobile").style.marginLeft = "0px";
        document.getElementById("BtnOpenSideNav").value = "false";
        document.body.style.overflow = "visible";
    }
    else {
        if (portrait == true) {
            document.getElementById("sideNavMobile").style.marginLeft = "450px";
            document.getElementById("BtnOpenSideNav").value = "true";
            document.body.style.overflow = "hidden";
        }
        else {
            document.getElementById("sideNavMobile").style.marginLeft = "250px";
            document.getElementById("BtnOpenSideNav").value = "true";
            document.body.style.overflow = "hidden";
        }
    }
}

// Cerrar barra lateral si se toca fuera del area
document.onclick = function (e) {
    // Si el usuario hace click fuera del algunos de esos marcos
    if (e.target.id !== 'sideNavMobile' && e.target.id !== 'topBar' && e.target.id !== 'BtnOpenSideNav') {
        document.getElementById("sideNavMobile").style.marginLeft = "0px";;
        document.getElementById("BtnOpenSideNav").value = "false";
        document.body.style.overflowY = "visible";
    }
}

// Reajustar Margen
function readjustSideNav() {
    const portrait = window.matchMedia("(orientation: portrait)").matches;

    if (document.getElementById("BtnOpenSideNav").value == "true") {
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
