import AlgorithmControls from "./AlgorithmControls";

const LoadBalancingPanel = ({
  simulateRandomTraffic,
  findBestAvailableTower,
  autoRebalanceUsers,
  rebalanceSummary,
  loadBalanceMessage,
}) => {
  return (
    <section className="control-card load-card">
      <h2>Load Balancing</h2>

      <AlgorithmControls
        variant="load-balancing"
        onSimulateRandomTraffic={simulateRandomTraffic}
        onFindBestAvailableTower={findBestAvailableTower}
        onAutoRebalanceUsers={autoRebalanceUsers}
      />

      {rebalanceSummary && (
        <div className="rebalance-summary">
          {rebalanceSummary.status && (
            <p className="rebalance-line">{rebalanceSummary.status}</p>
          )}

          {rebalanceSummary.moves?.length > 0 &&
            rebalanceSummary.moves.map((entry, index) => (
              <p className="rebalance-line" key={index}>
                {entry}
              </p>
            ))}

          {rebalanceSummary.warnings?.length > 0 &&
            rebalanceSummary.warnings.map((entry, index) => (
              <p className="rebalance-warning" key={index}>
                {entry}
              </p>
            ))}
        </div>
      )}

     {loadBalanceMessage && (
  <div className="rebalance-summary">
    <p className="rebalance-line">
      {loadBalanceMessage}
    </p>
  </div>
)}
    </section>
  );
};

export default LoadBalancingPanel;