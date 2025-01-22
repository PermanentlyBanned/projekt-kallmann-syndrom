document.addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById("title");
    const subtitle = document.getElementById("subtitle");

    // Trigger the subtitle animation after the title rises
    title.addEventListener("animationend", () => {
        subtitle.style.opacity = "1"; // Make subtitle visible
        subtitle.classList.add("stopped-blinking"); // Stop blinking cursor
    });

    // After animation completion, ensure no conflicts with the scroll logic
    title.addEventListener("animationend", () => {
        title.style.animation = ""; // Remove the animation property after it completes
    });

    // Scroll Event Listener for Sticky Title Behavior
    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;
        const header = document.querySelector("header");

        // Add 'locked' class when title reaches header
        if (scrollPosition > title.offsetTop - header.offsetHeight) {
            title.classList.add("locked");
        }
        // Remove 'locked' class when the subtitle is visible (re-enters below the header)
        else if (scrollPosition < subtitle.offsetTop - header.offsetHeight) {
            title.classList.remove("locked");
        }
    });

    const problemStatement = document.querySelector('.problem-statement');
    const words = document.querySelectorAll('.problem-statement .word');

    // Intersection Observer for problem statement
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                problemStatement.classList.add('animate');
                // Add animation for each word sequentially
                words.forEach((word, index) => {
                    setTimeout(() => {
                        word.classList.add('animate');
                    }, index * 500); // Delay each word by 500ms
                });
            } else {
                // Optional: Reset animations when scrolling out
                problemStatement.classList.remove('animate');
                words.forEach((word) => word.classList.remove('animate'));
            }
        });
    }, {
        threshold: 0.5, // Trigger when 50% of the element is visible
    });

    observer.observe(problemStatement);

    const crisisSection = document.querySelector(".crisis-section");
    const crisisTitle = document.querySelector(".crisis-title");

    const crisisObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add the typing animation class when section is visible
                crisisTitle.classList.add("typing");

                // Ensure the animation properties reset after completion
                crisisTitle.addEventListener("animationend", () => {
                    crisisTitle.style.width = "auto"; // Reset width to accommodate full content
                    crisisTitle.style.borderRight = "none"; // Remove the cursor
                });
            }
        });
    });

    // Observe the crisis section
    crisisObserver.observe(crisisSection);

    const icons = document.querySelectorAll(".info-icon-card");

    const iconObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Add animation classes when the section is in view
                    icons.forEach((icon, index) => {
                        icon.style.animation = ""; // Clear previous animations
                        if (index === 0) {
                            icon.style.animation = "iconMoveLeft 1s ease forwards";
                        } else if (index === 1) {
                            icon.style.animation = "iconMoveMiddle 1s ease forwards";
                        } else if (index === 2) {
                            icon.style.animation = "iconMoveRight 1s ease forwards";
                        }
                    });
                } else {
                    // Reset icons to their original positions when the section is not in view
                    icons.forEach((icon) => {
                        icon.style.animation = ""; // Remove animations
                    });
                }
            });
        },
        { threshold: 0.1 } // Trigger animation when 10% of the section is visible
    );

    // Observe the section
    iconObserver.observe(crisisSection);

    const ctx = document.getElementById("fatalitiesChart").getContext("2d");

    // Data for the chart
    const data = {
        labels: ["2019", "2020", "2021", "2022", "2023"],
        datasets: [{
            label: "Fatalities",
            data: [9592, 11258, 12330, 12151, 11900],
            backgroundColor: "rgba(255, 105, 180, 0.6)", // Pink bars
            borderColor: "rgba(255, 105, 180, 1)", // Border color
            borderWidth: 1,
            borderRadius: 15, // Rounded corners
        }]
    };

    // Chart configuration
    const config = {
        type: "bar",
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false, // Allow resizing for a longer chart
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: "white" // Legend text color
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: "white" }, // X-axis labels color
                    grid: { display: false } // Hide grid lines
                },
                y: {
                    ticks: { color: "white" }, // Y-axis labels color
                    grid: { color: "rgba(255, 255, 255, 0.2)" } // Light grid lines
                }
            },
            animation: {
                duration: 4000, // Slower animation for each bar
                easing: "easeOutQuart", // Smooth ease-out effect
                delay: (context) => context.dataIndex * 1000, // 1-second delay per bar
            }
        }
    };

    // Create the chart but don't render it yet
    const fatalitiesChart = new Chart(ctx, config);

    // Intersection Observer to animate the chart on viewport entry
    const chartContainer = document.querySelector(".chart");
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Start chart animation
                fatalitiesChart.update();
                chartObserver.unobserve(chartContainer); // Stop observing once animated
            }
        });
    });

    // Observe the chart container
    chartObserver.observe(chartContainer);
});

