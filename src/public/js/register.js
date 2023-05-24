const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  let response = await fetch("/api/sessions/register", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 400 || response.status === 500) {
    Swal.fire({
      icon: "error",
      title: `Datos incompletos`,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  if (response.status === 401) {
    Swal.fire({
      icon: "error",
      title: `Email ya en base de datos`,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  result = await response.json();

  if (result.status === "Success") {
    Swal.fire({
      icon: "success",
      title: `Registro existoso`,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }
});
