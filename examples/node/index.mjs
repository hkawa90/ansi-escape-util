// Open your terminal.
// $ cd project_root
// $ node examples/node/index.mjs

import {ansi_escape, ansi_escape_remover} from '../../dist/ansi-escape-util.es.js'

const ansi_encode = 'FORE_COLOR(BLUE);STR(javascript);FORE_RGB_COLOR(120,0,0);STR(node);UNDERLINE;STR(typescript);RESET;'

ansi_escape(ansi_encode)
// expected colored strings