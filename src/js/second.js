import { gsap } from "gsap";



let isMobile = window.innerWidth < 1000;

function setInitialPositions(){
    gsap.set(folderWrappers, { y: isMobile ? 0: 25});

}

folders.forEach((folder, index) => {
    const previewImages = folder.querySelectorAll(".folder-preview-image");
console.log(previewImages);
    folder.addEventListener("mouseenter", () => {
        if(isMobile) return;

        folders.forEach((siblingFolder)=> {
            if (siblingFolder !== folder) {
                siblingFolder.classList.add("disabled");
            }
        });

        gsap.to(folderWrappers[index], {
            y: 0,
            duration: 0.25,
            ease: "back.out(1.7)",
        });

        previewImages.forEach((img, imgIndex) => {
            let rotation;
            if (imgIndex === 0){
                rotation = gsap.utils.random (-20, -10);

            } else if (imgIndex === 1) {
                rotation = gsap.utils.random(-10, 10);
            }else {
                rotation = gsap.utils.random( 10, 20);
            }

            gsap.to(img, {
                y: "-100%",
                rotation: rotation,
                duration: 0.25,
                ease: "back.out(1.7)",
                delay: imgIndex * 0.025,
            });
        });
    });

    folder.addEventListener("mouseleave", () => {
        if (isMobile) return;

        folders.forEach((siblingFolder) => {
            siblingFolder.classList.remove("disabled");
    
        });
        gsap.to(folderWrappers[index], {
            y:25,
            duration: 0.25,
         ease: "back.out(1.7)",
        });

        previewImages.forEach((img, imgIndex) => {
            gsap.to(img, {
                y: "0%",
                rotation: 0,
                duration: 0.25,
                ease: "back.out(1.7)",
                delay: imgIndex * 0.05,
            });
        });
    });
});

window.addEventListener("resize", ()=> {
    const currentBreakpoint = window.innerWidth < 1000;
    if (currentBreakpoint !== isMobile){
        isMobile = currentBreakpoint;
        setInitialPositions();
        folders.forEach((folder) => {
            folder.classList.remove("disabled");
        });
        const allPreviewImages = document.querySelectorAll(".folder-preview-img");
        gsap.set(allPreviewImages, { y: "0%", rotation: 0});
    }
});
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const scrollText = document.querySelector(".scroll-text");

if (scrollText) {
  const text = scrollText.innerText;
  scrollText.innerHTML = text
    .split("")
    .map(char =>
      char === " "
        ? "&nbsp;"
        : `<span class="char">${char}</span>`
    )
    .join("");

  const chars = scrollText.querySelectorAll(".char");

  gsap.fromTo(
    chars,
    { color: "rgba(25,6,25,0.25)" },
    {
      color: "rgba(25,6,25,1)",
      stagger: 0.015,
      scrollTrigger: {
        trigger: scrollText,
        start: "top 70%",
        end: "bottom 20%",
        scrub: true
      }
    }
  );
}

setInitialPositions();