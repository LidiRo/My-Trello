import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { api } from '../common/constants';
import { IBoard } from '../common/interfaces/IBoard';


export const boardAPI = createApi({
    reducerPath: 'boardAPI',
    baseQuery: fetchBaseQuery({ baseUrl: api.baseURL }),
    endpoints: (build) => ({
        fetchAllBoards: build.query<IBoard[], number>({
            query: () => ({
                url: '/board'
            })
        })
    })
})