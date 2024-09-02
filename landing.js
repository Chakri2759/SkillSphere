document.getElementById("menuBtn").onclick = function () {
    var sideNav = document.getElementById("sideNav");
    if (sideNav.style.transform === "translateX(0px)") {
        sideNav.style.transform = "translateX(-250px)";
    } else {
        sideNav.style.transform = "translateX(0px)";
    }
};


// Select all FAQ items
document.addEventListener('DOMContentLoaded', function() {
    // Toggle SideNav (assuming it's related to a menu button)
    document.getElementById("menuBtn").onclick = function () {
        var sideNav = document.getElementById("sideNav");
        if (sideNav.style.transform === "translateX(0px)") {
            sideNav.style.transform = "translateX(-250px)";
        } else {
            sideNav.style.transform = "translateX(0px)";
        }
    };

    // FAQ Toggle Functionality
    document.querySelectorAll('.faq-item h4').forEach(item => {
        item.addEventListener('click', function() {
            const faqItem = item.parentNode;
            faqItem.classList.toggle('active');
        });
    });
});
