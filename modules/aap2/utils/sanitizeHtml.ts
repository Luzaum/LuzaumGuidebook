import DOMPurify from 'dompurify';

export function sanitizeHtml(input: string): string {
    if (!input || typeof input !== 'string') {
        return '';
    }

    return DOMPurify.sanitize(input, {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'],
        ALLOWED_ATTR: ['class'],
    });
}
