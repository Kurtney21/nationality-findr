import NationalityFetcher from "./components/NationalityFetcher";
import { useState, useRef } from "react";

/**
 * App component for fetching and displaying nationality based on name input.
 */
function App() {
  // State for name input and focus management
  const [name, setName] = useState("");
  const inputRef = useRef();

  return (
    <div className="App">
      <NationalityFetcher name={name} setName={setName} inputRef={inputRef} />
    </div>
  );
}

export default App;
