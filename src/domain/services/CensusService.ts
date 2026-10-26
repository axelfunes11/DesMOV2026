export type TipoCarga =
    "NORMAL" |
    "MASSIVE";


export interface CensusData {

    nombre: string;

    apellido: string;

    totalMiembros: number;

    cantidadTelevisiones: number;

    latitude: number;

    longitude: number;
}


export interface CensusResponse {

    id: number;

    nombre: string;

    apellido: string;

    totalMiembros: number;

    cantidadTelevisiones: number;

    latitude: number;

    longitude: number;

    tipoCarga: TipoCarga;

    createdBy: number | null;

    createdAt: Date;

    updatedAt: Date;
}


export interface CensusService {

    createCensus(
        userId: number,
        data: CensusData
    ): Promise<CensusResponse>;


    getAllCensuses(): Promise<CensusResponse[]>;
}