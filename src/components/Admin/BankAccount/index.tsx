import { TBankAccount } from '@/types';
import { keyToWord } from '@/utils';

const index = ({ bank_account }: { bank_account?: TBankAccount | null }) => {
    if (!bank_account) return <></>;
    const exclude_keys = ['id', 'createdAt', 'updatedAt', 'label', 'bank_code'];

    return (
        <div>
            {Object.keys(bank_account)
                .filter((key) => !!bank_account?.[key as keyof typeof bank_account] && !exclude_keys.includes(key))
                .map((key) => {
                    return (
                        <p key={key} className="m-0">
                            <b>{keyToWord(key)}</b>: {bank_account?.[key as keyof typeof bank_account]}
                        </p>
                    );
                })}
        </div>
    );
};

export default index;
