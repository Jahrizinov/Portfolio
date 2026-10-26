import { supabase } from "./supabase.js";

export async function laadProjecten() {
  const { data, error } = await supabase
    .from("projecten")
    .select("*")
    .order("volgorde");

  if (error) {
    console.error(error);
    return;
  }

  const grid = document.querySelector(".projects-grid");
  grid.innerHTML = "";

  data.forEach((project) => {
    grid.innerHTML += `
      <div class="project-card reveal-left">
        <div class="project-card-content">
          <div class="project-preview">
            <img src="${project.afbeelding}" alt="${project.titel}" />
          </div>
          <div class="project-info">
            <h3 class="cards-title">${project.titel}</h3>
            <p class="card-desc">${project.beschrijving}</p>
          </div>
        </div>
        <div class="card-glow"></div>
      </div>
    `;
  });
}
