export type customer = {
    id: number;
    name: string;
    city: string;
    state: string;
    cnpj: string;
    };

    export const columns = [
        { key: 'name',label: 'Nome', align: 'left', sortable: true },
        { key: 'city',label: 'Cidade', align: 'left', sortable: true },
        {key: 'state',label: 'Estado', align: 'left', sortable: true },
        {key: 'cnpj',label: 'CNPJ', align: 'left', sortable: true}
    ]