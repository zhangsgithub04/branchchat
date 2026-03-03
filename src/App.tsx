import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { MessageNode, ConversationState, Suggestion, AIProvider, AuthUser, SessionSummary } from './types';
import { ChatInterface } from './components/ChatInterface';
import { ConversationTree } from './components/ConversationTree';
import { LearningStylePanel } from './components/LearningStylePanel';
import { analyzeLearningStyle } from './utils/learningAnalysis';
import { GitBranch, Layers, MessageSquare, Info } from 'lucide-react';

const AUTH_TOKEN_KEY = 'branchchat_auth_token';
const EMPTY_STATE: ConversationState = {
  nodes: {},
  activeNodeId: null,
  rootId: null,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function App() {
  const [state, setState] = useState<ConversationState>(EMPTY_STATE);
  const [isTyping, setIsTyping] = useState(false);
  const [showLinks, setShowLinks] = useState(true);
  const [provider, setProvider] = useState<AIProvider>('gemini');

  const [token, setToken] = useState<string | null>(() => localStorage.getItem(AUTH_TOKEN_KEY));
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [sessionError, setSessionError] = useState<string | null>(null);

  const apiFetch = useCallback(async (url: string, init: RequestInit = {}) => {
    if (!token) {
      throw new Error('Not authenticated');
    }

    const headers = new Headers(init.headers || {});
    headers.set('Authorization', `Bearer ${token}`);
    if (!headers.has('Content-Type') && init.body) {
      headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(url, {
      ...init,
      headers,
    });

    if (!response.ok) {
      let errorMessage = 'Request failed';
      try {
        const data = await response.json();
        errorMessage = data.error || errorMessage;
      } catch {
      }
      throw new Error(errorMessage);
    }

    return response;
  }, [token]);

  const fetchSessions = useCallback(async () => {
    try {
      setSessionsLoading(true);
      const response = await apiFetch('/api/sessions');
      const data = await response.json();
      setSessions(data.sessions || []);
    } catch (error: any) {
      setSessionError(error.message || 'Failed to load sessions');
    } finally {
      setSessionsLoading(false);
    }
  }, [apiFetch]);

  const loadSession = useCallback(async (sessionId: string) => {
    try {
      const response = await apiFetch(`/api/sessions/${sessionId}`);
      const data = await response.json();
      const loadedState: ConversationState = data.session.state;
      const analysis = analyzeLearningStyle(loadedState.nodes);
      setState({ ...loadedState, analysis });
      setActiveSessionId(sessionId);
      setSessionError(null);
    } catch (error: any) {
      setSessionError(error.message || 'Failed to load session');
    }
  }, [apiFetch]);

  const createSession = useCallback(async () => {
    try {
      const response = await apiFetch('/api/sessions', {
        method: 'POST',
        body: JSON.stringify({ title: 'New Session', state: EMPTY_STATE }),
      });
      const data = await response.json();
      const created = data.session as SessionSummary;
      setSessions((prev) => [created, ...prev]);
      setActiveSessionId(created.id);
      setState(EMPTY_STATE);
      setSessionError(null);
      return created.id as string;
    } catch (error: any) {
      setSessionError(error.message || 'Failed to create session');
      return null;
    }
  }, [apiFetch]);

  const saveCurrentSession = useCallback(async (nextState: ConversationState, targetSessionId?: string | null) => {
    const sessionId = targetSessionId ?? activeSessionId;
    if (!sessionId || !token) {
      return;
    }

    const root = nextState.rootId ? nextState.nodes[nextState.rootId] : null;
    const title = root?.content?.slice(0, 60) || 'New Session';

    try {
      await apiFetch(`/api/sessions/${sessionId}`, {
        method: 'PUT',
        body: JSON.stringify({
          title,
          state: {
            nodes: nextState.nodes,
            activeNodeId: nextState.activeNodeId,
            rootId: nextState.rootId,
          },
        }),
      });

      setSessions((prev) =>
        prev
          .map((item) =>
            item.id === sessionId
              ? { ...item, title, updatedAt: Date.now() }
              : item
          )
          .sort((a, b) => b.updatedAt - a.updatedAt)
      );
    } catch (error: any) {
      setSessionError(error.message || 'Failed to save session');
    }
  }, [activeSessionId, apiFetch, token]);

  useEffect(() => {
    const verifyAuth = async () => {
      if (!token) {
        setUser(null);
        setSessions([]);
        setActiveSessionId(null);
        setState(EMPTY_STATE);
        return;
      }

      try {
        const response = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Invalid session');
        }

        const data = await response.json();
        setUser(data.user);
      } catch {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        setToken(null);
        setUser(null);
      }
    };

    verifyAuth();
  }, [token]);

  useEffect(() => {
    if (!user || !token) {
      return;
    }

    fetchSessions();
  }, [user, token, fetchSessions]);

  useEffect(() => {
    if (!sessions.length || activeSessionId) {
      return;
    }

    loadSession(sessions[0].id);
  }, [sessions, activeSessionId, loadSession]);

  useEffect(() => {
    if (!activeSessionId || !token || !user) {
      return;
    }

    const timeout = setTimeout(() => {
      saveCurrentSession(state);
    }, 500);

    return () => clearTimeout(timeout);
  }, [state.nodes, state.activeNodeId, state.rootId, activeSessionId, token, user, saveCurrentSession]);

  const handleAuthSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      const normalizedEmail = authEmail.trim().toLowerCase();

      if (!EMAIL_REGEX.test(normalizedEmail)) {
        throw new Error('Please enter a valid email address.');
      }

      if (authPassword.length < 6) {
        throw new Error('Password must be at least 6 characters.');
      }

      const endpoint = authMode === 'signin' ? '/api/auth/signin' : '/api/auth/signup';
      const endpointUrl = new URL(endpoint, window.location.origin).toString();

      const response = await fetch(endpointUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, password: authPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      setToken(data.token);
      setUser(data.user);
      setAuthEmail(normalizedEmail);
      setAuthPassword('');
      setAuthError(null);
    } catch (error: any) {
      const message = typeof error?.message === 'string' ? error.message : 'Authentication failed';
      if (message.includes('expected pattern') || message.includes('Failed to fetch')) {
        setAuthError('Could not reach the auth endpoint. Please restart the server and refresh the page.');
      } else {
        setAuthError(message);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setAuthError(null);
    setAuthLoading(true);

    try {
      const normalizedEmail = authEmail.trim().toLowerCase();

      if (!EMAIL_REGEX.test(normalizedEmail)) {
        throw new Error('Enter your email, then click Reset Password.');
      }

      if (authPassword.length < 6) {
        throw new Error('Enter a new password with at least 6 characters.');
      }

      const response = await fetch(new URL('/api/auth/reset-password', window.location.origin).toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, password: authPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Reset password failed');
      }

      localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      setToken(data.token);
      setUser(data.user);
      setAuthError(null);
    } catch (error: any) {
      setAuthError(error.message || 'Reset password failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch {
    } finally {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      setToken(null);
      setUser(null);
      setSessions([]);
      setActiveSessionId(null);
      setState(EMPTY_STATE);
    }
  };

  const activePath = useMemo(() => {
    const path: MessageNode[] = [];
    let currentId = state.activeNodeId;
    while (currentId) {
      const node = state.nodes[currentId];
      if (node) {
        path.unshift(node);
        currentId = node.parentId;
      } else {
        break;
      }
    }
    return path;
  }, [state.nodes, state.activeNodeId]);

  const addNode = useCallback((node: MessageNode) => {
    setState((prev) => {
      const newNodes = { ...prev.nodes, [node.id]: node };

      if (node.parentId && newNodes[node.parentId]) {
        newNodes[node.parentId] = {
          ...newNodes[node.parentId],
          children: [...newNodes[node.parentId].children, node.id],
        };
      }

      const analysis = analyzeLearningStyle(newNodes);

      return {
        ...prev,
        nodes: newNodes,
        activeNodeId: node.id,
        rootId: prev.rootId || node.id,
        analysis,
      };
    });
  }, []);

  const handleSendMessage = async (content: string, interactionType: 'manual' | 'suggestion' = 'manual') => {
    let sessionId = activeSessionId;
    if (!sessionId) {
      sessionId = await createSession();
      if (!sessionId) {
        return;
      }
    }

    const parentNode = state.activeNodeId ? state.nodes[state.activeNodeId] : null;
    const depth = parentNode ? parentNode.metadata.depth + 1 : 0;

    const userNodeId = crypto.randomUUID();
    const userNode: MessageNode = {
      id: userNodeId,
      role: 'user',
      content,
      parentId: state.activeNodeId,
      children: [],
      timestamp: Date.now(),
      metadata: {
        depth,
        wordCount: content.split(/\s+/).filter(Boolean).length,
        charCount: content.length,
        interactionType,
      },
    };

    addNode(userNode);
    setIsTyping(true);

    try {
      const history = activePath.map((n) => ({
        role: n.role === 'user' ? 'user' : 'model',
        parts: [{ text: n.content }],
      }));

      const response = await apiFetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ history, content, provider }),
      });

      const result = await response.json();
      const modelContent = result.text || "I'm sorry, I couldn't generate a response.";
      const suggestions: Suggestion[] = result.suggestions || [];

      const modelNode: MessageNode = {
        id: crypto.randomUUID(),
        role: 'model',
        content: modelContent,
        suggestions,
        parentId: userNodeId,
        children: [],
        timestamp: Date.now(),
        metadata: {
          depth: depth + 1,
          wordCount: modelContent.split(/\s+/).filter(Boolean).length,
          charCount: modelContent.length,
          interactionType: 'manual',
        },
      };

      addNode(modelNode);
    } catch (error) {
      console.error('AI API Error:', error);
      const errorNode: MessageNode = {
        id: crypto.randomUUID(),
        role: 'model',
        content: 'Error: Failed to connect to the AI service.',
        parentId: userNodeId,
        children: [],
        timestamp: Date.now(),
        metadata: {
          depth: depth + 1,
          wordCount: 0,
          charCount: 0,
          interactionType: 'manual',
        },
      };
      addNode(errorNode);
    } finally {
      setIsTyping(false);
    }
  };

  const handleBranch = (nodeId: string) => {
    setState((prev) => ({
      ...prev,
      activeNodeId: nodeId,
    }));
  };

  const handleNodeClick = (nodeId: string) => {
    setState((prev) => ({
      ...prev,
      activeNodeId: nodeId,
    }));
  };

  const activeNode = state.activeNodeId ? state.nodes[state.activeNodeId] : null;

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 font-sans p-4 md:p-6 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight">BranchChat Authentication</h1>
            <p className="text-sm text-slate-500">Sign in or create an account to save and retrieve sessions.</p>
          </div>

          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setAuthMode('signin')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${authMode === 'signin' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${authMode === 'signup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} noValidate className="space-y-3">
            <input
              type="text"
              value={authEmail}
              onChange={(event) => setAuthEmail(event.target.value)}
              placeholder="Email"
              className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              autoComplete="email"
            />
            <input
              type="password"
              value={authPassword}
              onChange={(event) => setAuthPassword(event.target.value)}
              placeholder="Password (min 6 chars)"
              className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />

            {authError && <p className="text-xs text-rose-600">{authError}</p>}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-slate-300"
            >
              {authLoading ? 'Please wait...' : authMode === 'signin' ? 'Sign in' : 'Create account'}
            </button>

            {authMode === 'signin' && (
              <button
                type="button"
                onClick={handleResetPassword}
                disabled={authLoading}
                className="w-full py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:border-blue-400 hover:text-blue-700 disabled:opacity-60"
              >
                Reset password and sign in
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-slate-100 text-slate-900 font-sans p-4 md:p-6">
      <div className="max-w-[1600px] mx-auto h-full flex flex-col space-y-4 min-h-0">
        <header className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <GitBranch size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">BranchChat</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Cognitive Research Interface</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Provider</span>
              <select
                value={provider}
                onChange={(event) => setProvider(event.target.value as AIProvider)}
                className="text-xs font-medium bg-transparent border-none focus:outline-none text-slate-700"
              >
                <option value="gemini">AI Studio</option>
                <option value="openai">OpenAI</option>
              </select>
            </div>

            <button
              onClick={createSession}
              className="px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm text-xs font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
            >
              New Session
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm text-xs font-semibold text-slate-700 hover:border-rose-500 hover:text-rose-600"
            >
              Sign out
            </button>
          </div>
        </header>

        <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
          <section className="lg:col-span-3 flex flex-col min-h-0">
            <ChatInterface
              activePath={activePath}
              onSendMessage={(content) => handleSendMessage(content, 'manual')}
              onSuggestionClick={(content) => handleSendMessage(content, 'suggestion')}
              onBranch={handleBranch}
              isTyping={isTyping}
            />
          </section>

          <section className="lg:col-span-6 flex flex-col min-h-0 space-y-4">
            <div className="flex-1 flex flex-col min-h-0">
              <ConversationTree
                nodes={state.nodes}
                activeNodeId={state.activeNodeId}
                onNodeClick={handleNodeClick}
                showLinks={showLinks}
              />
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Selected Node Analysis</h3>
                {activeNode && (
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    activeNode.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-violet-100 text-violet-600'
                  }`}>
                    {activeNode.role}
                  </span>
                )}
              </div>

              {activeNode ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Timestamp</p>
                    <p className="text-sm font-mono">{new Date(activeNode.timestamp).toLocaleTimeString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Depth</p>
                    <p className="text-sm font-mono">{activeNode.metadata.depth}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Words / Chars</p>
                    <p className="text-sm font-mono">{activeNode.metadata.wordCount} / {activeNode.metadata.charCount}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Interaction</p>
                    <p className="text-sm font-mono capitalize">{activeNode.metadata.interactionType}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">Select a node to view detailed interaction metrics.</p>
              )}
            </div>
          </section>

          <section className="lg:col-span-3 flex flex-col min-h-0 space-y-4 overflow-hidden">
            {state.analysis && (
              <div className="shrink-0 max-h-[36%] overflow-y-auto">
                <LearningStylePanel analysis={state.analysis} />
              </div>
            )}

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col min-h-0 flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Session History</h3>
                {sessionsLoading && <span className="text-[10px] text-slate-400">Loading...</span>}
              </div>

              <div className="space-y-2 flex-1 min-h-0 overflow-y-auto pr-1">
                {sessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => loadSession(session.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-colors ${
                      session.id === activeSessionId
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-200'
                    }`}
                  >
                    <p className="font-semibold truncate">{session.title}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{new Date(session.updatedAt).toLocaleString()}</p>
                  </button>
                ))}
                {!sessions.length && !sessionsLoading && (
                  <p className="text-xs text-slate-400 italic">No sessions yet. Click "New Session" to begin.</p>
                )}
              </div>

              {sessionError && <p className="text-xs text-rose-600 mt-2">{sessionError}</p>}
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Legend</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-xs font-medium text-slate-600">User Node</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-violet-500" />
                  <span className="text-xs font-medium text-slate-600">AI Node</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium text-slate-600">Active Node</span>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-slate-200/50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center p-6 text-center">
              <div className="space-y-2">
                <Info size={24} className="mx-auto text-slate-400" />
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider leading-relaxed">
                  Use the tree to navigate branches. Your learning style is calculated based on how you explore these paths.
                </p>
                <button
                  onClick={() => setShowLinks(!showLinks)}
                  className="text-[10px] uppercase font-bold tracking-wider text-slate-500 hover:text-blue-600"
                >
                  {showLinks ? 'Hide' : 'Show'} Jumping Lines
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
