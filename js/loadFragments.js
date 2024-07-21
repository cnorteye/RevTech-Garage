function loadFragment(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => document.getElementById(id).innerHTML = data)
        .catch(error => console.error('Error loading fragment:', error));
}

document.addEventListener('DOMContentLoaded', function () {
    loadFragment('header', 'fragments/header.html');
    loadFragment('nav', 'fragments/nav.html');
    loadFragment('footer', 'fragments/footer.html');
});
