import React from 'react';
import { render, screen } from '@testing-library/react';
import { ApiProvider, ApiContext } from './index';
import '@testing-library/jest-dom';
import { ApiConfig } from '../utils';


const MockChildComponent: React.FC = () => {
    return (
        <ApiContext.Consumer>
            {({ configFactory }) => (
                <div>
                    if (configFactory()) {
                        'Try to fetch config: Available'
                    }else{
                        'Not Available'
                    }
                </div>
            )}
        </ApiContext.Consumer>
    );
};

describe('ApiProvider', () => {
    it('provides the configFactory function to context consumers', () => {
        const apiConfig: ApiConfig[] = [{ name: 'testConfig', method: "GET" }];
        const axiosInstance = {};

        render(
            <ApiProvider apiConfig={apiConfig as any} axiosInstance={axiosInstance as any}>
                <MockChildComponent />
            </ApiProvider>
        );

        expect(screen.getByText(/Try to fetch config: Available/)).toBeInTheDocument();
    });

    it('configFactory function throws an error if config name is not found', () => {
        const apiConfig = [{ name: 'testConfig', method: "GET" }];
        const axiosInstance = {};


        const { container } = render(
            <ApiProvider apiConfig={apiConfig as any} axiosInstance={axiosInstance as any}>
                <ApiContext.Consumer>
                    {({ configFactory }) => {
                        try {
                            configFactory('nonExistentConfig');
                            return <div>No error thrown for non-existent config</div>;
                        } catch (e) {
                            return <div>Error thrown for non-existent config</div>;
                        }
                    }}
                </ApiContext.Consumer>
            </ApiProvider>
        );

        expect(container).toHaveTextContent('Error thrown for non-existent config');
    });
});
