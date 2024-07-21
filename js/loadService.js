document.addEventListener("DOMContentLoaded", () => {
    // Function to load HTML content
    function loadHTMLFragment(url, containerId) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(containerId).innerHTML = data;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }

    // Load appointment.html content into the #appointment-content div
    loadHTMLFragment("service.html", "service-content");
});