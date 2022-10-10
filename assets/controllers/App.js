// ./assets/js/components/Home.js

import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { OrganisationList } from './OrganisationList';

function App() {
    return (
        <div>
            <OrganisationList />
        </div>
    )
}

export default App;
