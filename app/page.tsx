'use client';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue} from "@nextui-org/react";
import React, { useState, FormEvent } from 'react';
import Papa from 'papaparse';
import { NextResponse } from 'next/server';
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
//import PaginationTable from './components/PaginationTable';
import CustomerTable from './components/CustomerTable';

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "cnpj",
    label: "CNPJ-BASE",
  },
  
];



// async function POST() {
//   const res = await fetch('http://localhost:3005/cnpj', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       //'API-Key': process.env.DATA_API_KEY,
//     },
//     body: JSON.stringify({ cnpj: '00000000000000'}),
//   })
 
//   const data = await res.json()
 
//   return Response.json(data)
// }
const acceptableCSVFileTypes = 'applications/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/csv, text/plain .csv';
export default function Home() {
  const [ inputToken, setInputToken ] = useState('');
  const [ inputCnpj, setInputCnpj ] = useState('');
  const [ file, setfile ] = useState("");
  const [ uploading, setUploading ] = useState(false);
  const [ dados, setDados ] = useState([]);
  var campo = "";

  async function enviarDados() {
    const response = await fetch('http://localhost:3333/61198164000160', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ basecnpj: dados }),
    });
  
    const data = await response.json();
    console.log("Dados Enviados para Api",data);
  }

  const readDataFile = async (e) => {
    const reader = e.target.files[0];
    if(reader){
      Papa.parse(reader,{
        skipEmptyLines: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          setDados(results.data);
          //console.log(results.data);

        },
        error: (err) => {
          console.log("Erro ao analisar: "+err.message);
        }          
      })
    }
  }

  function getInputToken(e: FormEvent){
    e.preventDefault();
    if(inputToken.trim() === '') return;
  
  };
  function getInputCnpj(e: FormEvent){
    e.preventDefault();
    if(inputCnpj.trim() === '') return;
    setInputCnpj('');
    console.log("Entrada de Cnpj Individual",inputCnpj);
  
  };
 
  // const dadosx = await POST();
  // console.log(dadosx);
  return (
    <>
      <main className="bg-gray-100 h-screen">
        <div className="flex w-full h-16 bg-slate-200 justify-center items-center">
          <div className="bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
              <h1 className="font-bold text-6xl shadow-title">Muvstok</h1>
          </div>
        </div>
      
        <div id="main" className="grid grid-cols-3 gap-1 justify-evenly"> 
          <div className="bg-slate-100 p-2 w-26 h-[calc(100vh-4rem)]">
          <div className="flex flex-col w-full  h-[calc(100vh-6rem)] items-center p-3 overflow-y-scroll">
            <Table aria-label="Busca de Cnpj de Cliente" overflow-y="true" size="small">            
              <TableHeader columns={columns}>
              {columns.map((column) =>
                  <TableColumn className="relative" key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
            <TableBody>
            {dados.map((row) =>
                <TableRow key={row.id}>
                  {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}

                  {/* {campo = ("00000000000000" + item.cnpj).slice(-14)} */}
                </TableRow>
              )}
            </TableBody>
          </Table>  
        </div> 
          </div>   
          <div className="bg-slate-200 w-26 h-[calc(100vh-4rem)]">
            <div className="flex flex-col w-full items-center">
              <form onSubmit={getInputToken} className={`flex flex-col py-4 gap-5`}>
              <div className="w-full p-3">
                <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="token">
                  Token
                </label>
                <div className="flex w-full items-center">
                  <textarea id="txtoken" value={inputToken} name="txtoken" rows="4" className={`flex p-2.5 w-full text-sm text-gray-900 bg-gray-50 
                  rounded-lg`} placeholder="Insira o Token..." onChange={(event:ChangeEvent<HTMLTextAreaElement>) => setInputToken(event.target.value)}></textarea>           
                  <div className={`flex ml-1`}>
                    <button id="btn" type="button" onClick={enviarDados} className="botao text-white bg-blue-700">Enviar</button>
                  </div>
                </div>
                
                  <label className="text-gray-700 text-sm font-bold mb-1 mt-2" htmlFor="txtcnpj">
                    CNPJ - INDIVIDUAL
                  </label>
                  <div className={`flex mt-4`}>
                  <input type="text" id="txtcnpj" name="txtcnpj" value={inputCnpj} 
                    className={`flex p-2.5 w-4/6 text-sm text-gray-900 bg-gray-50 
                    rounded-lg`} placeholder="Digite o Cnpj..." 
                    onChange={(event:ChangeEvent<HTMLTextAreaElement>) => setInputCnpj(event.target.value)} />
                  <div className={`flex ml-1`}>
                      <button id="btn-enviar-individual" onClick={getInputCnpj} className="botao text-white bg-blue-700">Enviar</button>
                  </div>
                </div>
              </div>
              <div className={`flex mt-4`}>
                  <input disabled={uploading} accept='.csv' id="upload" type="file" 
                  onChange={readDataFile} className="form-control botao" />
              </div>
          </form>
        </div>     
      </div>       
      <div className="bg-slate-100 w-26 h-[calc(100vh-4rem)]">
        <div className="flex flex-col w-full  h-[calc(100vh-6rem)] items-center p-3 overflow-y-scroll">
          <Table aria-label="Busca de Cnpj de Cliente" overflow-y="true" size="small">            
              <TableHeader columns={columns}>
              {columns.map((column) =>
                  <TableColumn className="relative" key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
            <TableBody>
            {dados.map((row) =>
                <TableRow key={row.id}>
                  {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}

                  {/* {campo = ("00000000000000" + item.cnpj).slice(-14)} */}
                </TableRow>
              )}
            </TableBody>
          </Table>  
          </div>   
        </div>
      </div>
     </main>   
    </>
  )
}