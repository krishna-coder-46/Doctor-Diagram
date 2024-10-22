// Points for a downward-sloping demand curve
const points = [
    { x: 160, y: 90 },  // Corresponding to Price 5, Quantity 20
    { x: 220, y: 140 }, // Corresponding to Price 4, Quantity 30
    { x: 270, y: 190 }, // Corresponding to Price 3, Quantity 40
    { x: 320, y: 260 }, // Corresponding to Price 2, Quantity 50
    { x: 370, y: 320 }  // Corresponding to Price 1, Quantity 60
];

let step = 0;

// Function to draw the full graph up to the current step
function drawGraph() {
    const canvas = document.getElementById('graphCanvas');
    if (!canvas) return;  // Check if the canvas exists to prevent errors
    const ctx = canvas.getContext('2d');

    // Clear the canvas and set its size
    canvas.width = 480;
    canvas.height = 380;

    // Step 1: Draw Y-axis
    if (step >= 1) {
        ctx.beginPath();
        ctx.moveTo(60, 350);  // Start from bottom left
        ctx.lineTo(60, 50);   // Line to the top left
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillText('Y', 70, 40); // Y-axis label
        for (let i = 0; i <= 5; i++) {
            ctx.fillText(i, 45, 350 - i * 50); // Label prices on Y-axis
        }
    }

    // Step 2: Draw X-axis
    if (step >= 2) {
        ctx.beginPath();
        ctx.moveTo(60, 350);  // Start from bottom left
        ctx.lineTo(450, 350); // Line to the bottom right
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillText('X', 460, 360); // X-axis label
        for (let i = 0; i <= 7; i++) {
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

    // Step 4: Draw the demand line and label 'D' at both ends, passing through all dots
    if (step >= 5) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y); // Start at first dot
        points.forEach((point) => {
            ctx.lineTo(point.x, point.y); // Connect dots with a straight line
        });
        ctx.strokeStyle = "#ff6f61"; // Demand line color
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillText('D', points[0].x - 15, points[0].y + 5); // Label at the starting point
        ctx.fillText('D', points[4].x + 10, points[4].y - 10); // Label at the ending point
    }

    // Step 5: Draw vertical lines from dots to corresponding X-axis labels (one-by-one)
    if (step >= 6) {
        for (let i = 0; i < step - 5 && i < points.length; i++) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[i].x, 350);  // Line down to X-axis
            ctx.strokeStyle = "#000"; // Line color
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    // Step 6: Draw horizontal lines from Y-axis (price) to the dots (one-by-one)
    if (step >= 11) {
        const prices = [90, 140, 190, 260, 320]; // Corresponding y-values for prices 5, 4, 3, 2, 1
        for (let i = 0; i < step - 10 && i < points.length; i++) {
            ctx.beginPath();
            ctx.moveTo(60, prices[i]);  // Start from the Y-axis (price)
            ctx.lineTo(points[i].x, prices[i]); // Line to the point
            ctx.strokeStyle = "#000"; // Line color
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

// Initialize graph on page load
window.onload = function () {
    drawGraph();
};

// Function to redirect to the desired page
function redirectTo(page) {
    window.location.href = page;
}



// Handle signup process
function handleSignup() {
    // Mock signup - save user details to localStorage (assuming a simple string for demo purposes)
    const firstName = document.querySelector('input[placeholder="First Name"]').value;
    const surname = document.querySelector('input[placeholder="Surname"]').value;
    const email = document.querySelector('input[placeholder="Email"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;
    const confirmPassword = document.querySelector('input[placeholder="Confirm Password"]').value;

    // Check if all fields are filled and passwords match
    if (firstName && surname && email && password && (password === confirmPassword)) {
        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify({ email, password }));
        alert('Signup successful! Please login now.');
        redirectTo('login.html');
    } else {
        alert('Please fill in all fields correctly.');
    }
}

// Handle login process
function handleLogin() {
    const username = document.querySelector('input[placeholder="Username"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;

    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // Check if the user exists
    if (!user) {
        // User does not exist, prompt to create an account
        alert('No account found. Please create an account first.');
        redirectTo('signup.html'); // Redirect to signup if no user found
    } else {
        // Check if the entered credentials match
        if (username === user.email && password === user.password) {
            // Correct credentials
            alert('Login successful!');
            redirectTo('demand.html'); // Redirect to the page after login
        } else {
            // Incorrect username or password
            alert('Incorrect username or password. Please try again.');
        }
    }
}


// Initialize event listeners on buttons
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.signup-form')) {
        document.querySelector('.signup-form button').addEventListener('click', handleSignup);
    }

    if (document.querySelector('.login-form')) {
        document.querySelector('.login-form button').addEventListener('click', handleLogin);
    }
});

// Function to redirect to a new page
function redirectTo(page) {
    window.location.href = page;
}
// Handle logout process
function handleLogout() {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    alert('You have been logged out.');
    redirectTo('index.html'); // Redirect to the home page after logout
}
