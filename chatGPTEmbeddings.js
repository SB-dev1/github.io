var embeddingAjaxCall = (key, input) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "https://api.openai.com/v1/embeddings",
      type: "POST",
      dataType: "json",
      data: JSON.stringify({
        model: "gpt-4o-mini",
        input: input,
        temperature: 0.2,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      crossDomain: true,
      success: function (response, status, xhr) {
        resolve({ response, status, xhr });
      },
      error: function (xhr, status, error) {
        const err = new Error('xhr error');
        err.status = xhr.status;
        reject(err);
      },
    });
  });
};

//const url = "https://api.openai.com/v1";
//Immediately invoke Function Expression IIFE to define the custom element 
(function () {
  //create a template for the custom element
  const embeddingTemplate = document.createElement("template");
  embeddingTemplate.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `;
  class EmbeddingWebComponent extends HTMLElement {
    constructor (){
      super ();
      //attach a shadow DOM tree to this instance for the custom element
      this.attachShadow({ mode: 'open'});
      //clone the template content and append it to the shadow DOM
      this.shadowRoot.appendChild(embeddingTemplate.content.cloneNode(true));
    }
    async getEmbeddings(key, input) {
      try {
        //validate the input before making the API Call
        if(!key || !input) {
          throw new Error ('API key and input are required.');
        }
        //make the API Call 
      const { response } = await embeddingAjaxCall(key, input);
      console.log(response);
      return response.data[0].embedding;
    } catch (error) {
        console.log('Error fetching embeddings: ' error)
        throw error;
  }
  }
  }
  customElements.define("custom-widget-chatgpt-embeddings", EmbeddingWebComponent);
})();
