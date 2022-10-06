import { useEffect, useRef } from 'react';
import { ITableConfigValue } from '../../../utils/interfaces';
import { useIsVisible } from '../../../utils/utils';

import styles from './styles.module.scss';

interface TableProps<T extends { id: string }> {
  entities: T[];
  tableConfig: Record<keyof Omit<T, 'id'>, ITableConfigValue>;
  fetchNext: () => void;
  onClick: (id: string) => void;
}

function Table<T extends { id: string }>({
  entities,
  tableConfig,
  fetchNext,
  onClick,
}: TableProps<T>) {
  const keys = Object.keys(tableConfig);
  type KeysWithoutId = keyof Omit<T, 'id'>;

  const endListRef = useRef(null);

  const isEntitiesEnded = useIsVisible(endListRef);

  useEffect(() => {
    isEntitiesEnded && fetchNext();
  }, [isEntitiesEnded]);

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.table__header}>
          <th>
            <input type='checkbox' />
          </th>
          {keys.map((key) => (
            <th key={key} style={tableConfig[key as KeysWithoutId].styles}>
              {tableConfig[key as KeysWithoutId].fieldName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {entities.map((entity) => (
          <tr key={entity.id}>
            <td>
              <input type='checkbox' />
            </td>
            {keys.map((key) => (
              <td key={key} style={tableConfig[key as KeysWithoutId].styles}>
                {entity[key as keyof T] as string}
              </td>
            ))}
          </tr>
        ))}
        <tr ref={endListRef}></tr>
      </tbody>
    </table>
  );
}

export { Table };
