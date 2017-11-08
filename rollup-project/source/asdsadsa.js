// let module1 = require('./module1.js');
import examples from './module-examples.js';
import {
    version as v
} from '../package.json';

const main = () => {
    return {
        examples,
        v
    };
}

export default main;