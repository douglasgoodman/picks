const mainTitle = 'Show me your Picks';

export const useTitle = (title = '') =>
    (document.title = `${title}${title ? ' - ' : ''}${mainTitle}`);
