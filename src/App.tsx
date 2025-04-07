// src/App.tsx
import { useRef } from 'react';
import ParamEditor, { Param } from './components/Param-editor';

function App() {
  const params: Param[] = [
    { id: 1, name: "Назначение", type: "string" },
    { id: 2, name: "Длина", type: "string" }
  ];

  const initialModel = {
    paramValues: [
      { paramId: 1, value: "повседневное" },
      { paramId: 2, value: "макси" }
    ]
  };

  const editorRef = useRef<{ getModel: () => any }>(null);

  const handleGetModel = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getModel());
    }
  };

  return (
    <div>
      <h1>Редактор параметров</h1>
      <ParamEditor ref={editorRef} params={params} model={initialModel} />
      <button onClick={handleGetModel}>Получить модель</button>
    </div>
  );
}

export default App;