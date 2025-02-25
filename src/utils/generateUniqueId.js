import { v4 as uuidv4 } from "uuid";

export function generateUniqueId(items) {
  let newId;
  const existingIds = items.map((item) => item.id);

  do {
    newId = uuidv4();
  } while (existingIds.includes(newId));

  return newId;
}
