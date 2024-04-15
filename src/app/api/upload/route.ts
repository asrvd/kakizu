import { db } from "@/lib/server/db";
import { auth } from "@/lib/server/auth";

const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!CLOUDINARY_UPLOAD_PRESET || !CLOUDINARY_CLOUD_NAME) {
    throw new Error("Cloudinary environment variables not set");
  }

  const { img } = (await req.json()) as {
    img: string;
  };

  const blobRes = await fetch(img);

  const formData = new FormData();
  formData.append("file", await blobRes.blob());
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/diisii1kl/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (data.secure_url) {
    const bookmark = await db.bookmark.create({
      data: {
        userId: session.user.id,
        url: data.secure_url,
      },
    });

    return new Response(JSON.stringify(bookmark), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    throw new Error("Upload failed");
  }
}
