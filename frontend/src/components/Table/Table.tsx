import { useEffect, useMemo, useRef } from 'react';
import {
  ButtonHandlers,
  TableCheckboxClick,
  TableConfig,
} from '../../utils/interfaces';
import { cn, useIsVisible } from '../../utils/utils';
import { Spinner } from '../Spinner';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

import styles from './styles.module.scss';

export interface TableProps<T extends { id: string }> {
  entities: T[];
  tableConfig: TableConfig<T>;
  fetchNext: () => void;
  onClick: TableCheckboxClick;
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
  const endListRef = useRef(null);

  const isEntitiesEnded = useIsVisible(endListRef);

  const isLoadingMore = entities.length && isLoading;

  const isEmpty = !entities.length && !isLoading;

  const nothingSelected = !Object.keys(selected).length;

  const handleDeleteSelected = () => {
    buttonHandlers?.REMOVE && buttonHandlers?.REMOVE(Object.keys(selected));
  };

  const keys = useMemo(() => Object.keys(tableConfig), [tableConfig]);

  useEffect(() => {
    isEntitiesEnded && fetchNext();
  }, [isEntitiesEnded]);

  return (
    <div className={styles.container}>
      <button
        onClick={handleDeleteSelected}
        disabled={nothingSelected}
        className={cn(styles.deleteButton, {
          [styles.deleteButton_disabled]: nothingSelected,
        })}
      >
        Удалить выделенное
      </button>
      <table className={styles.table}>
        <TableHeader
          onClick={onClick}
          keys={keys}
          tableConfig={tableConfig}
          haveActions={Boolean(buttonHandlers)}
        />
        <tbody className={styles.table__body}>
          <tr className={`${styles.table__error} error`}>
            <td>{error}</td>
          </tr>
          {entities.map((entity) => (
            <TableRow
              key={entity.id}
              entity={entity}
              isSelected={Boolean(selected[entity.id])}
              onClick={onClick}
              keys={keys}
              tableConfig={tableConfig}
              buttonHandlers={buttonHandlers}
            />
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
    </div>
  );
}

export { Table };
