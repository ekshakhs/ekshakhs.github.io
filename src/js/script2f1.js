const gsap = window.gsap;
const { ScrollTrigger } = window.gsap;
const Lenis = window.Lenis;

gsap.registerPlugin(ScrollTrigger);

const config = {
    gap: 0.08,
    speed: 0.3,
    arcRadius: 500,
};

const spotlightItems = [
    { name: "the disturbance", img: "/pictures/folder1/img1.jpg" },
    { name: "Item 2", img: "/pictures/folder1/img2.jpg" },
    { name: "Item 3", img: "/pictures/folder1/img3.jpg" },
    { name: "Item 4", img: "/pictures/folder1/img4.jpg" },
    { name: "Item 5", img: "/pictures/folder1/img5.jpg" },
    { name: "Item 6", img: "/pictures/folder1/img6.jpg" },
    { name: "Item 7", img: "/pictures/folder1/img7.jpg" },
    { name: "Item 8", img: "/pictures/folder1/img8.jpg" },
    { name: "Item 9", img: "/pictures/folder1/img9.jpg" },
];

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => 
    lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);


const titlesContainer = document.querySelector(".spotlight-titles");
const imagesContainer = document.querySelector(".spotlight-images");
const spotlightHeader = document.querySelector(".spotlight-header");
const titlesContainerElement=document.querySelector(".spotlight-titles-containers");
const introTextElements = document.querySelectorAll(".spotlight-intro-text");
const imageElements = [];

spotlightItems.forEach((item, index) => {
    const titleElement = document.createElement("h1");
    titleElement.textContent = item.name;
    if (index === 0) titleElement.style.opacity = "1";
    titlesContainer.appendChild(titleElement);

    titleElement.style.cursor = "pointer";
    titleElement.addEventListener("click", () => {
        window.location.href = `src/pages/link${index + 1}.html`;
    });
    titleElement.addEventListener("mouseenter", () => {
        gsap.to(titleElement, { scale: 1.05, duration: 0.2 });
    });
    titleElement.addEventListener("mouseleave", () => {
        gsap.to(titleElement, { scale: 1, duration: 0.2 });
    });

    const imgWrapper = document.createElement("div");
    imgWrapper.className = "spotlight-img";
    const imgElement = document.createElement("img");
    imgElement.src = item.img;
    imgElement.alt = "";
    imgWrapper.appendChild(imgElement);
    imagesContainer.appendChild(imgWrapper);
    imageElements.push(imgWrapper);
});

const titleElements = titlesContainer.querySelectorAll("h1");
let currentActiveIndex = 0;

const containerWidth = window.innerWidth * 0.3;
const containerHeight = window.innerHeight;
const arcStartX = containerWidth - 220;
const arcStartY = -200;
const arcEndY = containerHeight + 200;
const arcControlPointX = arcStartX + config.arcRadius;;
const arcControlPointY = containerHeight / 2;


function getBezierPosition (t){
    const x = (1 - t) * (1 - t) * arcStartX + 2 * (1 - t) * t * arcControlPointX + t * t * arcStartX;
    const y = (1 - t) * (1 - t) * arcStartY + 2 * (1 - t) * t * arcControlPointY + t * t * arcEndY;
    return { x, y };
}

function getImgProgressState (index, overallProgress){
    const startTime = index * config.gap;
    const endTime = startTime + config.speed;

if (overallProgress < startTime) return -1;
if (overallProgress > endTime) return 2;

return (overallProgress - startTime) / config.speed;}

imageElements.forEach((img) => gsap.set(img, {opacity: 0}));

ScrollTrigger.create({
    trigger: ".spotlight",
    start: "top top",
    end: `+=${window.innerHeight * 10}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,

onUpdate: (self) => {
    const progress = self.progress;

    if (progress <= 0.2){
        const animationProgress = progress / 0.2;

        const moveDistance = window.innerWidth * 0.6;
        gsap.set(introTextElements[0], {
            x: -animationProgress * moveDistance,
        });
        gsap.set(introTextElements[0], { opacity: 1});
        gsap.set(introTextElements[1], { opacity: 1});

        gsap.set(".spotlight-bg-img", {
            transform: `scale(${animationProgress})`,
        });
        gsap.set(".spotlight-bg-img img",{
            transform: `scale(${1.5 - animationProgress * 0.5})`,
        });
imageElements.forEach((img) => gsap.set(img, {opacity: 0}));
spotlightHeader.style.opacity = "0";
gsap.set(titlesContainerElement, {"--before-opacity": "0",
    "--after-opacity": "0",
});

    }

    else if (progress > 0.2 && progress <= 0.25){
        gsap.set(".spotlight-bg-img", {transform: "scale(1)"});
        gsap.set(".spotlight-bg-img img", {transform: "scale(1)"});
        gsap.set(introTextElements[0], { opacity: 0});
        gsap.set(introTextElements[1], { opacity: 0});
    
    imageElements.forEach((img) => gsap.set(img, {opacity: 0}));
    spotlightHeader.style.opacity = "1";
    gsap.set(titlesContainerElement, {"--before-opacity": "1",
        "--after-opacity": "1",
    });
    }

    else if (progress > 0.25 && progress <= 0.95){
        gsap.set(".spotlight-bg-img", {transform: "scale(1)"});
        gsap.set(".spotlight-bg-img img", {transform: "scale(1)"});

        gsap.set(introTextElements[0], { opacity: 0});
        gsap.set(introTextElements[1], { opacity: 0});

        spotlightHeader.style.opacity = "1";
        gsap.set(titlesContainerElement, {"--before-opacity": "1",
            "--after-opacity": "1",
        });

const switchProgress = (progress - 0.25) / 0.7;
const viewportHeight = window.innerHeight;
const titlesContainerHeight = titlesContainer.scrollHeight;
        const startPosition = viewportHeight;
        const targetPosition = -titlesContainerHeight;
        const totalPosition = startPosition - targetPosition;
        const currentY = startPosition - switchProgress * totalPosition;

        gsap.set(".spotlight-titles", {
            transform: `translateY(${currentY}px)`,
      
      }  );


     imageElements.forEach((img, index) => { 
        const imageProgress = getImgProgressState(index, switchProgress);

        if (imageProgress < 0 || imageProgress > 1)
            {gsap.set(img, {opacity: 0}); }else
            {const pos = getBezierPosition(imageProgress);
                gsap.set(img, {
                    x: pos.x - 100,
                    y: pos.y - 75,
                    opacity: 1,
            });
    }
     });
    
    
    const viewportMiddle = viewportHeight / 2;
let closestIndex = 0;
let closestDistance = Infinity;

titleElements.forEach((title, index) => {
    const titleRect = title.getBoundingClientRect();
const titleCenter = titleRect.top + titleRect.height / 2;
const distanceFromCenter = Math.abs(titleCenter - viewportMiddle);
if (distanceFromCenter < closestDistance) {
    closestDistance = distanceFromCenter;
    closestIndex = index;
}

});

if (closestIndex !== currentActiveIndex){
    if(titleElements[currentActiveIndex]){
        titleElements[currentActiveIndex].style.opacity = "0.25";

}
titleElements[closestIndex].style.opacity = "1";
document.querySelector(".spotlight-bg-img img").src = spotlightItems[closestIndex].img;
currentActiveIndex = closestIndex;


}}
else if (progress > 0.95){
    spotlightHeader.style.opacity = "0";
    gsap.set(titlesContainerElement, {
        "--before-opacity": "0",
        "--after-opacity": "0",
    });
}

},
});

