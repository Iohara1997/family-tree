import React from "react";
import Tree from "react-d3-tree";
import orgChartJson from "./data/org-chart.json";
import { useCenteredTree } from "./helpers";
import "./styles.css";
import { Box, Stack } from "@chakra-ui/layout";

const containerStyles = {
  width: "100vw",
  height: "100vh",
};

// Here we're using `renderCustomNodeElement` render a component that uses
// both SVG and HTML tags side-by-side.
// This is made possible by `foreignObject`, which wraps the HTML tags to
// allow for them to be injected into the SVG namespace.
const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
}) => (
  <g>
    <rect width="150" height="170" x="-75" onClick={toggleNode} />
    <text x="x=-75" y="130" dominant-baseline="middle" text-anchor="middle">
      {nodeDatum.name}
    </text>

    {console.log(nodeDatum.attributes)}
    {nodeDatum.attributes && (
      <text x="x=-75" y="150" dominant-baseline="middle" text-anchor="middle">
        {nodeDatum.attributes.department}
      </text>
    )}
    {/* `foreignObject` requires width & height to be explicitly set. */}
    {/* <foreignObject x="-10" width="170" height="28" {...foreignObjectProps}>
      <div style={{ border: "1px solid black", backgroundColor: "#dedede" }}>
        <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
        {nodeDatum.children && (
          <button style={{ width: "100%" }} onClick={toggleNode}>
            {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
          </button>
        )}
      </div>
    </foreignObject> */}
  </g>
);

export default function App() {
  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 200, y: 200 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 20 };
  return (
    <Stack direction="row" spacing="md">
      <Box w="100%" h="100vh">
        <div style={containerStyles} ref={containerRef}>
          <Tree
            data={orgChartJson}
            translate={translate}
            nodeSize={nodeSize}
            pathFunc="step"
            renderCustomNodeElement={(rd3tProps) =>
              renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
            }
            orientation="vertical"
          />
        </div>
      </Box>
    </Stack>
  );
}
