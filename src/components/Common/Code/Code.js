import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/display/fullscreen';
import 'codemirror/addon/display/fullscreen.css';
import 'codemirror/addon/display/placeholder';
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/hint/anyword-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import 'codemirror/addon/lint/javascript-lint';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/selection/mark-selection';
import "codemirror/keymap/sublime";
import 'codemirror/lib/codemirror.css';
import "codemirror/mode/javascript/javascript";
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/material.css';
import React from 'react';
import { Controlled as CodeMirror } from "react-codemirror2";
import './Code.css';


const Code = (props) => {
    const [code, setCode] = props.code;

    return (
        <div className="code-editor">
            <CodeMirror
                value={code}
                options={{
                    mode: "javascript",
                    theme: "material",
                    lineNumbers: true,
                    autoCloseTags: true,
                    lineWrapping: true,
                    smartIndent: true,
                    keyMap: "sublime",
                    foldGutter: true,
                    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                    matchBrackets: true,
                    autoCloseBrackets: true,
                    lint: true,
                    tabSize: 4,
                    fullScreen: false,
                    readOnly: props.editable ? false : true,
                    placeholder: `if(code) code here;`,
                    styleActiveLine: props.editable ? true : false,
                    extraKeys: {
                        Tab: "autocomplete",
                        // F11: function (cm) {
                        // console.log(cm.getOption("fullScreen"))
                        //     cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                        // }
                    },
                }}
                onBeforeChange={(editor, data, value) => {
                    if (props.editable) {
                        setCode(value);
                    }
                }}
                onChange={(editor, data, value) => {}}
            />
        </div>
    );
    
};

export default Code;