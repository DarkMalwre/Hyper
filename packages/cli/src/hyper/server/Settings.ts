import {HyperPlugin} from '../..';

/**
 * Settings for the HyperJS server.
 */
export default interface Settings {
    /**
     * Plugins to load.
     */
    plugins: HyperPlugin[];

    /**
     * The server execution type.
     */
    type: 'dev' | 'build' | 'test';
}
