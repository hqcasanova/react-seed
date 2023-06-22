import { ReactNode } from 'react';

import classes from './List.module.scss';

type Props<ItemType> = {
  className?: string,
  items: ItemType[],
  emptyItem: ReactNode,
  children: (item: ItemType, tagName: string) => ReactNode,
};

function List({
  className = '',
  items,
  emptyItem,
  children,
}: Props<any>) {
  const rootClasses = [
    'list',
    items.length ? '' : 'list--empty',
    ...className.split(' '),
  ];
  const rootClassName = rootClasses
    .map((cName) => classes[cName] || cName)
    .filter(Boolean)
    .join(' ');

  return (
    <ul className={rootClassName}>
      {
        items.length > 0
          ? items.map((item) => children(item, 'li'))
          : <li>{ emptyItem }</li>
      }
    </ul>
  );
}

export default List;
