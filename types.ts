import React from 'react';

export interface AgentProfile {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  description: string;
  defaultPrompt?: string;
  type: 'guide' | 'culture' | 'planning' | 'local';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface QuickAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface HeroCardAction {
  label: string;
  prompt: string;
}

export interface UsefulInfo {
  type: 'comfort' | 'event' | 'recommendation' | 'tip';
  color: 'green' | 'yellow' | 'red' | 'purple' | 'blue';
  title: string;
  subtitle: string;
  emoji?: string; // Optional emoji for the icon slot
}

export interface HeroCardData {
  id: string;
  name: string;
  tagline: string;
  avatarUrl: string;
  cardImageUrl: string;
  actions: HeroCardAction[];
  tags: { label: string; score: number }[]; // score 0-100
  description: string;
  usefulInfo: UsefulInfo;
  style: 'efficient' | 'friendly' | 'enthusiastic';
}

export interface ServiceItem {
  name: string;
  icon: string;
}

export interface ServiceCategory {
  title: string;
  items: ServiceItem[];
}