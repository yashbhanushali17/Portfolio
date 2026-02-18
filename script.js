const form = document.getElementById("contactForm");
const status = document.getElementById("statusMsg");

if (!form || !status) {
  console.error("Form or status element not found!");
} else {

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      name: form.elements["name"].value,
      email: form.elements["email"].value,
      message: form.elements["message"].value
    };

    try {
      const response = await fetch("https://formspree.io/f/mlgwljzj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        status.textContent = "✅ Message sent successfully!";
        form.reset();
      } else {
        status.textContent = "❌ Error sending message!";
      }

    } catch (err) {
      status.textContent = "❌ Network error!";
      console.error(err);
    }
  });

}
