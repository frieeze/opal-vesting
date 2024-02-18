import { Address } from 'viem';
import { useContractReads } from 'wagmi'

import { vestingContracts } from '@/constants';
import vestingABI from '@/abi/vesting';
import { useMemo } from 'react';

type UseUserContract = (user: Address) => {
    isLoading: boolean;
    error: string | null;
    contracts: Address[];
}

const useUserContract: UseUserContract = (user: Address) => {
    const { data, isError, isLoading } = useContractReads({
        contracts: vestingContracts.map((vc) => ({
            address: vc,
            abi: vestingABI,
            functionName: 'beneficiaries',
            args: [user],
        })),
    });

    const userContracts = useMemo(() => {
        return vestingContracts.filter((_, i) => !!data?.[i]?.result)
    }, [data])

    function error() {
        if (isLoading) {
            return null;
        }
        if (isError) {
            return 'Unable to fetch user vesting information';
        }

        if (userContracts.length === 0) {
            return 'No vesting for this address';
        }

        return null;
    }

    return {
        isLoading,
        error: error(),
        contracts: userContracts,
    };


}

export default useUserContract;