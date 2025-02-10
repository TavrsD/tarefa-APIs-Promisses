document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("../components/footer.html");
    const data = await response.text();
    document.getElementById("footer-container").innerHTML = data;
  } catch (error) {
    console.error("Error loading footer:", error);
  }
});
