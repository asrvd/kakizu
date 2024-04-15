export async function GET() {
  return new Response("Hello World", {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
