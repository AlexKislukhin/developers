export interface CnbExchangeRateResponse {
    validFor: string;
    order: number;
    country: string;
    currency: string;
    amount: number;
    currencyCode: string;
    rate: number;
}
