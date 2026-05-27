import { useState } from "react";

const AlgorithmControls = ({
  variant,
  message,
  onCheckConnectivity,
  onBuildTowerIndex,
  onFindLeastLoadedTower,
  onFindCheapestConnection,
  selectedStart,
  selectedEnd,
  towerList,
  onSelectStart,
  onSelectEnd,
  onSimulateRandomTraffic,
  onFindBestAvailableTower,
  onAutoRebalanceUsers,
  connectionCostMode,
onConnectionCostModeChange,
connectionList,
selectedConnection,
onSelectConnection,
onDisableConnection,
onResetConnections,
 
}) => {
  const [btreeSearchId, setBtreeSearchId] = useState("");

  if (variant === "load-balancing") {
    return (
      <div className="control-row load-balancing-row">
        <div className="action-with-note">
          <button onClick={onSimulateRandomTraffic}>
            Simulate Random Traffic
          </button>
          <span className="algo-note">
            Traffic simulation
          </span>
        </div>

        <div className="action-with-note">
          <button onClick={onFindBestAvailableTower}>
            Find Best Available Tower
          </button>
          <span className="algo-note">
            Uses MaxHeap
          </span>
        </div>

        <div className="action-with-note">
          <button onClick={onAutoRebalanceUsers}>
            Auto Rebalance Users
          </button>
          <span className="algo-note">
          
          </span>
        </div>
      </div>
    );
  }

 return (
  <>
    <div className="btree-result-card">
      <p>{message || "No recent actions yet."}</p>
    </div>

    <div className="control-row network-actions-row">
      <div className="action-with-note">
        <button onClick={onCheckConnectivity}>
          Check Connectivity
        </button>
        <span className="algo-note">Uses Disjoint Set</span>
      </div>

      <div className="action-with-note">
        <button onClick={onFindLeastLoadedTower}>
          Find Least Loaded Tower
        </button>
        <span className="algo-note">Uses MinHeap</span>
      </div>

      
    </div>

    <div className="control-row network-actions-row">
      <select
        value={selectedConnection}
        onChange={(e) => onSelectConnection(e.target.value)}
      >
        <option value="">Select connection</option>

        {connectionList?.map((connection) => (
          <option
            key={`${connection.from}-${connection.to}`}
            value={`${connection.from}-${connection.to}`}
          >
            {connection.from} - {connection.to}
          </option>
        ))}
      </select>

      <div className="action-with-note">
        <button onClick={onDisableConnection}>
          Disable Connection
        </button>
        <span className="algo-note">Tests Disjoint Set</span>
      </div>

      <div className="action-with-note">
        <button onClick={onResetConnections}>
          Reset Connections
        </button>
        <span className="algo-note">Restores graph</span>
      </div>
    </div>

    <div className="control-row network-actions-row">
      <label>
        <input
          type="radio"
          name="connectionCostMode"
          checked={connectionCostMode === "normal"}
          onChange={() => onConnectionCostModeChange("normal")}
        />
        Normal
      </label>

      <label>
        <input
          type="radio"
          name="connectionCostMode"
          checked={connectionCostMode === "dynamic"}
          onChange={() => onConnectionCostModeChange("dynamic")}
        />
        Dynamic
      </label>

      <div className="action-with-note">
        <button onClick={onFindCheapestConnection}>
          Find Cheapest Connection
        </button>
        <span className="algo-note">Uses MinHeap</span>
      </div>
    </div>

    <div className="control-row">
      <input
        value={btreeSearchId}
        onChange={(e) =>
          setBtreeSearchId(e.target.value.toUpperCase())
        }
        placeholder="Tower ID"
      />

      <div className="action-with-note">
        <button onClick={() => onBuildTowerIndex(btreeSearchId)}>
          Traverse / Search B-Tree
        </button>
        <span className="algo-note">Searches by tower ID</span>
      </div>
    </div>
  </>
);
};

export default AlgorithmControls;