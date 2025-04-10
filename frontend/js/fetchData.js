const checkLoggedInUser = () => {
  let user = localStorage.getItem("loggedInUser");
  if (user) {
    user = JSON.parse(user);
  } else {
    window.location.href = "/login.html";
  }
};

function showLoggedUserName() {
  const nameSpan = document.getElementById("logged-username");
  let user = localStorage.getItem("loggedInUser");
  if (user) {
    user = JSON.parse(user);
    console.log(user);
  }
  nameSpan.innerText = user?.userName;
}

//run the showLoggedUserName automatically
showLoggedUserName();

function logOut() {
  localStorage.clear();
  checkLoggedInUser();
}

const fetchDataFromServer = async () => {
  try {
    const res = await fetch("http://localhost:5000/getPosts");
    const data = await res.json();

    console.log("data coming from server: ", data);
    showData(data);
  } catch (err) {
    console.log("error: ", err);
  }
};

const showData = (postData) => {
  const postContainer = document.getElementById("post-container");

  //posts
  postContainer.innerHTML = "";

  postData.forEach(async (post) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    postDiv.innerHTML = `
    <div class="post-header">
            <div class="post-user-image">
              <img src=${post.userImage} alt="user-image" />
            </div>

            <div class="post-username-time">
              <p class="post-username">${post.postedUserName}</p>
              <div class="posted-time">
                <span>${timeDifference(`${post.postedTime}`)}</span>
                <span>ago</span>
              </div>
            </div>

            <div class="edit-delete-holder">
              <div>
              <button class="editButton" onClick="redirectToEdit('${post.postId}')">Edit</button>
              <button class="deleteButton" onClick="handleDeletePost('${post.postId
      }')">Delete</button>
              </div>
            </div>
          </div>

          <div class="post-text">
            <p class="post-text-content">
              ${post.postText}
            </p>
          </div>

          ${post.postImageUrl
        ? `<div class="post-image">
            <img
              class="post-image-content"
              src=${post.postImageUrl}
              alt="post-image"
            />
          </div>`
        : ``
      }
    `;

    postContainer.appendChild(postDiv);

    //comments from a post
    let postComments = await fetchCommentsOfPost(post.postId);

    postComments.forEach((comment) => {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment-holder");

      commentDiv.innerHTML = `
        <div class="comment-container">
              <div class="comment-user-image">
                <img
                  src=${comment.commentedUserImage}
                  alt="user-comment-image"
                />
              </div>

              <div class="comment-text-container">
                <h4>${comment.commentedUsername}</h4>
                <p class="comment-text">
                  ${comment.commentText}
                </p>
              </div>
        </div>
        `;

      postDiv.appendChild(commentDiv);
    });

    //make a new comment input
    let postCommentDiv = document.createElement("div");
    postCommentDiv.classList.add("postComment-container");
    postCommentDiv.innerHTML = `
    
      <div style="width: 40%">
        <input
          class="postComment-input"
          name="postComment-input"
          type="text"
          id = "postComment-input-for-${post.postId}"
          placeholder="Post your comment"
        />
        <div class="postComment-label" id="postComment-label-${post.postId}"></div>
      </div>
      
      <div style="margin-left: 30px">
        <button
          class="postComment-btn"
          id="comment-btn"
          onClick = "handlePostComment(${post.postId})"
        >
          Comment
        </button>
      </div>
  `;
    postDiv.appendChild(postCommentDiv);
  });
};
// Function to delete a post by its ID
const handleDeletePost = async (postId) => {
  try {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const loggedInUserId = loggedInUser?.userId;

    if (!loggedInUserId) {
      console.error("User not logged in.");
      alert("Please log in to delete posts.");
      return;
    }

    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return; // Cancel deletion if user selects "No"

    const res = await fetch(`http://localhost:5000/deletePost/${loggedInUserId}/${postId}`, {
      method: "POST",
    });

    const data = await res.json();
    if (!data.success) {
      console.error("Server failed to delete post:", data.message);
      alert("Failed to delete the post.");
    }
  } catch (err) {
    console.error("Error while deleting post:", err);
    alert("An error occurred while deleting the post.");
  } finally {
    location.reload(); // Refresh page to update post list
  }
};


// Function to redirect to edit page with selected post ID
const redirectToEdit = (postId) => {
  localStorage.setItem("targetPostId", postId);
  window.location.href = "../editPost.html";
};


const fetchCommentsOfPost = async (postId) => {
  let postComments;
  try {
    let res = await fetch(`http://localhost:5000/getcomments/${postId}`);
    postComments = await res.json();
  } catch (err) {
    console.log("error: ", err);
  } finally {
    return postComments;
  }
};

const handlePostComment = async (postId) => {
  const commentText = document.getElementById(
    `postComment-input-for-${postId}`
  ).value;
  const postCommentLabel = document.getElementById(`postComment-label-${postId}`)
  //current time
  let now = new Date();
  let commentTime = now.toISOString();
  if (commentText.length < 2) {
    postCommentLabel.innerHTML = `
    <label for="postComment-input">Comment field can not be empty or less than 2</label>
    `
  }
  else {
    let user = localStorage.getItem("loggedInUser");
    if (user) {
      user = JSON.parse(user);
    }

    let commentOfUserId = user?.userId;

    let commentObject = {
      commentOfPostId: postId,
      commentOfUserId: commentOfUserId,
      commentTime: commentTime,
      commentText: commentText,
    };

    const res = await fetch("http://localhost:5000/postComment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(commentObject),
    });

    const data = await res.json();
    //reload the page for seeing the new comment
    location.reload();
  }

};

const handleAddNewPost = async () => {
  const postText = document.getElementById("new-post").value;
  const postImageUrl = document.getElementById("new-post-img-url").value;

  let now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // to revise the time from UTC to local time

  let postedTime = now.toISOString();

  let user = localStorage.getItem("loggedInUser");
  if (user) {
    user = JSON.parse(user);
  }
  let postedUserId = user?.userId;

  const newPostObject = {
    postedUserId: postedUserId,
    postedTime: postedTime,
    postText: postText,
    postImageUrl: postImageUrl,
  };
  console.log(newPostObject)
  const res = await fetch("http://localhost:5000/addNewPost", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newPostObject),
  });

  const data = await res.json();
  console.log("new post data from server: ", data);

  //reload the page for seeing the new post
  location.reload();
};

//run the fetchDataFromServer automatically after page reload
fetchDataFromServer();
