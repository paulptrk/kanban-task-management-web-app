import SidebarRow from './SidebarRow';
import HideSidebarIcon from '../../assets/icon-hide-sidebar.svg?react';

export default function HideSidebarButton() {
  return (
    <SidebarRow
      icon={<HideSidebarIcon className="size-4" />}
      label={'Hide Sidebar'}
      className="text-medium-grey hover:text-main-purple mb-8 hover:bg-white"
    />
  );
}
