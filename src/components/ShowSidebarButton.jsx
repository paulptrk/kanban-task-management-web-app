import ShowSidebarIcon from '../../assets/icon-show-sidebar.svg?react';

export default function ShowSidebarButton({ visible, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Show Sidebar"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`bg-main-purple hover:bg-main-purple-hover fixed bottom-8 left-0 hidden h-12 w-14 cursor-pointer items-center justify-center rounded-tr-full rounded-br-full transition-[transform,opacity] duration-300 ease-in-out tablet:flex ${
        visible
          ? 'translate-x-0 opacity-100'
          : 'pointer-events-none -translate-x-full opacity-0'
      }`}
    >
      <ShowSidebarIcon className="h-[11px] w-4" />
    </button>
  );
}
