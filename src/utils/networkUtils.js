const clampUsers = (users, maximumCapacity) => {
  return Math.min(Math.max(users, 0), maximumCapacity);
};

const getLoadRatio = (tower) => {
  if (!tower || tower.maximumCapacity === 0) {
    return 0;
  }

  return tower.currentUsers / tower.maximumCapacity;
};

const getCongestionPenalty = (loadRatio) => {
  if (loadRatio > 0.8) {
    return 5;
  }

  if (loadRatio > 0.5) {
    return 2;
  }

  return 0;
};

const formatCost = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return value;
  }

  return Number.isInteger(numericValue)
    ? numericValue
    : numericValue.toFixed(2);
};

export { clampUsers, formatCost, getCongestionPenalty, getLoadRatio };
