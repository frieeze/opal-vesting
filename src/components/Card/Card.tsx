import './card.scss';
import React from 'react';
import { useAtomValue } from 'jotai';

import { cardStateAtom } from '@/atoms/atoms';

type CardProps = {
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ children }) => {
  const state = useAtomValue(cardStateAtom);

  return <div className={`card ${state}`}>{children}</div>;
};

export default Card;
