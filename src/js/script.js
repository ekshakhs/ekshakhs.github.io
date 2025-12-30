import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");


document.addEventListener("DOMContentLoaded", () => {
  // Lock scroll during intro animation
  document.body.style.overflow = "hidden";

  const t1 = gsap.timeline({
    delay: 0.3,
     defaults: { ease: "hop" },
     });
     const counts = document.querySelectorAll(".count");
     
     counts.forEach((count, index) => {
       const digits = count.querySelectorAll(".digit h1"); 
         t1.to(digits, {
           y: "0%",
           duration: 1,
           stagger: 0.075,
         }, index * 1);

         if (index < counts.length) {
            t1.to(digits, {
                y: "-100%",
                duration: 1,
                stagger: 0.075,
              }, index * 1 + 1
            );
         } 
     });

     t1.to(".spinner", {
        opacity: 0,
        duration: 0.3,
     }
     );  
     t1.to
    ( ".word h1",
        {
            y: "0%",
            duration: 1,
        },
        "<"
    );

    t1.to(".divider",{
        scaleY: "100%",
        duration: 1,
        onComplete: () => gsap.to(".divider", {opacity:0, duration: 0.4, delay: 0.3}),
    });
    t1.to("#word-1 h1", {
        y: "100%",
        duration: 1,
        delay: 0.3
    });
    t1.to( "#word-2 h1",
        {
            y: "-100%",
            duration:1,
        },"<"
    );

    t1.to(".block", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        stagger: 0.1,
        delay: 0.75,
        onStart: () => gsap.to(".hero-img", {scale: 1, duration: 2, ease: "hop"}),
    });

    t1.to( [".line h1", ".line p"],
        {
            y: "0%",
            duration: 1.5,
            stagger: 0.2,
        }, "<"
    );

    t1.to([".cta", ".cta-icon"],
        {
            scale: 1,
            duration: 1.5,
            stagger: 0.75,
            delay: 0.75,
        }, "<"
    );
    t1.to(
        ".cta-label p",
        {
            y: "0%",
            duration: 1.5,
            delay: 0.5,
            onComplete: () => {
              // Unlock scroll after animation completes
              document.body.style.overflow = "auto";
            }
        }, "<"
    );
  }); 

  gsap.set(".part1", { pointerEvents: "none" });
  gsap.set(".part2", { pointerEvents: "zIndex: 10" });