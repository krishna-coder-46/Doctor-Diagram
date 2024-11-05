// Points for an upward-sloping supply curve
const points = [
    { x: 110, y: 320 },  // Corresponding to Quantity 10, Price 1
    { x: 160, y: 260 },  // Corresponding to Quantity 20, Price 2
    { x: 210, y: 210 },  // Corresponding to Quantity 30, Price 3
    { x: 260, y: 160 },  // Corresponding to Quantity 40, Price 4
    { x: 310, y: 110 },  // Corresponding to Quantity 50, Price 5
    { x: 360, y: 60 }    // Corresponding to Quantity 60, Price 6
];

let step = 0;

// Function to draw the full graph up to the current step
function drawGraph() {
    const canvas = document.getElementById('graphCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = 480;
    canvas.height = 380;

    // Step 1: Draw Y-axis
    if (step >= 1) {
        ctx.beginPath();
        ctx.moveTo(60, 350);
        ctx.lineTo(60, 50);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillText('Y', 70, 40); // Y-axis label
        for (let i = 1; i <= 6; i++) {
            ctx.fillText(i, 45, 350 - i * 50); // Label prices on Y-axis
        }
    }

    // Step 2: Draw X-axis
    if (step >= 2) {
        ctx.beginPath();
        ctx.moveTo(60, 350);
        ctx.lineTo(450, 350);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillText('X', 460, 360); // X-axis label
        for (let i = 1; i <= 6; i++) {
            ctx.fillText(i * 10, 60 + i * 50, 365); // Label quantities on X-axis
        }
    }

    // Step 3: Draw dots sequentially based on the current step
    if (step >= 3) {
        for (let i = 0; i < points.length; i++) {
            ctx.beginPath();
            ctx.arc(points[i].x, points[i].y, 5, 0, Math.PI * 2);
            ctx.fillStyle = "#000";
            ctx.fill();
        }
    }

    // Step 4: Draw the supply line and label 'S' at both ends, passing through all dots
    if (step >= 5) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.forEach((point) => {
            ctx.lineTo(point.x, point.y);
        });
        ctx.strokeStyle = "#ff6f61";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillText('S', points[0].x - 15, points[0].y + 5);
        ctx.fillText('S', points[5].x + 10, points[5].y - 10);
    }

    // Step 5: Draw vertical lines from dots to corresponding X-axis labels (one-by-one)
    if (step >= 6) {
        for (let i = 0; i < step - 5 && i < points.length; i++) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[i].x, 350);
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    // Step 6: Draw horizontal lines from Y-axis (price) to the dots (one-by-one)
    if (step >= 11) {
        const prices = [320, 260, 210, 160, 110, 60];
        for (let i = 0; i < step - 10 && i < points.length; i++) {
            ctx.beginPath();
            ctx.moveTo(60, prices[i]);
            ctx.lineTo(points[i].x, prices[i]);
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
}


// Next button functionality
document.getElementById('nextButton')?.addEventListener('click', function () {
    if (step < 16) {  // Updated maximum step to 16 for the entire process
        step++;
        drawGraph();
    }
});

// Back button functionality
document.getElementById('backButton')?.addEventListener('click', function () {
    if (step > 0) {
        step--;
        drawGraph();
    }
});

// Incremental step drawing function
function incrementStep() {
    step++;
    drawGraph();
}

// Draw initial graph
drawGraph();
