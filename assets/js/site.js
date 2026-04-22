const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-site-nav]");

if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
        nav.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", nav.classList.contains("is-open"));
    });
}

const currentPage = document.body.dataset.page;

document.querySelectorAll("[data-nav-link]").forEach((link) => {
    if (link.dataset.navLink === currentPage) {
        link.classList.add("is-active");
    }
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                
                // Initialize typewriter effect if it has the class
                if (entry.target.classList.contains("typewriter") && !entry.target.dataset.typed) {
                    entry.target.dataset.typed = "true";
                    typeText(entry.target);
                }

                const childTypewriters = entry.target.querySelectorAll(".typewriter:not([data-typed])");
                childTypewriters.forEach(child => {
                    child.dataset.typed = "true";
                    typeText(child);
                });

                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.14 }
);

function typeText(element) {
    if (!element.dataset.originalText) {
        element.dataset.originalText = element.textContent;
    }
    const text = element.dataset.originalText;
    element.textContent = "";
    element.classList.add("typewriter-text");
    
    let i = 0;
    const speed = element.dataset.speed || 30; // ms per char
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed + (Math.random() * 20)); // slight random variation for realism
        } else {
            setTimeout(() => {
                element.classList.remove("typewriter-text"); // Remove cursor when done
            }, 2000);
        }
    }
    
    setTimeout(type, 300); // initial delay
}

document.querySelectorAll(".reveal, .typewriter").forEach((element) => observer.observe(element));

const yearNode = document.querySelector("[data-current-year]");

if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
}

window.addEventListener("beforeprint", () => {
    document.querySelectorAll(".typewriter").forEach(element => {
        if (element.dataset.originalText) {
            element.textContent = element.dataset.originalText;
        }
        element.classList.remove("typewriter-text");
    });
});