document.addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById("title");
    const subtitle = document.getElementById("subtitle");

    // Combine both animationend callbacks for #title:
    title.addEventListener("animationend", () => {
        subtitle.style.opacity = "1";
        subtitle.classList.add("stopped-blinking");
        title.style.animation = "";
    }, { once: true });

    const titleOriginalOffset = title.offsetTop;

    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;
        const header = document.querySelector("header");

        if (scrollPosition > titleOriginalOffset - header.offsetHeight) {
            title.classList.add("locked");
        } else {
            title.classList.remove("locked");
        }
    });

    const elementsToAnimate = [
        { el: document.querySelector(".problem-statement"), words: document.querySelectorAll(".problem-statement .word") },
        { el: document.querySelector(".crisis-section"), title: document.querySelector(".crisis-title") }
    ];

    const combinedObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains("problem-statement")) {
                    entry.target.classList.add("animate");
                    entry.target.querySelectorAll(".word").forEach((word, index) => {
                        setTimeout(() => word.classList.add("animate"), index * 500);
                    });
                }
                if (entry.target.classList.contains("crisis-section")) {
                    const crisisTitle = document.querySelector(".crisis-title");
                    crisisTitle.classList.add("typing");
                    crisisTitle.addEventListener("animationend", () => {
                        crisisTitle.style.width = "auto";
                        crisisTitle.style.borderRight = "none";
                    }, { once: true });
                }
            }
        });
    }, { threshold: 0.5 });

    elementsToAnimate.forEach(item => combinedObserver.observe(item.el));

    const icons = document.querySelectorAll(".info-icon-card");

    const iconObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {

                    icons.forEach((icon, index) => {
                        icon.style.animation = ""; 
                        if (index === 0) {
                            icon.style.animation = "iconMoveLeft 1s ease forwards";
                        } else if (index === 1) {
                            icon.style.animation = "iconMoveMiddle 1s ease forwards";
                        } else if (index === 2) {
                            icon.style.animation = "iconMoveRight 1s ease forwards";
                        }
                    });
                } else {

                    icons.forEach((icon) => {
                        icon.style.animation = ""; 
                    });
                }
            });
        },
        { threshold: 0.1 } 
    );

    iconObserver.observe(document.querySelector(".crisis-section"));

    const ctx = document.getElementById("fatalitiesChart").getContext("2d");

    const data = {
        labels: ["2019", "2020", "2021", "2022", "2023"],
        datasets: [{
            label: "Fatalities",
            data: [9592, 11258, 12330, 12151, 11900],
            backgroundColor: "rgba(255, 105, 180, 0.6)", 
            borderColor: "rgba(255, 105, 180, 1)", 
            borderWidth: 1,
            borderRadius: 15, 
        }]
    };

    const config = {
        type: "bar",
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false, 
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: "white" 
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: "white" }, 
                    grid: { display: false } 
                },
                y: {
                    ticks: { color: "white" }, 
                    grid: { color: "rgba(255, 255, 255, 0.2)" } 
                }
            },
            animation: {
                duration: 4000, 
                easing: "easeOutQuart", 
                delay: (context) => context.dataIndex * 1000, 
            }
        }
    };

    const fatalitiesChart = new Chart(ctx, config);

    const chartContainer = document.querySelector(".chart");
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {

                fatalitiesChart.update();
                chartObserver.unobserve(chartContainer); 
            }
        });
    });

    chartObserver.observe(chartContainer);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'G' || event.key === 'g') {
        window.open('https://github.com/PermanentlyBanned/projekt-kallmann-syndrom', '_blank');
    } else if (event.key === 'P' || event.key === 'p') {
        window.location.href = "https://presentation.niclas.vip/";
    }
});