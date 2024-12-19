export const initGA = () => {
    if (window.gtag) {
        window.gtag('config', 'G-CERGHJ3S9L', {
            page_path: window.location.pathname,
        });
    }
};

export const logPageView = (path) => {
    if (window.gtag) {
        window.gtag('event', 'page_view', {
            page_path: path,
        });
    }
};
