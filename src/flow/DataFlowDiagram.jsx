import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { computeFlowLayout } from './layout';
import { edgeTypes } from './edges';
import { nodeTypes } from './nodes';

const DEFAULT_VIEWPORT = { x: 0, y: 0, zoom: 1 };

function readColorMode() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function logNodePositions(nodes) {
  const positions = Object.fromEntries(
    nodes.map((node) => [
      node.id,
      { x: Math.round(node.position.x), y: Math.round(node.position.y) },
    ]),
  );

  console.log('[flow layout]', JSON.stringify(positions, null, 2));
}

function FlowCanvas() {
  const containerRef = useRef(null);
  const layoutReadyRef = useRef(false);
  const { getNodes } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [colorMode, setColorMode] = useState(readColorMode);

  const onNodeDragStop = useCallback(() => {
    logNodePositions(getNodes());
  }, [getNodes]);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => setColorMode(readColorMode()));
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || layoutReadyRef.current) return undefined;

    const initLayout = () => {
      if (layoutReadyRef.current) return;

      const { width, height } = el.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      const layout = computeFlowLayout(width, height);
      setNodes(layout.nodes);
      setEdges(layout.edges);
      layoutReadyRef.current = true;
    };

    initLayout();

    const observer = new ResizeObserver(initLayout);
    observer.observe(el);

    return () => observer.disconnect();
  }, [setEdges, setNodes]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={onNodeDragStop}
        colorMode={colorMode}
        defaultViewport={DEFAULT_VIEWPORT}
        minZoom={1}
        maxZoom={1}
        defaultEdgeOptions={{
          type: 'floating',
          style: { strokeWidth: 1.5 },
        }}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable
        selectNodesOnDrag={false}
        panOnDrag={false}
        panOnScroll={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        aria-label="Data sources flowing into the data assistant"
      />
    </div>
  );
}

export default function DataFlowDiagram() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
}
