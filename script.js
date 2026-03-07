let packagesData = [];
// Save array of IDs, initialize properly
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let myTrip = JSON.parse(localStorage.getItem("myTrip")) || []; 

const cardsContainer = document.getElementById("cardsContainer");
const searchInput = document.getElementById("search");
const continentFilter = document.getElementById("continentFilter");
const sortSelect = document.getElementById("sort");
const tripList = document.getElementById("tripList");
const emptyTripMessage = document.getElementById("emptyTripMessage");

fetch("packages.json")
  .then(res => res.json())
  .then(data => {
    packagesData = data;
    displayCards(filteredData());
    renderTrip();
  })
  .catch(err => console.error("Error loading packages:", err));

function displayCards(data) {
  cardsContainer.innerHTML = "";

  if (data.length === 0) {
    cardsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No destinations matched your criteria.</p>`;
    return;
  }

  data.forEach(pkg => {
    const card = document.createElement("div");
    card.className = "card";

    const isFav = favorites.includes(pkg.id);

    // XSS safe approach since we escape quotes in button calls using IDs instead
    card.innerHTML = `
      <div class="card-header">
        <h3>${pkg.name}</h3>
        <button class="favorite ${isFav ? "active" : ""}" 
                onclick="toggleFavorite(${pkg.id}, event)"
                aria-label="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
          ♥
        </button>
      </div>
      
      <div class="card-details">
        <p><span>📍</span> ${pkg.continent}</p>
        <p><span>💳</span> <span class="price-tag">$${pkg.price}</span></p>
        <p><span>⭐</span> <span class="rating-star">${pkg.rating}</span></p>
      </div>

      <button class="btn-add" onclick="addToTrip(${pkg.id})">
        Add to Trip
      </button>
    `;

    cardsContainer.appendChild(card);
  });
}

function toggleFavorite(id, event) {
  if (event) event.stopPropagation();
  
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));

  // Update specific button visually without full DOM re-render to keep smooth interactions
  if (event) {
    const btn = event.currentTarget;
    if (favorites.includes(id)) {
      btn.classList.add("active");
      btn.setAttribute("aria-label", "Remove from favorites");
    } else {
      btn.classList.remove("active");
      btn.setAttribute("aria-label", "Add to favorites");
    }
  } else {
    displayCards(filteredData());
  }
}

function addToTrip(id) {
  // Check if it's already in the trip to avoid duplicates
  if (!myTrip.includes(id)) {
    myTrip.push(id);
    localStorage.setItem("myTrip", JSON.stringify(myTrip));
    renderTrip();
  }
}

function removeFromTrip(id) {
  myTrip = myTrip.filter(pkgId => pkgId !== id);
  localStorage.setItem("myTrip", JSON.stringify(myTrip));
  renderTrip();
}

function renderTrip() {
  tripList.innerHTML = "";
  
  if (myTrip.length === 0) {
    emptyTripMessage.classList.add("visible");
    return;
  }
  
  emptyTripMessage.classList.remove("visible");

  myTrip.forEach(id => {
    const pkg = packagesData.find(p => p.id === id);
    if (!pkg) return; // safety check if id from store no longer exists in JSON
    
    const li = document.createElement("li");
    li.className = "trip-item";
    
    li.innerHTML = `
      <span>${pkg.name}</span>
      <button class="btn-remove" onclick="removeFromTrip(${pkg.id})" title="Remove">✕</button>
    `;
    
    tripList.appendChild(li);
  });
}

function filteredData() {
  let result = [...packagesData];

  const search = searchInput.value.toLowerCase().trim();

  if (search) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(search)
    );
  }

  const continent = continentFilter.value;

  if (continent !== "All") {
    result = result.filter(p =>
      p.continent === continent
    );
  }

  // Handle Sort
  const sort = sortSelect.value;
  if (sort === "lowPrice") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "highPrice") {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  }

  return result;
}

// Event Listeners
searchInput.addEventListener("input", () => {
  displayCards(filteredData());
});

continentFilter.addEventListener("change", () => {
  displayCards(filteredData());
});

sortSelect.addEventListener("change", () => {
  displayCards(filteredData());
});