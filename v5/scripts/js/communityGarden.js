document.addEventListener("DOMContentLoaded", function () {
  const gardenImages = ["images/group_garden.png", "images/group_garden2.png"];
  let currentIndex = 0;

  const gardenImage = document.getElementById("garden-image");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  function updateGarden() {
    gardenImage.src = gardenImages[currentIndex];
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + gardenImages.length) % gardenImages.length;
    updateGarden();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % gardenImages.length;
    updateGarden();
  });

  // Community Modal Logic
  const communityBtn = document.getElementById("community-btn");
  const communityModal = document.getElementById("community-modal");
  const closeCommunityModal = document.getElementById("close-community-modal");

  communityBtn.addEventListener("click", () => {
    communityModal.style.bottom = "0";
  });

  closeCommunityModal.addEventListener("click", () => {
    communityModal.style.bottom = "-100%";
  });

  // Add Friend Modal Logic
  const addFriendBtn = document.getElementById("add-friend-btn");
  const friendsContainer = document.getElementById("friends-container");
  const addFriendModal = document.getElementById("add-friend-modal");
  const friendSelect = document.getElementById("friend-select");
  const confirmAddBtn = document.getElementById("confirm-add-btn");
  const closeAddFriendModal = document.getElementById("close-add-friend-modal");

  const friendNames = ["Qiaoqiao", "Kun", "Chloe", "Numan"];
  let availableFriends = [...friendNames];

  addFriendBtn.addEventListener("click", () => {
    if (availableFriends.length === 0) {
      alert("No more friends to add!");
      return;
    }
    friendSelect.innerHTML = availableFriends
      .map((name) => `<option value="${name}">${name}</option>`)
      .join("");
    addFriendModal.style.display = "flex";
  });

  confirmAddBtn.addEventListener("click", () => {
    const selectedName = friendSelect.value;
    if (!selectedName) {
      alert("Please select a friend to add!");
      return;
    }

    const friendDiv = document.createElement("div");
    friendDiv.classList.add("friend");
    friendDiv.textContent = selectedName;
    friendsContainer.appendChild(friendDiv);

    availableFriends = availableFriends.filter((name) => name !== selectedName);
    addFriendModal.style.display = "none";
  });

  closeAddFriendModal.addEventListener("click", () => {
    addFriendModal.style.display = "none";
  });
});
