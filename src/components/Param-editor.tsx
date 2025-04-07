// src/components/ParamEditor.tsx
import { useState, forwardRef, useImperativeHandle } from 'react';

// Интерфейсы
export interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors?: Color[];
}

interface Color {
  // Можно добавить свойства для Color, если нужно
}

interface Props {
  params: Param[];
  model: Model;
}

// Определяем тип для ref
interface ParamEditorHandle {
  getModel: () => Model;
}

// Компонент с forwardRef
const ParamEditor = forwardRef<ParamEditorHandle, Props>(({ params, model }, ref) => {
  const [paramValues, setParamValues] = useState<ParamValue[]>(() => {
    return params.map(param => {
      const existingValue = model.paramValues.find(pv => pv.paramId === param.id);
      return {
        paramId: param.id,
        value: existingValue ? existingValue.value : ''
      };
    });
  });

  // Обработчик изменения значения параметра
  const handleParamChange = (paramId: number, value: string) => {
    setParamValues(prevValues =>
      prevValues.map(pv =>
        pv.paramId === paramId ? { ...pv, value } : pv
      )
    );
  };

  // Получение полной модели
  const getModel = (): Model => {
    return {
      paramValues: paramValues.filter(pv => pv.value !== ''),
      colors: model.colors || []
    };
  };

  // Экспортируем getModel через ref
  useImperativeHandle(ref, () => ({
    getModel
  }));

  return (
    <div className="param-editor">
      {params.map(param => {
        const paramValue = paramValues.find(pv => pv.paramId === param.id);
        return (
          <div key={param.id} className="param-row">
            <label htmlFor={`param-${param.id}`}>{param.name}</label>
            <input
              id={`param-${param.id}`}
              type="text"
              value={paramValue?.value || ''}
              onChange={(e) => handleParamChange(param.id, e.target.value)}
              placeholder={`Введите ${param.name.toLowerCase()}`}
            />
          </div>
        );
      })}
    </div>
  );
});

// Указываем displayName для лучшей отладки
ParamEditor.displayName = 'ParamEditor';

export default ParamEditor;