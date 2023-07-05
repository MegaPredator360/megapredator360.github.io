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
    $('.topbar .one').click(function() {
        $.scrollify.move('#s-one');
    });

    $('.topbar .two').click(function() {
        $.scrollify.move('#s-two');
    });

    $('.topbar .three').click(function() {
        $.scrollify.move('#s-three');
    });

    $('.topbar .four').click(function() {
        $.scrollify.move('#s-four');
    });

    // Barra de navegacion lateral
    $('.scroll-control .one').click(function() {
        $.scrollify.move('#s-one');
    });

    $('.scroll-control .two').click(function() {
        $.scrollify.move('#s-two');
    });

    $('.scroll-control .three').click(function() {
        $.scrollify.move('#s-three');
    });

    $('.scroll-control .four').click(function() {
        $.scrollify.move('#s-four');
    });
});

// Verificar resolucion de pantalla
function screenCheck() {
    var deviceAgent = navigator.userAgent.toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);   // Identificador de dispositivos

    if (agentID || $(window).width() <= 1023)
    {
        // Es un dispositivo movil
        $.scrollify.destroy();
        $('section').removeClass('scroll').removeAttr('style');
    }
    else
    {
        // Es una computadora de escritorio
        $('section').addClass('scroll');
        applyScroll();
        $.scrollify.enable();
    }
}

// Evento en caso de cambio de resolucion de la pagina
onresize = (event) => {
    screenCheck();
};

// Barra lateral de navegacion -  Dispositivos Mobiles
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openSideNav() {
    const portrait = window.matchMedia("(orientation: portrait)").matches;

    if (document.getElementById("BtnOpenSideNav").value == "false")
    {
        if (portrait == true)
        {
            document.getElementById("sideNavMobile").style.width = "450px";
            document.getElementById("BtnOpenSideNav").value = "true";
            // Prevenirá la pantalla de moverse si el menú esta abierto
            document.body.style.overflow = "hidden";
        }
        else
        {
            document.getElementById("sideNavMobile").style.width = "250px";
            document.getElementById("BtnOpenSideNav").value = "true";
            document.body.style.overflow = "hidden";
        }
        
    }
    else if (document.getElementById("BtnOpenSideNav").value == "true")
    {
        document.getElementById("sideNavMobile").style.width = "0";
        document.getElementById("BtnOpenSideNav").value = "false";
        document.body.style.overflow = "visible";
    }
    else
    {
        if (portrait == true)
        {
            document.getElementById("sideNavMobile").style.width = "450px";
            document.getElementById("BtnOpenSideNav").value = "true";
            document.body.style.overflow = "hidden";
        }
        else
        {
            document.getElementById("sideNavMobile").style.width = "250px";
            document.getElementById("BtnOpenSideNav").value = "true";
            document.body.style.overflow = "hidden";
        }
    }
}

// Cerrar barra lateral si se toca fuera del area
document.onclick = function(e)
{
    // Si el usuario hace click fuera del algunos de esos marcos
    if (e.target.id !== 'sideNavMobile' && e.target.id !== 'topBar' && e.target.id !== 'BtnOpenSideNav')
    {
        document.getElementById("sideNavMobile").style.width = "0";
        document.getElementById("BtnOpenSideNav").value = "false";
        document.body.style.overflowY = "visible";
    }
}
