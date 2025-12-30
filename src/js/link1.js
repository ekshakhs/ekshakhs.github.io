const gsap = window.gsap;
const { CustomEase } = window.gsap;
const SplitType = window.SplitType;
const { ScrollTrigger } = window.gsap;
const Lenis = window.Lenis;

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    gsap.from(".titles > div", {
        x: "-40",
        ease: "power3.inOut",
        opacity: 0,
        duration: 0.8,
        stagger: 2
    });
    gsap.to(".titles > div", {
        x: "-60",
        ease: "power3.inOut",
        delay: 1.2,
        opacity: 0,
        duration: 0.8,
        stagger: 2
    });

    gsap.from("li", {
        x: "-1600",
        delay: 4,
        ease: "expo.inOut",
        duration: 3,
        stagger: 0.16
    });
    gsap.to("li", {
        x: "1600",
        delay: 6.5,
        ease: "expo.inOut",
        duration: 2.6,
        stagger: 0.2
    });

    var textWrapper = document.querySelector(".header");
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    gsap.from(".header .letter", {
        opacity: 0,
        y: 80,
        z: 0,
        ease: "expo.out",
        duration: 2,
        delay: 8.4,
        stagger: 0.004
    });
});