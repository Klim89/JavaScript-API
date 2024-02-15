const photoContentEl = document.querySelector("#photo-container");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const client_id = `токен`;
const likeKey = "likes";
const historyKey = "history";
const userLikesKey = "userLikes";
let likes = {};
let history = [];
let userLikes = {};
const userId = generateUserId(); // генерация нового идентификатора пользователя при каждой загрузке страницы

try {
  const storedLikes = localStorage.getItem(likeKey);
  if (storedLikes) {
    likes = JSON.parse(storedLikes);
  }

  const storedHistory = localStorage.getItem(historyKey);
  if (storedHistory) {
    history = JSON.parse(storedHistory);
  }

  const storedUserLikes = localStorage.getItem(userLikesKey);
  if (storedUserLikes) {
    userLikes = JSON.parse(storedUserLikes);
  }

  getRandomImage();
} catch (err) {
  alert(err);
}

async function getRandomImage() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random/?client_id=${client_id}`
    );
    if (!response.ok) {
      throw new Error("Сервер встал");
    }
    const photoData = await response.json();
    render(photoData);
  } catch (err) {
    throw err;
  }
}

function render(photoData) {
  const photoId = photoData.id;
  const html = `
    <div class="photo">
        <img src="${photoData.urls.small}">
        <div class="info">
            <p>Photographer: ${photoData.user.username}</p>
            <button class="like-btn" data-id="${photoId}">Like</button>
            <span class="likes-count">${getLikes(photoId)}</span>
        </div>
    </div>`;
  photoContentEl.innerHTML = html;

  const likeBtn = document.querySelector(".like-btn");
  likeBtn.addEventListener("click", () => {
    const photoId = likeBtn.dataset.id;
    toggleLike(photoId);
  });

  history.push(photoId);
  saveHistory();
}

function toggleLike(photoId) {
  if (hasUserLiked(photoId)) {
    removeUserLike(photoId);
  } else {
    addUserLike(photoId);
  }
}

function addUserLike(photoId) {
  userLikes[userId] = userLikes[userId] || {};
  userLikes[userId][photoId] = true;
  saveUserLikes();
  updateLikesCount(photoId);
}

function removeUserLike(photoId) {
  if (userLikes[userId] && userLikes[userId][photoId]) {
    delete userLikes[userId][photoId];
    saveUserLikes();
    updateLikesCount(photoId);
  }
}

function hasUserLiked(photoId) {
  return userLikes[userId] && userLikes[userId][photoId];
}

function getLikes(photoId) {
  let totalLikes = 0;
  for (const user in userLikes) {
    if (userLikes[user][photoId]) {
      totalLikes++;
    }
  }
  return totalLikes;
}

function updateLikesCount(photoId) {
  const likesCount = document.querySelector(".likes-count");
  likesCount.textContent = getLikes(photoId);
}

function saveLikes() {
  localStorage.setItem(likeKey, JSON.stringify(likes));
}

function saveHistory() {
  localStorage.setItem(historyKey, JSON.stringify(history));
}

function saveUserLikes() {
  localStorage.setItem(userLikesKey, JSON.stringify(userLikes));
}

function generateUserId() {
  // случайное число в качестве идентификатора пользователя
  return Math.floor(Math.random() * 1000000);
}

// Обработчик событий для кнопки "Предыдущее фото"
prevBtn.addEventListener("click", showPreviousPhoto);

async function showPreviousPhoto() {
  if (history.length > 1) {
    history.pop();
    const previousPhotoId = history.pop();
    getRandomImageById(previousPhotoId);
  } else {
    alert("Это первая фотография");
  }
}

// Обработчик событий для кнопки "Следующее фото"
nextBtn.addEventListener("click", async () => {
  try {
    await getRandomImage();
  } catch (err) {
    alert(err);
  }
});

async function getRandomImageById(photoId) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/${photoId}?client_id=${client_id}`
    );
    if (!response.ok) {
      throw new Error("Сервер встал");
    }
    const photoData = await response.json();
    render(photoData);
  } catch (err) {
    throw err;
  }
}
