const players = [
  {name:"Zain Rahman",country:"United Kingdom",club:"Walthamstow FC",age:"U16",positions:["CM","CAM","CDM"],number:"01"},
  {name:"Amanul Hoque (Mahdi)",country:"Canada",club:"Canada First Academy",age:"U16",positions:["LW","ST","RW"],number:"02"}
];

const grid = document.getElementById("playerGrid");
const search = document.getElementById("searchInput");
const position = document.getElementById("positionFilter");
const country = document.getElementById("countryFilter");
const empty = document.getElementById("emptyState");

[...new Set(players.map(p => p.country))].sort().forEach(name => {
  const option = document.createElement("option");
  option.value = name;
  option.textContent = name;
  country.appendChild(option);
});

function renderPlayers() {
  const term = search.value.trim().toLowerCase();
  const selectedPosition = position.value;
  const selectedCountry = country.value;
  let visible = 0;
  grid.querySelectorAll(".player-card").forEach(card => card.remove());

  players.filter(player => {
    const searchable = `${player.name} ${player.club} ${player.country}`.toLowerCase();
    return searchable.includes(term)
      && (!selectedPosition || player.positions.includes(selectedPosition))
      && (!selectedCountry || player.country === selectedCountry);
  }).forEach(player => {
    visible++;
    const card = document.createElement("article");
    card.className = "player-card";
    card.innerHTML = `
      <div class="player-photo ${player.number === "02" ? "photo-two" : "photo-one"}">
        <span>PLAYER<br>SPOTLIGHT</span><b>${player.number}</b>
      </div>
      <div class="player-info">
        <div class="player-meta"><span>${escapeHtml(player.country.toUpperCase())}</span><span>${escapeHtml(player.age)}</span></div>
        <h3>${escapeHtml(player.name)}</h3>
        <p>${escapeHtml(player.club)} · ${escapeHtml(player.positions.join(" / "))}</p>
        <a href="mailto:bangladeshdiasporaballers@gmail.com?subject=${encodeURIComponent("Player profile enquiry - " + player.name)}">Profile enquiry <span>↗</span></a>
      </div>`;
    grid.insertBefore(card, empty);
  });
  empty.hidden = visible !== 0;
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
[search, position, country].forEach(control => control.addEventListener("input", renderPlayers));

const languageToggle = document.getElementById("languageToggle");
let bengali = false;
languageToggle.addEventListener("click", () => {
  bengali = !bengali;
  document.documentElement.lang = bengali ? "bn" : "en";
  document.querySelectorAll("[data-en][data-bn]").forEach(el => {
    el.textContent = bengali ? el.dataset.bn : el.dataset.en;
  });
  languageToggle.textContent = bengali ? "English" : "বাংলা";
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("playerForm").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = `BDB Player Submission - ${data.get("playerName")}`;
  const body = [
    `Player name: ${data.get("playerName")}`,
    `Age: ${data.get("age")}`,
    `Country: ${data.get("country")}`,
    `Club / Academy: ${data.get("club") || "Not provided"}`,
    `Position: ${data.get("position")}`,
    `Profile / Video: ${data.get("url") || "Not provided"}`,
    `Submitted by: ${data.get("email")}`
  ].join("\n");
  document.getElementById("formStatus").textContent = "Your email app should open with the player details. Please review and send the email.";
  window.location.href = `mailto:bangladeshdiasporaballers@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
document.getElementById("year").textContent = new Date().getFullYear();
