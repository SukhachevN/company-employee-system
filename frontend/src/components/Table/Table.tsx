import { useEffect, useRef } from 'react';
import { ButtonHandlers, ITableConfigValue } from '../../utils/interfaces';
import { cn, useIsVisible } from '../../utils/utils';
import { ActionButtons } from '../ActionButtons';
import { Spinner } from '../Spinner';

import styles from './styles.module.scss';

interface TableProps<T extends { id: string }> {
  entities: T[];
  tableConfig: Record<keyof Omit<T, 'id'>, ITableConfigValue>;
  fetchNext: () => void;
  onClick: (id: string, setAllTo?: boolean) => void;
  selected: Record<string, boolean>;
  isLoading: boolean;
  emptyText?: string;
  buttonHandlers?: ButtonHandlers;
  error: string | null;
}

function Table<T extends { id: string }>({
  entities,
  tableConfig,
  fetchNext,
  onClick,
  selected,
  isLoading,
  emptyText = 'Нет данных',
  buttonHandlers,
  error,
}: TableProps<T>) {
  const keys = Object.keys(tableConfig);
  type KeysWithoutId = keyof Omit<T, 'id'>;

  const endListRef = useRef(null);

  const isEntitiesEnded = useIsVisible(endListRef);

  const isLoadingMore = entities.length && isLoading;

  const isEmpty = !entities.length && !isLoading;

  useEffect(() => {
    isEntitiesEnded && fetchNext();
  }, [isEntitiesEnded]);

  return (
    <table className={styles.table}>
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
              style={tableConfig[key as KeysWithoutId].styles}
            >
              {tableConfig[key as KeysWithoutId].fieldName}
            </th>
          ))}
          {buttonHandlers && <th className={styles.table__th}>Действия</th>}
        </tr>
      </thead>
      <tbody className={styles.table__body}>
        <tr className={`${styles.table__error} error`}>
          <td>{error}</td>
        </tr>
        {entities.map((entity) => (
          <tr
            key={entity.id}
            className={cn(styles.table__tr, {
              [styles.table__tr_selected]: selected[entity.id],
            })}
          >
            <td className={`${styles.checkbox} ${styles.table__td}`}>
              <input
                checked={selected[entity.id] || false}
                type='checkbox'
                onChange={() => onClick(entity.id)}
              />
            </td>
            {keys.map((key) => (
              <td
                key={key}
                className={styles.table__td}
                style={tableConfig[key as KeysWithoutId].styles}
              >
                {entity[key as keyof T] as string}
              </td>
            ))}
            {buttonHandlers && (
              <td className={styles.table__td}>
                <ActionButtons
                  id={entity.id}
                  buttonsHandlers={buttonHandlers}
                />
              </td>
            )}
          </tr>
        ))}
      </tbody>
      <tfoot
        className={cn(styles.table__footer, {
          [styles.table__footer_hidden]: isLoading || !isEmpty,
        })}
      >
        <tr className={`${styles.table__tr} ${styles.table__tr_forSpinner}`}>
          <td>{(isLoadingMore && <Spinner />) || (isEmpty && emptyText)}</td>
        </tr>
        <tr ref={endListRef} className={styles.table__last} />
      </tfoot>
    </table>
  );
}

export { Table };
