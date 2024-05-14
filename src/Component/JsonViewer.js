import { Viewer } from "json-diff-kit";
import React from "react";
import "json-diff-kit/dist/viewer.css";

const JsonViewer = ({ diff }) => {
  const viewerProps = {
    indent: 4,
    lineNumbers: true,
    highlightInlineDiff: true,
    inlineDiffOptions: {
      mode: "word",
      wordSeparator: " ",
    },
    hideUnchangedLines: true,
    syntaxHighlight: false,
    virtual: false,
  };
  return (
    <div>
      {" "}
      <Viewer
        diff={diff} // required
        indent={4} // default `2`
        lineNumbers={true} // default `false`
        highlightInlineDiff={true} // default `false`
        inlineDiffOptions={{
          mode: "word", // default `"char"`, but `"word"` may be more useful
          wordSeparator: " ", // default `""`, but `" "` is more useful for sentences
        }}
      />
    </div>
  );
};

export default JsonViewer;
