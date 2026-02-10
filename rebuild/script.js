document.addEventListener('DOMContentLoaded', () => {
    const term = document.getElementById('mock-terminal');
    const lines = [
        "> Initializing Scout Swarm...",
        "> Target: Calgary_Legal_Vertical",
        "> Scanning for \"Digital Dinosaur\" signatures...",
        "> Found: 5 Firms with insecure SSL.",
        "> Generating Roast Blueprint...",
        "> REDESIGN READY: Vanguard_Legal_Group",
        "> ROAST: Header overflow detected on mobile.",
        "> ROI_CALC: Estimated $12k/mo leakage reclaimed."
    ];

    let i = 0;
    function typeEffect() {
        if (i < lines.length) {
            term.innerHTML += lines[i] + "<br>";
            i++;
            setTimeout(typeEffect, 1500);
        } else {
            setTimeout(() => {
                term.innerHTML = "> Initializing Scout Swarm...<br>";
                i = 1;
                typeEffect();
            }, 5000);
        }
    }

    typeEffect();
});
