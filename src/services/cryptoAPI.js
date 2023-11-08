import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoAPIHeaders = {
  'X-RapidAPI-Key': '7a5fbace2cmshe7cfc2ce14fd5bcp1f33d8jsn71d94a8e3672',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoAPIHeaders })

export const cryptoAPI = createApi({
  reducerPath: 'cryptoAPI',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({coinId , timeperiod}) => createRequest(`coin/${coinId}/history?timePeriod=${timeperiod}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest('/exchanges'),
    })
  })
});
export const {
  useGetCryptosQuery, useGetCryptoDetailsQuery , useGetCryptoHistoryQuery , useGetExchangesQuery,
} = cryptoAPI;
