var analyzeDataModel = async (apiKey, input) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "https://api.openai.com/v1/completions",
      type: "POST",
      dataType: "json",
      data: JSON.stringify({
        model: "gpt-4", // Das empfohlene Modell
        prompt: `Analyze the following data model and suggest transformations or insights: ${input}`,
        temperature: 0.2, // Kontrolle der Kreativität des Outputs
        max_tokens: 1000, // Maximale Länge der Antwort
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      crossDomain: true,
      success: function (response, status, xhr) {
        resolve(response.choices[0].text); // Rückgabe der Analyse
      },
      error: function (xhr, status, error) {
        reject(new Error(`Error analyzing data model: ${xhr.responseText}`));
      },
    });
  });
};

var scenarioPlanning = async (apiKey, input, scenario) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "https://api.openai.com/v1/completions",
      type: "POST",
      dataType: "json",
      data: JSON.stringify({
        model: "gpt-4", // Szenarioplanung mit GPT-4
        prompt: `Based on the input data: ${input}, generate a scenario planning for: ${scenario}`,
        temperature: 0.2,
        max_tokens: 1500,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      crossDomain: true,
      success: function (response, status, xhr) {
        resolve(response.choices[0].text); // Rückgabe der Szenarioplanung
      },
      error: function (xhr, status, error) {
        reject(new Error(`Error in scenario planning: ${xhr.responseText}`));
      },
    });
  });
};
