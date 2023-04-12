import { createRoot } from 'react-dom/client';
const SearchButton = () => {
  return <button>하이</button>;
};

const domNode = document.getElementById('search-button');
const root = createRoot(domNode!);
root.render(<SearchButton />);
