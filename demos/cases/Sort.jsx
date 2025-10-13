import { useMemo } from 'react';
import { Grid } from '../../src';
import { getData } from '../data';

export default function Sort() {
  const data = useMemo(() => {
    const { data } = getData();
    return data;
  }, []);

  const columns = useMemo(
    () => [
      { id: 'id', width: 50, sort: true },
      { id: 'city', header: 'City', width: 160, sort: true },
      { id: 'email', header: 'Email', width: 250, sort: true },
      { id: 'firstName', header: 'First Name', sort: true },
      { id: 'lastName', header: 'Last Name', sort: true },
    ],
    [],
  );

  return (
    <div style={{ padding: 20 }}>
      <h4>Click on header cells to sort the data</h4>
      <Grid data={data} columns={columns} />
    </div>
  );
}
