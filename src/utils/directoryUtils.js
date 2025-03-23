// newStructure 物件中的key代表directory的名稱，value是directory的內容。

export function createDirectory(newStructure, path) {
  console.log(newStructure, path);
  const parts = path.split("/");
  let current = newStructure;
  for (const part of parts) {
    // 檢查是否已經有這個part這個key，如果沒有就建立一個新的。
    if (!current[part]) {
      current[part] = {};
    }
    current = current[part];
  }
  return newStructure;
}

export function moveDirectory(newStructure, source, destination) {
  const sourceParts = source.split("/");
  const destParts = destination.split("/");
  let srcParent = newStructure;
  let destParent = newStructure;

  for (let i = 0; i < sourceParts.length - 1; i++) {
    if (!srcParent[sourceParts[i]]) return structure;
    srcParent = srcParent[sourceParts[i]];
  }

  const movingDir = srcParent[sourceParts[sourceParts.length - 1]];
  if (!movingDir) return structure;
  delete srcParent[sourceParts[sourceParts.length - 1]];

  for (const part of destParts) {
    if (!destParent[part]) destParent[part] = {};
    destParent = destParent[part];
  }

  destParent[sourceParts[sourceParts.length - 1]] = movingDir;
  return newStructure;
}

export function deleteDirectory(newStructure, path) {
  const parts = path.split("/");
  let current = newStructure;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) return structure;
    current = current[parts[i]];
  }
  delete current[parts[parts.length - 1]];
  return newStructure;
}

export function listDirectories(newStructure, prefix = "") {
  // 為了呈現階層得資料結構，html的部分用了<pre>tag，如此一來`prefix`就能表示縮排的效果。
  return Object.keys(newStructure)
    .map((key) => {
      const children = listDirectories(newStructure[key], prefix + "    ");
      return `${prefix}${key}${children ? `\n${children}` : ""}`;
    })
    .join("\n");
}