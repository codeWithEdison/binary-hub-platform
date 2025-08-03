import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top when pathname changes
        const scrollToTop = () => {
            // Use requestAnimationFrame for better performance
            requestAnimationFrame(() => {
                // Check if we're at the top already to avoid unnecessary scrolling
                if (window.scrollY > 0) {
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                }
            });
        };

        // Small delay to ensure the new page has rendered
        const timeoutId = setTimeout(scrollToTop, 100);

        return () => clearTimeout(timeoutId);
    }, [pathname]);
}; 