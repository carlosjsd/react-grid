import { useState, useContext } from 'react';
import { Grid, defaultMenuOptions } from '../../src';
import { ActionMenu } from '@svar-ui/react-menu';
import { context } from '@svar-ui/react-core';

import { getData } from '../data';

import ButtonCell from '../custom/ButtonCell.jsx';
import CheckboxCell from '../custom/CheckboxCell.jsx';
import IconCell from '../custom/IconCell.jsx';
import HeaderCheckboxCell from '../custom/HeaderCheckboxCell.jsx';
import HeaderButtonCell from '../custom/HeaderButtonCell.jsx';

import './CustomEmbedingActions.css';

export default function CustomEmbedingActions() {
  const helpers = useContext(context.helpers);
  const [data, setData] = useState(getData().allData);
  const [api, setApi] = useState(null);

  const columns = [
    {
      id: 'menu',
      cell: IconCell,
      header: [{ cell: HeaderButtonCell }],
      width: 134,
    },
    {
      id: 'checked',
      cell: CheckboxCell,
      header: [{ cell: HeaderCheckboxCell }],
      width: 36,
    },
    { id: 'firstName', header: 'First Name', editor: 'text' },
    { id: 'lastName', header: 'Last Name', editor: 'text' },
    { id: 'email', header: 'Email', editor: 'text' },
    {
      id: 'city',
      header: 'City',
      cell: ButtonCell,
      editor: 'text',
      width: 260,
    },
  ];

  function action(actionName, ev) {
    const { row, column, value } = ev;
    const event = `Event: ${actionName}\n`;
    const val = `value: ${value}\n`;
    const r = `Row ID: ${row}\n`;
    const c = `Col ID: ${column}\n`;

    helpers.showNotice({
      text: event + (actionName === 'header-checkbox' ? val : r + c),
    });

    if (actionName === 'header-checkbox') onHeaderCheck(ev);
  }

  function onHeaderCheck(ev) {
    const { value, eventSource } = ev;

    if (eventSource == 'click') {
      setData(
        api.getState().data.map((d) => {
          return { ...d, checked: value };
        }),
      );
    }
  }

  const handleClicks = (ev) => {
    const option = ev.action;
    if (option) {
      const id = api.getState().selectedRows[0];
      switch (option.id) {
        case 'add:before':
          api.exec('add-row', { row: {}, before: id });
          break;
        case 'add:after':
          api.exec('add-row', { row: {}, after: id });
          break;
        case 'copy':
          api.exec('add-row', {
            row: { ...api.getRow(id), id: null },
            after: id,
          });
          break;
        case 'delete':
          api.exec('delete-row', { id });
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="wx-cyNq1uqH demo" style={{ padding: '20px' }}>
      <ActionMenu
        resolver={(id) => id}
        api={api}
        at={'point'}
        dataKey={'actionId'}
        options={defaultMenuOptions}
        onClick={handleClicks}
      >
        <Grid
          init={setApi}
          cellStyle={(row, col) => (col.id == 'city' ? 'button_cell' : '')}
          data={data}
          columns={columns}
          onCustomButton={(ev) => action('button', ev)}
          onCustomIcon={(ev) => action('icon', ev)}
          onCustomCheck={(ev) => action('checkbox', ev)}
          onCustomHeaderCheck={(ev) => action('header-checkbox', ev)}
        />
      </ActionMenu>
    </div>
  );
}
