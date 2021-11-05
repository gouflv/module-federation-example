import React from "react";
const Button = React.lazy(() =>
  // Covert named export to default
  import("lib/components").then((mod) => ({ default: mod.Button }))
);

const App = () => (
  <div>
    <h1>App1</h1>

    <React.Suspense fallback="Loading">
      <Button>Example</Button>
    </React.Suspense>
  </div>
);

export default App;
