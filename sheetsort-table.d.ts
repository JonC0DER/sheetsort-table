declare module 'sheetsort-table'{
    interface DataTableProps {
        thData: { [key: string]: string },
        tdData: { [key: string]: any }[],
        dataTitle: string
    }
    const DataTable: React.FC<DataTableProps>;
    export default DataTable;
}