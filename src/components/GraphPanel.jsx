const GraphPanel = ({
  graphPanelRef,
  zoom,
  connectionList,
  getTower,
  isHighlighted,
  highlightedTowerIds,
  componentColorMap,
  formatCost,
  getDynamicEdgeCost,
  towerList,
  getLoadLevel,
  towerIcon,
}) => {
  return (
    <div className="graph-section">
      <div className="graph-panel" ref={graphPanelRef}>
        <svg viewBox="0 0 900 600" className="network">
          <g transform={`scale(${zoom})`}>
            {connectionList.map((edge, index) => {
              const from = getTower(edge.from);
              const to = getTower(edge.to);

              if (!from || !to) {
                return null;
              }

              const midX = (from.x + to.x) / 2;
              const midY = (from.y + to.y) / 2;
              const offsetX = (to.y - from.y) * 0.08;
              const offsetY = (from.x - to.x) * 0.08;
              const labelX = midX + offsetX - 20;
              const labelY = midY + offsetY - 8;

              return (
                <g key={index}>
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    className={
                      isHighlighted(edge)
                        ? "edge highlighted"
                        : "edge"
                    }
                  />

                  <text
                    x={labelX}
                    y={labelY}
                    className="edge-cost"
                  >
                    {formatCost(edge.cost)} / dyn:{" "}
                    {formatCost(getDynamicEdgeCost(edge))}
                  </text>
                </g>
              );
            })}

            {towerList.map((tower) => {
              const componentColor = componentColorMap?.[tower.id];
              const isTowerHighlighted =
                highlightedTowerIds?.includes(tower.id);
              const towerClassName = `tower-circle ${getLoadLevel(
                tower
              )}${isTowerHighlighted ? " tower-highlighted" : ""}`;

              return (
                <g key={tower.id}>
                {componentColor && (
                  <circle
                    cx={tower.x}
                    cy={tower.y}
                    r="30"
                    className="component-ring"
                    style={{ stroke: componentColor }}
                  />
                )}
                <circle
                  cx={tower.x}
                  cy={tower.y}
                  r="26"
                  className={towerClassName}
                />

                <image
                  href={towerIcon}
                  x={tower.x - 16}
                  y={tower.y - 20}
                  width="32"
                  height="32"
                  className="tower-image"
                />

                <text
                  x={tower.x}
                  y={tower.y + 42}
                  className="tower-label"
                >
                  {tower.id}
                </text>

                <text
                  x={tower.x}
                  y={tower.y + 62}
                  className="tower-capacity"
                >
                  Users: {tower.currentUsers}/{tower.maximumCapacity}
                </text>
              </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default GraphPanel;
