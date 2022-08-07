const menuBtn = document.querySelector(".hamburger");

const menu = document.querySelector(".menu");

const menuNav = document.querySelector(".menu-nav");

const listItems = document.querySelectorAll(".list-items");

const mainContainer = document.querySelector(".main-container");
// Set the initial state of the menu
let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
	if (!showMenu) {
		menuBtn.classList.add("close");
		menu.classList.add("show");
		menuNav.classList.add("show");
		listItems.forEach((item) => item.classList.add("show"));
		mainContainer.classList.add("show");

		// Reset the menu state
		showMenu = true;
	} else {
		menuBtn.classList.remove("close");
		menu.classList.remove("show");
		menuNav.classList.remove("show");
		listItems.forEach((item) => item.classList.remove("show"));
		mainContainer.classList.remove("show");

		// Reset the menu state
		showMenu = false;
	}
}

// Api
document.querySelector("#search").addEventListener("click", () => {
	const xhr = new XMLHttpRequest();

	const searchValue = document.querySelector("#my-text").value;

	const url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyApQSMKOBBvcDp-cELpGdxGcSaq-7EAjvo&part=snippet&q=${searchValue}&maxResults=50`;

	xhr.open("GET", url);
	xhr.onreadystatechange = () => {
		if (xhr.status === 200 && xhr.readyState === 4) {
			const response = JSON.parse(xhr.responseText);
			console.log(response);

			let template = "";
			for (let i = 0; i < response.items.length; i++) {
				template += `
					<div class="video-items" style="width: 20%; margin:1.2em;">
						<img style="width: 100%; max-height:42%" class="img-fluid" src="${response.items[i].snippet.thumbnails.high.url}"/>
						<h5 style="color:white">${response.items[i].snippet.title}</h5>
						<p style="color:white">${response.items[i].snippet.description}</p>
					</div>
				`;
			}

			document.querySelector("#my-container").innerHTML = template;
		}
	};

	xhr.send();
});
