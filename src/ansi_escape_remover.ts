/*! ansi-escape-util | MIT | https://opensource.org/licenses/MIT */
/* Copyright © 2023 hkawa90 All Rights Reserved. */

// remove ansi escape sequence
const remove_ansi = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g

/**
 * Remove escape sequence from string
 * @param {string}    inStr input string
 * @returns {string}        string without escape sequence
 */
export function ansi_escape_remover(inStr : Uint8Array) : string {
    return (new TextDecoder().decode(inStr)).replace(remove_ansi, '')
}
