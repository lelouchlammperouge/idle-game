let autoClickInterval; // Interval for automatic cookie production
        let cpsUpgrade = 1; // Cookies per second upgrade level
        let upgradeCost = 10; // Initial cost for an upgrade

        function login() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Retrieve user data from local storage (for demonstration purposes)
            const user = JSON.parse(localStorage.getItem('user'));

            if (user && user.email === email && validatePassword(password, user.password)) {
                alert('Login successful!');
                showGamePage();
            } else {
                alert('Invalid email or password. Please try again.');
            }
        }

        function register() {
            const regEmail = document.getElementById('regEmail').value;
            const regPassword = document.getElementById('regPassword').value;

            // Retrieve existing user data from local storage
            const existingUser = JSON.parse(localStorage.getItem('user'));

            if (existingUser && existingUser.email === regEmail) {
                alert('An account with this email already exists.');
                return;
            }

            // Simulate server-side hashing of password
            const hashedPassword = hashPassword(regPassword);

            // Save user data in local storage (for demonstration purposes)
            localStorage.setItem('user', JSON.stringify({ email: regEmail, password: hashedPassword, cookies: 0, cps: 0 }));

            // Clear registration form fields
            document.getElementById('regEmail').value = '';
            document.getElementById('regPassword').value = '';

            // Hide registration form, show login form
            document.getElementById('registrationForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
        }

        function showRegistration() {
            document.getElementById('loginForm').style.display = 'none';
document.getElementById('registrationForm').style.display = 'block';
}
function showLogin() {
        document.getElementById('registrationForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    }

    function showGamePage() {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registrationForm').style.display = 'none';
        document.getElementById('gamePage').classList.add('active');
        loadCookies();
        loadUpgradeCost();
        startAutoClick();
    }

    function clickCookie() {
        const user = JSON.parse(localStorage.getItem('user'));
        user.cookies += 1;
        localStorage.setItem('user', JSON.stringify(user));
        loadCookies();
    }

    function loadCookies() {
        const user = JSON.parse(localStorage.getItem('user'));
        document.getElementById('cookieCount').innerText = user.cookies;
        document.getElementById('cps').innerText = user.cps;
    }

    function startAutoClick() {
        autoClickInterval = setInterval(autoProduceCookies, 1000);
    }

    function autoProduceCookies() {
        const user = JSON.parse(localStorage.getItem('user'));
        user.cookies += user.cps;
        localStorage.setItem('user', JSON.stringify(user));
        loadCookies();
    }

    function purchaseUpgrade() {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user.cookies >= upgradeCost) {
            user.cookies -= upgradeCost;
            user.cps += cpsUpgrade;
            upgradeCost = Math.ceil(upgradeCost * 1.5); // Increase upgrade cost by 50%
            cpsUpgrade += 1; // Increment CPS for the next upgrade
            localStorage.setItem('user', JSON.stringify(user));
            loadCookies();
            loadUpgradeCost(); // Update displayed upgrade cost after purchase
        } else {
            alert('Not enough cookies to purchase this upgrade!');
        }
    }

    function loadUpgradeCost() {
        document.getElementById('upgradeCost').innerText = upgradeCost;
    }

    function hashPassword(password) {
        return password;
    }

    function validatePassword(enteredPassword, storedPassword) {
        return enteredPassword === storedPassword;
    }