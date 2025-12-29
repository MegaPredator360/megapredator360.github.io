// Scroll por secciones con la rueda del mouse
var sectionIndex = 0;
var isSectionScrolling = false;
var sections = Array.prototype.slice.call(document.querySelectorAll("#content > div"));

function updateSectionIndex() {
    var target = window.scrollY + (window.innerHeight / 2);
    for (var i = 0; i < sections.length; i++) {
        var sectionTop = sections[i].offsetTop;
        var sectionBottom = sectionTop + sections[i].offsetHeight;
        if (target >= sectionTop && target < sectionBottom) {
            sectionIndex = i;
            break;
        }
    }
}

function scrollToSection(index) {
    if (index < 0 || index >= sections.length) {
        return;
    }
    sectionIndex = index;
    sections[sectionIndex].scrollIntoView({ behavior: "smooth" });
}

window.addEventListener("scroll", function () {
    if (isSectionScrolling) {
        return;
    }
    updateSectionIndex();
});

window.addEventListener("wheel", function (event) {
    if (window.innerWidth <= 1023 || !window.matchMedia("(pointer: fine)").matches) {
        return;
    }
    if (isSectionScrolling || sections.length === 0) {
        return;
    }

    var direction = event.deltaY > 0 ? 1 : -1;
    var nextIndex = sectionIndex + direction;
    if (nextIndex < 0 || nextIndex >= sections.length) {
        return;
    }

    event.preventDefault();
    isSectionScrolling = true;
    scrollToSection(nextIndex);

    setTimeout(function () {
        isSectionScrolling = false;
    }, 800);
}, { passive: false });

updateSectionIndex();
