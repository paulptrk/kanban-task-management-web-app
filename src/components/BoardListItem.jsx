import SidebarRow from './SidebarRow';
import BoardIcon from '../../assets/icon-board.svg?react';

const VARIANT_STYLES = {
  active: 'bg-main-purple text-white',
  inactive: 'text-medium-grey hover:bg-row-hover hover:text-main-purple',
  create: 'text-main-purple',
};

export default function BoardListItem({
  title,
  variant = 'inactive',
  onBoardClick,
}) {
  return (
    <SidebarRow
      icon={<BoardIcon className="size-4" />}
      label={title}
      className={`${VARIANT_STYLES[variant]}`}
      onClick={onBoardClick}
    />
  );
}
