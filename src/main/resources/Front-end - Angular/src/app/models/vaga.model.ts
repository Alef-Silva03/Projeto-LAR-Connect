export interface Vaga {
    id: number;
    proprietario?: string;
    numero: string;
    localizacao: string;  // Ex: "A-12", "B-05"
    valor: number;        // Valor de venda
    status: 'disponivel' | 'reservada' | 'vendida' | 'indisponivel';
    disponivel: boolean;  // true se status for 'disponivel'
}

export interface VagaResponse {
    content: Vaga[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}
