addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Obtener el puntaje del bot desde el encabezado personalizado "x-bot-score"
  const botScoreHeader = request.headers.get("x-bot-score");
  const botScore = botScoreHeader ? parseInt(botScoreHeader) : undefined;

  // Si el puntaje del bot existe y es menor a 30, enviar el tráfico a un origen diferente
  if (botScore !== undefined && botScore < 30) {
    // Construir una nueva solicitud con el mismo método, URL y cuerpo que la solicitud original
    const newRequest = new Request(request);
    // Enviar la solicitud al "origen" alternativo (httpbin.org/get)
    return fetch('https://httpbin.org/get', newRequest);
  } else {
    // Devolver la respuesta normal
    return new Response('Acción para tráfico normal', { status: 200 });
  }
}

