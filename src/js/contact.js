import { supabase } from "./supabase.js";

export function initContact() {
  const submitBtn = document.querySelector(".submit-btn");
  const status = document.getElementById("form-status");

  submitBtn?.addEventListener("click", async () => {
    const naam = document.querySelector("#naam").value.trim();
    const email = document.querySelector("#email").value.trim();
    const bericht = document.querySelector("#bericht").value.trim();

    if (!naam || !email || !bericht) {
      status.style.display = "block";
      status.style.color = "#ff4444";
      status.textContent = "⚠ Vul alle velden in.";
      return;
    }

    submitBtn.textContent = "VERZENDEN...";
    submitBtn.disabled = true;

    const { error } = await supabase
      .from("contactberichten")
      .insert({ naam, email, bericht });

    if (error) {
      status.style.display = "block";
      status.style.color = "#ff4444";
      status.textContent = "⚠ Er ging iets mis, probeer opnieuw.";
      submitBtn.textContent = "VERSTUUR BERICHT";
      submitBtn.disabled = false;
    } else {
      status.style.display = "block";
      status.style.color = "#00cc66";
      status.textContent = "✓ Bericht verzonden!";
      document.querySelector("#naam").value = "";
      document.querySelector("#email").value = "";
      document.querySelector("#bericht").value = "";
      submitBtn.textContent = "VERSTUUR BERICHT";
      submitBtn.disabled = false;
    }
  });
}
