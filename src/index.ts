/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// Define the URL of the Chuck Norris API
const apiUrl = 'https://api.chucknorris.io/jokes/random';

// Define a lookup table to store alternative responses
const lookupTable = {
  0: "Chuck Norris doesn't tell jokes. He stares at you until you laugh.",
  1: "When Chuck Norris enters a room, he doesn't turn the lights on. He turns the dark off.",
  2: "Chuck Norris can divide by zero.",
  3: "When Chuck Norris does a push-up, he isn't lifting himself up, he's pushing the Earth down."
};

// Function to get a random Chuck Norris joke from the API or lookup table
async function getRandomChuckNorrisJoke() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.value; // La propiedad "value" contiene el chiste
  } catch (error) {
    console.error('Error fetching Chuck Norris joke from API:', error);
    // If there is an error fetching joke from API, return a random response from the lookup table
    const randomIndex = Math.floor(Math.random() * Object.keys(lookupTable).length);
    return lookupTable[randomIndex];
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // If the request method is not GET, simply return an error message
  if (request.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // Get a random Chuck Norris joke
  const joke = await getRandomChuckNorrisJoke();

  // Return the joke
  return new Response(joke, { status: 200 });
}

