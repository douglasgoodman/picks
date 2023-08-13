import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HasChildren } from '../types';
import { Routes } from './Routes';

export const Router: React.FC<HasChildren> = ({ children }) => {
    return (
        <BrowserRouter>
            {children}
            <Routes />
        </BrowserRouter>
    );
};
