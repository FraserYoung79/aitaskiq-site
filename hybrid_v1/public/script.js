// Terminal Typewriter Effect
document.addEventListener('DOMContentLoaded', () => {
    const lines = document.querySelectorAll('.terminal-body .line');

    lines.forEach((line, index) => {
        line.style.opacity = '0';
        setTimeout(() => {
            line.style.opacity = '1';
        }, index * 800); // Stagger appearance
    });
});
