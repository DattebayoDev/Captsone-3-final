document.addEventListener("DOMContentLoaded", () => {
  const loginData = getLoginData();

  if (!loginData.token) {
    window.location.assign("index.html");
    return;
  }

  document.getElementById("current-user").textContent = loginData.username;

  loadPosts();
});

async function loadPosts() {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = "";

  const loginData = getLoginData();
  const response = await fetch(`${apiBaseURL}/api/posts?limit=100&offset=0`, {
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  });

  const posts = await response.json();

  // posts.forEach((post) => {
  //   const postElement = document.createElement("div");
  //   postElement.classList.add("col-md-6", "mb-3");
  //   postElement.innerHTML = `
  //         <div class="card">
  //             <div class="card-body">
  //                 <h5 class="card-title">${post.username}</h5>
  //                 <p class="card-text">${post.text}</p>
  //                 <p class="card-text text-muted">${new Date(
  //                   post.createdAt
  //                 ).toLocaleString()}</p>
  //             </div>
  //         </div>
  //     `;
  //   postsContainer.appendChild(postElement);
  // });

    renderPosts(posts);
    function renderPosts(posts) {
      const template = document.getElementById("post-template");

      posts.forEach((post) => {
        const postElement = template.content.cloneNode(true);

        postElement.querySelector(".card-title").textContent = post.username;
        postElement.querySelector(".card-text").textContent = post.text;
        postElement.querySelector(".text-muted").textContent = new Date(
          post.createdAt
        ).toLocaleDateString("en-US", { month: "short", day: "numeric" });        
        postElement.querySelector(".delete-post").dataset.postid = post._id;

        postsContainer.appendChild(postElement);
      });
    }







}

function logoutUser() {
  logout();
  showNotification("You have been logged out.", "success");
}
