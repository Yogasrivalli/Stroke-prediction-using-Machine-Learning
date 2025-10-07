document.getElementById("strokeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = {};

  // Collect all input values
  for (const element of form.elements) {
    if (element.name) {
      formData[element.name] = element.value;
    }
  }

  try {
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log("Response:", result);

    const resultDiv = document.getElementById("result");
    resultDiv.textContent = `Predicted Stroke: ${result.stroke}`;
    resultDiv.style.color = result.stroke === "Yes" ? "#ff6961" : "#77dd77";
  } catch (error) {
    alert("Error connecting to the server!");
    console.error(error);
  }
});
