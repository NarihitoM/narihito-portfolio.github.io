document.addEventListener("DOMContentLoaded", () => {
    const vh = window.innerHeight;
    const sections = document.querySelectorAll("section");
    const animDivs = document.querySelectorAll(".animate-on-scroll");

    let thresholdValue;
    if (vh < 600) thresholdValue = 0.05;
    else if (vh < 900) thresholdValue = 0.12;
    else thresholdValue = 0.18;

    const fadeObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                Array.from(entry.target.children).forEach((child, i) => {
                    child.style.transitionDelay = `${i * 0.05}s`;
                    child.classList.add("fade-in");
                });
                entry.target.style.transitionDelay = `0s`;
                entry.target.classList.add("fade-in");
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: thresholdValue,
        rootMargin: "0px 0px -10% 0px"
    });

    animDivs.forEach(div => fadeObserver.observe(div));
    sections.forEach(section => fadeObserver.observe(section));

    const progressBars = document.querySelectorAll(".progress");

    const progressObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute("data-progress") + "%";
                bar.style.width = targetWidth;
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    progressBars.forEach(bar => progressObserver.observe(bar));

    const menuLinks = document.querySelectorAll("li a");
    menuLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").slice(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

   
});


const menu = document.getElementById('menu');
const list = document.querySelector('.list');
const items = list.querySelectorAll('li');

const links = document.querySelectorAll("li a");
const sections = document.querySelectorAll("section");

links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    
    links.forEach(l => l.classList.remove("active"));

   
    link.classList.add("active");

    
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});


window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY + 45;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    const id = section.getAttribute("id");
    const link = document.querySelector(`li a[href="#${id}"]`);

    if (scrollPos >= top && scrollPos < bottom) {
      links.forEach(l => l.classList.remove("active")); 
      link.classList.add("active"); 
    }
  });
});

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

menu.addEventListener('click', () => {
    list.classList.toggle('active');
    menu.classList.toggle('active');
    if(list.classList.contains('active')) {
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.2}s`; 
        });
    } else {
        items.forEach(item => {
            item.style.transitionDelay = '0s'; 
        });
    }
});


document.addEventListener("click", (e) => {
  const isClickInside = list.contains(e.target) || menu.contains(e.target);
  if (!isClickInside) {
    closeMenu();
  }
});


items.forEach(item => {
    item.addEventListener('click', () => {
        closeMenu();
    });
});


function closeMenu() {
    list.classList.remove('active');
    menu.classList.remove('active');
    items.forEach(item => {
        item.style.transitionDelay = '0s'; 
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("mypopup");
    const content = popup.querySelector(".popupcontent");
    const popupImg = document.getElementById("popup-img");
    const popupTitle = document.getElementById("popup-title");
    const popupDesc = document.getElementById("popup-desc");
    const popupBtn = document.getElementById("popup-btn");
    const close = document.getElementById("go");
    document.querySelectorAll(".pjbox").forEach(box => {
        box.addEventListener("click", function() {
            if (popup.classList.contains("active")) {
                popup.classList.remove("active");

         
                setTimeout(() => {
                    popupImg.src = box.dataset.img;
                    popupImg.alt = box.dataset.title;
                    popupTitle.textContent = box.dataset.title;
                    popupDesc.innerHTML = box.dataset.desc;
                    popupBtn.href = box.dataset.link;

                    popup.classList.add("active"); 
                  
                }, 300); 
            } else {
            
                popupImg.src = box.dataset.img;
                popupImg.alt = box.dataset.title;
                popupTitle.textContent = box.dataset.title;
                popupDesc.innerHTML = box.dataset.desc;
                popupBtn.href = box.dataset.link;
                popup.classList.add("active");
                document.body.style.overflow = "hidden";
            } 
        });
    });
    
    if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
    
    close.addEventListener("click" , function(e)
    {
        e.preventDefault();
        popup.classList.remove("active");
        document.body.style.overflow = "auto";
    });

});

