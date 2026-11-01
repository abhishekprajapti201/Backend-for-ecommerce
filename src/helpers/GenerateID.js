const generateID = (data) => {
  const uuid = data + Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
  return uuid;
};

export default generateID;
