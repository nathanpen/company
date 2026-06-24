import { BaseEdge, getBezierPath, Position } from '@xyflow/react';

const END_GAP = 14;

function offsetFromHandle(x, y, position, gap) {
  switch (position) {
    case Position.Left:
      return { x: x - gap, y };
    case Position.Right:
      return { x: x + gap, y };
    case Position.Top:
      return { x, y: y - gap };
    case Position.Bottom:
      return { x, y: y + gap };
    default:
      return { x, y };
  }
}

export function FloatingEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  markerEnd,
  markerStart,
}) {
  const source = offsetFromHandle(sourceX, sourceY, sourcePosition, END_GAP);
  const target = offsetFromHandle(targetX, targetY, targetPosition, END_GAP);

  const [edgePath] = getBezierPath({
    sourceX: source.x,
    sourceY: source.y,
    targetX: target.x,
    targetY: target.y,
    sourcePosition,
    targetPosition,
    curvature: 0.42,
  });

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      style={style}
      markerEnd={markerEnd}
      markerStart={markerStart}
    />
  );
}

export const edgeTypes = {
  floating: FloatingEdge,
};
