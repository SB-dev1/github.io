(function () {
  // Template für das Widget
  const completionTemplate = document.createElement("template");
  completionTemplate.innerHTML = `
      <style>
        #root {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Arial, sans-serif;
        }
      </style>
      <div id="root">
        <p>ChatGPT Chat Completions Widget</p>
      </div>
  `;

  // Custom Widget-Klasse
  class CompletionsWebComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(completionTemplate.content.cloneNode(true));
    }

    async getCompletions(apiKey, input) {
      // Validierung der Eingaben
      if (!apiKey || !input) {
        throw new Error("API key and input are required.");
      }

      // API-Aufruf zur OpenAI-API
      try {
        const response = await this.callOpenAIAPI(apiKey, input);
        console.log("Completion result:", response);
        return response; // Gibt das Ergebnis zurück
      } catch (error) {
        console.error("Error fetching completions:", error);
        throw error;
      }
    }

    // Helfermethode für den OpenAI API-Aufruf
    async callOpenAIAPI(apiKey, input) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: "https://api.openai.com/v1/chat/completions",
          method: "POST",
          dataType: "json",
          data: JSON.stringify({
            model: "gpt-3.5-turbo", // oder "gpt-4"
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: input }
            ],
            max_tokens: 1500,
            temperature: 0.2
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
          },
          success: function (response, status, xhr) {
            resolve(response.choices[0].message.content); // Inhalt der Nachricht zurückgeben
          },
          error: function (xhr, status, error) {
            reject(new Error(`Error from OpenAI API: ${xhr.responseText}`));
          }
        });
      });
    }
  }

  // Registriere die Custom Webkomponente
  customElements.define("custom-widget-chatgpt-completions", CompletionsWebComponent);
})();
