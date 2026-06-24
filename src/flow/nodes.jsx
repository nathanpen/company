import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

const CHAT_HANDLES = [
  { id: 'src-db', top: '14%' },
  { id: 'src-api', top: '34%' },
  { id: 'src-files', top: '54%' },
  { id: 'src-saas', top: '74%' },
];

export const SourceNode = memo(function SourceNode({ data }) {
  const handlePosition = data.handlePosition ?? Position.Right;

  return (
    <div className="rf-node rf-node--source">
      <span className="rf-node__icon">{data.icon}</span>
      <span className="rf-node__label">{data.label}</span>
      <Handle type="source" position={handlePosition} />
    </div>
  );
});

export const OutputNode = memo(function OutputNode() {
  return (
    <div className="rf-node rf-node--output">
      {CHAT_HANDLES.map(({ id, top }) => (
        <Handle
          key={id}
          id={id}
          type="target"
          position={Position.Left}
          style={{ top }}
        />
      ))}
      <div className="rf-node__chat-hd">
        <span className="rf-node__dot" />
        <span className="rf-node__chat-title">Data assistant</span>
        <span className="rf-node__chat-badge">Live</span>
      </div>
      <div className="rf-node__chat-body nodrag nowheel">
        <div className="rf-node__bubble rf-node__bubble--user">
          Which customers had declining usage last quarter — and which reps own them?
        </div>
        <div className="rf-node__bubble rf-node__bubble--assistant">
          <p><strong>12 accounts</strong> dropped more than 20% quarter over quarter.</p>
          <ul className="rf-node__mini-list">
            <li>Northwind Logistics · −34% · Alex Kim</li>
            <li>Harbor Retail Co. · −28% · Jordan Lee</li>
            <li>BluePeak Health · −24% · Sam Ortiz</li>
          </ul>
        </div>
        <div className="rf-node__metrics">
          <div className="rf-node__metric">
            <span className="rf-node__metric-label">At-risk ARR</span>
            <span className="rf-node__metric-value">$1.4M</span>
          </div>
          <div className="rf-node__metric">
            <span className="rf-node__metric-label">Avg. decline</span>
            <span className="rf-node__metric-value">−27%</span>
          </div>
        </div>
        <div className="rf-node__bubble rf-node__bubble--user">
          Show me the trend for Northwind over the last 6 months.
        </div>
        <div className="rf-node__bubble rf-node__bubble--assistant">
          Usage fell steadily after March. Seat count unchanged — activity per user is the driver.
        </div>
        <div className="rf-node__cite">
          <span className="rf-node__cite-label">Sources</span>
          <span>Salesforce · Snowflake usage_mart · Product events</span>
        </div>
      </div>
      <div className="rf-node__chat-input nodrag">
        <span>Ask about any metric, account, or pipeline…</span>
      </div>
    </div>
  );
});

export const nodeTypes = {
  sourceNode: SourceNode,
  outputNode: OutputNode,
};
