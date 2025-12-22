export type ComponentItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  isNew?: boolean;
  dependencies: string[];
  installation: string;
  props: ComponentProp[];
  usage: string;
  typescript: string;
  javascript: string;
  tailwind?: string;
  examples: ComponentExample[];
};

export type ComponentProp = {
  name: string;
  type: string;
  default: string;
  required: boolean;
  description: string;
};

export type ComponentExample = {
  id: string;
  title: string;
  description: string;
  code: string;
};

// Split Text Component Data
export const splitTextComponent: ComponentItem = {
  id: 'split-text',
  title: 'Split Text',
  description: 'A highly customizable text splitting animation component using GSAP. Animates text by splitting it into characters, words, or lines with scroll-triggered animations.',
  category: 'Text Animations',
  tags: ['animation', 'text', 'gsap', 'scroll', 'reveal', 'stagger'],
  isNew: false,
  dependencies: ['gsap', '@gsap/react', 'react'],
  installation: 'npm install gsap @gsap/react',
  
  props: [
    {
      name: 'text',
      type: 'string',
      default: '""',
      required: true,
      description: 'The text content to animate'
    },
    {
      name: 'className',
      type: 'string',
      default: '""',
      required: false,
      description: 'Additional CSS classes'
    },
    {
      name: 'delay',
      type: 'number',
      default: '100',
      required: false,
      description: 'Delay between each element animation in milliseconds'
    },
    {
      name: 'duration',
      type: 'number',
      default: '0.6',
      required: false,
      description: 'Duration of each animation in seconds'
    },
    {
      name: 'ease',
      type: 'string | ((t: number) => number)',
      default: '"power3.out"',
      required: false,
      description: 'GSAP easing function'
    },
    {
      name: 'splitType',
      type: '"chars" | "words" | "lines" | "words, chars"',
      default: '"chars"',
      required: false,
      description: 'How to split the text'
    },
    {
      name: 'from',
      type: 'gsap.TweenVars',
      default: '{ opacity: 0, y: 40 }',
      required: false,
      description: 'Initial animation state'
    },
    {
      name: 'to',
      type: 'gsap.TweenVars',
      default: '{ opacity: 1, y: 0 }',
      required: false,
      description: 'Target animation state'
    },
    {
      name: 'threshold',
      type: 'number',
      default: '0.1',
      required: false,
      description: 'Scroll trigger threshold (0-1)'
    },
    {
      name: 'rootMargin',
      type: 'string',
      default: '"-100px"',
      required: false,
      description: 'Scroll trigger root margin'
    },
    {
      name: 'tag',
      type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"',
      default: '"p"',
      required: false,
      description: 'HTML tag to use for the text'
    },
    {
      name: 'textAlign',
      type: 'React.CSSProperties["textAlign"]',
      default: '"center"',
      required: false,
      description: 'CSS text-align property'
    },
    {
      name: 'onLetterAnimationComplete',
      type: '() => void',
      default: 'undefined',
      required: false,
      description: 'Callback when animation completes'
    }
  ],
  
  usage: `import SplitText from "./SplitText";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

<SplitText
  text="Hello, GSAP!"
  className="text-2xl font-semibold text-center"
  delay={100}
  duration={0.6}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
  onLetterAnimationComplete={handleAnimationComplete}
/>`,
  
  typescript: `import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const animationCompletedRef = useRef(false);
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;

      const el = ref.current as HTMLElement & {
        _rbsplitInstance?: GSAPSplitText;
      };

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch (_) {}
        el._rbsplitInstance = undefined;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? \`-=\${Math.abs(marginValue)}\${marginUnit}\`
            : \`+=\${marginValue}\${marginUnit}\`;
      const start = \`top \${startPct}%\${sign}\`;
      let targets: Element[] = [];
      const assignTargets = (self: GSAPSplitText) => {
        if (splitType.includes('chars') && self.chars.length) targets = self.chars;
        if (!targets.length && splitType.includes('words') && self.words.length) targets = self.words;
        if (!targets.length && splitType.includes('lines') && self.lines.length) targets = self.lines;
        if (!targets.length) targets = self.chars || self.words || self.lines;
      };
      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: (self: GSAPSplitText) => {
          assignTargets(self);
          return gsap.fromTo(
            targets,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              scrollTrigger: {
                trigger: el,
                start,
                once: true,
                fastScrollEnd: true,
                anticipatePin: 0.4
              },
              onComplete: () => {
                animationCompletedRef.current = true;
                onLetterAnimationComplete?.();
              },
              willChange: 'transform, opacity',
              force3D: true
            }
          );
        }
      });
      el._rbsplitInstance = splitInstance;
      return () => {
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el) st.kill();
        });
        try {
          splitInstance.revert();
        } catch (_) {}
        el._rbsplitInstance = undefined;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        onLetterAnimationComplete
      ],
      scope: ref
    }
  );

  const renderTag = () => {
    const style: React.CSSProperties = {
      textAlign,
      overflow: 'hidden',
      display: 'inline-block',
      whiteSpace: 'normal',
      wordWrap: 'break-word',
      willChange: 'transform, opacity'
    };
    const classes = \`split-parent \${className}\`;
    switch (tag) {
      case 'h1':
        return (
          <h1 ref={ref} style={style} className={classes}>
            {text}
          </h1>
        );
      case 'h2':
        return (
          <h2 ref={ref} style={style} className={classes}>
            {text}
          </h2>
        );
      case 'h3':
        return (
          <h3 ref={ref} style={style} className={classes}>
            {text}
          </h3>
        );
      case 'h4':
        return (
          <h4 ref={ref} style={style} className={classes}>
            {text}
          </h4>
        );
      case 'h5':
        return (
          <h5 ref={ref} style={style} className={classes}>
            {text}
          </h5>
        );
      case 'h6':
        return (
          <h6 ref={ref} style={style} className={classes}>
            {text}
          </h6>
        );
      default:
        return (
          <p ref={ref} style={style} className={classes}>
            {text}
          </p>
        );
    }
  };
  return renderTag();
};

export default SplitText;`,
  
  javascript: `import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

const SplitText = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      const el = ref.current;

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch (_) {
          /* noop */
        }
        el._rbsplitInstance = null;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? \`-=\${Math.abs(marginValue)}\${marginUnit}\`
            : \`+=\${marginValue}\${marginUnit}\`;
      const start = \`top \${startPct}%\${sign}\`;

      let targets;
      const assignTargets = self => {
        if (splitType.includes('chars') && self.chars.length) targets = self.chars;
        if (!targets && splitType.includes('words') && self.words.length) targets = self.words;
        if (!targets && splitType.includes('lines') && self.lines.length) targets = self.lines;
        if (!targets) targets = self.chars || self.words || self.lines;
      };

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: self => {
          assignTargets(self);
          const tween = gsap.fromTo(
            targets,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              scrollTrigger: {
                trigger: el,
                start,
                once: true,
                fastScrollEnd: true,
                anticipatePin: 0.4
              },
              onComplete: () => {
                animationCompletedRef.current = true;
                onLetterAnimationComplete?.();
              },
              willChange: 'transform, opacity',
              force3D: true
            }
          );
          return tween;
        }
      });

      el._rbsplitInstance = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el) st.kill();
        });
        try {
          splitInstance.revert();
        } catch (_) {
          /* noop */
        }
        el._rbsplitInstance = null;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        onLetterAnimationComplete
      ],
      scope: ref
    }
  );

  const renderTag = () => {
    const style = {
      textAlign,
      overflow: 'hidden',
      display: 'inline-block',
      whiteSpace: 'normal',
      wordWrap: 'break-word',
      willChange: 'transform, opacity'
    };
    const classes = \`split-parent \${className}\`;
    switch (tag) {
      case 'h1':
        return (
          <h1 ref={ref} style={style} className={classes}>
            {text}
          </h1>
        );
      case 'h2':
        return (
          <h2 ref={ref} style={style} className={classes}>
            {text}
          </h2>
        );
      case 'h3':
        return (
          <h3 ref={ref} style={style} className={classes}>
            {text}
          </h3>
        );
      case 'h4':
        return (
          <h4 ref={ref} style={style} className={classes}>
            {text}
          </h4>
        );
      case 'h5':
        return (
          <h5 ref={ref} style={style} className={classes}>
            {text}
          </h5>
        );
      case 'h6':
        return (
          <h6 ref={ref} style={style} className={classes}>
            {text}
          </h6>
        );
      default:
        return (
          <p ref={ref} style={style} className={classes}>
            {text}
          </p>
        );
    }
  };
  return renderTag();
};

export default SplitText;`,
  
  tailwind: `import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

const SplitText = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      const el = ref.current;

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch (_) {
          /* noop */
        }
        el._rbsplitInstance = null;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? \`-=\${Math.abs(marginValue)}\${marginUnit}\`
            : \`+=\${marginValue}\${marginUnit}\`;
      const start = \`top \${startPct}%\${sign}\`;

      let targets;
      const assignTargets = self => {
        if (splitType.includes('chars') && self.chars.length) targets = self.chars;
        if (!targets && splitType.includes('words') && self.words.length) targets = self.words;
        if (!targets && splitType.includes('lines') && self.lines.length) targets = self.lines;
        if (!targets) targets = self.chars || self.words || self.lines;
      };

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: self => {
          assignTargets(self);
          const tween = gsap.fromTo(
            targets,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              scrollTrigger: {
                trigger: el,
                start,
                once: true,
                fastScrollEnd: true,
                anticipatePin: 0.4
              },
              onComplete: () => {
                animationCompletedRef.current = true;
                onLetterAnimationComplete?.();
              },
              willChange: 'transform, opacity',
              force3D: true
            }
          );
          return tween;
        }
      });

      el._rbsplitInstance = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el) st.kill();
        });
        try {
          splitInstance.revert();
        } catch (_) {
          /* noop */
        }
        el._rbsplitInstance = null;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        onLetterAnimationComplete
      ],
      scope: ref
    }
  );

  const baseClasses = "overflow-hidden inline-block whitespace-normal break-words will-change-transform,opacity";
  
  const renderTag = () => {
    const style = { textAlign };
    const classes = \`\${baseClasses} \${className}\`;
    
    switch (tag) {
      case 'h1':
        return <h1 ref={ref} style={style} className={classes}>{text}</h1>;
      case 'h2':
        return <h2 ref={ref} style={style} className={classes}>{text}</h2>;
      case 'h3':
        return <h3 ref={ref} style={style} className={classes}>{text}</h3>;
      case 'h4':
        return <h4 ref={ref} style={style} className={classes}>{text}</h4>;
      case 'h5':
        return <h5 ref={ref} style={style} className={classes}>{text}</h5>;
      case 'h6':
        return <h6 ref={ref} style={style} className={classes}>{text}</h6>;
      default:
        return <p ref={ref} style={style} className={classes}>{text}</p>;
    }
  };
  
  return renderTag();
};

export default SplitText;`,
  
  examples: [
    {
      id: 'basic-usage',
      title: 'Basic Usage',
      description: 'Simple character split animation',
      code: `<SplitText
  text="Hello World"
  delay={50}
  duration={0.8}
  ease="back.out(1.7)"
  className="text-4xl font-bold text-blue-500"
/>`
    },
    {
      id: 'word-split',
      title: 'Word Split',
      description: 'Split by words instead of characters',
      code: `<SplitText
  text="Welcome to CS22 UI Library"
  splitType="words"
  delay={150}
  duration={1}
  from={{ opacity: 0, x: -50 }}
  to={{ opacity: 1, x: 0 }}
  className="text-2xl font-semibold"
/>`
    },
    {
      id: 'scroll-trigger',
      title: 'Scroll Triggered',
      description: 'Animation triggers on scroll',
      code: `<SplitText
  text="Scroll to reveal"
  threshold={0.3}
  rootMargin="0px"
  delay={80}
  duration={0.7}
  from={{ opacity: 0, scale: 0.8 }}
  to={{ opacity: 1, scale: 1 }}
  tag="h2"
/>`
    },
    {
      id: 'callback-example',
      title: 'With Callback',
      description: 'Execute function after animation completes',
      code: `const handleComplete = () => {
  console.log('Animation finished!');
  // Add your logic here
};

<SplitText
  text="Animation Complete"
  onLetterAnimationComplete={handleComplete}
  delay={100}
  duration={1.2}
  ease="elastic.out(1, 0.5)"
  className="text-3xl font-black gradient-text"
/>`
    }
  ]
};

