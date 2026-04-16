export function processCommand(command: string): {
  action: string;
  url?: string;
  isBrowserAction: boolean;
} {
  const lowerCmd = command.toLowerCase().trim();

  // WhatsApp Web: "Send a WhatsApp message to [number] saying [message]"
  const waMatch = lowerCmd.match(/(?:whatsapp|message|msg)\s+(?:to\s+)?([\d\+\s]+)\s+(?:saying|bol|likh)\s+(.+)/i);
  if (waMatch) {
    const number = waMatch[1].replace(/\s+/g, "");
    const message = encodeURIComponent(waMatch[2].trim());
    return {
      action: `Sending your message. Let's hope they reply, Abhi.`,
      url: `https://web.whatsapp.com/send?phone=${number}&text=${message}`,
      isBrowserAction: true,
    };
  }

  // Media Search: "Play [song/video] on YouTube"
  const ytMatch = lowerCmd.match(/(?:play|chal|dikha|youtube)\s+(.+?)(?:\s+on\s+youtube|\s+chalao|\s+play)?$/i);
  if (ytMatch && (lowerCmd.includes("youtube") || lowerCmd.includes("play") || lowerCmd.includes("chalao"))) {
    const query = encodeURIComponent(ytMatch[1].trim());
    return {
      action: `Playing ${ytMatch[1]} on YouTube. Don't judge my music taste.`,
      url: `https://www.youtube.com/results?search_query=${query}`,
      isBrowserAction: true,
    };
  }

  // Media Search: "Search [query] on Spotify"
  const spotifyMatch = lowerCmd.match(/(?:spotify|search)\s+(.+?)(?:\s+on\s+spotify|\s+search)?$/i);
  if (spotifyMatch && lowerCmd.includes("spotify")) {
    const query = encodeURIComponent(spotifyMatch[1].trim());
    return {
      action: `Searching ${spotifyMatch[1]} on Spotify. Hope it's a banger.`,
      url: `https://open.spotify.com/search/${query}`,
      isBrowserAction: true,
    };
  }

  // General Browsing: "Open [website name]"
  const openMatch = lowerCmd.match(/(?:open|kholo|website)\s+([a-z0-9\s\.]+)/i);
  if (openMatch) {
    let website = openMatch[1].trim().replace(/\s+/g, "");
    if (!website.includes(".")) {
      website += ".com";
    }
    return {
      action: `Opening ${openMatch[1]} for you, ugh.`,
      url: `https://www.${website}`,
      isBrowserAction: true,
    };
  }

  return { action: "", isBrowserAction: false };
}
