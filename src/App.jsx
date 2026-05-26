import { useEffect, useRef, useState } from "react";
import "./App.css";
import towerIcon from "./assets/tower.png";
import { towers, connections } from "./data/towersData";
import AlgorithmControls from "./components/AlgorithmControls";
import GraphPanel from "./components/GraphPanel";
import LoadBalancingPanel from "./components/LoadBalancingPanel";
import useTowerManagement from "./hooks/useTowerManagement";
import BTree from "./algorithms/b-tree";
import MinHeap from "./algorithms/MinHeap";
import {
  formatCost,
  getCongestionPenalty,
  getLoadRatio,
} from "./utils/networkUtils";
import DisjointSet from "./algorithms/DisjointSet";
import MaxHeap from "./algorithms/MaxHeap";

function App() {
const [connectionList, setConnectionList] = useState(connections);
const [selectedConnection, setSelectedConnection] = useState("");  const [message, setMessage] = useState("");
  const [loadBalanceMessage, setLoadBalanceMessage] = useState("");
  const [highlightedEdges, setHighlightedEdges] = useState([]);
  const [highlightedTowers, setHighlightedTowers] = useState([]);
  const [rebalanceSummary, setRebalanceSummary] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [selectedStart, setSelectedStart] = useState("A");
  const [selectedEnd, setSelectedEnd] = useState("F");
  const [heapView, setHeapView] = useState([]);
  const graphPanelRef = useRef(null);
  const [connectionCostMode, setConnectionCostMode] = useState("normal");
  const {
    towerList,
    setTowerList,
    getTower,
    getAvailableCapacity,
  } = useTowerManagement({
    initialTowers: towers,
  });
const buildTowerIndex = (searchedId = "") => {
  const btree = new BTree(2);

  towerList.forEach((tower) => {
    btree.insert(tower);
  });

  console.log("B-Tree tower index:", btree.root);

  const sortedTowers = btree.traverse();

  if (!searchedId) {
    setMessage(
      `B-Tree tower index built. Sorted tower IDs: ${sortedTowers
        .map((tower) => tower.id)
        .join(", ")}`
    );

    return;
  }

  const foundTower = btree.search(searchedId);

  if (!foundTower) {
    setMessage(
      `Tower ${searchedId} was not found in the B-Tree index.`
    );

    return;
  }

  setMessage(
    `Tower ${foundTower.id} found | Current users: ${foundTower.currentUsers} | Maximum capacity: ${foundTower.maximumCapacity} | Available capacity: ${foundTower.availableCapacity}`
  );
};
  const getDynamicEdgeCost = (edge) => {
    const baseCost = Number.isFinite(Number(edge.cost))
      ? Number(edge.cost)
      : 0;
    const fromTower = getTower(edge.from);
    const toTower = getTower(edge.to);
    if (!fromTower || !toTower) {
      return baseCost;
    }
    const penalty =
      getCongestionPenalty(getLoadRatio(fromTower)) +
      getCongestionPenalty(getLoadRatio(toTower));
    return baseCost + penalty;
  };
  const getLoadLevel = (tower) => {
    if (tower.maximumCapacity === 0) {
      return "load-low";
    }
    const loadRatio = tower.currentUsers / tower.maximumCapacity;
    if (loadRatio < 0.5) {
      return "load-low";
    }
    if (loadRatio <= 0.8) {
      return "load-medium";
    }
    return "load-overloaded";
  };
  const clearHighlights = () => {
    setHighlightedEdges([]);
    setHighlightedTowers([]);
  };
  const simulateRandomTraffic = () => {
    clearHighlights();
    setTowerList((currentTowers) =>
      currentTowers.map((tower) => {
        const randomUsers = Math.floor(
          Math.random() * (tower.maximumCapacity + 1)
        );

        return {
          ...tower,
          currentUsers: randomUsers,
          availableCapacity: tower.maximumCapacity - randomUsers,
        };
      })
    );

    setRebalanceSummary({
      status: "Random traffic simulated for all towers.",
      moves: [],
      warnings: [],
    });
  };
const findLeastLoadedTower = () => {
  clearHighlights();

  if (towerList.length === 0) {
    setMessage("No towers available.");
    return;
  }

  const heap = new MinHeap();

  towerList.forEach((tower) => {
    heap.insert(tower.id, tower.currentUsers);
  });

  console.log(heap.toTreeArray());

  const leastLoadedTower = heap.extractMin();

  if (!leastLoadedTower) {
    setMessage("No tower found.");
    return;
  }

  setHighlightedTowers([leastLoadedTower.value]);

  setMessage(
    `Least loaded tower: ${leastLoadedTower.value} with ${leastLoadedTower.priority} active users.`
  );
};
const findCheapestConnection = () => {
  clearHighlights();

  if (connectionList.length === 0) {
    setMessage("No connections available.");
    return;
  }

  const heap = new MinHeap();

  connectionList.forEach((connection) => {
    const cost =
      connectionCostMode === "dynamic"
        ? getDynamicEdgeCost(connection)
        : connection.cost;

    heap.insert(
      `${connection.from}-${connection.to}`,
      cost
    );
  });

  const cheapestConnection = heap.extractMin();

  if (!cheapestConnection) {
    setMessage("No cheapest connection found.");
    return;
  }

  const [from, to] = cheapestConnection.value.split("-");

  setHighlightedEdges([{ from, to }]);

  setMessage(
    `Cheapest ${connectionCostMode} connection found: ${from} - ${to} with cost ${cheapestConnection.priority}.`
  );
};


    
const findBestAvailableTower = () => {
  clearHighlights();

  if (towerList.length === 0) {
    setLoadBalanceMessage("No towers available.");
    return;
  }

  const heap = new MaxHeap();

  towerList.forEach((tower) => {
    const availableCapacity = getAvailableCapacity(tower);

    heap.insert(tower.id, availableCapacity);
  });

  setHeapView(heap.toTreeArray ? heap.toTreeArray() : []);

  const best = heap.extractMax();

  if (!best) {
    setLoadBalanceMessage("No tower available.");
    return;
  }

  setHighlightedTowers([best.value]);

  setLoadBalanceMessage(
    `Best available tower: ${best.value} with ${best.priority} free spots.`
  );
};
  const autoRebalanceUsers = () => {
    clearHighlights();

    if (towerList.length === 0) {
      setRebalanceSummary({
        status: "No towers available.",
        moves: [],
        warnings: [],
      });
      return;
    }

    const updatedTowers = towerList.map((tower) => ({
      ...tower,
      availableCapacity: getAvailableCapacity(tower),
    }));

    const overloadedTowers = updatedTowers.filter(
      (tower) =>
        tower.maximumCapacity > 0 &&
        tower.currentUsers / tower.maximumCapacity > 0.8
    );

    if (overloadedTowers.length === 0) {
      setRebalanceSummary({
        status: "No overloaded towers found.",
        moves: [],
        warnings: [],
      });
      return;
    }

    const moveMessages = [];
    const warnings = [];
    const involvedTowerIds = new Set();

    overloadedTowers.forEach((overloadedTower) => {
      const targetUsers = Math.floor(
        overloadedTower.maximumCapacity * 0.8
      );

      let usersToMove =
        overloadedTower.currentUsers - targetUsers;

      involvedTowerIds.add(overloadedTower.id);

      const heap = new MaxHeap();

      updatedTowers.forEach((tower) => {
        if (tower.id === overloadedTower.id) {
          return;
        }

        const availableCapacity = getAvailableCapacity(tower);

        if (availableCapacity > 0) {
         heap.insert(tower.id, availableCapacity);
        }
      });

      while (usersToMove > 0) {
        const best = heap.extractMax();

        if (!best) {
          warnings.push(
            `Not enough free capacity to move ${usersToMove} users from Tower ${overloadedTower.id}.`
          );
          break;
        }

        const destinationTower = updatedTowers.find(
          (tower) => tower.id === best.value
        );

        if (!destinationTower) {
          continue;
        }

        const availableCapacity = getAvailableCapacity(destinationTower);

        if (availableCapacity <= 0) {
          continue;
        }

        const usersToTransfer = Math.min(
          usersToMove,
          availableCapacity
        );

        overloadedTower.currentUsers -= usersToTransfer;
        overloadedTower.availableCapacity = getAvailableCapacity(
          overloadedTower
        );

        destinationTower.currentUsers += usersToTransfer;
        destinationTower.availableCapacity = getAvailableCapacity(
          destinationTower
        );

        involvedTowerIds.add(destinationTower.id);

        moveMessages.push(
          `Moved ${usersToTransfer} users from Tower ${overloadedTower.id} to Tower ${destinationTower.id}.`
        );

        usersToMove -= usersToTransfer;

        const remainingCapacity =
          getAvailableCapacity(destinationTower);

        if (remainingCapacity > 0) {
heap.insert(destinationTower.id, remainingCapacity);
        }
      }
    });

    setTowerList(updatedTowers);
    setHighlightedTowers(Array.from(involvedTowerIds));

    setRebalanceSummary({
      status: "",
      moves: moveMessages,
      warnings,
    });
  };
const disableSelectedConnection = () => {
  clearHighlights();

  if (!selectedConnection) {
    setMessage("Please select a connection first.");
    return;
  }

  const [from, to] = selectedConnection.split("-");

  setConnectionList((currentConnections) =>
    currentConnections.filter(
      (connection) =>
        !(
          (connection.from === from && connection.to === to) ||
          (connection.from === to && connection.to === from)
        )
    )
  );

  setMessage(`Connection ${from} - ${to} disabled.`);
};

const resetConnections = () => {
  clearHighlights();
  setConnectionList(connections);
  setSelectedConnection("");
  setMessage("All connections restored.");
};
  const checkConnectivity = () => {
    clearHighlights();

    if (towerList.length === 0) {
      return;
    }

    const towerIds = towerList.map((tower) => tower.id);
    const ds = new DisjointSet(towerIds);

    connectionList.forEach((edge) => {
      ds.union(edge.from, edge.to);
    });

    const firstRoot = ds.find(towerIds[0]);

    const connected = towerIds.every(
      (id) => ds.find(id) === firstRoot
    );

    setMessage(
      connected
        ? "The network is fully connected."
        : "The network is NOT fully connected."
    );
  };

 


  const isHighlighted = (edge) => {
    return highlightedEdges.some(
      (highlightedEdge) =>
        (highlightedEdge.from === edge.from &&
          highlightedEdge.to === edge.to) ||
        (highlightedEdge.from === edge.to &&
          highlightedEdge.to === edge.from)
    );
  };
  useEffect(() => {
    const graphPanel = graphPanelRef.current;
    if (!graphPanel) {
      return;
    }
    const handleWheel = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const zoomSpeed = 0.015;
      setZoom((currentZoom) => {
        const nextZoom =
          event.deltaY < 0
            ? currentZoom + zoomSpeed
            : currentZoom - zoomSpeed;
        return Math.min(Math.max(nextZoom, 0.6), 2.2);
      });
    };
    graphPanel.addEventListener("wheel", handleWheel, {
      passive: false,
    });
    return () => {
      graphPanel.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="app">
      <h1>Cellphone Tower Routing Analyzer</h1>

      <div className="dashboard">
        <div className="main-layout">
          <section className="main-panel">
            <h2 className="main-panel-title">
             Data Structures
            </h2>

            <section className="control-card algorithm-card">
              <div className="control-row">
               
              </div>
              <AlgorithmControls
                variant="algorithms"
                message={message}
                onCheckConnectivity={checkConnectivity}
          
                  onBuildTowerIndex={buildTowerIndex}
                  onFindLeastLoadedTower={findLeastLoadedTower}
                  onFindCheapestConnection={findCheapestConnection}
                  connectionCostMode={connectionCostMode}
onConnectionCostModeChange={setConnectionCostMode}
connectionList={connectionList}
selectedConnection={selectedConnection}
onSelectConnection={setSelectedConnection}
onDisableConnection={disableSelectedConnection}
onResetConnections={resetConnections}

              />
            </section>

            <LoadBalancingPanel
              simulateRandomTraffic={simulateRandomTraffic}
              findBestAvailableTower={findBestAvailableTower}
              autoRebalanceUsers={autoRebalanceUsers}
              rebalanceSummary={rebalanceSummary}
              loadBalanceMessage={loadBalanceMessage}
            />
           
          </section>
        </div>
      </div>
      <GraphPanel
        graphPanelRef={graphPanelRef}
        zoom={zoom}
        connectionList={connectionList}
        getTower={getTower}
        isHighlighted={isHighlighted}
        highlightedTowerIds={highlightedTowers}
        componentColorMap={{}}
        formatCost={formatCost}
        getDynamicEdgeCost={getDynamicEdgeCost}
        towerList={towerList}
        getLoadLevel={getLoadLevel}
        towerIcon={towerIcon}
      />
    </div>
  );
}
export default App;