import React from "react";
import Tree from "react-d3-tree";
import { generatePath, useHistory } from "react-router";
import { ROUTES_DICT } from "../../routes/routesDict";
import CustomInfoIcon from "../CustomInfoIcon";

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

export default function Familytree({ animal }) {
  const nodeSize = { x: 100, y: 150 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 20 };
  const history = useHistory();
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
              border: `3px solid ${
                nodeDatum.gender === "MALE"
                  ? "#0270BF"
                  : nodeDatum.gender === "FEMALE"
                  ? "#EC59A4"
                  : "#777"
              } `,
              borderRadius: "0.5rem",
              backgroundColor: "#F2F2F2",
            }}
            onClick={() => {
              console.log(nodeDatum._id);
              history.push(
                generatePath(ROUTES_DICT.animalDetail.detail, {
                  _id: nodeDatum._id ? nodeDatum._id : "",
                })
              );
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

  const data = {
    name: animal.name,
    key: animal.identifier,
    gender: animal.gender,
    _id: animal._id,
    children: [
      {
        name: animal.father?.name,
        key: animal.father?.identifier,
        gender: animal.father?.gender,
        _id: animal.father?._id,
        children: [
          {
            name: animal.father?.father?.name,
            key: animal.father?.father?.identifier,
            gender: animal.father?.father?.gender,
            _id: animal.father?.father?._id,
          },
          {
            name: animal.father?.mother?.name,
            key: animal.father?.mother?.identifier,
            gender: animal.father?.mother?.gender,
            _id: animal.father?.mother?._id,
          },
        ],
      },
      {
        name: animal.mother?.name,
        key: animal.mother?.identifier,
        gender: animal.mother?.gender,
        _id: animal.mother?._id,
        children: [
          {
            name: animal.mother?.father?.name,
            key: animal.mother?.father?.identifier,
            gender: animal.mother?.father?.gender,
            _id: animal.mother?.father?._id,
          },
          {
            name: animal.mother?.mother?.name,
            key: animal.mother?.mother?.identifier,
            gender: animal.mother?.mother?.gender,
            _id: animal.mother?.mother?._id,
          },
        ],
      },
    ],
  };
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: "100%", height: "70em" }}>
      <Tree
        data={data}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
        }
        pathFunc="step"
      />
    </div>
  );
}
