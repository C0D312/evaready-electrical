const locationIndexationSpecBasename = "location-indexation.spec.ts";

export function isLocationIndexationSpecFile(file: string | undefined) {
  if (!file) return false;
  return file.replaceAll("\\", "/").split("/").at(-1) === locationIndexationSpecBasename;
}
