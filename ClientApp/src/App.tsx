import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home'
import Sudoku from './components/Sudoku';
import FlipCards from './components/FlipCards';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/sudoku/:sudokulevel?' component={Sudoku} />
        <Route path='/flipcards' component={FlipCards} />
    </Layout>
);
