// import { useCustomMutation } from '@refinedev/core';
// // import { F22_API_URL, F22_TOKEN } from 'utils/env';

// export const useOpenGame = (Json = {}) => {

// 	const { mutate } = useCustomMutation();

//     const corsURL = 'https://cors-anywhere.herokuapp.com/';
//     const apiUrl = 'http://staging.evolution.asia-live.com/ua/v1/4w7ga5btl92qgt7e/1a1e45c3f3a61930f545f2156548e17d';
//     const { data, isLoading } = useCustom({
//         url: `${corsURL}${apiUrl}`,
//         method: 'post',
//         config: {
//             payload: Json,
//         },
//     });
//     console.log('data', data);
//     const apiData = {
//         data,
//         isLoading,
//     };
//     return mutate;
// };
