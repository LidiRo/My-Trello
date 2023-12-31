import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { api } from '../../common/constants';
import { IBoard } from '../../common/interfaces/IBoard';

export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: fetchBaseQuery({ baseUrl: api.baseURL }),
    endpoints: builder => ({
        getBoards: builder.query<IBoard[], void>({
            query: () => ({
                url: '/board'
            }),
            // transformResponse: (rawResult: { result: { boards: IBoard[] } }, meta) => {
            //     return rawResult.result.boards
            // },
        }),
    }),
})

export const { useGetBoardsQuery } = apiSlice;