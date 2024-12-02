"use client";
import React, { useState, useMemo, useCallback } from "react";
import ForceGraph2D from "react-force-graph-2d";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { genRandomTree } from "@/mockdata/random-data"; // Adjust the path as needed

// Define types for nodes and links
interface GraphNode {
  id: number;
  collapsed?: boolean; // Indicates if the node is collapsed
  childLinks?: GraphLink[]; // Links to child nodes
}

interface GraphLink {
  source: number | GraphNode;
  target: number | GraphNode;
}

// ExpandableGraph Component
const Graph: React.FC = () => {
  const rootId = 0;
  const graphData = useMemo(() => genRandomTree(600, true), []);

  // Build nodesById map and initialize nodes
  const nodesById = useMemo(() => {
    const map: Record<number, GraphNode> = Object.fromEntries(
      graphData.nodes.map((node) => [
        node.id,
        { ...node, collapsed: node.id !== rootId, childLinks: [] },
      ]),
    );

    // Link parent/children
    graphData.links.forEach((link) => {
      if (map[link.source as number]) {
        map[link.source as number].childLinks?.push(link);
      }
    });

    return map;
  }, [graphData]);

  // Function to get the pruned tree
  const getPrunedTree = useCallback(() => {
    const visibleNodes: GraphNode[] = [];
    const visibleLinks: GraphLink[] = [];

    const traverseTree = (node: GraphNode = nodesById[rootId]) => {
      visibleNodes.push(node);
      if (node.collapsed) return;
      visibleLinks.push(...(node.childLinks || []));
      node.childLinks
        ?.map((link) =>
          typeof link.target === "object"
            ? (link.target as GraphNode)
            : nodesById[link.target as number],
        )
        .forEach(traverseTree);
    };

    traverseTree();
    return { nodes: visibleNodes, links: visibleLinks };
  }, [nodesById]);

  // Pruned tree state
  const [prunedTree, setPrunedTree] = useState(getPrunedTree());

  // Handle node click
  const handleNodeClick = useCallback(
    (node: GraphNode) => {
      node.collapsed = !node.collapsed; // Toggle collapse state
      setPrunedTree(getPrunedTree()); // Update the pruned tree
    },
    [getPrunedTree],
  );

  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[970px]">
        <ForceGraph2D
          graphData={prunedTree}
          nodeAutoColorBy="id"
          nodeCanvasObjectMode={() => "before"}
          nodeColor={(node: GraphNode) =>
            !node.childLinks?.length
              ? "green"
              : node.collapsed
                ? "red"
                : "yellow"
          }
          linkDirectionalParticles={2}
          onNodeClick={(node) => handleNodeClick(node as GraphNode)}
        />
      </div>
    </DefaultLayout>
  );
};

export default Graph;
