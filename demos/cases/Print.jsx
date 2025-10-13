import { useMemo, useRef } from 'react';
import { Grid } from '../../src';
import { Button } from '@svar-ui/react-core';
import { getData, repeatData } from '../data';
import './Print.css';

function Print() {
  const { treeData, treeColumns } = useMemo(() => getData(), []);
  const data = useMemo(() => repeatData(100), []);

  const columns = useMemo(
    () => [
      {
        id: 'id',
        width: 50,
        footer: { text: 'All users', colspan: 7 },
        sort: true,
      },
      {
        id: 'firstName',
        header: [
          {
            text: 'Main client info',
            colspan: 5,
            collapsible: true,
          },
          { text: 'User', colspan: 2, collapsible: true },
          { text: 'First Name' },
        ],
        width: 150,
        sort: true,
      },
      {
        id: 'lastName',
        header: ['', '', 'Last Name'],
        width: 150,
      },
      {
        id: 'email',
        header: [
          '',
          {
            text: 'Email',
            rowspan: 2,
            vertical: true,
          },
          '',
        ],
      },
      {
        id: 'companyName',
        header: [
          '',
          {
            text: 'Company',
            colspan: 2,
            collapsible: true,
            collapsed: true,
          },
          { text: 'Name' },
        ],
      },
      {
        id: 'city',
        width: 100,
        header: ['', '', 'City'],
      },
      {
        id: 'stars',
        header: { text: 'Stars points', vertical: true },
        width: 50,
      },
      {
        id: 'date',
        template: (obj) => obj.toDateString(),
        header: 'Joined',
        footer: { text: data.length, css: 'right' },
      },
    ],
    [data],
  );

  const api1 = useRef(null);
  const api2 = useRef(null);

  function printGrid(api) {
    api.current.exec('print');
  }

  return (
    <div className="wx-px4D8ksq demo" style={{ padding: 20 }}>
      <h4>Print grid</h4>
      <div>
        <Button onClick={() => printGrid(api1)} type="primary">
          Print Grid
        </Button>
      </div>
      <div style={{ height: 400, marginTop: 10 }}>
        <Grid
          ref={api1}
          data={data}
          columns={columns}
          rowStyle={(row) => 'wx-px4D8ksq' + (row.id == 3 ? ' rowStyle' : '')}
          footer={true}
        />
      </div>
      <h4>Print tree structured grid</h4>
      <div>
        <Button onClick={() => printGrid(api2)} type="primary">
          Print Grid
        </Button>
      </div>
      <div style={{ height: 400, marginTop: 10 }}>
        <Grid
          ref={api2}
          tree={true}
          data={treeData}
          columns={treeColumns}
          footer={true}
        />
      </div>
    </div>
  );
}

export default Print;
