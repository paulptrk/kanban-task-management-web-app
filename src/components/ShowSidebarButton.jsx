import ShowSidebarIcon from '../../assets/icon-show-sidebar.svg?react';

export default function ShowSidebarButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Show Sidebar"
      className="bg-main-purple hover:bg-main-purple-hover fixed bottom-8 left-0 flex h-12 w-14 cursor-pointer items-center justify-center rounded-tr-full rounded-br-full"
    >
      <ShowSidebarIcon className="h-[11px] w-4" />
    </button>
  );
}
