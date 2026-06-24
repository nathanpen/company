import { Position } from '@xyflow/react';

const SOURCES = [
  { id: 'src-db', icon: 'DB', label: 'Warehouses & databases' },
  { id: 'src-api', icon: 'API', label: 'APIs & webhooks' },
  { id: 'src-files', icon: 'F', label: 'Files & documents' },
  { id: 'src-saas', icon: 'SaaS', label: 'SaaS & ERP' },
];

const NODE = { draggable: true, selectable: true };

const OUTPUT_W = 364;
const OUTPUT_H = 416;
const SOURCE_GAP = 56;

function buildEdges() {
  return SOURCES.map(({ id }) => ({
    id: `e-${id}`,
    source: id,
    target: 'output',
    targetHandle: id,
    type: 'floating',
  }));
}

/** Sources stacked on the left; chat on the right. */
export function computeFlowLayout(width, height) {
  const pad = 24;
  const sourceX = pad;

  const chatX = Math.max(pad + 240, width - OUTPUT_W - pad);
  const chatY = (height - OUTPUT_H) / 2;

  const sourceStack = (SOURCES.length - 1) * SOURCE_GAP + 44;
  const sourceStartY = Math.max(pad, chatY + (OUTPUT_H - sourceStack) / 2);

  const nodes = SOURCES.map(({ id, icon, label }, index) => ({
    id,
    type: 'sourceNode',
    position: { x: sourceX, y: sourceStartY + index * SOURCE_GAP },
    data: { icon, label, handlePosition: Position.Right },
    ...NODE,
  }));

  nodes.push({
    id: 'output',
    type: 'outputNode',
    position: { x: chatX, y: chatY },
    data: {},
    ...NODE,
  });

  return { nodes, edges: buildEdges() };
}
