import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  // Torna true se l'immagine inizia con l'url. Serve a vedere se stiamo utilizzando un immagine già nel db o se ne stiamo inserendo una nuova
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // The name of the image must be unique. / create a folder in supabase so we should remove all of that
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

  // Create image path (supabaseUrl + db path + imgName)
  // Se ha già un path allora l'url dell'img esiste in newCabin, altrimenti dobbiamo crearlo
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin
  // const { data, error } = await supabase
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id)
    // .insert([{ some_column: "someValue", other_column: "otherValue" }])
    query = query.insert([{ ...newCabin, image: imagePath }]); //l'oggetto che passiamo nell'array ha le proprietà con gli stessi nomi che hanno i campi della tabella cabin. Possiamo così inserire l'oggetto newCabin tranquillamente
  // .select()
  // // ritorna il singolo elemento
  // .single();

  // B) Edit
  if (id)
    // I dati non vanno messi in un array come per insert
    query = query
      .update({ ...newCabin, image: imagePath })
      // fa l'update solo se l'id della row è === a quello che passiamo
      .eq("id", id)
      .select();

  const { data, error } = await query
    .select()
    // ritorna il singolo elemento
    .single();

  if (error) {
    console.log(error);
    throw new Error("cabins could not be created");
  }

  //2. Upload image
  // Se l'immagine ha un path ritorna i dati
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uploading image (if an error with storage we will delete the cabin just created)
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(error);
    throw new Error(
      "cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("cabins could not be deleted");
  }

  return data;
}
