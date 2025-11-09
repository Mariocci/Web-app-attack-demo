async function apiPost(path, body) {
    const res = await fetch(path,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(body)
    });
    return res.json();
}


const vulnToggle = document.getElementById('vulnToggle');
const form = document.getElementById('loginForm');
const resultElement = document.getElementById('result');
const submitButton = document.getElementById('submitButton');

form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    submitButton.disabled = true;
    const username = document.getElementById('username').value || '';
    const password = document.getElementById('password').value || '';

    const useVuln = vulnToggle.checked === true;
    const endpoint = useVuln ? '/sqli/user-info-vuln' : '/sqli/user-info-safe';

    try {
        const json = await apiPost(endpoint, { username, password });
        const prefix = useVuln ? '[VULNERABLE]' : '[SAFE]';
        resultElement.textContent = `${prefix} ${JSON.stringify(json, null, 2)}`;
    } catch (err) {
        console.error(err);
        resultElement.textContent = `Request failed: ${err.message}`;
    } finally {
        submitButton.disabled = false;
    }
});