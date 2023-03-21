import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Box } from '@mui/material';

/**
 * @typedef WordCountData
 * @type {object}
 * @property {number} id - The unique ID of the word.
 * @property {string} word - The word itself.
 * @property {number} count - The count of occurrences of the word.
 */

interface WordCountData {
  id: number;
  word: string;
  count: number;
}

/**
 * @type {GridColDef[]} columns - The column definitions for the DataGrid.
 */
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100, flex: 1,},
  { field: 'word', headerName: 'Word', width: 150, flex: 1 },
  { field: 'count', headerName: 'Count', width: 150, flex: 0 },
];

/**
 * WordCountGrid React component to display the word count data in a DataGrid.
 * Connects to the WebSocket server and updates the DataGrid based on received messages.
 *
 */

export const WordCountGrid: React.FC = () => {
  const [rows, setRows] = useState<GridRowsProp>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080'); 

    ws.addEventListener('message', (event) => {
      console.log("event", event)
      console.log("event data", JSON.parse(event.data))

      const wordCountMap: Record<string, number> = JSON.parse(event.data);
      const newRows: WordCountData[] = Object.entries(wordCountMap).map(([word, count], index) => ({
        id: index,
        word,
        count,
      }));
      console.log("newRows", newRows)
      setRows(newRows);
    });

    return () => {
      ws.close();
    };
  }, []);

  return (
    <Box height={"81vh"} width={"100%"}>
      <DataGrid key={rows.length} rows={rows} columns={columns} rowSelection={false} autoPageSize loading={!rows.length} initialState={{
        sorting: {
          sortModel: [{ field: 'count', sort: 'desc' }],
        },
      }}/>
    </Box>
  );
};
