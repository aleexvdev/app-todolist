export const getChatGPTResponse = async (prompt: string) => {
  const apiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/completions'; 

  /* const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: input,
      max_tokens: 150,
    }),
  }); */

  const response = await fetch(apiUrl, {
    method: "POST", // Método HTTP 
    headers: {
        "Content-Type": "application/json", // Tipo de contenido que enviamos y recibimos
        Authorization: `Bearer ${apiKey}`, // Pasamos nuestra API KEY de OpenAI 
    },
    body: JSON.stringify({
        model: "gpt-3.5-turbo-instruct", // Modelo de la IA que deseamos usar
        prompt: prompt, // prompt que le hacemos a la IA
        temperature: 0, // Permite que la IA siempre de responses diferentes 
        max_tokens: 250, // Tamaño de la response
    }),
});

  const data = await response.json();
  console.log(data);
  return data.choices[0].text.trim();
  // return data;
};

export const getTaskSolution = async (task: string) => {
  const prompt = `Cómo puedo resolver la tarea: ${task}?`;
  const response = await getChatGPTResponse(prompt);
  return response;
}; 

