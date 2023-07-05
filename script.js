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

        // Activar Opciones de Top Bar
        document.getElementById("topBarOp1").style.display = "none";
        document.getElementById("topBarOp2").style.display = "none";
        document.getElementById("topBarOp3").style.display = "none";
        document.getElementById("topBarOp4").style.display = "none";
        document.getElementById("topBarOp5").style.display = "block";
    }
    else
    {
        // Es una computadora de escritorio
        $('section').addClass('scroll');
        applyScroll();
        $.scrollify.enable();

        // Activar Opciones de Top Bar
        document.getElementById("topBarOp1").style.display = "block";
        document.getElementById("topBarOp2").style.display = "block";
        document.getElementById("topBarOp3").style.display = "block";
        document.getElementById("topBarOp4").style.display = "block";
        document.getElementById("topBarOp5").style.display = "none";
    }
}

// Evento en caso de cambio de resolucion de la pagina
onresize = (event) => {
    screenCheck();
};

// Barra lateral de navegacion -  Dispositivos Mobiles
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openSideNav() {
    if (document.getElementById("topBarOp5").value == "false")
    {
        document.getElementById("mySidenav").style.width = "450px";
        //document.getElementById("content").style.opacity = "0.8";
        document.getElementById("topBarOp5").value = "true";
    }
    else if (document.getElementById("topBarOp5").value == "true")
    {
        document.getElementById("mySidenav").style.width = "0";
        //document.getElementById("content").style.opacity = "1";
        document.getElementById("topBarOp5").value = "false";
    }
    else
    {
        document.getElementById("mySidenav").style.width = "450px";
        //document.getElementById("content").style.opacity = "0.8";
        document.getElementById("topBarOp5").value = "true";
    }
}

// Redirigir en la barra de navegacion lateral