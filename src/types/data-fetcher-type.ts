
interface DataLabelType {
    title:string,
    word_gender:'m'|'f',
}

interface DataFetcherComponentPros {
    data:{
        value:object[] | object | null,
        type:'object'|'array'
    } & DataLabelType,
    isLoading:boolean,
    children:React.ReactNode,
    noDataMessage:boolean
}

export type {
    DataFetcherComponentPros,
    DataLabelType
}