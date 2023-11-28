const editBlogFormHandler = async (event) => {
  event.preventDefault();

  const url = window.location.href;
  const splitUrl = url.split("/"); // creates an array [http:, localhost:3001, blog, 6]
  const blogId = splitUrl[splitUrl.length - 1];

  const title = document.getElementById("blogTitle").value.trim();
  const body = document.getElementById("blogBody").value.trim();

  if (title && body) {
    const response = await fetch(`/api/users/blogs/${blogId}`, {
      method: "PUT",
      body: JSON.stringify({ title: title, body: body }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

//done
const deleteBlogFormHandler = async (event) => {
  event.preventDefault();

  //const url = window.location.href;
  //const splitUrl = url.split('/'); // creates an array [http:, localhost:3001, blog, 6]
  //const blogId = splitUrl[splitUrl.length - 1]; // to get last value, you need to put inside array, otherwise, you get the last array index which is 4.

  const blogId = document.querySelector(`p[name="blog_id"]`).value;
  console.log("BLog ID: wer", blogId);

  console.log("THE DELETED ID IS: ", blogId);

  const response = await fetch(`/api/users/blogs/${blogId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

const submitCommentFormHandler = async (event) => {
  //console.log("UsEr Properties: ", req.session.user.id)
  event.preventDefault();
  const comment = document.getElementById("userComment1").value.trim();

  if (comment) {
    const response = await fetch(`/api/users/comments`, {
      method: "POST",
      body: JSON.stringify({ comment: comment }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/blog/${req.body.user.id}`); // need to make the user id responsive!
    } else {
      alert(response.statusText);
    }
  }
};

document
  .getElementById("updateBlog")
  .addEventListener("click", editBlogFormHandler);

document
  .getElementById("deleteBlog")
  .addEventListener("click", deleteBlogFormHandler);

document
  .getElementById("submitComment")
  .addEventListener("click", submitCommentFormHandler);
