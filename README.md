# ANSI Escape Util

This package is a utility library for ANSI Escape.

## Getting Started

1. git clone
1. cd ansi-escape-util
1. pnpm install && pnpm build
1. Import your project
1. Create the command(refer to below command reference.)
1. Call below API function

## API

### ansi_escape

```javascript
async function ansi_escape(command: string, is_build_sequence_only): Uint8Array
  ANSI Escape Encoder

  @param {string} command
      - ANSI Escape command string

  @param {boolean} is_build_sequence_only
      - If this flag is false , it send ANSI Escape to terminal.

  @return {Uint8Array}
      ANSI Escape sequence code

  @throws Invalid command or parameters
```

Example:

```javascript
ansi_escape('BOLD;ITALIC;STR(BOLDITALIC);RESET;')
// expected to `[1m[3mBOLDITALIC[0m`
```

Check out `examples/node/index.mjs`

### ansi2html

```javascript
Converting ANSI Escape to HTML
  @param {string}    input     string containing escape sequences
  @returns {string}            converted string
```

Example:

```javascript
ansi2html(ansi_escape('BOLD;ITALIC;STR(BOLDITALIC);RESET;'))
// expected to `<span style="font-weight: bold;font-style: normal;"></span><span style="font-weight: bold;font-style: normal;font-style: italic;">BOLDITALIC</span><span style=""></span>`
```

Check out `examples/index.html`

### ansi_escape_remover

```javascript
Remove escape sequence from string
  @param {string}       inStr   input string
  @returns {string}             string without escape sequence
```

Example:

```javascript
ansi_escape_remover(ansi_escape('BOLD;ITALIC;STR(BOLDITALIC);RESET;'))
// expected to `BOLDITALIC`
```

Check out `examples/index.html`

## Command Reference for ansi_escape API

### Command Syntax

Syntax is very simple. It consists of a command name, parameters, and a trailing semicolon. 

```
Command_name(parameter1, …);…

or

Command_name;…
```

Example: Foreground color is red.
`FORE_COLOR(RED);STR(JAVASCRIPT)`


### Character Color

| Name             | Parameter          | Description              |Example                 |
-------------------|--------------------|--------------------------|-------------------------
|FORE_COLOR        |color name(*1)      |character foreground color|FORE_COLOR(RED);        |
|BACK_COLOR        |color name(*1)      |character background color|FORE_COLOR(BLACK);      |
|FORE_INDEXED_COLOR|index number(0..255)|character foreground color|FORE_INDEXED_COLOR(24); |
|BACK_INDEXED_COLOR|index number(0..255)|character background color|BACK_INDEXED_COLOR(24); |
|FORE_RGB_COLOR    |R,G,B value(0..255) |character background color|FORE_RGB_COLOR(0,0,220);|
|BACK_RGB_COLOR    |R,G,B value(0..255) |character background color|BACK_RGB_COLOR(0,100,0);|

(*1)Color name:

BLACK, RED, GREEN, YELLOW, BLUE, MAGENTA, CYAN, WHITE         : basic color
BBLACK, BRED, BGREEN, BYELLOW, BBLUE, BMAGENTA, BCYAN, BWHITE : prefix B is Bright.

### Character Decorations

| Name        | Description                       | Example      |
--------------|-----------------------------------|--------------|
|RESET        |reset all modes (styles and colors)|RESET;        |
|BOLD         |set bold mode.                     |BOLD;         |
|DIM          |set dim/faint mode.                |DIM;          |
|ITALIC       |set italic mode.                   |ITALIC;       |
|UNDERLINE    |set underline mode.                |UNDERLINE;    |
|BLINKING     |set blinking mode.                 |BLINKING;     |
|HIBLINKING   |set fast blinking mode.            |HIBLINKING;   |
|REVERSE      |set inverse/reverse mode.          |REVERSE;      |
|HIDDEN       |set hidden/invisible mode.         |HIDDEN;       |
|STRIKETHROUGH|set strikethrough mode.            |STRIKETHROUGH;|

### Cursor Controls

| Name           | Parameter    | Description
-----------------|--------------|------------------------------------------------------|
|CUR_HOME        |none          |moves cursor to home position (0, 0)                  |
|CUR_MOVE        |x,y coordinate|moves cursor to home position (x, y)                  |
|CUR_UP          |# lines       |moves cursor up # lines                               |
|CUR_DOWN        |# lines       |moves cursor down # lines                             |
|CUR_RIGHT       |# columns     |moves cursor right # columns                          |
|CUR_LEFT        |# columns     |moves cursor left # columns                           |
|CUR_LINE_DOWN   |# lines       |moves cursor to beginning of next line, # lines down  |
|CUR_LINE_UP     |# lines       |moves cursor to beginning of previous line, # lines up|
|CUR_MOVE_X      |# columns     |moves cursor to column #                              |
|CUR_POS_GET     |none          |request cursor position (reports as ESC[#;#R)         |
|CUR_POS_SAVE    |none          |save cursor position (DEC)                            |
|CUR_POS_REST    |none          |restores the cursor to the last saved position        |
|CUR_POS_SAVE_SCO|none          |save cursor position (SCO)                            |
|CUR_POS_REST_SCO|none          |restores the cursor to the last saved position (SCO)  |

### Erase Functions

| Name         | Description                            |
---------------|----------------------------------------|
|CLR_SCREEN    |erase entire screen                     |
|CLR_RIGHT     |erase from cursor to end of line        |
|CLR_LEFT      |erase start of line to the cursor       |
|CLR_LINE      |erase the entire line                   |
|CLR_DOWN      |erase from cursor until end of screen   |
|CLR_UP        |erase from cursor to beginning of screen|
|CLR_SAVED_LINE|erase saved lines

### Common Private Modes

| Name       | Description                   |
-------------|-------------------------------|
|CUR_HIDE    |make cursor invisible          |
|CUR_SHOW    |make cursor visible            |
|RES_SCRN    |restore screen                 |
|SAV_SCRN    |save screen                    |
|ENA_ALT_BUF |enables the alternative buffer |
|DIS_ALT_BUF |disables the alternative buffer|

### Scroll

| Name       | Parameter  | Description                                   |
-------------|------------|-----------------------------------------------|
|SCL_SCR     |none        |Enable scrolling for entire display.           |
|SCL         |start, end  |Enable scrolling from row {start} to row {end}.|
|SCL_DOWN    |none        |Scroll display down one line.                  |
|SCL_UP      |none        |Scroll display up one line.                    |

### String

| Name       | Parameter  | Description |
-------------|------------|--------------
|STR         |String      |output string|