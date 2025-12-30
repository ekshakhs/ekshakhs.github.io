import { gsap } from "gsap";
import "./script.js";

import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

if(! sessionStorage.getItem("welcomeShown") ){
    

console.log("Main JS loaded");
alert("This work remains in the quiet throes of construction; your indulgence toward its incompleteness is appreciated.");

sessionStorage.setItem("welcomeShown", "true"); }
const folders = document.querySelectorAll(".folder");
const folderWrappers = document.querySelectorAll(".folder-wrapper");

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
 const folders = document.querySelectorAll(".folder");
    folders.forEach((folder, index) => { folder.addEventListener("click", () => {
        window.location.href = "f" + (index + 1) + ".html";

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

// Select all vertical folders
const wildFolders = document.querySelectorAll(".wild-vertical");

// Loop through each folder and apply stacking animation
wildFolders.forEach((folder, index) => {
  
  ScrollTrigger.create({
    trigger: folder,
    start: "top top", // When the folder reaches the top of the page
    pin: true, // Lock it at the top
    pinSpacing: true, // Allow spacing so the next folder follows
    scrub: 1, // Smooth scroll animation
    anticipatePin: 1
  });

});

import Lenis from '@studio-freight/lenis'

import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger);
const splitTypes = document.querySelectorAll('.folder-name .inn');
splitTypes.forEach((char, i)=>{

const text = new SplitType(char, { types: 'chars' })

gsap.from(text.chars, {
    scrollTrigger: {
        trigger: char,
    start: 'top 80%',
    end: 'top 20%',
    scrub: true,
    markers: false},
    opacity: 0.2,
    stagger: 0.1,
   })
})
const lenis = new Lenis()
lenis.on('scroll', (e) => {
    console.log(e)})

    function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
setInitialPositions();