'use client';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import React, { useState, FormEvent } from 'react';
import Papa from 'papaparse';

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "cnpj",
    label: "CNPJ-BASE",
  },
  
];


export default function CustomerTable() {
  const [ dados, setDados ] = useState([]);
  var campo = "";

  const readDataFile = (e) => {
    const reader = e.target.files[0];
    if(reader){
      Papa.parse(reader,{
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          setDados(results.data);
        },
        error: (err) => {
          console.log("Erro ao analisar: "+err.message);
        }          
      })
    }
  }

  return (
    <Table aria-label="Busca de Cnpj de Cliente">
      <TableHeader columns={columns}>
      {columns.map((column) =>
          <TableColumn key={column.key}>{column.label}</TableColumn>
        )}
      </TableHeader>
      <TableBody>
      {rows.map((row) =>
          <TableRow key={row.key}>
            {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

