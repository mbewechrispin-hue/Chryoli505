import { supabaseAdmin } from "@/lib/supabase-admin";

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
const maxSizeBytes = 5 * 1024 * 1024;

export async function uploadImage(params: {
  bucket: "logos" | "testimonials" | "services" | "uploads";
  path: string;
  file: File;
}) {
  if (!allowedMimeTypes.includes(params.file.type)) {
    throw new Error("Invalid file type");
  }

  if (params.file.size > maxSizeBytes) {
    throw new Error("File too large");
  }

  const arrayBuffer = await params.file.arrayBuffer();
  const { error, data } = await supabaseAdmin.storage.from(params.bucket).upload(params.path, Buffer.from(arrayBuffer), {
    upsert: true,
    contentType: params.file.type
  });

  if (error) throw new Error(error.message);
  return data.path;
}
