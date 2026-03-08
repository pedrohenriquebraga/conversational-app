import { TextH1 } from '@/components/AgentComponents/TextH1';
import { TextList } from '@/components/AgentComponents/TextList';
import { TextParagraph } from '@/components/AgentComponents/TextParagraph';
import { AIComponent, AvailableAIComponents } from '@/types/chat';
import React from 'react';
import { TextStyle } from 'react-native';

const componentMap: Record<AvailableAIComponents, any> = {
  TextH1,
  TextParagraph,
  TextList,
};

export const renderAIComponent = (
  component: AIComponent,
  index: number
): React.ReactNode => {
  const { type, props, id } = component;

  if (!componentMap[type]) {
    console.warn(`Unknown component type: ${type}`);
    return null;
  }

  const sanitizedProps = sanitizeComponentProps(props);

  const Component = componentMap[type];
  return React.createElement(Component, {
    key: `${id}-${index}`,
    ...sanitizedProps,
  });
};

const sanitizeComponentProps = (props: any) => {
  const sanitized = { ...props };

  if (sanitized.items && Array.isArray(sanitized.items)) {
    sanitized.items = sanitized.items.map((item: any) => ({
      ...item,
      style: sanitizeStyle(item.style),
    }));
  }

  if (sanitized.style) {
    sanitized.style = sanitizeStyle(sanitized.style);
  }

  return sanitized;
};

const sanitizeStyle = (style: any): TextStyle | undefined => {
  if (!style || typeof style !== 'object') return undefined;

  const sanitized: TextStyle = {};

  const validProps = [
    'color',
    'fontSize',
    'fontWeight',
    'fontStyle',
    'fontFamily',
    'lineHeight',
    'marginBottom',
    'marginTop',
    'marginLeft',
    'marginRight',
    'paddingBottom',
    'paddingTop',
    'paddingLeft',
    'paddingRight',
    'textAlign',
    'textDecorationLine',
    'textDecorationColor',
    'textDecorationStyle',
    'opacity',
  ];

  Object.keys(style).forEach((key) => {
    if (validProps.includes(key)) {
      (sanitized as any)[key] = style[key];
    }
  });

  return Object.keys(sanitized).length > 0 ? sanitized : undefined;
};

export const renderAIComponents = (
  components: AIComponent[]
): React.ReactNode[] => {
  return components
    .map((component, index) => renderAIComponent(component, index))
    .filter(Boolean);
};
