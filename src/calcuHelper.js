const airCalcul = (width, height) => {
  return multiplication(width, height);
};

const squareCalcul = (width) => {
  return multiplication(width, width);
};

const multiplication = (a, b) => {
  return a * b;
};

const isAdmin = (user) => {
  if (!user) throw new Error("Pas d'utilisateur définie");
  if (user.role === "admin") return true;
  throw new Error("Interdit");
};

const showCalculAirMessage = (a, b) => {
  let width = parseInt(a);
  let height = parseInt(b);
  const air = airCalcul(width, height);
  return isNaN(air) || typeof width !== "number" || typeof height !== "number"
    ? `L'air ne peut pas être calculer`
    : `L'air de la surface est de ${air}`;
};

export {
  airCalcul,
  squareCalcul,
  multiplication,
  showCalculAirMessage,
  isAdmin,
};
