const VARIANT_STYLES = {
  primary: 'bg-main-purple text-white hover:bg-main-purple-hover',
  secondary: 'bg-white text-main-purple',
};

const SIZE_STYLES = {
  large: 'h-12 px-6 text-[15px]',
  small: 'h-10 px-4 text-[13px] leading-[23px]',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'large',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full font-bold disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-main-purple ${disabled ? '' : 'cursor-pointer'} ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`}
    >
      {children}
    </button>
  );
}
