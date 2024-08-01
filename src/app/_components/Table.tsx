"use client";

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getAllFromFirestore } from '~/lib/firebaseServices';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Item Name', width: 400 },
  { field: 'quantity', headerName: 'Quantity', type: 'number', width: 100 },
];

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
}

export default function PantryTable() {
  const [data, setData] = React.useState<PantryItem[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchPantryData = async () => {
      setLoading(true);
      try {
        const fetchedData = await getAllFromFirestore('pantry');
        setData(fetchedData ? (fetchedData as PantryItem[]) : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchPantryData();
  }, []);

  return (
    <div style={{ height: 400, width: '900px' }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          // pageSizeOptions={[5, 10]}
          // checkboxSelection
        />
      )}
    </div>
  );
}
