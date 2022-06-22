const displayName = (model, id) => {
  const idLength = id.length;
  const shortID = (id.substr((idLength - 3), 3)).toUpperCase();
  return model + " #" + shortID;
}

export default displayName;