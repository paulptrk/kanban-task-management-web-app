export default function SidebarRow({ icon, label, className = '', onClick }) {
  return (
    <div
      className={`mr-6 flex h-12 cursor-pointer items-center gap-3 rounded-r-full pl-8 ${className}`}
      onClick={onClick}
    >
      {icon}
      <span className="text-[15px] font-bold">{label}</span>
    </div>
  );
}
