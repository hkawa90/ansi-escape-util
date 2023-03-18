/*! ansi-escape-util | MIT | https://opensource.org/licenses/MIT */
/* Copyright © 2023 hkawa90 All Rights Reserved. */

// ansi-escape to html code

// .blink {
//     animation: blinkAnime 1s infinite alternate;
//   }
//   @keyframes blinkAnime{
//      0% { color: #ffff00 }
//    100% { color: #0000ff }
//   }
// Reference :
// https://linuxjm.osdn.jp/html/LDP_man-pages/man4/console_codes.4.html
// 

// import { ansi_escape } from './ansi_escape'
import * as AnsiColor from './ansiColorDef'

// url regex
// const url_regex: RegExp = /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/g

// Color / Decorations
const basic_foreColor_regex: RegExp = /\u001B\[3(\d)m/g
const bright_foreColor_regex: RegExp = /\u001B\[9(\d)m/g
const basic_bgColor_regex: RegExp = /\u001B\[4(\d)m/g
const bright_bgColor_regex: RegExp = /\u001B\[10(\d)m/g
const indexedForeColor_regex: RegExp = /\u001B\[38;5;(\d{1,3})m/g
const indexedBgColor_regex: RegExp = /\u001B\[48;5;(\d{1,3})m/g
const foreRGBColor_regex: RegExp = /\u001B\[38;2;(\d{1,3});(\d{1,3});(\d{1,3})m/g
const bgRGBColor_regex: RegExp = /\u001B\[48;2;(\d{1,3});(\d{1,3});(\d{1,3})m/g
const charDeco_regex: RegExp = /\u001B\[(\d)m/g
const hyperLink_regex: RegExp = /\u001B\]8;;\u001B\\(https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+)\u001B\]8;;\u001B\\\n/g


const AnsiAttr = ['RESET', 'BOLD', 'DIM', 'ITALIC', 'UNDERLINE', 'BLINKING', 'HIBLINKING', 'REVERSE', 'HIDDEN', 'STRIKETHROUGH']

class Ansi_color {
    _color: AnsiColor.RGBColor | null
    _regex: RegExp | null
    constructor() {
        this._color = null
        this._regex = null
    }
    get color(): AnsiColor.RGBColor | null {
        return this._color
    }
    set color(c: AnsiColor.RGBColor | null) {
        this._color = c
    }
    get regex(): RegExp | null {
        return this._regex
    }
    set regex(r: RegExp | null) {
        this._regex = r
    }
    matchAll(str: string): RegExpMatchArray[] | null {
        if (this._regex) {
            return [...str.matchAll(this._regex)]
        }
        return null
    }
    type() {
    }
    attr() {
        return 'color'
    }
    rgb(_i: number): AnsiColor.RGBColor {
        return { red: 0, green: 0, blue: 0 }
    }
    isForeColor(): boolean {
        return false
    }
}

class Basic_foreColor extends Ansi_color {
    constructor() {
        super()
        this._regex = basic_foreColor_regex
    }
    type() {
        return 'Basic_foreColor'
    }
    rgb(i: number): AnsiColor.RGBColor {
        let r
        switch (i) {
            case 0:
                r = { red: 0, green: 0, blue: 0 }
                break;
            case 1:
                r = { red: 255, green: 0, blue: 0 }
                break;
            case 2:
                r = { red: 0, green: 255, blue: 0 }
                break;
            case 3:
                r = { red: 255, green: 255, blue: 0 }
                break;
            case 4:
                r = { red: 0, green: 0, blue: 255 }
                break;
            case 5:
                r = { red: 255, green: 0, blue: 255 }
                break;
            case 6:
                r = { red: 0, green: 255, blue: 255 }
                break;
            case 7:
                r = { red: 255, green: 255, blue: 255 }
                break;
            case 8:
                r = { red: 0, green: 0, blue: 0 }
                break;
            case 9:
                r = { red: 0, green: 0, blue: 0 }
                break;
            default:
                console.log('ansi parse error')
                break;
        }
        return r as AnsiColor.RGBColor
    }
    isForeColor(): boolean {
        return true
    }
}

class Bright_foreColor extends Ansi_color {
    constructor() {
        super()
        this._regex = bright_foreColor_regex
    }
    type() {
        return 'Bright_foreColor'
    }
    rgb(i: number): AnsiColor.RGBColor {
        let r
        switch (i) {
            case 0:
                r = { red: 219, green: 106, blue: 106 }
                break;
            case 1:
                r = { red: 13, green: 188, blue: 12 }
                break;
            case 2:
                r = { red: 229, green: 229, blue: 16 }
                break;
            case 3:
                r = { red: 78, green: 142, blue: 211 }
                break;
            case 4:
                r = { red: 201, green: 101, blue: 201 }
                break;
            case 5:
                r = { red: 17, green: 168, blue: 205 }
                break;
            case 6:
                r = { red: 229, green: 229, blue: 229 }
                break;
            case 7:
                r = { red: 0, green: 0, blue: 0 }
                break;
            case 8:
                r = { red: 0, green: 0, blue: 0 }
                break;
            case 9:
                r = { red: 0, green: 0, blue: 0 }
                break;
            default:
                console.log('ansi parse error')
                break;
        }
        return r as AnsiColor.RGBColor
    }
    isForeColor(): boolean {
        return true
    }
}

class Basic_bgColor extends Ansi_color {
    constructor() {
        super()
        this._regex = basic_bgColor_regex
    }
    type() {
        return 'Basic_bgColor'
    }
    rgb(i: number): AnsiColor.RGBColor {
        let r
        switch (i) {
            case 0:
                r = { red: 0, green: 0, blue: 0 }
                break;
            case 1:
                r = { red: 255, green: 0, blue: 0 }
                break;
            case 2:
                r = { red: 0, green: 255, blue: 0 }
                break;
            case 3:
                r = { red: 255, green: 255, blue: 0 }
                break;
            case 4:
                r = { red: 0, green: 0, blue: 255 }
                break;
            case 5:
                r = { red: 255, green: 0, blue: 255 }
                break;
            case 6:
                r = { red: 0, green: 255, blue: 255 }
                break;
            case 7:
                r = { red: 255, green: 255, blue: 255 }
                break;
            default:
                console.log('ansi parse error')
                break;
        }
        return r as AnsiColor.RGBColor
    }
    isForeColor(): boolean {
        return false
    }
}

class Bright_bgColor extends Ansi_color {
    constructor() {
        super()
        this._regex = bright_bgColor_regex
    }
    type() {
        return 'Bright_bgColor'
    }
    rgb(i: number): AnsiColor.RGBColor {
        let r
        switch (i) {
            case 0:
                r = { red: 219, green: 106, blue: 106 }
                break;
            case 1:
                r = { red: 13, green: 188, blue: 12 }
                break;
            case 2:
                r = { red: 229, green: 229, blue: 16 }
                break;
            case 3:
                r = { red: 78, green: 142, blue: 211 }
                break;
            case 4:
                r = { red: 201, green: 101, blue: 201 }
                break;
            case 5:
                r = { red: 17, green: 168, blue: 205 }
                break;
            case 6:
                r = { red: 229, green: 229, blue: 229 }
                break;
            case 7:
                r = { red: 255, green: 255, blue: 255 }
                break;
            default:
                console.log('ansi parse error')
                break;
        }
        return r as AnsiColor.RGBColor
    }
    isForeColor(): boolean {
        return false
    }
}

class IndexedForeColor extends Ansi_color {
    constructor() {
        super()
        this._regex = indexedForeColor_regex
    }
    type() {
        return 'IndexedForeColor'
    }
    rgb(i: number): AnsiColor.RGBColor {
        return AnsiColor.IndexedColorDef[i]
    }
    isForeColor(): boolean {
        return true
    }
}

class IndexedBgColor extends Ansi_color {
    constructor() {
        super()
        this._regex = indexedBgColor_regex
    }
    type() {
        return 'IndexedBgColor'
    }
    rgb(i: number): AnsiColor.RGBColor {
        return AnsiColor.IndexedColorDef[i]
    }
    isForeColor(): boolean {
        return false
    }
}

class ForeRGBColor extends Ansi_color {
    constructor() {
        super()
        this._regex = foreRGBColor_regex
    }
    type() {
        return 'ForeRGBColor'
    }
    isForeColor(): boolean {
        return true
    }
}

class BgRGBColor extends Ansi_color {
    constructor() {
        super()
        this._regex = bgRGBColor_regex
    }
    type() {
        return 'BgRGBColor'
    }
    isForeColor(): boolean {
        return false
    }
}

class CharDeco extends Ansi_color {
    constructor() {
        super()
        this._regex = charDeco_regex
    }
    type() {
        return 'CharDeco'
    }
    attr(): string {
        return 'decoration'
    }
}

class HyperLink extends Ansi_color {
    constructor() {
        super()
        this._regex = hyperLink_regex
    }
    type() {
        return 'HyperLink'
    }
    attr() {
        return 'link'
    }
}

const matchAnsiEscapes = [new Basic_foreColor(), new Bright_foreColor(), new Basic_bgColor(), new Bright_bgColor(),
new IndexedForeColor(), new IndexedBgColor(), new ForeRGBColor(), new BgRGBColor(), new CharDeco(), new HyperLink()]


interface ExtendedRegExpMatchArray extends RegExpMatchArray {
    type?: Ansi_color // type of matching ansi escape
    color?: AnsiColor.RGBColor
}

/**
 * 文字範囲
 */
interface POS_RANGE {
    start: number,
    end: number
}


interface ANSI_STATE {
    range?: POS_RANGE
    /**
     * 文字色(RGB)
     */
    color?: AnsiColor.RGBColor,
    /**
     * 文字背景色(RGB)
     */
    bgColor?: AnsiColor.RGBColor,
    /**
     * 文字属性(bold, dim, italic, underline, blinking, hiblinking, reverse, hidden, strikethrough)
     */
    attr?: Set<string>
    /**
     * hyper link
     */
    link?: string
}

/**
 * Converting ANSI Escape to HTML
 * @param {string}    input     string containing escape sequences
 * @returns {string}            converted string
 */
export function ansi2html(input: string | Uint8Array) {
    let bu: string = ''
    if (input instanceof Uint8Array) {
        bu = new TextDecoder().decode(input)
    } else {
        bu = input
    }
    let r: any = []
    for (const iterator of matchAnsiEscapes) {
        const a: ExtendedRegExpMatchArray[] | null = iterator.matchAll(bu)
        if (a) {
            for (const it of a) {
                it.type = iterator
                if ((iterator.type() === 'ForeRGBColor') || (iterator.type() === 'BgRGBColor')) {
                    it.color = { red: parseInt(it[1]), green: parseInt(it[2]), blue: parseInt(it[3]) }
                } else if (iterator.attr() === 'color') {
                    it.color = iterator.rgb(parseInt(it[1]))
                }
            }
        }
        r = r.concat(a)
    }
    if (r.length === 0) {
        return bu
    }
    r = r.sort((a: ExtendedRegExpMatchArray, b: ExtendedRegExpMatchArray) => { return a.index! - b.index! })
    let stArray: Array<ANSI_STATE> = []
    let curColor : AnsiColor.RGBColor | undefined
    let curBgColor : AnsiColor.RGBColor | undefined
    let curAttr: Set<any> | undefined
    for (let i = 0; i < r.length; i++) {
        let st: ANSI_STATE = { color: undefined, attr: undefined }
        let start = r[i].index + r[i][0].length
        let end
        if ((i + 1) < r.length) {
            end = r[i + 1].index
        } else {
            end = r[i].input.length
        }
        st.range = { start: start, end: end }
        // TODO:属性・色を継承させたい
        if (r[i].type.attr() === 'color') {
            if (r[i].type.isForeColor()) {
                // fore color
                curColor = r[i].color
            } else {
                curBgColor = r[i].color
            }
            if (curColor) {
                st.color = curColor
            }
            if (curBgColor) {
                st.bgColor = curBgColor
            }
        } else {
            if (!curAttr) {
                curAttr = new Set()
            }
            if (r[i].type.attr() === 'decoration') {
                if (AnsiAttr[r[i][1]] === 'RESET') {
                    curAttr = undefined
                    st.attr = undefined
                    curColor = undefined
                    curBgColor = undefined
                } else {
                    curAttr.add(AnsiAttr[r[i][1]])
                    st.attr = new Set(curAttr)
                }
            } else if (r[i].type.attr() === 'link') {
                st.link = r[i][1]
            }
        }
        stArray.push(st)
    }
    function RGB2CSSColorCode(color: AnsiColor.RGBColor): string {
        let colorCode = 'rgb('
        colorCode += color.red + ',' + color.green + ',' + color.blue + ')'
        return colorCode
    }
    function htmlEntities(str: string): string {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    let outStr = ''
    for (const iterator of stArray) {
        // get string
        const spanStr = bu.substring(iterator.range!.start, iterator.range!.end)
        let spanStyle = ''
        let classStyle = ''
        if (iterator.color) {
            spanStyle += 'color: ' + RGB2CSSColorCode(iterator.color) + ';'
        }
        if (iterator.bgColor) {
            spanStyle += 'background-color: ' + RGB2CSSColorCode(iterator.bgColor) + ';'
        }
        if (iterator.attr) {
            for (const ite of iterator.attr.entries()) {
                switch (ite[0]) {
                    case 'BLINKING':
                        classStyle += 'blink'
                        break
                    case 'HIBLINKING':
                        classStyle += 'blink'
                        spanStyle += 'animation: blinkAnime 0.2s infinite alternate;'
                        break
                    case 'BOLD':
                        spanStyle += 'font-weight: bold;font-style: normal;'
                        break
                    case 'UNDERLINE':
                        spanStyle += 'text-decoration:underline;'
                        break
                    case 'ITALIC':
                        spanStyle += 'font-style: italic;'
                        break
                    case 'STRIKETHROUGH':
                        spanStyle += 'text-decoration:line-through;'
                        break
                    case 'HIDDEN': // TODO: 選択可能であること
                        spanStyle += 'visibility: hidden;'
                        break
                    case 'REVERSE':
                        spanStyle += 'filter:invert(1);'
                        break
                    case 'DIM':
                        spanStyle += 'filter:contrast(0.2);'
                        break
                    case 'RESET':
                        break
                    default:
                        console.log('Error Attribute...', ite[0])
                        break
                }
            }
        }
        if (iterator.link) {
            outStr += `<a href="${iterator.link}">${htmlEntities(iterator.link)}</a>`
        } else if (classStyle === '') {
            outStr += `<span style="${spanStyle}">${spanStr}</span>`
        } else {
            outStr += `<span class="${classStyle}" style="${spanStyle}">${spanStr}</span>`
        }
    }
    return outStr
}

