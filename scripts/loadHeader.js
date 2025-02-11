document.addEventListener("DOMContentLoaded", async function () {
    try {
      const response = await fetch("../components/header.html");
      const data = await response.text();
      document.getElementById("header-container").innerHTML = data;
    } catch (error) {
      console.error("Error loading header:", error);
    }
  });
  