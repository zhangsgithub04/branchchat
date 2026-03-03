import React from 'react';
import { LearningStyleAnalysis } from '../types';
import { Brain, Zap, ListOrdered, Network, Lightbulb } from 'lucide-react';

interface LearningStylePanelProps {
  analysis: LearningStyleAnalysis;
}

export const LearningStylePanel: React.FC<LearningStylePanelProps> = ({ analysis }) => {
  const getLabel = (value: number, left: string, right: string) => {
    if (value < -0.2) return left;
    if (value > 0.2) return right;
    return 'Balanced';
  };

  const getPercent = (value: number) => {
    return ((value + 1) / 2) * 100;
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center space-x-3">
        <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
          <Brain size={20} />
        </div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Cognitive Learning Insights</h3>
      </div>

      <div className="space-y-4">
        {/* Active vs Reflective */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span>Reflective</span>
            <span className="text-emerald-600">{getLabel(analysis.activeReflective, 'Reflective', 'Active')}</span>
            <span>Active</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 bottom-0 bg-emerald-500 transition-all duration-500"
              style={{ left: '0', width: `${getPercent(analysis.activeReflective)}%` }}
            />
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/50 z-10" />
          </div>
        </div>

        {/* Sequential vs Global */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span>Sequential</span>
            <span className="text-blue-600">{getLabel(analysis.sequentialGlobal, 'Sequential', 'Global')}</span>
            <span>Global</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 bottom-0 bg-blue-500 transition-all duration-500"
              style={{ left: '0', width: `${getPercent(analysis.sequentialGlobal)}%` }}
            />
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/50 z-10" />
          </div>
        </div>

        {/* Sensing vs Intuitive */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span>Sensing</span>
            <span className="text-violet-600">{getLabel(analysis.sensingIntuitive, 'Sensing', 'Intuitive')}</span>
            <span>Intuitive</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 bottom-0 bg-violet-500 transition-all duration-500"
              style={{ left: '0', width: `${getPercent(analysis.sensingIntuitive)}%` }}
            />
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/50 z-10" />
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-50 space-y-4">
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Background Diagnosis</h4>
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            {analysis.backgroundDiagnosis}
          </p>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Improvement Suggestions</h4>
          <ul className="space-y-1.5">
            {analysis.improvementSuggestions.map((suggestion, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-xs text-slate-600 leading-relaxed">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-2 border-t border-slate-50">
          <p className="text-xs text-slate-500 italic leading-relaxed">
            "{analysis.summary}"
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {analysis.traits.map((trait, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-wider">
                {trait}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-[9px] text-slate-400 uppercase font-bold tracking-tighter">
        <Lightbulb size={12} />
        <span>Based on Felder-Silverman Learning Style Model</span>
      </div>
    </div>
  );
};
