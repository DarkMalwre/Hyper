#!/usr/bin/env node --inspect

import {service} from '../build/js/esm.mjs';

process.env.DEBUG = true;
service();
