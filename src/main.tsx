import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import './index.css';
import { theme } from './theme';

import Game from './components/Game.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider theme={theme}>
            <Game></Game>
        </MantineProvider>
    </React.StrictMode>,
);
