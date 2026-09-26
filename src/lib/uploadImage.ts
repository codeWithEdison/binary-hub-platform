import { supabase } from "@/integrations/supabase/client";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export type ImageUploadResult =
  | { url: string; error?: undefined }
  | { url?: undefined; error: string };

/**
 * Upload an image file to the public `images` storage bucket and return its public URL.
 */
export async function uploadPublicImage(
  file: File,
  folder: string
): Promise<ImageUploadResult> {
  if (!file.type.startsWith("image/")) {
    return { error: "Please choose an image file (JPG, PNG, GIF, or WebP)." };
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return { error: "Please choose an image smaller than 5MB." };
  }

  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeFolder = folder.replace(/^\/+|\/+$/g, "") || "uploads";
  const path = `${safeFolder}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from("images")
    .upload(path, file, { upsert: false, contentType: file.type });

  if (error) {
    return { error: error.message };
  }

  const { data } = supabase.storage.from("images").getPublicUrl(path);
  return { url: data.publicUrl };
}
