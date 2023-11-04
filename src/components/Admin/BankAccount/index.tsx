import { TBankAccount } from '@/types';
import { keyToWord } from '@/utils';
import { Typography } from 'antd';

const { Paragraph } = Typography;

const index: React.FC<{ bank_account?: TBankAccount | null; display?: 'block' | 'text'; copyable?: boolean }> = ({ bank_account, display = 'block', copyable = false }) => {
    if (!bank_account) return <></>;
    const exclude_keys = ['id', 'createdAt', 'updatedAt', 'label', 'bank_code'];

    if ('text' === display) {
        if (copyable) {
            return <Paragraph copyable className="m-0">{`${bank_account?.bank_name || ''}-${bank_account?.owner_real_name || ''} -${bank_account?.bank_account_number || ''}`}</Paragraph>;
        }

        return <>{`${bank_account?.bank_name || ''}-${bank_account?.owner_real_name || ''} -${bank_account?.bank_account_number || ''}`}</>;
    }

    if ('block' === display) {
        return (
            <div className={display}>
                {Object.keys(bank_account)
                    .filter((key) => !!bank_account?.[key as keyof typeof bank_account] && !exclude_keys.includes(key))
                    .map((key) => {
                        return (
                            <p key={key} className="mb-0 mr-4">
                                <b>{keyToWord(key)}</b>: {bank_account?.[key as keyof typeof bank_account]}
                            </p>
                        );
                    })}
            </div>
        );
    }

    return <></>;
};

export default index;