// Blur Text Component
export const blurTextComponent: ComponentItem = {
  id: 'blur-text',
  title: 'Blur Text',
  description: 'Text blur animation with smooth reveal effect',
  category: 'Text Animations',
  tags: ['blur', 'reveal', 'smooth', 'transition'],
  isNew: false,
  dependencies: ['react', 'framer-motion'],
  installation: 'npm install framer-motion',
  
  props: [
    {
      name: 'text',
      type: 'string',
      default: '""',
      required: true,
      description: 'Text content'
    },
    {
      name: 'blurAmount',
      type: 'number',
      default: '20',
      required: false,
      description: 'Initial blur amount in pixels'
    },
    {
      name: 'duration',
      type: 'number',
      default: '1.5',
      required: false,
      description: 'Animation duration in seconds'
    },
    {
      name: 'delay',
      type: 'number',
      default: '0',
      required: false,
      description: 'Animation delay in seconds'
    },
    {
      name: 'easing',
      type: 'string',
      default: '"easeOut"',
      required: false,
      description: 'Animation easing function'
    },
    {
      name: 'className',
      type: 'string',
      default: '""',
      required: false,
      description: 'Additional CSS classes'
    }
  ],
  
  usage: `import BlurText from "./BlurText";

<BlurText
  text="Unveiling Clarity"
  blurAmount={20}
  duration={1.5}
  delay={0.5}
  easing="easeOut"
  className="text-4xl font-bold"
/>`,
  
  typescript: `// TypeScript implementation for BlurText`,
  javascript: `// JavaScript implementation for BlurText`,
  tailwind: `// Tailwind implementation for BlurText`,
  
  examples: [
    {
      id: 'basic-blur',
      title: 'Basic Blur',
      description: 'Simple blur reveal animation',
      code: `<BlurText
  text="Hello World"
  blurAmount={30}
  duration={2}
  className="text-3xl font-bold"
/>`
    }
  ]
};

// All components array
export const allComponents: ComponentItem[] = [
  splitTextComponent,
  blurTextComponent,
  // Add more components here...
];

// Helper functions
export const getComponentById = (id: string): ComponentItem | undefined => {
  return allComponents.find(comp => comp.id === id);
};

export const getComponentsByCategory = (category: string): ComponentItem[] => {
  return allComponents.filter(comp => comp.category === category);
};

export const getAllCategories = (): string[] => {
  return Array.from(new Set(allComponents.map(comp => comp.category)));
};