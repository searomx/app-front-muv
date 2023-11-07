import { NextResponse } from 'next/server';


export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const limite = searchParams.get('limite');
    console.log(limite);
    const res = await fetch('http://localhost:3005/qtdcnpj/limit=${limite}');

    if(!res.ok) throw new Error('Ocorreu Problemas ao buscar os dados');
    const data = await res.json();
    return NextResponse.json({data}, {status: 200});
}