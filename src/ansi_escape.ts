/*! ansi-escape-util | MIT | https://opensource.org/licenses/MIT */
/* Copyright © 2023 hkawa90 All Rights Reserved. */

import * as ansi from "./ansi_escape_def";

const encoder = new TextEncoder();

function concatTypedArrays(a: Uint8Array, b: Uint8Array): Uint8Array { // a, b TypedArray of same type
  const c = new Uint8Array(a.length + b.length);
  c.set(a, 0);
  c.set(b, a.length);
  return c;
}

/** ANSI Escape Encoder
 * @param {string} command - ANSI Escape command string
 * @param {boolean} is_build_sequence_only - If this flag is false , it send ANSI Escape to terminal.
 * @return {Uint8Array} ANSI Escape sequence code
 * @throws Invalid command or parameters
 */
export function ansi_escape(
  command: string,
  is_build_sequence_only = false,
): Uint8Array {
  let output_buffer: Uint8Array = new Uint8Array();
  command.split(";").forEach(function (element: string) {
    let ma: string;
    if ((element != "") && (element != ";") && (element != '\n')) {
      let error = true;
      ansi.sequence_def.forEach(function (e) {
        const mmm: RegExpExecArray | null = e.reg.exec(element.trim());
        if (mmm !== null) {
          ma = String(e.fmt);
          if (mmm.length >= 2) {
            for (let i = 1; i < mmm.length; i++) {
              //ma = ma.replaceAll("%" + i + "%", mmm[i]); // tsconfig.json add "lib": [ "ES2021.String" ]
              const reg = new RegExp("%" + i + "%", "g");
              ma = ma.replace(reg, mmm[i]);
            }
          }
          const input: Uint8Array = encoder.encode(ma);
          output_buffer = concatTypedArrays(output_buffer, input);
          error = false;
        }
      });
      if (error) {
        throw new Error("Invalid command or parameters(" + element + ").");
      }
    }
  });
  if (!is_build_sequence_only) {
    process.stdout.write(output_buffer);
  }
  return output_buffer;
}
