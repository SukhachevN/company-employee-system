import React, { memo } from 'react';
import { ButtonHandlers, ButtonTypes } from '../../../utils/interfaces';
import { iconByKey } from './icons';

import styles from './styles.module.scss';

interface ActionButtonsProps {
  id: string;
  buttonsHandlers: ButtonHandlers;
}

const ActionButtons: React.FC<ActionButtonsProps> = memo(
  ({ id, buttonsHandlers }) => {
    const keys = Object.keys(buttonsHandlers) as ButtonTypes[];

    return (
      <div className={styles.container}>
        {keys.map((key) => (
          <button
            className={styles.container__button}
            key={key}
            onClick={() => buttonsHandlers[key]?.(id)}
          >
            {iconByKey[key]}
          </button>
        ))}
      </div>
    );
  }
);

export { ActionButtons };
