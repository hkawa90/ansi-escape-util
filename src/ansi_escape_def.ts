/*! ansi-escape-util | MIT | https://opensource.org/licenses/MIT */
/* Copyright © 2023 hkawa90 All Rights Reserved. */

/** Escape code */
const ESC = "\u001B";
const BEL = "\u0007";
// const ST  = "\u009c";

export interface escape_code {
  /** Command name */
  cmd: string;
  /** Escape sequence code */
  fmt: string;
  /** Pattern for parse */
  reg: RegExp;
}

/** Encode command string to ANSI Escape sequence. */
export const sequence_def: escape_code[] = [
  // 8-16 Colors for foreground color
  {
    cmd: "FORE_COLOR",
    fmt: ESC + "[30m",
    reg: /^FORE_COLOR\(\s*BLACK\s*\)$/i,
  },
  { cmd: "FORE_COLOR", fmt: ESC + "[31m", reg: /^FORE_COLOR\(\s*RED\s*\)$/i },
  {
    cmd: "FORE_COLOR",
    fmt: ESC + "[32m",
    reg: /^FORE_COLOR\(\s*GREEN\s*\)$/i,
  },
  {
    cmd: "FORE_COLOR",
    fmt: ESC + "[33m",
    reg: /^FORE_COLOR\(\s*YELLOW\s*\)$/i,
  },
  { cmd: "FORE_COLOR", fmt: ESC + "[34m", reg: /^FORE_COLOR\(\s*BLUE\s*\)$/i },
  {
    cmd: "FORE_COLOR",
    fmt: ESC + "[35m",
    reg: /^FORE_COLOR\(\s*MAGENTA\s*\)$/i,
  },
  { cmd: "FORE_COLOR", fmt: ESC + "[36m", reg: /^FORE_COLOR\(\s*CYAN\s*\)$/i },
  {
    cmd: "FORE_COLOR",
    fmt: ESC + "[37m",
    reg: /^FORE_COLOR\(\s*WHITE\s*\)$/i,
  },
  {
    cmd: "FORE_COLOR",
    fmt: ESC + "[39m",
    reg: /^FORE_COLOR\(\s*DEFAULT\s*\)$/i,
  },
  // Bright Colors(aixterm specification) for foreground color
  {
    cmd: "FORE_COLOR",
    fmt: ESC + "[90m",
    reg: /^FORE_COLOR\(\s*BBLACK\s*\)$/i,
  },
  { cmd: "FORE_COLOR", fmt: ESC + "[91m", reg: /^FORE_COLOR\(\s*BRED\s*\)$/i },
  {
    cmd: "FORE_COLOR",
    fmt: ESC + "[92m",
    reg: /^FORE_COLOR\(\s*BGREEN\s*\)$/i,
  },
  {
    cmd: "FORE_COLOR",
    fmt: ESC + "[93m",
    reg: /^FORE_COLOR\(\s*BYELLOW\s*\)$/i,
  },
  {
    cmd: "FORE_COLOR",
    fmt: ESC + "[94m",
    reg: /^FORE_COLOR\(\s*BBLUE\s*\)$/i,
  },
  {
    cmd: "FORE_COLOR",
    fmt: ESC + "[95m",
    reg: /^FORE_COLOR\(\s*BMAGENTA\s*\)$/i,
  },
  {
    cmd: "FORE_COLOR",
    fmt: ESC + "[96m",
    reg: /^FORE_COLOR\(\s*BCYAN\s*\)$/i,
  },
  {
    cmd: "FORE_COLOR",
    fmt: ESC + "[97m",
    reg: /^FORE_COLOR\(\s*BWHITE\s*\)$/i,
  },
  // 8-16 Colors for background color
  {
    cmd: "BACK_COLOR",
    fmt: ESC + "[40m",
    reg: /^BACK_COLOR\(\s*BLACK\s*\)$/i,
  },
  { cmd: "BACK_COLOR", fmt: ESC + "[41m", reg: /^BACK_COLOR\(\s*RED\s*\)$/i },
  {
    cmd: "BACK_COLOR",
    fmt: ESC + "[42m",
    reg: /^BACK_COLOR\(\s*GREEN\s*\)$/i,
  },
  {
    cmd: "BACK_COLOR",
    fmt: ESC + "[43m",
    reg: /^BACK_COLOR\(\s*YELLOW\s*\)$/i,
  },
  { cmd: "BACK_COLOR", fmt: ESC + "[44m", reg: /^BACK_COLOR\(\s*BLUE\s*\)$/i },
  {
    cmd: "BACK_COLOR",
    fmt: ESC + "[45m",
    reg: /^BACK_COLOR\(\s*MAGENTA\s*\)$/i,
  },
  { cmd: "BACK_COLOR", fmt: ESC + "[46m", reg: /^BACK_COLOR\(\s*CYAN\s*\)$/i },
  {
    cmd: "BACK_COLOR",
    fmt: ESC + "[47m",
    reg: /^BACK_COLOR\(\s*WHITE\s*\)$/i,
  },
  {
    cmd: "BACK_COLOR",
    fmt: ESC + "[49m",
    reg: /^BACK_COLOR\(\s*DEFAULT\s*\)$/i,
  },
  // Bright Colors(aixterm specification) for background color
  {
    cmd: "BACK_COLOR",
    fmt: ESC + "[100m",
    reg: /^BACK_COLOR\(\s*BBLACK\s*\)$/i,
  },
  {
    cmd: "BACK_COLOR",
    fmt: ESC + "[101m",
    reg: /^BACK_COLOR\(\s*BRED\s*\)$/i,
  },
  {
    cmd: "BACK_COLOR",
    fmt: ESC + "[102m",
    reg: /^BACK_COLOR\(\s*BGREEN\s*\)$/i,
  },
  {
    cmd: "BACK_COLOR",
    fmt: ESC + "[103m",
    reg: /^BACK_COLOR\(\s*BYELLOW\s*\)$/i,
  },
  {
    cmd: "BACK_COLOR",
    fmt: ESC + "[104m",
    reg: /^BACK_COLOR\(\s*BBLUE\s*\)$/i,
  },
  {
    cmd: "BACK_COLOR",
    fmt: ESC + "[105m",
    reg: /^BACK_COLOR\(\s*BMAGENTA\s*\)$/i,
  },
  {
    cmd: "BACK_COLOR",
    fmt: ESC + "[106m",
    reg: /^BACK_COLOR\(\s*BCYAN\s*\)$/i,
  },
  {
    cmd: "BACK_COLOR",
    fmt: ESC + "[107m",
    reg: /^BACK_COLOR\(\s*BWHITE\s*\)$/i,
  },
  // 256 Colors foreground
  {
    cmd: "FORE_INDEXED_COLOR",
    fmt: ESC + "[38;5;%1%m",
    reg: /^FORE_INDEXED_COLOR\(\s*(\d+)\s*\)$/i,
  },
  // 256 Colors background
  {
    cmd: "BACK_INDEXED_COLOR",
    fmt: ESC + "[48;5;%1%m",
    reg: /^BACK_INDEXED_COLOR\(\s*(\d+)\s*\)$/i,
  },
  // RGB Colors foreground
  {
    cmd: "FORE_RGB_COLOR",
    fmt: ESC + "[38;2;%1%;%2%;%3%m",
    reg: /^FORE_RGB_COLOR\(\s*(\d+)\s*\,\s*(\d+)\s*\,\s*(\d+)\s*\)$/i,
  },
  // RGB Colors background
  {
    cmd: "BACK_RGB_COLOR",
    fmt: ESC + "[48;2;%1%;%2%;%3%m",
    reg: /^BACK_RGB_COLOR\(\s*(\d+)\s*\,\s*(\d+)\s*\,\s*(\d+)\s*\)$/i,
  },
  // Character Decorations
  { cmd: "RESET", fmt: ESC + "[0m", reg: /^RESET$/i },
  { cmd: "BOLD", fmt: ESC + "[1m", reg: /^BOLD$/i },
  { cmd: "DIM", fmt: ESC + "[2m", reg: /^DIM$/i },
  { cmd: "ITALIC", fmt: ESC + "[3m", reg: /^ITALIC$/i },
  { cmd: "UNDERLINE", fmt: ESC + "[4m", reg: /^UNDERLINE$/i },
  { cmd: "BLINKING", fmt: ESC + "[5m", reg: /^BLINKING$/i },
  { cmd: "HIBLINKING", fmt: ESC + "[6m", reg: /^HIBLINKING$/i },
  { cmd: "REVERSE", fmt: ESC + "[7m", reg: /^REVERSE$/i },
  { cmd: "HIDDEN", fmt: ESC + "[8m", reg: /^HIDDEN$/i },
  { cmd: "STRIKETHROUGH", fmt: ESC + "[9m", reg: /^STRIKETHROUGH$/i },
  // Cursor Controls
  { cmd: "CUR_HOME", fmt: ESC + "[H", reg: /^CUR_HOME$/i }, // moves cursor to home position (0, 0)
  {
    cmd: "CUR_MOVE",
    fmt: ESC + "[%2%;%1%H",
    reg: /^CUR_MOVE\((\d+)\,(\d+)\)$/i,
  }, // moves cursor to home position (x, y)
  { cmd: "CUR_UP", fmt: ESC + "[%1%A", reg: /^CUR_UP\(\s*(\d+)\s*\)$/i }, // moves cursor up # lines
  { cmd: "CUR_DOWN", fmt: ESC + "[%1%B", reg: /^CUR_DOWN\(\s*(\d+)\s*\)$/i }, // moves cursor down # lines
  { cmd: "CUR_RIGHT", fmt: ESC + "[%1%C", reg: /^CUR_RIGHT\(\s*(\d+)\s*\)$/i }, // moves cursor right # columns
  { cmd: "CUR_LEFT", fmt: ESC + "[%1%D", reg: /^CUR_LEFT\(\s*(\d+)\s*\)$/i }, // moves cursor left # columns
  {
    cmd: "CUR_LINE_DOWN",
    fmt: ESC + "[%1%E",
    reg: /^CUR_LINE_DOWN\(\s*(\d+)\s*\)$/i,
  }, // moves cursor to beginning of next line, # lines down
  {
    cmd: "CUR_LINE_UP",
    fmt: ESC + "[%1%F",
    reg: /^CUR_LINE_UP\(\s*(\d+)\s*\)$/i,
  }, // moves cursor to beginning of previous line, # lines up
  {
    cmd: "CUR_MOVE_X",
    fmt: ESC + "[%1%G",
    reg: /^CUR_MOVE_X\(\s*(\d+)\s*\)$/i,
  }, //  	moves cursor to column #
  { cmd: "CUR_POS_GET", fmt: ESC + "[6n", reg: /^CUR_POS_GET$/i }, // request cursor position (reports as ESC[#;#R)
  { cmd: "CUR_POS_SAVE", fmt: ESC + "7", reg: /^CUR_POS_SAVE$/i }, // save cursor position (DEC) ★
  { cmd: "CUR_POS_REST", fmt: ESC + "8", reg: /^CUR_POS_REST$/i }, // restores the cursor to the last saved position (DEC)
  { cmd: "CUR_POS_SAVE_SCO", fmt: ESC + "[s", reg: /^CUR_POS_SAVE_SCO$/i }, // save cursor position (SCO)
  { cmd: "CUR_POS_REST_SCO", fmt: ESC + "[u", reg: /^CUR_POS_REST_SCO$/i }, // restores the cursor to the last saved position (SCO)
  // Erase Functions
  { cmd: "CLR_SCREEN", fmt: ESC + "[2J", reg: /^CLR_SCREEN$/i }, // erase entire screen
  { cmd: "CLR_RIGHT", fmt: ESC + "[0K", reg: /^CLR_RIGHT$/i }, // erase from cursor to end of line
  { cmd: "CLR_LEFT", fmt: ESC + "[1K", reg: /^CLR_LEFT$/i }, // erase start of line to the cursor
  { cmd: "CLR_LINE", fmt: ESC + "[2K", reg: /^CLR_LINE$/i }, // erase the entire line
  { cmd: "CLR_DOWN", fmt: ESC + "[0J", reg: /^CLR_DOWN$/i }, // erase from cursor until end of screen
  { cmd: "CLR_UP", fmt: ESC + "[1J", reg: /^CLR_UP$/i }, // erase from cursor to beginning of screen
  { cmd: "CLR_SAVED_LINE", fmt: ESC + "[3J", reg: /^CLR_SAVED_LINE$/i }, // erase saved lines
  // Set mode
  { cmd: "SETMODE", fmt: ESC + "[=%1%h", reg: /^SETMODE\(\s*(\d+)\s*\)$/i }, // Changes the screen width or type to the mode specified by value.
  // Common Private Modes
  { cmd: "CUR_HIDE", fmt: ESC + "[?25l", reg: /^CUR_HIDE$/i }, // make cursor invisible
  { cmd: "CUR_SHOW", fmt: ESC + "[?25h", reg: /^CUR_SHOW$/i }, // make cursor visible
  { cmd: "RES_SCRN", fmt: ESC + "[?47l", reg: /^RES_SCRN$/i }, // restore screen
  { cmd: "SAV_SCRN", fmt: ESC + "[?47h", reg: /^SAV_SCRN$/i }, // save screen
  { cmd: "ENA_ALT_BUF", fmt: ESC + "[?1049h", reg: /^ENA_ALT_BUF$/i }, // enables the alternative buffer
  { cmd: "DIS_ALT_BUF", fmt: ESC + "[?1049l", reg: /^DIS_ALT_BUF$/i }, // disables the alternative buffer
  // Keyboard Strings ???
  {
    cmd: "KEYMAP",
    fmt: ESC + '[[%1%;"%2%"p',
    reg: /^KEYMAP\(\s*\"(.+)\"\s*\,\s*\"(.+)\"\s*\)$/i,
  },
  // Scroll
  { cmd: "SCL_SCR", fmt: ESC + "[r", reg: /^SCL_SCR$/i }, // Enable scrolling for entire display.
  {
    cmd: "SCL",
    fmt: ESC + "[%1%;%2%r",
    reg: /^SCL\(\s*(.+)\s*\,\s*(.+)\s*\)$/i,
  }, // Enable scrolling from row {start} to row {end}.
  { cmd: "SCL_DOWN", fmt: ESC + "D", reg: /^SCL_DOWN$/i }, // Scroll display down one line.
  { cmd: "SCL_UP", fmt: ESC + "M", reg: /^SCL_UP$/i }, // Scroll display up one line.

  { cmd: "STR", fmt: "%1%", reg: /^STR\((.+)\)$/i },
  // Misc
  /** Set window title */
  { cmd: "SETWTL", fmt: ESC + "]0;%1%" + BEL, reg: /^SETWTL\(\s*(.+)\s*\)$/i },
  /** Print hyper link eg. HL(http://example.com) ref: https://gist.github.com/egmontkob/eb114294efbcd5adb1944c9f3cb5feda */
  { cmd: "HL", fmt: ESC + "]8;;" + ESC + "\\%1%" + ESC + "]8;;" + ESC + "\\\n", reg: /^HL\(\s*(.+)\s*\)$/i },
];
