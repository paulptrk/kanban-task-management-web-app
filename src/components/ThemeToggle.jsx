import { useState } from 'react';
import LightThemeIcon from '../../assets/icon-light-theme.svg?react';
import DarkThemeIcon from '../../assets/icon-dark-theme.svg?react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className="bg-very-dark-grey mx-6 mb-2 flex h-12 items-center justify-center gap-6 rounded-[6px]">
      <LightThemeIcon className="size-[19px]" />
      <button
        onClick={() => setIsDark((prev) => !prev)}
        aria-label="Toggle theme"
        aria-pressed={isDark}
        className="bg-main-purple hover:bg-main-purple-hover flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full p-[3px]"
      >
        <span
          className={`size-3.5 rounded-full bg-white transition-transform duration-200 ${
            isDark ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      <DarkThemeIcon className="size-4" />
    </div>
  );
}
