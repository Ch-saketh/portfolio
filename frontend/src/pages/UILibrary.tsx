import React, { useState, useEffect } from "react";
import { allComponents, ComponentItem } from "../components/componentsData";

const defaultTheme = {
  bg: '#0a0a0f',
  surface: '#1a1625',
  panel: '#13101a',
  card: '#100d16',
  border: '#2a2535',
  text: '#fafafa',
  textMuted: '#a8a0b5',
  accent: '#6b8cff',
  accentHover: '#8ba5ff',
  success: '#4ade80',
  warning: '#fbbf24',
  codeBg: '#0d0a1a',
  codeText: '#c5c8d3',
  codeKeyword: '#ff6b6b',
  codeString: '#98c379',
  codeNumber: '#d19a66',
  codeComment: '#5c6370',
  codeFunction: '#61afef',
  codeTag: '#e06c75',
  codeAttr: '#d19a66',
};

interface UILibraryProps {
  theme?: Partial<typeof defaultTheme>;
}

type CodeLanguage = 'typescript' | 'javascript' | 'tailwind';

const CodeBlock: React.FC<{
  language: CodeLanguage;
  code: string;
  theme: typeof defaultTheme;
}> = ({ language, code, theme }) => {
  const languageColors = {
    typescript: '#3178c6',
    javascript: '#f0db4f',
    tailwind: '#38bdf8',
  };

  const languageLabels = {
    typescript: 'TypeScript',
    javascript: 'JavaScript',
    tailwind: 'Tailwind CSS',
  };

  const getHighlightedCode = () => {
    return code
      .replace(/("([^"]*)")/g, `<span style="color: ${theme.codeString}">$1</span>`)
      .replace(/('([^']*)')/g, `<span style="color: ${theme.codeString}">$1</span>`)
      .replace(/\b(import|from|export|default|const|let|var|function|return|if|else|for|while|class|extends)\b/g, 
        `<span style="color: ${theme.codeKeyword}">$1</span>`)
      .replace(/\b(useRef|useEffect|useState|gsap|ScrollTrigger|useGSAP)\b/g,
        `<span style="color: ${theme.codeFunction}">$1</span>`)
      .replace(/\b(true|false|null|undefined)\b/g,
        `<span style="color: ${theme.codeKeyword}">$1</span>`)
      .replace(/\b(\d+(\.\d+)?)\b/g,
        `<span style="color: ${theme.codeNumber}">$1</span>`)
      .replace(/\/\/.*$/gm,
        `<span style="color: ${theme.codeComment}">$&</span>`);
  };

  return (
    <div style={{
      background: theme.codeBg,
      borderRadius: 12,
      border: `1px solid ${theme.border}`,
      overflow: 'hidden',
      marginBottom: 16
    }}>
      {/* Language Header */}
      <div style={{
        padding: '12px 20px',
        background: theme.surface,
        borderBottom: `1px solid ${theme.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: languageColors[language]
          }} />
          <span style={{
            color: theme.text,
            fontSize: 14,
            fontWeight: 600
          }}>
            {languageLabels[language]}
          </span>
        </div>
        <div style={{
          color: theme.text,
          fontSize: 12,
          fontWeight: 600,
          background: `${languageColors[language]}20`,
          padding: '4px 12px',
          borderRadius: 6
        }}>
          {language === 'typescript' ? 'TS' : language === 'javascript' ? 'JS' : 'TW'}
        </div>
      </div>

      {/* Code Content */}
      <pre style={{
        margin: 0,
        padding: 20,
        overflowX: 'auto',
        color: theme.codeText,
        fontFamily: '"Fira Code", "Monaco", monospace',
        fontSize: 13,
        lineHeight: 1.6,
        minHeight: 200,
        maxHeight: 400,
        overflowY: 'auto'
      }}>
        <code dangerouslySetInnerHTML={{ __html: getHighlightedCode() }} />
      </pre>

      {/* Copy Button */}
      <div style={{
        padding: '12px 20px',
        borderTop: `1px solid ${theme.border}`,
        background: theme.surface,
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <button
          onClick={() => navigator.clipboard.writeText(code)}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            background: theme.accent,
            color: theme.text,
            border: 'none',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          Copy Code
        </button>
      </div>
    </div>
  );
};

const UsageExample: React.FC<{
  code: string;
  theme: typeof defaultTheme;
}> = ({ code, theme }) => {
  return (
    <div style={{
      background: theme.codeBg,
      borderRadius: 12,
      border: `1px solid ${theme.border}`,
      overflow: 'hidden'
    }}>
      <div style={{
        padding: '12px 20px',
        background: theme.surface,
        borderBottom: `1px solid ${theme.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27ca3f' }} />
        </div>
        <div style={{
          color: theme.text,
          fontSize: 12,
          fontWeight: 600,
          background: `${theme.accent}20`,
          padding: '4px 12px',
          borderRadius: 6
        }}>
          USAGE
        </div>
      </div>
      
      <div style={{
        padding: 20,
        fontFamily: '"Fira Code", "Monaco", monospace',
        fontSize: 13,
        lineHeight: 1.6,
        color: theme.codeText
      }}>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
          {code}
        </pre>
      </div>
      
      <div style={{
        padding: '12px 20px',
        borderTop: `1px solid ${theme.border}`,
        background: theme.surface,
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <button
          onClick={() => navigator.clipboard.writeText(code)}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            background: theme.accent,
            color: theme.text,
            border: 'none',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          Copy Usage
        </button>
      </div>
    </div>
  );
};

const ComponentPreview: React.FC<{ component: ComponentItem; theme: typeof defaultTheme }> = ({ component, theme }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [activeCodeTab, setActiveCodeTab] = useState<'usage' | 'component'>('usage');
  const [activeComponentTab, setActiveComponentTab] = useState<CodeLanguage>('typescript');

  const renderPreview = () => {
    if (component.id === 'split-text') {
      return (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          height: 400,
          marginBottom: 24,
          background: theme.surface,
          borderRadius: 12,
          border: `1px solid ${theme.border}`,
          padding: 40,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 20% 50%, ${theme.accent}10 0%, transparent 50%)`,
            opacity: 0.5
          }} />
          
          {/* Main Animated Text */}
          <div style={{ 
            fontSize: 72, 
            fontWeight: 800, 
            color: theme.text,
            textAlign: 'center',
            marginBottom: 16,
            letterSpacing: '-0.02em'
          }}>
            <div style={{ display: 'inline-flex', overflow: 'hidden' }}>
              {["S","p","l","i","t","t","i","n","g"].map((char, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    animation: `floatUp 0.6s ease ${i * 0.05}s forwards`,
                    opacity: 0,
                    transform: 'translateY(30px)',
                    textShadow: `0 10px 30px ${theme.accent}40`
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
          
          {/* Subtitle */}
          <div style={{ 
            fontSize: 24, 
            fontWeight: 600, 
            color: theme.accent,
            textAlign: 'center',
            opacity: 0,
            animation: 'fadeIn 0.8s ease 0.6s forwards'
          }}>
            Spirit Text
          </div>
          
          {/* Animation Indicator */}
          <div style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: `${theme.accent}15`,
            padding: '8px 16px',
            borderRadius: 20,
            border: `1px solid ${theme.accent}30`
          }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: theme.accent,
              animation: 'pulse 1.5s infinite'
            }} />
            <span style={{
              fontSize: 12,
              fontWeight: 600,
              color: theme.accent
            }}>
              GSAP Animation Active
            </span>
          </div>
        </div>
      );
    }
    
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: 300,
        marginBottom: 24,
        background: theme.surface,
        borderRadius: 12,
        border: `1px solid ${theme.border}`,
        padding: 40
      }}>
        <div style={{ 
          fontSize: 32, 
          fontWeight: 600, 
          color: theme.text,
          textAlign: 'center'
        }}>
          {component.title} Preview
        </div>
      </div>
    );
  };

  const renderPropsTable = () => (
    <div style={{
      background: theme.surface,
      borderRadius: 12,
      border: `1px solid ${theme.border}`,
      overflow: 'hidden',
      marginTop: 32
    }}>
      <div style={{
        padding: '16px 24px',
        background: theme.panel,
        borderBottom: `1px solid ${theme.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{ color: theme.text, margin: 0, fontSize: 18, fontWeight: 600 }}>
          Props Reference
        </h3>
        <span style={{
          fontSize: 12,
          padding: '4px 10px',
          borderRadius: 6,
          background: `${theme.accent}20`,
          color: theme.accent,
          fontWeight: 500
        }}>
          {component.props.length} props
        </span>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          minWidth: 800
        }}>
          <thead>
            <tr style={{ 
              background: theme.card,
              borderBottom: `2px solid ${theme.border}`
            }}>
              <th style={{ 
                padding: '16px 20px', 
                textAlign: 'left', 
                color: theme.textMuted, 
                fontSize: 12, 
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Prop
              </th>
              <th style={{ 
                padding: '16px 20px', 
                textAlign: 'left', 
                color: theme.textMuted, 
                fontSize: 12, 
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Type
              </th>
              <th style={{ 
                padding: '16px 20px', 
                textAlign: 'left', 
                color: theme.textMuted, 
                fontSize: 12, 
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Default
              </th>
              <th style={{ 
                padding: '16px 20px', 
                textAlign: 'left', 
                color: theme.textMuted, 
                fontSize: 12, 
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Description
              </th>
              <th style={{ 
                padding: '16px 20px', 
                textAlign: 'left', 
                color: theme.textMuted, 
                fontSize: 12, 
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Required
              </th>
            </tr>
          </thead>
          <tbody>
            {component.props.map((prop, index) => (
              <tr 
                key={index} 
                style={{ 
                  borderBottom: `1px solid ${theme.border}30`,
                  transition: 'background 0.2s ease'
                }}
              >
                <td style={{ 
                  padding: '16px 20px', 
                  color: theme.accent, 
                  fontSize: 14, 
                  fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                  fontWeight: 500,
                  borderRight: `1px solid ${theme.border}20`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>{prop.name}</span>
                    {prop.required && (
                      <span style={{
                        fontSize: 10,
                        padding: '1px 6px',
                        borderRadius: 4,
                        background: `${theme.warning}20`,
                        color: theme.warning,
                        fontWeight: 700,
                        letterSpacing: '0.02em'
                      }}>
                        REQ
                      </span>
                    )}
                  </div>
                </td>
                <td style={{ 
                  padding: '16px 20px', 
                  color: theme.codeNumber, 
                  fontSize: 13, 
                  fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                  borderRight: `1px solid ${theme.border}20`
                }}>
                  {prop.type}
                </td>
                <td style={{ 
                  padding: '16px 20px', 
                  color: theme.codeString, 
                  fontSize: 13, 
                  fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                  borderRight: `1px solid ${theme.border}20`
                }}>
                  {prop.default}
                </td>
                <td style={{ 
                  padding: '16px 20px', 
                  color: theme.text, 
                  fontSize: 14,
                  lineHeight: 1.5
                }}>
                  {prop.description}
                </td>
                <td style={{ 
                  padding: '16px 20px',
                  textAlign: 'center'
                }}>
                  {prop.required ? (
                    <span style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: theme.warning,
                      padding: '4px 10px',
                      background: `${theme.warning}15`,
                      borderRadius: 6
                    }}>
                      Yes
                    </span>
                  ) : (
                    <span style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: theme.textMuted,
                      padding: '4px 10px',
                      background: `${theme.textMuted}10`,
                      borderRadius: 6
                    }}>
                      No
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderInstallation = () => (
    <div style={{
      background: theme.surface,
      borderRadius: 12,
      border: `1px solid ${theme.border}`,
      padding: 20,
      marginBottom: 24
    }}>
      <h3 style={{ color: theme.text, margin: '0 0 12px 0', fontSize: 16, fontWeight: 600 }}>
        Installation
      </h3>
      <div style={{
        background: theme.codeBg,
        padding: 16,
        borderRadius: 8,
        fontFamily: '"Fira Code", monospace',
        fontSize: 14,
        color: theme.codeText,
        marginBottom: 12
      }}>
        {component.installation}
      </div>
      <div style={{ color: theme.textMuted, fontSize: 14 }}>
        <span style={{ fontWeight: 600 }}>Dependencies: </span>
        {component.dependencies.join(', ')}
      </div>
    </div>
  );

  const renderCodeContent = () => {
    if (activeCodeTab === 'usage') {
      return (
        <div>
          <div style={{
            marginBottom: 16,
            padding: 16,
            background: theme.surface,
            borderRadius: 8,
            border: `1px solid ${theme.border}`
          }}>
            <h4 style={{ color: theme.text, margin: '0 0 8px 0', fontSize: 16 }}>
              Quick Usage Example
            </h4>
            <p style={{ color: theme.textMuted, fontSize: 14 }}>
              Copy and paste this example into your component to get started:
            </p>
          </div>
          <UsageExample code={component.usage} theme={theme} />
        </div>
      );
    } else {
      return (
        <div>
          {/* Language Selection Tabs */}
          <div style={{
            display: 'flex',
            gap: 4,
            marginBottom: 24,
            flexWrap: 'wrap'
          }}>
            {(['typescript', 'javascript', 'tailwind'] as CodeLanguage[]).map((language) => (
              <button
                key={language}
                onClick={() => setActiveComponentTab(language)}
                style={{
                  padding: '10px 20px',
                  background: activeComponentTab === language ? theme.accent : theme.surface,
                  color: activeComponentTab === language ? theme.text : theme.textMuted,
                  border: `1px solid ${activeComponentTab === language ? theme.accent : theme.border}`,
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                {language === 'typescript' && (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3178c6' }} />
                )}
                {language === 'javascript' && (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f0db4f' }} />
                )}
                {language === 'tailwind' && (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#38bdf8' }} />
                )}
                {language.charAt(0).toUpperCase() + language.slice(1)}
              </button>
            ))}
          </div>

          {/* Component Code */}
          {activeComponentTab === 'typescript' && (
            <CodeBlock language="typescript" code={component.typescript} theme={theme} />
          )}
          {activeComponentTab === 'javascript' && (
            <CodeBlock language="javascript" code={component.javascript} theme={theme} />
          )}
          {activeComponentTab === 'tailwind' && component.tailwind && (
            <CodeBlock language="tailwind" code={component.tailwind} theme={theme} />
          )}
          {activeComponentTab === 'tailwind' && !component.tailwind && (
            <div style={{
              padding: 40,
              textAlign: 'center',
              background: theme.surface,
              borderRadius: 12,
              border: `1px solid ${theme.border}`
            }}>
              <p style={{ color: theme.textMuted, margin: 0 }}>
                Tailwind version not available for this component
              </p>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div>
      {/* Component Header Box */}
      <div style={{ 
        background: theme.surface,
        borderRadius: 16,
        border: `1px solid ${theme.border}`,
        marginBottom: 32,
        overflow: 'hidden'
      }}>
        <div style={{ 
          padding: '32px 40px',
          borderBottom: `1px solid ${theme.border}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{
              fontSize: 32,
              fontWeight: 800,
              margin: 0,
              color: theme.text,
              letterSpacing: '-0.02em'
            }}>
              {component.title}
            </h2>
            {component.isNew && (
              <span style={{
                fontSize: 12,
                padding: '4px 12px',
                borderRadius: 6,
                background: `${theme.accent}20`,
                color: theme.accent,
                fontWeight: 600
              }}>
                New
              </span>
            )}
          </div>
          <p style={{
            color: theme.textMuted,
            fontSize: 16,
            margin: '0 0 24px 0',
            lineHeight: 1.6
          }}>
            {component.description}
          </p>
          
          {/* Tags */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {component.tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  fontSize: 12,
                  padding: '4px 10px',
                  borderRadius: 6,
                  background: `${theme.accent}10`,
                  color: theme.accent,
                  fontWeight: 500
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Main Tab Navigation - React Bits Style */}
        <div style={{ 
          padding: '0 40px',
          background: theme.panel,
          borderBottom: `1px solid ${theme.border}`
        }}>
          <div style={{ 
            display: 'flex', 
            gap: 0,
            background: theme.panel
          }}>
            {[
              { id: 'preview', label: 'Preview' },
              { id: 'code', label: 'Code' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '16px 32px',
                  background: activeTab === tab.id ? theme.surface : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? `2px solid ${theme.accent}` : '2px solid transparent',
                  color: activeTab === tab.id ? theme.text : theme.textMuted,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  borderRadius: '0'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content Area - Proper Box Structure */}
        <div style={{ 
          padding: '32px 40px',
          background: theme.surface,
          minHeight: 400
        }}>
          {activeTab === 'preview' && (
            <>
              {renderPreview()}
              {renderInstallation()}
            </>
          )}
          
          {activeTab === 'code' && (
            <div>
              {/* Code Type Tabs - React Bits Style */}
              <div style={{
                display: 'flex',
                gap: 0,
                marginBottom: 32,
                borderBottom: `1px solid ${theme.border}`,
                background: theme.surface
              }}>
                {[
                  { id: 'usage', label: 'Usage' },
                  { id: 'component', label: 'Component' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCodeTab(tab.id as any)}
                    style={{
                      padding: '12px 24px',
                      background: activeCodeTab === tab.id ? 'transparent' : 'transparent',
                      color: activeCodeTab === tab.id ? theme.accent : theme.textMuted,
                      border: 'none',
                      borderBottom: activeCodeTab === tab.id ? `2px solid ${theme.accent}` : '2px solid transparent',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      borderRadius: '0'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              
              {renderCodeContent()}
            </div>
          )}
        </div>
      </div>

      {/* Props Table */}
      {renderPropsTable()}
    </div>
  );
};

const UILibrary: React.FC<UILibraryProps> = ({ theme: userTheme }) => {
  const theme = { ...defaultTheme, ...(userTheme || {}) };
  const [selectedComponent, setSelectedComponent] = useState<ComponentItem>(allComponents[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get categories
  const categories = ['All', ...Array.from(new Set(allComponents.map(comp => comp.category)))];
  
  // Filter components by category
  const filteredComponents = activeCategory === 'All' 
    ? allComponents 
    : allComponents.filter(comp => comp.category === activeCategory);

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${theme.bg} 0%, #0d0a12 100%)`,
      color: theme.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
    
      {/* Main Content - Adjusted for fixed navbar */}
      <div style={{ 
        maxWidth: 1400, 
        margin: '0 auto', 
        padding: '120px 40px 40px' // Increased top padding for fixed navbar
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 48 }}>
          {/* Left Sidebar - Dashboard */}
          <div style={{
            background: theme.panel,
            borderRadius: 16,
            border: `1px solid ${theme.border}`,
            padding: 24,
            height: 'fit-content',
            position: 'sticky',
            top: 120 // Adjusted for navbar height
          }}>
            {/* Category Filter */}
            <div style={{ marginBottom: 32 }}>
              <h3 style={{
                fontSize: 14,
                fontWeight: 600,
                color: theme.textMuted,
                margin: '0 0 16px 0',
                letterSpacing: '0.03em',
                textTransform: 'uppercase'
              }}>
                Categories
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    style={{
                      padding: '10px 16px',
                      background: activeCategory === category ? `${theme.accent}20` : 'transparent',
                      border: `1px solid ${activeCategory === category ? theme.accent : 'transparent'}`,
                      borderRadius: 8,
                      color: activeCategory === category ? theme.accent : theme.textMuted,
                      fontSize: 14,
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Components List */}
            <div>
              <h3 style={{
                fontSize: 14,
                fontWeight: 600,
                color: theme.textMuted,
                margin: '0 0 16px 0',
                letterSpacing: '0.03em',
                textTransform: 'uppercase'
              }}>
                Components
              </h3>
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: 8
              }}>
                {filteredComponents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedComponent(item);
                      // Smooth scroll to top on component change
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                    style={{
                      padding: '12px 16px',
                      background: selectedComponent.id === item.id 
                        ? `${theme.accent}20` 
                        : theme.surface,
                      border: `1px solid ${
                        selectedComponent.id === item.id 
                          ? `${theme.accent}40` 
                          : `${theme.border}40`
                      }`,
                      borderRadius: 12,
                      color: selectedComponent.id === item.id 
                        ? theme.accent 
                        : theme.textMuted,
                      fontSize: 14,
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{item.title}</span>
                    {item.isNew && (
                      <span style={{
                        fontSize: 10,
                        padding: '2px 6px',
                        borderRadius: 4,
                        background: `${theme.accent}20`,
                        color: theme.accent,
                        fontWeight: 600
                      }}>
                        New
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div>
            <ComponentPreview component={selectedComponent} theme={theme} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes floatUp {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          50% {
            opacity: 1;
            transform: translateY(-5px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          overflow-x: hidden;
        }
        
        button {
          font-family: inherit;
          outline: none;
        }
        
        button:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        
        button:active {
          transform: translateY(0);
        }
        
        table {
          border-spacing: 0;
        }
        
        th, td {
          padding: 12px 16px;
        }
        
        tr:hover {
          background: ${theme.card}60;
        }
        
        pre {
          margin: 0;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        
        code {
          font-family: inherit;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${theme.surface};
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${theme.border};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${theme.textMuted};
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default UILibrary;