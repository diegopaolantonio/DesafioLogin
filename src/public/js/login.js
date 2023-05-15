const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  let response = await fetch("/api/sessions/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401 || response.status === 500) {
    Swal.fire({
      icon: "error",
      title: `Email or password incorrect`,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  let result = await response.json();

  if (result.status === "Success") {
    Swal.fire({
      icon: "success",
      title: `Login Success`,
      text: `Bienvenido`,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/products";
      }
    });
  }
});
