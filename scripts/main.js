// Verificar resolucion de pantalla
function screenCheck() {
    var deviceAgent = navigator.userAgent.toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);   // Identificador de dispositivos

    if (agentID || window.innerWidth <= 1023) {
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
function openSideNav() {
    const portrait = window.matchMedia("(orientation: portrait)").matches;
    const btnOpenSideNav = document.getElementById("BtnOpenSideNav");
    const sideNavMobile = document.getElementById("sideNavMobile");
    const sideNavWidth = sideNavMobile.offsetWidth;

    if (btnOpenSideNav.getAttribute("data-value") === "false") {
        if (portrait === true) {
            sideNavMobile.style.marginLeft = sideNavWidth + "px";
            btnOpenSideNav.setAttribute("data-value", "true");
        } else {
            sideNavMobile.style.marginLeft = sideNavWidth + "px";
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
        document.body.style.overflow = "";
    }
}

function closeSideNav() {
    document.getElementById("sideNavMobile").style.marginLeft = "0px";
    document.getElementById("BtnOpenSideNav").setAttribute("data-value", "false");
    document.body.style.overflow = "";
}

function scrollToTarget(targetSelector) {
    if (!targetSelector) {
        return;
    }
    var target = document.querySelector(targetSelector);
    if (target) {
        target.scrollIntoView({ behavior: "smooth" });
    }
}

function wireNavButtons() {
    var navItems = document.querySelectorAll(".topbar [data-target], .sidenav [data-target]");
    for (var i = 0; i < navItems.length; i++) {
        navItems[i].addEventListener("click", function () {
            scrollToTarget(this.getAttribute("data-target"));
            if (this.closest(".sidenav")) {
                closeSideNav();
            }
        });
    }
}

// Cerrar barra lateral si se toca fuera del area
document.onclick = function (e) {
    const sideNavMobile = document.getElementById("sideNavMobile");
    const topBar = document.getElementById("topBar");
    const btnOpenSideNav = document.getElementById("BtnOpenSideNav");

    // Si el usuario hace click fuera del algunos de esos marcos
    if (!sideNavMobile.contains(e.target) &&
        !topBar.contains(e.target) &&
        !btnOpenSideNav.contains(e.target) &&
        e.target.id !== 'btnDarkModeSide' &&
        e.target.id !== 'btnLanguage'
    ) {
        closeSideNav();
    }
}

// Reajustar Margen
function readjustSideNav() {
    const portrait = window.matchMedia("(orientation: portrait)").matches;
    const sideNavMobile = document.getElementById("sideNavMobile");
    const sideNavWidth = sideNavMobile.offsetWidth;

    if (document.getElementById("BtnOpenSideNav").getAttribute("data-value") === "true") {
        if (portrait == true) {
            sideNavMobile.style.marginLeft = sideNavWidth + "px";
        }
        else {
            sideNavMobile.style.marginLeft = sideNavWidth + "px";
        }
    }
}

wireNavButtons();

