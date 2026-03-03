import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { MessageNode } from '../types';

interface TreeViewProps {
  nodes: Record<string, MessageNode>;
  activeNodeId: string | null;
  onNodeClick: (nodeId: string) => void;
  showLinks?: boolean;
}

interface D3Node extends d3.HierarchyNode<MessageNode> {
  x: number;
  y: number;
}

export const ConversationTree: React.FC<TreeViewProps> = ({ nodes, activeNodeId, onNodeClick, showLinks = true }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const container = svgRef.current?.parentElement;
    if (!container) return;

    const updateTree = () => {
      if (!svgRef.current) return;

      const svg = d3.select(svgRef.current);

      if (Object.keys(nodes).length === 0) {
        svg.selectAll('*').remove();
        return;
      }

      // Find root
      const rootNode = Object.values(nodes).find((n: MessageNode) => n.parentId === null);
      if (!rootNode) return;

      // Build hierarchy
      const stratify = d3.stratify<MessageNode>()
        .id((d: MessageNode) => d.id)
        .parentId((d: MessageNode) => d.parentId);

      const root = stratify(Object.values(nodes));

      const width = container.clientWidth || 800;
      const height = container.clientHeight || 600;

      const treeLayout = d3.tree<MessageNode>().size([width - 100, height - 100]);
      const treeData = treeLayout(root);

      svg.selectAll('*').remove();

      const g = svg.append('g').attr('transform', 'translate(50, 50)');

      // Define arrow marker
      svg.append('defs').append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '-0 -5 10 10')
        .attr('refX', 20) // Offset from node center
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('xoverflow', 'visible')
        .append('svg:path')
        .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
        .attr('fill', '#10b981') // emerald-500
        .style('stroke', 'none');

      // Standard Tree Links (Subtle)
      g.selectAll('.link')
        .data(treeData.links())
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', d3.linkVertical<any, any>()
          .x(d => d.x)
          .y(d => d.y) as any)
        .attr('fill', 'none')
        .attr('stroke', '#e2e8f0') // slate-200
        .attr('stroke-width', 1);

      // Jumping Lines (Directed path from active node back to root)
      if (showLinks && activeNodeId) {
        const activeNode = treeData.descendants().find(d => d.data.id === activeNodeId);
        if (activeNode) {
          const path = activeNode.ancestors();
          const jumpingLinks = [];
          for (let i = 0; i < path.length - 1; i++) {
            jumpingLinks.push({
              source: path[i], // Child
              target: path[i + 1] // Parent
            });
          }

          g.selectAll('.jumping-link')
            .data(jumpingLinks)
            .enter()
            .append('path')
            .attr('class', 'jumping-link')
            .attr('d', (d: any) => {
              return `M${d.source.x},${d.source.y} L${d.target.x},${d.target.y}`;
            })
            .attr('fill', 'none')
            .attr('stroke', '#10b981') // emerald-500
            .attr('stroke-width', 2)
            .attr('marker-end', 'url(#arrowhead)')
            .style('stroke-dasharray', '5,5')
            .style('animation', 'dash 1s linear infinite');
        }
      }

      // Nodes
      const node = g.selectAll('.node')
        .data(treeData.descendants())
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.x},${d.y})`)
        .on('click', (event, d) => onNodeClick(d.data.id))
        .style('cursor', 'pointer');

      node.append('circle')
        .attr('r', 12)
        .attr('fill', d => {
          if (d.data.id === activeNodeId) return '#10b981'; // emerald-500
          return d.data.role === 'user' ? '#3b82f6' : '#8b5cf6'; // blue-500 : violet-500
        })
        .attr('stroke', '#fff')
        .attr('stroke-width', 2);

      node.append('text')
        .attr('dy', '0.31em')
        .attr('y', d => d.children ? -20 : 20)
        .attr('text-anchor', 'middle')
        .text(d => d.data.content.substring(0, 15) + (d.data.content.length > 15 ? '...' : ''))
        .style('font-size', '10px')
        .style('fill', '#4b5563')
        .style('pointer-events', 'none');
    };

    const resizeObserver = new ResizeObserver(() => {
      updateTree();
    });

    resizeObserver.observe(container);
    updateTree();

    return () => resizeObserver.disconnect();
  }, [nodes, activeNodeId, onNodeClick]);

  return (
    <div className="w-full h-full bg-slate-50 rounded-xl border border-slate-200 overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Conversation Tree</h3>
      </div>
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};
