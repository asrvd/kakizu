const CF_TOKEN = process.env.CLOUDFLARE_AI_TOKEN;

console.log(CF_TOKEN);

function dataURLToBuffer(dataURL: string) {
  const base64 = dataURL.split(",")[1];

  const binaryString = atob(base64);

  return Uint8Array.from(binaryString, (c) => c.charCodeAt(0));
}

export async function POST(req: Request) {
  if (!CF_TOKEN) {
    throw new Error("Cloudflare AI Token not found");
  }

  const { img } = (await req.json()) as {
    img: string;
  };

  console.log(Array.from(dataURLToBuffer(img)));

  const captionRes = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/8b258bb476c9309e4761abe0da61dbc7/ai/run/@cf/unum/uform-gen2-qwen-500m`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt:
          "Identify the content of the given rough sketch and generate a good prompt to generate a better detailed image for the sketch.",
        image: Array.from(dataURLToBuffer(img)),
      }),
    }
  );
  // response is binary format, we will send it back as image
  const caption = await captionRes.json();
  console.log(caption.result.description);

  const promptRes = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/8b258bb476c9309e4761abe0da61dbc7/ai/run/@cf/meta/llama-2-7b-chat-fp16`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You are an AI prompt engineer.",
          },
          {
            role: "user",
            content: `Given a caption of a rough sketch, generate a prompt to generate a better detailed image for the sketch. Keep in mind that the caption's black and white color should be ignored and correct colors should be added to the image. The response should only contain the prompt and no unnecessary information.
            
            Here is the caption for the rough sketch:

            ${caption.result.description}`,
          },
        ],
      }),
    }
  );

  const prompt = await promptRes.json();
  console.log(prompt.result.response);

  const imgRes = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/8b258bb476c9309e4761abe0da61dbc7/ai/run/@cf/lykon/dreamshaper-8-lcm`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt.result.response,
      }),
    }
  );

  const genImage = await imgRes.arrayBuffer();
  const genImageBase64 = Buffer.from(genImage).toString("base64");

  return new Response(genImageBase64, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
