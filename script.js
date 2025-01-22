document.addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById("title");
    const subtitle = document.getElementById("subtitle");

    title.addEventListener("animationend", () => {
        subtitle.style.opacity = "1"; 
        subtitle.classList.add("stopped-blinking"); 
    });

    title.addEventListener("animationend", () => {
        title.style.animation = ""; 
    });

    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;
        const header = document.querySelector("header");

        if (scrollPosition > title.offsetTop - header.offsetHeight) {
            title.classList.add("locked");
        }

        else if (scrollPosition < subtitle.offsetTop - header.offsetHeight) {
            title.classList.remove("locked");
        }
    });

    const problemStatement = document.querySelector('.problem-statement');
    const words = document.querySelectorAll('.problem-statement .word');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                problemStatement.classList.add('animate');

                words.forEach((word, index) => {
                    setTimeout(() => {
                        word.classList.add('animate');
                    }, index * 500); 
                });
            } else {

                problemStatement.classList.remove('animate');
                words.forEach((word) => word.classList.remove('animate'));
            }
        });
    }, {
        threshold: 0.5, 
    });

    observer.observe(problemStatement);

    const crisisSection = document.querySelector(".crisis-section");
    const crisisTitle = document.querySelector(".crisis-title");

    const crisisObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {

                crisisTitle.classList.add("typing");

                crisisTitle.addEventListener("animationend", () => {
                    crisisTitle.style.width = "auto"; 
                    crisisTitle.style.borderRight = "none"; 
                });
            }
        });
    });

    crisisObserver.observe(crisisSection);

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

    iconObserver.observe(crisisSection);

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