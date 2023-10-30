import { Tag } from 'antd';
import { useUserSelect } from '@/hooks';
import { useAtom, PrimitiveAtom } from 'jotai';

interface Props {
    atom: PrimitiveAtom<{
        agent?: number;
        [key: string]: any;
    }>;
}

const index = ({ atom }: Props) => {
    // get user list
    const { selectProps } = useUserSelect({
        roleType: 'agent',
    });
    const agents = selectProps.options || [];
    const [searchProps, setSearchProps] = useAtom(atom);

    return (
        <>
            {agents.map((agent) => (
                <Tag
                    key={agent.value}
                    className={`w-full cursor-pointer px-2 py-1 my-1 rounded-lg`}
                    color={searchProps?.agent === agent.value ? 'cyan' : ''}
                    onClick={() =>
                        setSearchProps({
                            ...searchProps,
                            agent: agent.value as number,
                        })
                    }
                >
                    {agent.label}
                </Tag>
            ))}
        </>
    );
};

export default index;
