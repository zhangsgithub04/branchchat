import { MessageNode, LearningStyleAnalysis } from '../types';

export function analyzeLearningStyle(nodes: Record<string, MessageNode>): LearningStyleAnalysis {
  const nodeArray = Object.values(nodes);
  const userNodes = nodeArray.filter(n => n.role === 'user');
  
  if (userNodes.length === 0) {
    return {
      activeReflective: 0,
      sequentialGlobal: 0,
      sensingIntuitive: 0,
      summary: "Start interacting to see your learning style analysis.",
      traits: [],
      backgroundDiagnosis: "No data yet.",
      improvementSuggestions: ["Start a conversation to receive personalized suggestions."]
    };
  }

  // 1. Active vs. Reflective
  // Active: Uses suggestions, branches often, shorter messages
  // Reflective: Manual typing, deeper paths, longer messages
  const suggestionCount = userNodes.filter(n => n.metadata.interactionType === 'suggestion').length;
  const manualCount = userNodes.filter(n => n.metadata.interactionType === 'manual').length;
  const activeReflective = (suggestionCount - manualCount) / userNodes.length;

  // 2. Sequential vs. Global
  // Sequential: Deep paths, few branches per node
  // Global: Many branches, shallow paths
  const maxDepth = Math.max(...nodeArray.map(n => n.metadata.depth), 1);
  const totalNodes = nodeArray.length;
  const branchingFactor = totalNodes / maxDepth;
  // Normalize: if branching factor is high relative to depth, it's Global
  const sequentialGlobal = Math.min(Math.max((branchingFactor - 2) / 5, -1), 1);

  // 3. Sensing vs. Intuitive
  // Sensing: Practical, fact-oriented (shorter, precise words)
  // Intuitive: Conceptual, relationship-oriented (longer, varied words)
  const avgWordCount = userNodes.reduce((acc, n) => acc + n.metadata.wordCount, 0) / userNodes.length;
  const sensingIntuitive = Math.min(Math.max((avgWordCount - 10) / 20, -1), 1);

  // 4. Background Diagnosis
  // High depth + high word count = Expert/Deep Researcher
  // Low depth + high word count = Curious Beginner
  // Low depth + low word count = Casual Explorer
  // High depth + low word count = Focused Learner
  let backgroundDiagnosis = "";
  if (maxDepth > 5) {
    backgroundDiagnosis = avgWordCount > 15 
      ? "Expert/Deep Researcher: You engage deeply with complex queries."
      : "Focused Learner: You are methodically drilling down into specific details.";
  } else {
    backgroundDiagnosis = avgWordCount > 15
      ? "Curious Beginner: You have broad interests and ask comprehensive questions."
      : "Casual Explorer: You are testing the waters with quick, direct interactions.";
  }

  // 5. Improvement Suggestions
  const improvementSuggestions: string[] = [];
  if (activeReflective > 0.4) {
    improvementSuggestions.push("Try pausing to formulate a unique question instead of clicking a suggestion.");
  } else if (activeReflective < -0.4) {
    improvementSuggestions.push("Try using a suggestion to see where the AI's 'train of thought' leads.");
  }

  if (sequentialGlobal > 0.4) {
    improvementSuggestions.push("Consider picking one branch and following it to a greater depth (5+ nodes).");
  } else if (sequentialGlobal < -0.4) {
    improvementSuggestions.push("Try branching out from an earlier node to compare different perspectives.");
  }

  if (improvementSuggestions.length === 0) {
    improvementSuggestions.push("Continue your balanced exploration; try varying your question length.");
  }

  // Generate Summary
  let summary = "";
  const traits: string[] = [];

  if (activeReflective > 0.2) {
    summary += "You are an Active learner who prefers exploring suggested paths. ";
    traits.push("Exploratory", "Dynamic");
  } else if (activeReflective < -0.2) {
    summary += "You are a Reflective learner who prefers formulating your own questions. ";
    traits.push("Self-Directed", "Thoughtful");
  } else {
    summary += "You have a balanced approach to processing information. ";
    traits.push("Balanced");
  }

  if (sequentialGlobal > 0.2) {
    summary += "Your style is Global, jumping between different concepts to see the big picture. ";
    traits.push("Holistic", "Big-Picture");
  } else if (sequentialGlobal < -0.2) {
    summary += "Your style is Sequential, building your understanding step-by-step. ";
    traits.push("Methodical", "Linear");
  } else {
    summary += "You use both linear and non-linear thinking. ";
  }

  return {
    activeReflective,
    sequentialGlobal,
    sensingIntuitive,
    summary,
    traits,
    backgroundDiagnosis,
    improvementSuggestions
  };
}
