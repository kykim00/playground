const ColorModeToggleButton = () => {
  const handleToggleColorMode = () => {
    let currentTheme = document.documentElement.getAttribute('color-theme');
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('color-theme', nextTheme);
  };

  return <button onClick={handleToggleColorMode}> 버튼</button>;
};

export default ColorModeToggleButton;
