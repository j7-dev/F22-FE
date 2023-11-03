import { TBankAccount } from '@/types';
import { keyToWord } from '@/utils';

const index = ({ bank_account, display = 'block' }: { bank_account?: TBankAccount | null; display?: 'flex' | 'block' | 'text' }) => {
    if (!bank_account) return <></>;
    const exclude_keys = ['id', 'createdAt', 'updatedAt', 'label', 'bank_code'];

    if ('text' === display) return `${bank_account?.bank_name}-${bank_account?.owner_real_name} -${bank_account?.bank_account_number}`;

    return (
        <div className={display}>
            {Object.keys(bank_account)
                .filter((key) => !!bank_account?.[key as keyof typeof bank_account] && !exclude_keys.includes(key))
                .map((key) => {
                    return (
                        <p key={key} className="mb-0 mr-4 whitespace-nowrap">
                            <b>{keyToWord(key)}</b>: {bank_account?.[key as keyof typeof bank_account]}
                        </p>
                    );
                })}
        </div>
    );
};

export default index;
