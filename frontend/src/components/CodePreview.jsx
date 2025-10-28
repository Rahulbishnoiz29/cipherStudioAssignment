import React from "react";
import { Sandpack } from "@codesandbox/sandpack-react";

export default function CodePreview({ files }) {
  return (
    <Sandpack
      template="react"
      files={files}
      options={{
        showConsole: true,
        showNavigator: true,
        showTabs: true,
      }}
      customSetup={{
        dependencies: {
          react: "18.2.0",
          "react-dom": "18.2.0",
        },
      }}
    />
  );
}
