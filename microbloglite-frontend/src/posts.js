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

  renderPosts(posts);
  function renderPosts(posts) {
    const template = document.getElementById("post-template");
    const postsContainer = document.getElementById("posts-container");

    posts.forEach((post) => {
      const postElement = template.cloneNode(true);
      postElement.style.display = "block";
      
      postElement.querySelector(".card-title").textContent = post.username;
      postElement.querySelector(".card-text").textContent = post.text;
      postElement.querySelector(".text-muted").textContent = new Date(
        post.createdAt
      ).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      postElement.querySelector(".delete-post").dataset.postid = post._id;

      const column = document.createElement("div");
      column.className = "col-md-6 mb-4"; 
      column.appendChild(postElement);

      postsContainer.appendChild(column);
    });
  }
}
