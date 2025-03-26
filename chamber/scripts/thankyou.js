const urlParams = new URLSearchParams(window.location.search);

if (
  !urlParams.get("firstName") ||
  !urlParams.get("lastName") ||
  !urlParams.get("email") ||
  !urlParams.get("phone") ||
  !urlParams.get("orgName") ||
  !urlParams.get("timestamp")
) {
  window.location.href = "../chamber/join.html";
}
document.getElementById("firstNameData").textContent =
  urlParams.get("firstName");
document.getElementById("lastNameData").textContent = urlParams.get("lastName");
document.getElementById("emailData").textContent = urlParams.get("email");
document.getElementById("phoneData").textContent = urlParams.get("phone");
document.getElementById("orgNameData").textContent = urlParams.get("orgName");
document.getElementById("timestampData").textContent =
  urlParams.get("timestamp");
