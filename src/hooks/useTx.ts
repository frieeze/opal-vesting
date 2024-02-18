import { Address } from "viem";
import { useWriteContract } from "wagmi"

import vestingABI from '@/abi/vesting';


type UseTx = (contract: Address, user: Address) => {
    status: "error" | "pending" | "idle" | "success";
    error: string | null;
    claim: () => Promise<void>;
    accept: () => Promise<void>;
}

const useTx: UseTx = (contract) => {
    const { status, writeContract } = useWriteContract();
    async function executeTx(fn: 'acceptLock' | 'release') {
        await writeContract({
            address: contract,
            abi: vestingABI,
            functionName: fn,
        })

    }

    async function claim() {
        return executeTx('release');
    }

    async function accept() {
        return executeTx('acceptLock');
    }
    return {
        status,
        error: null,
        claim,
        accept

    }
}

export default useTx;