import { Pipe, PipeTransform } from "@angular/core";

const NEEDLES = {
    'space': ' ',
    'hyphen': '-',
    'underscore': '_'
};

const REPLACEMENTS = {
    'space': ' ',
    'hyphen': '-',
    'underscore': '_'
};

@Pipe({
    name: 'replace'
})

export class Replace implements PipeTransform {
    transform(hassle: string, needle: string, replacement: string): string {
        return hassle.replace(new RegExp(NEEDLES[needle], "g"), REPLACEMENTS[replacement]);
    }
}