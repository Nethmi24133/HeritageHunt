/**
 * HERITAGE HUNT - MAIN LOGIC SCRIPT
 * ---------------------------------------------------------
 * This script manages the core interactivity of the website:
 * 1. Data Management: Storing site details (name, location, coordinates).
 * 2. Home Page: Handling the automatic background slideshow.
 * 3. Map Page: Initializing the map, search filtering, and sidebar interaction.
 * 4. About Page: Handling contact form submissions.
 */

/* 1. DATA STORE ("The Database") */
const heritageSites = [ 
    { 
        name: "Sigiriya Rock", 
        district: "Matale", 
        lat: 7.9570, 
        lng: 80.7603, 
        img: "download.webp",
        desc: "The ancient lion rock fortress built by King Kasyapa."
    },
    { 
        name: "Galle Fort", 
        district: "Galle", 
        lat: 6.0263, 
        lng: 80.2166, 
        img: "gallefort.webp",
        desc: "A living heritage site with Dutch colonial architecture."
    },
    { 
        name: "Temple of the Tooth", 
        district: "Kandy", 
        lat: 7.2936, 
        lng: 80.6413, 
        img: "temple of tooth.jpg",
        desc: "The sacred temple housing the tooth relic of Buddha."
    },
    { 
        name: "Pollonaruwa Vatadage", 
        district: "Polonnaruwa", 
        lat: 7.9403, 
        lng: 81.0011, 
        img: "watadageya.jpg",
        desc: "A stunning circular relic house from the Polonnaruwa era."
    },
    { 
        name: "Madhu Church", 
        district: "Mannar", 
        lat: 8.8500, 
        lng: 80.2000, 
        img: "madhu.webp",
        desc: "The most revered Catholic pilgrimage site in Sri Lanka."
    }, 
    { 
        name: "Nallur Kovil", 
        district: "Jaffna", 
        lat: 9.6667, 
        lng: 80.0333, 
        img: "Nallur.webp",
        desc: "A major Hindu temple and cultural landmark in Jaffna."
    },
    { 
        name: "Jaffna Public Library", 
        district: "Jaffna", 
        lat: 9.6622, 
        lng: 80.0103, 
        img: "jaffnaLibrary.webp",
        desc: "A historic cultural landmark symbolizing knowledge and resilience."
    },
    { 
        name: "Jaya Sri Maha Bodhi",
        district: "Anuradhapura",
        lat: 8.3475, 
        lng: 80.3883, 
        img: "srimahabpdhi.webp",
        desc: "The world’s oldest recorded sacred tree."
    },
    { 
        name: "Adam's Peak",
        district: "Ratnapura",
        lat: 6.8096, 
        lng: 80.4999, 
        img: "Adm's peak.webp",
        desc: "A sacred mountain revered for the holy footprint at its summit."
    },
    { 
        name: "Koneswaram Temple",
        district: "Trincomalee",
        lat: 8.5776, 
        lng: 81.2335, 
        img: "koneshwaram.webp",
        desc: "A sacred coastal shrine to Lord Shiva with breathtaking ocean views."
    }
];

/* 2. HOME PAGE SLIDESHOW LOGIC */
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

/* Cycles through background images by toggling the 'active' class.*/

function showSlides() {
    // Check if the slideshow container exists on the current page
    if (slides.length === 0) return; 
    
    // Remove active state from all slides
    slides.forEach(s => s.classList.remove('active'));
    
    // Move to the next slide index
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Apply active state to current slide
    slides[currentSlide].classList.add('active');
    
    // Repeat every 4 seconds
    setTimeout(showSlides, 1800); 
}

// Initialize slideshow when the page loads
document.addEventListener('DOMContentLoaded', showSlides);

/* 3. MAP & SEARCH FILTERING LOGIC */
const mapElement = document.getElementById('map');

// Only execute map logic if the map element exists on the page
if (mapElement) {
    // Initialize the Leaflet map centered on Sri Lanka
    const map = L.map('map').setView([7.8731, 80.7718], 7);
    
    // Load map tiles from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    /**
     * Filters site data based on search input and updates UI (Map + Sidebar).
     * @param {string} filterText - User input from the search bar.
     */
    function displaySites(filterText = "") {
        const listContainer = document.getElementById('siteList');
        if (!listContainer) return;
        
        // Clear current sidebar list before re-filtering
        listContainer.innerHTML = ""; 

        heritageSites.forEach(site => {
            // Check if site name or district matches the search query
            const isMatch = site.name.toLowerCase().includes(filterText.toLowerCase()) || 
                            site.district.toLowerCase().includes(filterText.toLowerCase());

            if (isMatch) {
                // A. Add Pin Marker to the Map
                const marker = L.marker([site.lat, site.lng]).addTo(map);
                marker.bindPopup(`<b>${site.name}</b><br>${site.district}`);

                // B. Create Sidebar Card Element
                const card = document.createElement('div');
                card.className = "site-card";
                card.innerHTML = `
                    <img src="${site.img}" alt="${site.name}">
                    <div class="site-card-info">
                        <h3>${site.name}</h3>
                        <p>${site.district}</p>
                    </div>
                `;

                // C. Interactivity: Zoom to map location when sidebar card is clicked
                card.onclick = () => {
                    map.flyTo([site.lat, site.lng], 12);
                    marker.openPopup();
                };

                // Add the card to the sidebar container
                listContainer.appendChild(card);
            }
        });
    }

    // Connect the Search Bar to the displaySites function
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => displaySites(e.target.value));
    }

    // Perform initial render to show all sites on page load
    displaySites();
}

/* 4. ABOUT PAGE - FORM HANDLING */
/**
 * Processes the contact/suggestion form submission.
 * @param {Event} event - The form submission event.
 */
function handleForm(event) {
    // Prevent the default browser action (page reload)
    event.preventDefault(); 
    
    // Extract values from the form inputs
    const userName = document.getElementById('name').value;
    const siteName = document.getElementById('heritage').value;

    // Display a confirmation message to the user
    alert(`Thank you, ${userName}! Your suggestion for "${siteName}" has been successfully sent.`);
    
    // Reset the form fields for the next entry
    event.target.reset(); 
}