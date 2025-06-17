import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';
import { timeDiffToMinutes } from '../../utils/timeDiffToMinutes';
import { useExchangeRateQuery } from '../../__generated__/graphql';

export const ExchangeRateTable = () => {
    const { loading, data, error } = useExchangeRateQuery();

    const ratesWithTimeDiff = useMemo(() => {
        if (!data) {
            return [];
        }

        const date = new Date();

        return data.exchangeRates.map((item) => ({
            ...item,
            fetched: timeDiffToMinutes(date, new Date(item.createdAtUtc)),
        }));
    }, [data?.exchangeRates]);

    if (loading) {
        return <div>loading...</div>;
    }

    if (error) {
        return <div>oops! something went wrong</div>;
    }

    if (!data) {
        return <div>No data found</div>;
    }

    return (
        <div style={{ width: '100%', height: '500px' }}>
            <AgGridReact
                rowData={ratesWithTimeDiff}
                columnDefs={[
                    { field: 'country' },
                    { field: 'currency' },
                    { field: 'currencyCode' },
                    { field: 'rate' },
                    { field: 'fetched' },
                ]}
                defaultColDef={{ flex: 1 }}
            />
        </div>
    );
};
