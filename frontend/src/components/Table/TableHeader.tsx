import { memo } from 'react';
import {
  KeysWithoutId,
  TableCheckboxClick,
  TableConfig,
} from '../../utils/interfaces';

import styles from './styles.module.scss';

interface TableHeaderProps<T extends { id: string }> {
  onClick: TableCheckboxClick;
  keys: string[];
  tableConfig: TableConfig<T>;
  haveActions: boolean;
}

const TableHeader = memo(function <T extends { id: string }>({
  onClick,
  keys,
  tableConfig,
  haveActions,
}: TableHeaderProps<T>) {
  return (
    <thead className={styles.table__header}>
      <tr className={styles.table__tr}>
        <th className={`${styles.checkbox} ${styles.table__th}`}>
          <input
            type='checkbox'
            onChange={({ target: { checked } }) => onClick('', checked)}
          />
        </th>
        {keys.map((key) => (
          <th
            key={key}
            className={styles.table__th}
            style={tableConfig[key as KeysWithoutId<T>].styles}
          >
            {tableConfig[key as KeysWithoutId<T>].fieldName}
          </th>
        ))}
        {haveActions && (
          <th className={`${styles.table__th} ${styles.table__actions}`}>
            Действия
          </th>
        )}
      </tr>
    </thead>
  );
});

export { TableHeader };
