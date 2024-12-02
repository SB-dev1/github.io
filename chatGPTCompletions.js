(function () {
  // Template für das Widget
  const embeddingTemplate = document.createElement("template");
  embeddingTemplate.innerHTML = `
      <style>
        #root {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      </style>
      <div id="root">
        <p>ChatGPT Embedding Widget</p>
      </div>
  `;

  // Custom Widget-Klasse
  class EmbeddingWebComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(embeddingTemplate.content.cloneNode(true));
    }

    async getEmbeddings(apiKey, input) {
      // Validierung der Eingaben
      if (!apiKey || !input) {
        throw new Error("API key and input are required.");
      }

      // API-Aufruf zur OpenAI-API
      try {
        const response = await this.callOpenAIAPI(apiKey, input);
        console.log("Embedding result:", response);
        return response; // Gibt das Ergebnis zurück
      } catch (error) {
        console.error("Error fetching embeddings:", error);
        throw error;
      }
    }

    // Helfermethode für den OpenAI API-Aufruf
    async callOpenAIAPI(apiKey, input) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: "https://api.openai.com/v1/embeddings",
          type: "POST",
          dataType: "json",
          data: JSON.stringify({
            model: "gpt-3.5-turbo-16k",
            prompt: `Generate embeddings for the following input: ${input}`,
            temperature: 0.2,
            max_tokens: 1500
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
          },
          crossDomain: true,
          success: function (response, status, xhr) {
            resolve(response.choices[0].text); // Ergebnis zurückgeben
          },
          error: function (xhr, status, error) {
            reject(new Error(`Error from OpenAI API: ${xhr.responseText}`));
          }
        });
      });
    }
  }

  // Registriere die Custom Webkomponente
  customElements.define("custom-widget-chatgpt-embeddings", EmbeddingWebComponent);
})();
