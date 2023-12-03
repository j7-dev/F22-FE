import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { renderHTML } from '@/utils';
import { Checkbox, Form } from 'antd';
import { TCmsPost } from '@/types/resources/cmsPosts';

const index = ({ item, fun }: { item: TCmsPost; fun: () => void }) => {
    const [form] = Form.useForm();
    const [openPopup, setOpenPopup] = useState(false);

    const handleClick = () => {
        fun();
        setOpenPopup(true);
        if (form.getFieldValue('remember')) {
            localStorage.setItem(`${item.id}_reminderData`, new Date().getTime().toString());
        }
    };
    return (
        <div key={item.id} className={`${openPopup ? 'hidden' : ''} p-4 bg-white md:w-1/4 w-4/5 h-fit absolute md:relative rounded-2xl overflow-hidden shadow-[0px_0px_10px_4px_#D4C9FF33]`}>
            <div onClick={handleClick} className="closeBtn absolute right-0 top-0 z-50 cursor-pointer">
                <AiFillCloseCircle className="hover:fill-[#dddada]" color="#BDBDBD" size={30} />
            </div>
            {renderHTML(item?.content)}
            <Form form={form}>
                <Form.Item noStyle name="remember" valuePropName="checked" className="mt-1" initialValue={true}>
                    <Checkbox className="mt-1">오늘은 더 이상 이 창을 열지 않습니다.</Checkbox>
                </Form.Item>
            </Form>
        </div>
    );
};

export default index;
