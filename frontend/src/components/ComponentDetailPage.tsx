import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Copy, Check, Play, Code, FileText, Terminal, Zap, ArrowLeft, Download } from 'lucide-react';
import { getComponentById, ComponentProp, ComponentExample } from '../components/componentData';

interface ComponentDetailPageProps {
  theme: any;
}

type TabType = 'preview' | 'ts' | 'js' | 'tailwind';

// Define Tab interface without JSX.Element if causing issues
interface Tab {
  id: TabType;
  label: string;
  icon: React.ReactNode; // Use React.ReactNode instead of JSX.Element
  color: string;
}

const ComponentDetailPage: React.FC<ComponentDetailPageProps> = ({ theme }) => {
  const { componentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('preview');
  const [copied, setCopied] = useState<string | null>(null);
  const [activeExample, setActiveExample] = useState(0);

  // Get component data
  const component = getComponentById(componentId);

  if (!component) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ backgroundColor: theme.bg }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: theme.text }}>Component Not Found</h2>
          <button
            onClick={() => navigate('/ui-library')}
            className="px-6 py-3 rounded-full font-medium flex items-center gap-2 mx-auto"
            style={{ backgroundColor: theme.accent, color: 'white' }}
          >
            <ArrowLeft size={20} />
            Back to Library
          </button>
        </div>
      </div>
    );
  }

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // Use Tab interface
  const tabs: Tab[] = [
    { id: 'preview', label: 'Live Demo', icon: <Play size={16} />, color: theme.accent },
    { id: 'ts', label: 'TypeScript', icon: <FileText size={16} />, color: '#3178C6' },
    { id: 'js', label: 'JavaScript', icon: <Code size={16} />, color: '#F7DF1E' },
    { id: 'tailwind', label: 'Tailwind', icon: <Terminal size={16} />, color: '#38B2AC' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20" style={{ backgroundColor: theme.bg, color: theme.text }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate('/ui-library')}
            className="flex items-center gap-2 mb-6 opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: theme.text }}
          >
            <ArrowLeft size={20} />
            <span>Back to Library</span>
          </button>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-bold px-3 py-1 rounded-full" style={{ 
                  backgroundColor: `${theme.accent}20`, 
                  color: theme.accent 
                }}>
                  {component.category}
                </span>
                {component.isNew && (
                  <span className="text-sm font-bold px-3 py-1 rounded-full" style={{ 
                    backgroundColor: '#10B98120', 
                    color: '#10B981' 
                  }}>
                    NEW
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold mb-3">{component.title}</h1>
              <p className="text-lg opacity-70 max-w-3xl">{component.description}</p>
            </div>
            
            <button
              onClick={() => copyToClipboard(component.installation, 'install')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium"
              style={{ backgroundColor: `${theme.accent}20`, color: theme.accent }}
            >
              <Download size={16} />
              Copy Install
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Code & Demo */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tab Navigation */}
            <div className="flex gap-1 p-1 rounded-xl" style={{ backgroundColor: theme.cardBg }}>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id ? 'shadow-lg' : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: activeTab === tab.id ? tab.color : 'transparent',
                    color: activeTab === tab.id ? 'white' : theme.text
                  }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: theme.border }}>
              <div className="p-6" style={{ backgroundColor: theme.cardBg }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 'preview' && (
                      <div className="space-y-6">
                        <div className="rounded-xl p-8 min-h-[300px] flex flex-col items-center justify-center" 
                             style={{ background: `linear-gradient(135deg, ${theme.bg}, ${theme.cardBg})` }}>
                          <Zap size={64} className="mb-4 opacity-20" style={{ color: theme.accent }} />
                          <h3 className="text-xl font-semibold mb-2">Interactive Demo</h3>
                          <p className="opacity-60 text-center mb-6">
                            Live preview of {component.title} component
                          </p>
                          <div className="flex gap-4">
                            <button className="px-6 py-3 rounded-full font-medium"
                                    style={{ backgroundColor: theme.accent, color: 'white' }}>
                              Play Animation
                            </button>
                            <button className="px-6 py-3 rounded-full font-medium border"
                                    style={{ borderColor: theme.border }}>
                              Reset
                            </button>
                          </div>
                        </div>

                        {/* Examples */}
                        {component.examples && component.examples.length > 0 && (
                          <div>
                            <h4 className="text-lg font-semibold mb-4">Examples</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {component.examples.map((example: ComponentExample, idx: number) => (
                                <div
                                  key={example.id}
                                  className="p-4 rounded-xl border"
                                  style={{ borderColor: theme.border, backgroundColor: `${theme.cardBg}80` }}
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <h5 className="font-medium">{example.title}</h5>
                                    <button
                                      onClick={() => copyToClipboard(example.code, `example-${idx}`)}
                                      className="p-1 rounded hover:opacity-100 opacity-60"
                                      style={{ backgroundColor: `${theme.accent}20` }}
                                    >
                                      {copied === `example-${idx}` ? <Check size={14} /> : <Copy size={14} />}
                                    </button>
                                  </div>
                                  <p className="text-sm opacity-60 mb-3">{example.description}</p>
                                  <pre className="text-xs p-3 rounded-lg overflow-x-auto"
                                       style={{ backgroundColor: '#1a1a25' }}>
                                    {example.code}
                                  </pre>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Code Tabs */}
                    {activeTab === 'ts' && (
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">TypeScript Implementation</h4>
                          <button
                            onClick={() => copyToClipboard(component.typescript, 'ts')}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium"
                            style={{ backgroundColor: `${theme.accent}20`, color: theme.accent }}
                          >
                            {copied === 'ts' ? <Check size={14} /> : <Copy size={14} />}
                            {copied === 'ts' ? 'Copied!' : 'Copy Code'}
                          </button>
                        </div>
                        <pre className="text-sm p-4 rounded-lg overflow-x-auto" style={{ backgroundColor: '#1a1a25' }}>
                          {component.typescript}
                        </pre>
                      </div>
                    )}

                    {activeTab === 'js' && (
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">JavaScript Implementation</h4>
                          <button
                            onClick={() => copyToClipboard(component.javascript, 'js')}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium"
                            style={{ backgroundColor: `${theme.accent}20`, color: theme.accent }}
                          >
                            {copied === 'js' ? <Check size={14} /> : <Copy size={14} />}
                            {copied === 'js' ? 'Copied!' : 'Copy Code'}
                          </button>
                        </div>
                        <pre className="text-sm p-4 rounded-lg overflow-x-auto" style={{ backgroundColor: '#1a1a25' }}>
                          {component.javascript}
                        </pre>
                      </div>
                    )}

                    {activeTab === 'tailwind' && component.tailwind && (
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Tailwind CSS Usage</h4>
                          <button
                            onClick={() => copyToClipboard(component.tailwind, 'tailwind')}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium"
                            style={{ backgroundColor: `${theme.accent}20`, color: theme.accent }}
                          >
                            {copied === 'tailwind' ? <Check size={14} /> : <Copy size={14} />}
                            {copied === 'tailwind' ? 'Copied!' : 'Copy Code'}
                          </button>
                        </div>
                        <pre className="text-sm p-4 rounded-lg overflow-x-auto" style={{ backgroundColor: '#1a1a25' }}>
                          {component.tailwind}
                        </pre>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Usage */}
            <div className="rounded-2xl border p-6" style={{ borderColor: theme.border, backgroundColor: theme.cardBg }}>
              <h3 className="text-lg font-semibold mb-4">Usage</h3>
              <div className="relative">
                <button
                  onClick={() => copyToClipboard(component.usage, 'usage')}
                  className="absolute top-2 right-2 p-2 rounded-lg hover:opacity-100 opacity-60 transition-opacity z-10"
                  style={{ backgroundColor: `${theme.accent}20` }}
                >
                  {copied === 'usage' ? <Check size={16} /> : <Copy size={16} />}
                </button>
                <pre className="text-sm p-4 rounded-lg overflow-x-auto" style={{ backgroundColor: '#1a1a25' }}>
                  {component.usage}
                </pre>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Props Table */}
            <div className="rounded-2xl border p-6" style={{ borderColor: theme.border, backgroundColor: theme.cardBg }}>
              <h3 className="text-lg font-semibold mb-4">Props & API</h3>
              <div className="space-y-3">
                {component.props.map((prop: ComponentProp, idx: number) => (
                  <div key={prop.name} className="pb-3 border-b" style={{ borderColor: `${theme.border}40` }}>
                    <div className="flex items-center justify-between mb-1">
                      <code className="font-medium" style={{ color: theme.accent }}>{prop.name}</code>
                      <span className={`text-xs px-2 py-0.5 rounded ${prop.required ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {prop.required ? 'Required' : 'Optional'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm mb-2">
                      <span className="opacity-60">Type: <code>{prop.type}</code></span>
                      {prop.default && (
                        <span className="opacity-60">Default: <code>{prop.default}</code></span>
                      )}
                    </div>
                    <p className="text-sm opacity-70">{prop.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dependencies */}
            <div className="rounded-2xl border p-6" style={{ borderColor: theme.border, backgroundColor: theme.cardBg }}>
              <h3 className="text-lg font-semibold mb-4">Dependencies</h3>
              <div className="flex flex-wrap gap-2">
                {component.dependencies.map((dep: string) => (
                  <code key={dep} className="px-3 py-1.5 rounded-lg text-sm" 
                        style={{ backgroundColor: `${theme.accent}10` }}>
                    {dep}
                  </code>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="rounded-2xl border p-6" style={{ borderColor: theme.border, backgroundColor: theme.cardBg }}>
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {component.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{ backgroundColor: `${theme.accent}15` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentDetailPage;