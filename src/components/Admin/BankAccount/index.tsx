import { TBankAccount } from '@/types';
import { keyToWord } from '@/utils';

const index = ({ bank_account }: { bank_account: TBankAccount | null }) => {
    if (!bank_account) return '';

    return (
        <div>
            {Object.keys(bank_account)
                .filter((key) => !!bank_account?.[key as keyof typeof bank_account] && key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'label')
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
