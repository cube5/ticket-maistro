const apikey = process.env.VUE_APP_TICKETMASTER_APIKEY;
const baseUrl = `https://app.ticketmaster.com`;
const commerceUrl = `${baseUrl}/commerce/v2`;
const discoveryUrl = `${baseUrl}/discovery/v2`;
const discoveryFeedUrl = `${baseUrl}/discovery-feed/v2`;

const params = `apikey=${apikey}`;

const headers = new Headers({
  "Accept": "application/json, text/javascript, */*; q=0.01",
  "Content-Type": "application/json"
});

export async function fetchEvents(): Promise<any> {
  const url = `${discoveryUrl}/events/?${params}&countryCode=US`;
  return fetch(url, { headers })
    .then(resp => resp.json())
    .catch(errorHandler);
}

export async function fetchEventDetails(id: string): Promise<any> {
  const url = `${discoveryUrl}/events/${id}?${params}`;
  return fetch(url, { headers })
    .then(resp => resp.json())
    .catch(errorHandler);
}

export async function fetchEventOffers(eventId: string): Promise<any> {
  const url = `${commerceUrl}/events/${eventId}/offers?${params}`;
  return fetch(url, { headers })
    .then(resp => resp.json())
    .catch(errorHandler);
}

export async function discoveryFeed(): Promise<any> {
  const url = `${discoveryFeedUrl}/events?${params}`;
  return fetch(url, { headers })
    .then(resp => resp.json())
    .catch(errorHandler);
}

function errorHandler(error: any) {
  throw error;
}
