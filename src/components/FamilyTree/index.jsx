import React from "react";
import Tree from "react-d3-tree";

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart = {
  name: "Larissa",
  key: "#00123",
  children: [
    {
      name: "John",
      key: "#00123",
      attributes: {
        department: "Production",
      },
      children: [
        {
          name: "Foreman",
          key: "#00123",
          attributes: {
            department: "Fabrication",
          },
          children: [
            {
              name: "Worker",
              key: "#00123",
            },
          ],
        },
        {
          name: "Foreman",
          key: "#00123",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Worker",
              key: "#00123",
            },
          ],
        },
      ],
    },
    {
      name: "Larissa",
      key: "#00123",
      attributes: {
        department: "Production",
      },
      children: [
        {
          name: "Foreman",
          key: "#00123",
          attributes: {
            department: "Fabrication",
          },
          children: [
            {
              name: "Santiago",
              key: "#00123",
            },
          ],
        },
        {
          name: "Lissa",
          key: "#00123",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Mario",
              key: "#00123",
            },
          ],
        },
      ],
    },
  ],
};

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
}) => (
  <g>
    <circle style={{ color: "#0175CA" }} r={15}></circle>
    {/* `foreignObject` requires width & height to be explicitly set. */}
    <foreignObject {...foreignObjectProps}>
      <div
        className="
			"
      >
        <div
          style={{
            border: "3px solid #CDCDCD",
            borderRadius: "0.5rem",
            backgroundColor: "#F2F2F2",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "5px" }}>
            {nodeDatum.name}
          </h3>
          <p style={{ textAlign: "center", marginTop: "0px" }}>
            {nodeDatum.key}
          </p>
          {/* 
        {nodeDatum.children && (
          <button style={{ width: "100%" }} onClick={toggleNode}>
            {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
          </button>
        )}
				*/}
        </div>
      </div>
    </foreignObject>
  </g>
);

export default function Familytree() {
  const nodeSize = { x: 100, y: 200 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 20 };
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: "100%", height: "70em" }}>
      <Tree
        data={orgChart}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
        }
        pathFunc="step"
      />
    </div>
  );
}
