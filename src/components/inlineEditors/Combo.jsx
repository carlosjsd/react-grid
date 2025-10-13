import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { SuggestDropdown } from '@svar-ui/react-core';
import './Combo.css';

function Combo({ actions, editor, onAction }) {
  const [value, setValue] = useState(editor?.value);
  const [text, setText] = useState(editor?.renderedValue);
  const [filterOptions, setFilterOptions] = useState(editor?.options || []);
  const template = useMemo(() => editor?.config?.template, [editor]);
  const cell = useMemo(() => editor?.config?.cell, [editor]);

  const index = useMemo(() => {
    return (filterOptions || []).findIndex((a) => a.id === value);
  }, [filterOptions, value]);

  const navigate = useRef(null);
  const keydown = useRef(null);

  const ready = useCallback(
    (ev) => {
      navigate.current = ev.navigate;
      keydown.current = ev.keydown;
      navigate.current(index);
    },
    [index, navigate],
  );

  const handleChange = useCallback(
    (e) => {
      const nextText = e?.target?.value ?? '';
      setText(nextText);

      const options = nextText
        ? (editor?.options || []).filter((i) =>
            (i.label || '').toLowerCase().includes(nextText.toLowerCase()),
          )
        : editor?.options || [];
      setFilterOptions(options);

      if (options.length) navigate.current(-Infinity);
      else navigate.current(null);
    },
    [editor],
  );

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setValue(editor?.value);
    setText(editor?.renderedValue);
    setFilterOptions(editor?.options || []);
  }, [editor]);

  const updateValue = useCallback(
    ({ id }) => {
      actions.updateValue(id);
      actions.save();
    },
    [actions],
  );

  return (
    <>
      <input
        className="wx-0UYfSd1x wx-input"
        ref={inputRef}
        value={text ?? ''}
        onChange={handleChange}
        onKeyDown={(e) =>
          keydown.current ? keydown.current(e, index) : undefined
        }
      />
      <SuggestDropdown
        items={filterOptions}
        onReady={ready}
        onSelect={updateValue}
      >
        {({ option }) => {
          if (template) {
            return template(option);
          } else if (cell) {
            const Component = cell;
            return <Component data={option} onAction={onAction} />;
          } else {
            return option.label;
          }
        }}
      </SuggestDropdown>
    </>
  );
}

export default Combo;
