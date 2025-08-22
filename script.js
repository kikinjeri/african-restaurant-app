document.addEventListener('DOMContentLoaded', () => {
    // Dummy data for restaurants
    const restaurants = [
        { id: 1, name: "Susu African Restaurant", lat: 45.405, lng: -75.688 },
        { id: 2, name: "African Village Restaurant", lat: 45.428, lng: -75.695 },
        { id: 3, name: "Bissap African Restaurant", lat: 45.474, lng: -75.498 }
    ];

    // Initialize the map
    const map = L.map('map').setView([45.4215, -75.6972], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    let markers = [];

    // Function to render restaurants on the map and in the select menu
    function renderRestaurants(list) {
        // Clear existing markers
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];

        // Clear select options
        const selectMenu = document.getElementById('restaurant-select');
        selectMenu.innerHTML = '';
        list.forEach(restaurant => {
            // Add to select menu
            const option = document.createElement('option');
            option.value = restaurant.id;
            option.textContent = restaurant.name;
            selectMenu.appendChild(option);

            // Add marker to map
            const marker = L.marker([restaurant.lat, restaurant.lng]).addTo(map)
                .bindPopup(`<b>${restaurant.name}</b>`);
            markers.push(marker);
        });
    }

    // Initial render of all restaurants
    renderRestaurants(restaurants);

    // Search functionality
    document.getElementById('search-input').addEventListener('input', (e) => {
        const searchText = e.target.value.toLowerCase();
        const filteredRestaurants = restaurants.filter(r => r.name.toLowerCase().includes(searchText));
        renderRestaurants(filteredRestaurants);
    });

    // Check-in functionality
    document.getElementById('check-in-btn').addEventListener('click', () => {
        const selectedId = document.getElementById('restaurant-select').value;
        const selectedRestaurant = restaurants.find(r => r.id == selectedId);
        if (selectedRestaurant) {
            alert(`You have checked in at ${selectedRestaurant.name}!`);
            // In a real app, this would be a server request to log the check-in.
        }
    });

    // Save button functionality
    document.getElementById('review-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const restaurantId = document.getElementById('restaurant-select').value;
        const photoFile = document.getElementById('photo-upload').files[0];
        const reviewText = document.getElementById('review-text').value;

        if (restaurantId && reviewText) {
            // This is the key part that requires a backend
            const formData = new FormData();
            formData.append('restaurantId', restaurantId);
            formData.append('review', reviewText);
            if (photoFile) {
                formData.append('photo', photoFile);
            }

            // In a real application, you would send this formData to a server:
            // fetch('/api/save-review', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => {
            //     alert("Review saved successfully!");
            //     // Handle success (e.g., clear form, update UI)
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            //     alert("Failed to save review.");
            // });

            // For now, we will just show an alert to simulate saving
            alert("Review is ready to be saved! This data would be sent to a server with a 'Save' button.");
            console.log("Data to be sent:", {
                restaurantId,
                reviewText,
                photoFile: photoFile ? photoFile.name : 'No photo'
            });
            // Clear the form after 'saving'
            document.getElementById('review-form').reset();
        } else {
            alert("Please select a restaurant and write a review.");
        }
    });
});