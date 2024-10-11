import { useEffect, useState } from 'react';

const ThemeEnum = {
  LIGHT: 'light',
  DARK: 'dark',
};

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = document.cookie
      .split('; ')
      .find((row) => row.startsWith('theme='))
      ?.split('=')[1];

    if (savedTheme) {
      return savedTheme === ThemeEnum.DARK ? ThemeEnum.DARK : ThemeEnum.LIGHT;
    }

    if (typeof window === 'undefined') return ThemeEnum.LIGHT;

    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return ThemeEnum.DARK;
    }

    return ThemeEnum.LIGHT;
  });

  useEffect(() => {
    document.cookie = `theme=${theme}; path=/`;
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.remove(ThemeEnum.LIGHT, ThemeEnum.DARK);
    document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setTheme(e.matches ? ThemeEnum.DARK : ThemeEnum.LIGHT);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT
    );
  };

  return { theme, toggleTheme };
};

export default useTheme;
