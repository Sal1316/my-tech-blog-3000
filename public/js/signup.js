const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#signupName").value.trim();
  const email = document.querySelector("#signupEmail").value.trim();
  const password = document.querySelector("#signupPassword").value.trim();
  console.log(
    JSON.stringify({
      name: name,
      email: email,
      password: password,
    })
  );
  if (name && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
