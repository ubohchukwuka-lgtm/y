let accounts = {}; // { username: { pin: "1234", balance: 0 } }
    let currentUser = null;

    function showPage(pageId) {
      document.querySelectorAll('.atm-card').forEach(div => div.style.display = 'none');
      document.getElementById(pageId).style.display = 'block';
    }

    function createAccount() {
      const user = document.getElementById('newUsername').value.trim();
      const pin = document.getElementById('newPin').value.trim();

      if (!user || !pin) return alert("Please enter username and PIN.");
      if (accounts[user]) return alert("Username already exists.");

      accounts[user] = { pin, balance: 0 };
      alert("Account created successfully!");
      showPage('welcomePage');
      document.getElementById('newUsername').value = '';
      document.getElementById('newPin').value = '';
    }

    function login() {
      const user = document.getElementById('loginUsername').value.trim();
      const pin = document.getElementById('loginPin').value.trim();

      if (accounts[user] && accounts[user].pin === pin) {
        currentUser = user;
        document.getElementById('userDisplay').innerText = user;
        showPage('homePage');
      } else {
        alert("Invalid username or PIN.");
      }
    }

    function logout() {
      currentUser = null;
      showPage('welcomePage');
    }

    function deposit() {
      const amount = parseFloat(document.getElementById('depositAmount').value);
      if (isNaN(amount) || amount <= 0) return alert("Enter a valid amount.");

      accounts[currentUser].balance += amount;
      alert(`Deposited NGN${amount.toFixed(2)} successfully.`);
      document.getElementById('depositAmount').value = '';
      showPage('homePage');
    }

    function withdraw() {
      const amount = parseFloat(document.getElementById('withdrawAmount').value);
      if (isNaN(amount) || amount <= 0) return alert("Enter a valid amount.");

      if (accounts[currentUser].balance < amount) return alert("Insufficient funds.");
      accounts[currentUser].balance -= amount;
      alert(`Withdrew NGN${amount.toFixed(2)} successfully.`);
      document.getElementById('withdrawAmount').value = '';
      showPage('homePage');
    }

    function showBalance() {
      const balance = accounts[currentUser].balance;
      alert(`Your balance is NGN${balance.toFixed(2)}.`);
    }

    function updateAccount() {
      const newPin = document.getElementById('updatePin').value.trim();
      if (!newPin) return alert("Enter a new PIN.");
      accounts[currentUser].pin = newPin;
      alert("PIN updated successfully.");
      document.getElementById('updatePin').value = '';
      showPage('homePage');
    }