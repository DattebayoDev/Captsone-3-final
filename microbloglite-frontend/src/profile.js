function logoutUser() {
  logout();
  showNotification("You have been logged out.", "success");
}

document.addEventListener("DOMContentLoaded", () => {
  const loginData = getLoginData();

  if (!loginData.token) {
    window.location.assign("index.html");
    return;
  }

  document.getElementById("current-user").textContent = loginData.username;

  loadPosts();

  submitForm = document.getElementById("createPostForm")
  submitForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const postContent = document.getElementById("postContent").value;

      const response = await fetch(`${apiBaseURL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginData.token}`,
        },
        body: JSON.stringify({ text: postContent }),
      });

      document.getElementById("postContent").value = "";

      loadPosts()
    });

  async function loadPosts() {
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = ""; 


    const response = await fetch(
      `${apiBaseURL}/api/posts?username=${loginData.username}`,
      {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      }
    );

    const posts = await response.json();

    renderPosts(posts);
    function renderPosts(posts) {
      const container = document.getElementById("posts-container");
      const template = document.getElementById("post-template");

      posts.forEach((post) => {
        const postElement = template.content.cloneNode(true);

        postElement.querySelector(".card-title").textContent = post.username;
        postElement.querySelector(".card-text").textContent = post.text;
        postElement.querySelector(".text-muted").textContent = new Date(
          post.createdAt
        ).toLocaleDateString("en-US", { month: "short", day: "numeric" });        
        postElement.querySelector(".delete-post").dataset.postid = post._id;

        container.appendChild(postElement);
      });
    }

  }

  async function deletePost(postId) {
    const response = await fetch(`${apiBaseURL}/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${loginData.token}`,
      },
    });
    loadPosts()
  }

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-post")) {
      const postId = event.target.dataset.postid;
      console.log(`Post ID to delete: ${postId}`);
      if (confirm("Are you sure you want to delete this post?")) {
        deletePost(postId);
      }
    }
  });
});
