import * as $ from 'jquery';
import {parseCode, codeParse,readCodeLineByLine,variablesInsertion} from './code-analyzer';
$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        delTableView();
        // let codeToParse = $('#codePlaceholder').val();
        let codeToParse='function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '        return x + y + z + c;\n' +
            '    }\n' +
            '}';
        let variables=$('#vars').val();
        variablesInsertion(variables);
        readCodeLineByLine(codeToParse.split('\n'));
        let parsedCode = parseCode(codeToParse);
        let code=codeParse(parsedCode);
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
        code.forEach(logMapElements);
    });
});
function logMapElements(value, key, map){
    if (value.startsWith('false')){
        $('#myTable').append('<tr><td bgcolor="#8b0000">'+value.substring(6)+'</td></tr>');
    }
    else if (value.startsWith('true')){
        $('#myTable').append('<tr><td bgcolor="#006400">'+value.substring(5)+'</td></tr>');
    }
    else {
        $('#myTable').append('<tr><td>'+value+'</td></tr>');
    }
}
function delTableView() {
    $('#myTable').empty();
}