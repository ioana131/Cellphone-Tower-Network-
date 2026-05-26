import { useState } from "react";

const useTowerManagement = ({ initialTowers = [] }) => {
  const [towerList, setTowerList] = useState(initialTowers);

  const getTower = (id) => {
    return towerList.find((tower) => tower.id === id);
  };

  const getAvailableCapacity = (tower) => {
    return tower.maximumCapacity - tower.currentUsers;
  };

  return {
    towerList,
    setTowerList,
    getTower,
    getAvailableCapacity,
  };
};

export default useTowerManagement;