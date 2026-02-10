function selectIndustry(industry) {
    const core = document.getElementById('main-core');

    // Smooth transition effect
    core.style.opacity = '0';
    core.style.transform = 'scale(0.95)';

    setTimeout(() => {
        if (industry === 'legal') {
            window.location.href = 'rebuild/index.html';
        } else {
            // Placeholder for other industry morphs
            core.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <span style="font-size: 4rem;">⚡</span>
                    <h2 style="margin: 1rem 0;">Initializing ${industry.toUpperCase()} Swarm...</h2>
                    <p style="color: var(--text-muted);">We are currently deploying the specialized agent-set for this vertical.</p>
                    <button class="glow-btn" style="margin-top: 2rem;" onclick="location.reload()">Back to Core</button>
                </div>
            `;
            core.style.opacity = '1';
            core.style.transform = 'scale(1)';
        }
    }, 500);
}

// Subtle mouse track for bg mesh
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.querySelector('.bg-mesh').style.background = `
        radial-gradient(circle at ${x}% ${y}%, rgba(37, 99, 235, 0.15) 0%, transparent 40%),
        radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 40%)
    `;
});
