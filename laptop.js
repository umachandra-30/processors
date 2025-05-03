document.addEventListener("DOMContentLoaded", () => {
  // Ensure laptop processor data is loaded
  if (typeof processors2 === "undefined") {
    console.error("Laptop processor data not available");
    return;
  }

  // Get DOM elements
  const input = document.getElementById("searchInputLaptop");
  const result = document.getElementById("resultLaptop");
  const suggestions = document.getElementById("suggestionsLaptop");

  // Exit if elements not found
  if (!input || !result || !suggestions) {
    console.warn("Laptop processor elements not found in the DOM.");
    return;
  }

  // Show details
  function showLaptopProcessorInfo(processor) {
    result.innerHTML = `
      <div class="card">
        <h2>${processor.model}</h2>
        <p><strong>Category:</strong> ${processor.category}</p>
        <p><strong>Manufacturer:</strong> ${processor.manufacturer}</p>
        <p><strong>Release Year:</strong> ${processor.release_year}</p>
        <p><strong>CPU Architecture:</strong> ${processor.cpu_architecture}</p>
        <p><strong>CPU Cores:</strong> ${processor.cpu_cores}</p>
        <p><strong>CPU Threads:</strong> ${processor.cpu_threads}</p>
        <p><strong>Base Clock (GHz):</strong> ${processor.base_clock_ghz}</p>
        <p><strong>Max CPU Clock (GHz):</strong> ${processor.max_cpu_clock_ghz}</p>
        <p><strong>Process Node (nm):</strong> ${processor.process_node_nm}</p>
        <p><strong>TDP (W):</strong> ${processor.tdp_w}</p>
        <p><strong>Cache (MB):</strong> ${processor.cache_mb}</p>
        <p><strong>GPU:</strong> ${processor.gpu}</p>
      </div>
    `;
  }

  // Search input handler
  input.addEventListener("input", () => {
    const query = input.value.toLowerCase().trim();
    suggestions.innerHTML = "";
    result.innerHTML = "";

    if (!query) return;

    const matches = processors2.filter(p =>
      p.model.toLowerCase().includes(query)
    ).slice(0, 5);

    matches.forEach(match => {
      const div = document.createElement("div");
      div.className = "suggestion-item";
      div.textContent = match.model;
      div.addEventListener("click", () => {
        input.value = match.model;
        suggestions.innerHTML = "";
        showLaptopProcessorInfo(match);
      });
      suggestions.appendChild(div);
    });

    const exact = matches.find(m => m.model.toLowerCase() === query);
    if (exact) showLaptopProcessorInfo(exact);
  });
});
