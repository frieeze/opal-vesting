import { atom } from 'jotai';

export enum CardState {
  Loading = 'info',
  Error = 'error',
  Success = 'success',

}

export const cardStateAtom = atom<CardState>(CardState.Loading);

// {
//     user: '0x3Dbf0047dd16BfEC26b18419be6F36382e383852',
//     start: 1630454400,
//     end: 1730454400,
//     cliff: 1635454400,
//     total: 1_000_000n * WeiPerEther,
//     claimed: 100_000n * WeiPerEther,
//     claimable: 235_813n * WeiPerEther,
//   }
