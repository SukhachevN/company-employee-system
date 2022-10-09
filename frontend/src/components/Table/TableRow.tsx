import { memo } from 'react';
import {
  ButtonHandlers,
  KeysWithoutId,
  TableCheckboxClick,
  TableConfig,
} from '../../utils/interfaces';
import { cn } from '../../utils/utils';
import { ActionButtons } from '../ActionButtons';

import styles from './styles.module.scss';

interface TableRowProps<T extends { id: string }> {
  entity: T;
  isSelected: boolean;
  onClick: TableCheckboxClick;
  keys: string[];
  tableConfig: TableConfig<T>;
  buttonHandlers?: ButtonHandlers;
}

const TableRow = memo(function <T extends { id: string }>({
  entity,
  isSelected,
  onClick,
  keys,
  tableConfig,
  buttonHandlers,
}: TableRowProps<T>) {
  return (
    <tr
      key={entity.id}
      className={cn(styles.table__tr, {
        [styles.table__tr_selected]: isSelected,
      })}
    >
      <td className={`${styles.checkbox} ${styles.table__td}`}>
        <input
          checked={isSelected}
          type='checkbox'
          onChange={() => onClick(entity.id)}
        />
      </td>
      {keys.map((key) => (
        <td
          key={key}
          className={styles.table__td}
          style={tableConfig[key as KeysWithoutId<T>].styles}
        >
          {entity[key as keyof T] as string}
        </td>
      ))}
      {buttonHandlers && (
        <td className={`${styles.table__td} ${styles.table__actions}`}>
          <ActionButtons id={entity.id} buttonsHandlers={buttonHandlers} />
        </td>
      )}
    </tr>
  );
});

export { TableRow };
