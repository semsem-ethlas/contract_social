document.addEventListener("DOMContentLoaded", () => {
  const auditForm = document.getElementById("audit-form");

  auditForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const contractAddress = document.getElementById("contract-address").value;

    try {
      const response = await fetch(
        "http://ec2-3-92-200-167.compute-1.amazonaws.com:3001/audit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contractAddress }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      console.log(result); // Log the result for debugging

      // Clear previous results
      document.getElementById("analysis-results").innerHTML = "";
      document.getElementById("social-urls").innerHTML = "";

      // Update analysis results
      const analysisContent = `
        <h3>Contract Name: ${result.name}</h3>
        <h3>Contract Symbol: ${result.symbol}</h3>
        <pre>${result.analysis}</pre>
      `;
      document.getElementById("analysis-results").innerHTML = analysisContent;

      // Update social URLs
      const urls = result.socialUrls;
      if (urls.length > 0) {
        const urlList = urls
          .map(
            (url) =>
              `<li><a href="${url.original}" target="_blank">${url.display}</a></li>`
          )
          .join("");
        document.getElementById(
          "social-urls"
        ).innerHTML = `<h3>Social Media and Community Links:</h3><ul>${urlList}</ul>`;
      } else {
        document.getElementById("social-urls").innerText =
          "No social URLs found.";
      }
    } catch (error) {
      console.error("Error auditing contract:", error.message);
    }
  });
});
