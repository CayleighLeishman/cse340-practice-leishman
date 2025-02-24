import { getNav } from '../utils/index.js';

const port = process.env.PORT || 3000;
const mode = process.env.MODE || 'production';

const configureNodeEnvironment = async (req, res, next) => {
    res.locals.devModeWarning = '';
    res.locals.isDevMode = mode.includes('dev');
    res.locals.navHTML = await getNav();
    res.locals.port = port;
    res.locals.scripts = [];
    res.locals.styles = [];

    if (res.locals.isDevMode) {
        // Add development mode warning
        res.locals.devModeWarning = '<p class="dev-mode-msg">Site is in development mode<p>';

        // Add a stylesheet that loads only in development mode
        res.locals.styles.push('<link rel="stylesheet" href="/css/dev-mode.css">');

        // Add livereload script
        res.locals.scripts.push(`
            <script>
                const ws = new WebSocket('ws://127.0.0.1:${parseInt(port) + 1}');
                ws.onclose = () => {
                    setTimeout(() => location.reload(), 2000);
                };
            </script>    
        `);

        // Add a script that loads only in development mode
        res.locals.scripts.push('<script src="/js/dev-mode.js"></script');
    }

    next();
};

export default configureNodeEnvironment;