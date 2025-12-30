import gsap from "gsap";
import { CustomEase } from "gsap/all";
import SplitType from "split-type";
import { ProjectsData } from "./projects";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop","0.9, 0, 0.1, 1" );

// Force scroll to top immediately when page loads
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {
    // Force scroll to top again after DOM loads (for safety)
    window.scrollTo(0, 0);
    
    // Strong scroll lock handlers (prevent wheel/touch/keys)
    const _preventDefault = (e) => { e.preventDefault(); };
    const _keyHandler = (e) => {
        // keys that should prevent scrolling while locked
        const keys = ['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '];
        if (keys.includes(e.key)) {
            e.preventDefault();
        }
    };
    function lockScroll(){
        try{
            document.addEventListener('wheel', _preventDefault, { passive: false });
            document.addEventListener('touchmove', _preventDefault, { passive: false });
            window.addEventListener('keydown', _keyHandler, { passive: false });
            // also set body styles to avoid scroll jump
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        }catch(e){
            // fallback
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        }
        // create an overlay blocker to catch pointer/wheel events as a fallback
        if (!document.getElementById('__scroll_blocker')){
            const _blocker = document.createElement('div');
            _blocker.id = '__scroll_blocker';
            Object.assign(_blocker.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                zIndex: '2147483647',
                background: 'transparent',
                pointerEvents: 'auto'
            });
            _blocker.addEventListener('wheel', _preventDefault, { passive: false });
            _blocker.addEventListener('touchmove', _preventDefault, { passive: false });
            document.body.appendChild(_blocker);
        }
    }
    function unlockScroll(){
        try{
            document.removeEventListener('wheel', _preventDefault, { passive: false });
            document.removeEventListener('touchmove', _preventDefault, { passive: false });
            window.removeEventListener('keydown', _keyHandler, { passive: false });
        }catch(e){/*ignore*/}
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        const b = document.getElementById('__scroll_blocker');
        if (b) {
            try{
                b.removeEventListener('wheel', _preventDefault, { passive: false });
                b.removeEventListener('touchmove', _preventDefault, { passive: false });
            }catch(e){}
            b.parentNode && b.parentNode.removeChild(b);
        }
        // Hide the overlay portion while keeping pre-main visible
        const preMain = document.querySelector('.pre-main');
        if (preMain) {
            preMain.classList.add('intro-done');
        }
    }

    // Lock scrolling immediately while intro runs
    lockScroll();

    const projectsContainer = document.querySelector(".projects");
    const locationsContainer = document.querySelector(".locations");
    const gridImages = gsap.utils.toArray (".img");
    const heroImage = document.querySelector(".img.hero-img");

    const images = gridImages.filter((img) => img !== heroImage);

    const introCopy = new SplitType(".intro-copy h3", {
        types: "words",
        absolute: false,
    });
    const titleHeading = new SplitType (".title h1", {
        types:  "words",
        absolute: false,
    });
    const allImageSources = Array.from(
        { length: 45 },
        (_, i) => `./pictures/folder3/img${i+1}.jpg`
    );

    // Preload all images to prevent black flashes
    function preloadImages(sources) {
        return Promise.all(
            sources.map(src => new Promise((resolve) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve; // still resolve on error to avoid blocking
                img.src = src;
            }))
        );
    }

    const getRandomImageSet = () => {
        const shuffled = [ ...allImageSources].sort(()=> 0.5 - Math.random());
        return shuffled.slice(0, 9);
    };
    function initializeDynamicContent(){
        ProjectsData.forEach((project) => {
            const projectItem = document.createElement("div");
            projectItem.className = "project-item";
            
            const projectName = document.createElement("p");
            projectName.textContent = project.name;

            const directorName = document.createElement("p");
            directorName.textContent = project.director;
           
           
            projectItem.appendChild(projectName);
            projectItem.appendChild(directorName);

            projectsContainer.appendChild(projectItem);
            
        });

        ProjectsData.forEach((project) => {
            const locationItem = document.createElement("div");
            locationItem.className = "location-item";

            const locationName = document.createElement("p");
            locationName.textContent = project.location;

            locationItem.appendChild(locationName);
            locationsContainer.appendChild(locationItem);
        });
    }

    function startImageRotation(done){
        const totalCycles = 20;

        for(let cycle = 0; cycle < totalCycles; cycle++){
            const randomImages = getRandomImageSet();

            gsap.to({},
                {
                    duration: 0,
                    delay: cycle * 0.15,
                    onComplete: () => {
                        // If this is the final cycle, wait for ALL images to load before calling done
                        if (cycle === totalCycles - 1) {
                            let remaining = gridImages.length;
                            gridImages.forEach((img, index) => {
                                const imgElement = img.querySelector("img");
                                const newImg = new Image();
                                imgElement.style.opacity = "0";
                                newImg.onload = () => {
                                    imgElement.src = newImg.src;
                                    imgElement.style.opacity = "1";
                                    // for hero image apply scale
                                    if (img === heroImage) {
                                        gsap.set(".hero-img img", { scale: 2 });
                                    }
                                    remaining -= 1;
                                    if (remaining === 0 && typeof done === 'function') {
                                        done();
                                    }
                                };
                                // for hero image use specific source, otherwise use randomImages
                                newImg.src = (img === heroImage) ? "./pictures/folder3/img5.jpg" : randomImages[index];
                            });
                        } else {
                            gridImages.forEach((img, index) => {
                                const imgElement = img.querySelector("img");
                                const newImg = new Image();
                                imgElement.style.opacity = "0";
                                newImg.onload = () => {
                                    imgElement.src = newImg.src;
                                    imgElement.style.opacity = "1";
                                };
                                newImg.src = randomImages[index];
                            });
                        }
                    },
                }
            );
        }
    }

    function setupInitialStates(){
        gsap.set("nav", {
            y: "-125%",
        });
        gsap.set(introCopy.words, {
            y: "110%",
        });
        gsap.set(titleHeading.words, {
            y: "110%",
        });
    }


    async function init(){
        initializeDynamicContent();
        setupInitialStates();
        
        // Preload all images before starting animations
        await preloadImages(allImageSources);
        
        createAnimationTimelines();
    }
    init();

    function createAnimationTimelines(){

        const overlayTimeline = gsap.timeline();
        const imagesTimeline = gsap.timeline();
        const textTimeline = gsap.timeline();

        overlayTimeline.to(".logo-line-1", {
            backgroundPosition: "0% 0%",
            color: "#fff",
            duration: 1,
            ease: "none",
            delay: 0.5,
            onComplete: () => {
                gsap.to(".logo-line-2", {
                    backgroundPosition: "0% 0%",
                    color: "#fff",
                    duration :1,
                    ease: "none",
                });
            },
        });


        overlayTimeline.to([".projects-header", ".project-item"], {

            opacity: 1,
            duration: 0.15,
            stagger: 0.075,
            delay: 1,
        });

        overlayTimeline.to([".locations-header", ".location-item"], {
            opacity: 1,
            duration: 0.15,
            stagger: 0.075,

        }, "<" );

        overlayTimeline.to(".project-item", {
            color: "#fff",
            duration: 0.15,
            stagger: 0.075,

        });

        overlayTimeline.to(".location-item", {
            color: "#fff",
            duration: 0.15,
            stagger: 0.075,
        }, "<");


        overlayTimeline.to([".projects-header", ".project-item"], {
            opacity: 0,
            duration: 0.15,
            stagger: 0.075,
        });

        overlayTimeline.to([".locations-header", ".location-item"],{
            opacity: 0,
            duration: 0.15,
            stagger: 0.075,
        }, "<");

        overlayTimeline.to(".overlay", {
            opacity: 0,
            duration: 0.5,
            delay: 1.5,

        });

        imagesTimeline.to(".img", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            delay: 2.5,
            stagger: 0.05,
            ease: "hop",
            onStart: () => {
                setTimeout(() => {
                    // start image rotation and unlock scrolling only when rotation finishes
                    // also set a safety timeout to force-unlock in case images fail to load
                    const safetyMs = 8000; // fallback unlock after 8s
                    const safetyTimer = setTimeout(() => {
                        try{ unlockScroll(); }catch(e){}
                        document.body.classList.add('loaded');
                       
                        console.warn('Safety unlock triggered after', safetyMs, 'ms');
                    }, safetyMs);

                    startImageRotation(() => {
                        // on real completion clear safety timer and proceed
                        clearTimeout(safetyTimer);
                        try{ unlockScroll(); }catch(e){}
                        // small safety delay to ensure paints complete
                        setTimeout(() => {
                            document.body.classList.add('loaded');
                         
                        }, 200);
                    });

                    gsap.to(".loader", { opacity: 0, duration: 0.3 });
                }, 1000);
            },
        });

        imagesTimeline.to(images, {
            clipPath: " polygon( 0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            delay: 2.5,
            stagger: 0.05,
            ease: "hop",
        });

        imagesTimeline.to(".hero-img", {
            y: -50,
            duration: 1,
            ease: "hop",
        });

        imagesTimeline.to(".hero-img", {
            scale: 4,
            clipPath: "polygon(20% 10%, 80% 10%, 80% 90%, 20% 90%)",
            duration: 1.5,
            ease: "hop",
            onStart: () => {
                gsap.to(".hero-img img", {
                    scale: 1,
                    duration: 1.5,
                    ease: "hop",
                });
                gsap.to(".banner-img", { scale: 1, delay: 0.5, duration: 0.5 });
                gsap.to("nav", { y: "0%", duration: 1, ease: "hop", delay: 0.25 });
            },
        });

        imagesTimeline.to(".banner-img-1", {
            left: "40%",
            rotate: -20,
            duration: 1.5,
            delay: 0.5,
            ease: "hop",
        }, "<");
        imagesTimeline.to(".banner-img-2", {
            left: "60%",
            rotate: 20,
            duration: 1.5,
            delay: 0.5,
            ease: "hop",
        }, "<");

        textTimeline.to(titleHeading.words, {
            y: "0%",
            duration: 1,
            stagger: 0.1,
            delay: 9.5,
            ease: "power3.out",
        });
        textTimeline.to(introCopy.words, {
            y: "0%",
            duration: 1,
            stagger: 0.1,
            delay: 0.25,
            ease: "power3.out",
        }, "<");
    }
});
const enterBtn = document.getElementById("enter-btn");
if (enterBtn){
    enterBtn.addEventListener("click", () => {
        gsap.to("overlay", {
          opacity: 1,
            duration: 0.6,
            ease: "power2.inOut",});
            gsap.to("body", {
                y: "-100vh",
                duration: 1.2,
                ease: "power3.inOut",
                delay: 0.2,
            
            onComplete: () => {
                  window.location.href= "/comp/main.html";
            }
        
                  });
      
    });
}