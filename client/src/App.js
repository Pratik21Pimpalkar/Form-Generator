import React from "react";
import { Routes, Route } from "react-router-dom";
import Allforms from "./components/Allforms";
import Choice from "./components/Choice";
import FormCreator from "./components/FormCreator";
import LoginRegiWrapper from "./components/LoginRegWrap";
import Response from "./components/Response";
import { UserProvider } from "./Context";


function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LoginRegiWrapper />} />
        <Route path="/form" element={<FormCreator />} />
        <Route path="/response/:id" element={<Response />} />
        <Route path="/choice" element={<Choice />} />
        <Route path="/allforms" element={<Allforms />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
