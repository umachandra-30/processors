document.addEventListener("DOMContentLoaded", () => {
  // Check if processors data is available
  if (typeof processors === "undefined") {
    console.error("Mobile processor data not available");
    return;
  }

  // Get DOM elements
  const input = document.getElementById("searchInputMobile");
  const result = document.getElementById("resultMobile");
  const suggestions = document.getElementById("suggestionsMobile");

  // Ensure DOM elements exist
  if (!input || !result || !suggestions) {
    console.warn("One or more required mobile processor elements are missing.");
    return;
  }

  // Function to display processor details
  function showProcessorInfo(processor) {
    result.innerHTML = `
      <div class="card">
        <h2>${processor.model}</h2>
        <p><strong>Category:</strong> ${processor.category}</p>
        <p><strong>Manufacturer:</strong> ${processor.manufacturer}</p>
        <p><strong>Series:</strong> ${processor.series}</p>
        <p><strong>Release Year:</strong> ${processor.release_year}</p>
        <p><strong>Process Node (nm):</strong> ${processor.process_node_nm}</p>
        <p><strong>CPU Architecture:</strong> ${processor.cpu_architecture}</p>
        <p><strong>CPU Cores:</strong> ${processor.cpu_cores}</p>
        <p><strong>Max CPU Clock (GHz):</strong> ${processor.max_cpu_clock_ghz}</p>
        <p><strong>GPU:</strong> ${processor.gpu}</p>
        <p><strong>Max GPU Clock (MHz):</strong> ${processor.max_gpu_clock_mhz}</p>
        <p><strong>AI Processing:</strong> ${processor.ai_processing}</p>
        <p><strong>5G Support:</strong> ${processor.support_5g}</p>
        <p><strong>Device Category:</strong> ${processor.device_category}</p>
      </div>
    `;
  }

  // Search input handler
  input.addEventListener("input", () => {
    const query = input.value.toLowerCase().trim();
    suggestions.innerHTML = "";
    result.innerHTML = "";

    if (!query) return;

    const matches = processors.filter(p =>
      p.model.toLowerCase().includes(query)
    ).slice(0, 5);

    matches.forEach(match => {
      const div = document.createElement("div");
      div.className = "suggestion-item";
      div.textContent = match.model;
      div.addEventListener("click", () => {
        input.value = match.model;
        suggestions.innerHTML = "";
        showProcessorInfo(match);
      });
      suggestions.appendChild(div);
    });

    // Show exact match automatically
    const exact = matches.find(m => m.model.toLowerCase() === query);
    if (exact) showProcessorInfo(exact);
  });
});
