import React from 'react';
import { useTranslation } from 'react-i18next';

const index: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="md:m-8 p-8 md:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] rounded-2xl bg-white">
            <div className="flex flex-col items-center ">
                <h2 className="font-bold text-5xl mt-5 tracking-tight">{t('Batting Regulation')}</h2>
                <p className="text-neutral-500 text-xl mt-3">{t('카지노/슬롯 규정')}</p>
            </div>
            <div className="m-2 space-y-4 font-medium">
                <p>
                    베팅규정
                    <br />
                    <br />
                    ※ 카지노/슬롯 규정
                    <br />
                    <br />
                    <br />
                    -슬롯/에볼루션 카지노는 게임테이블마다 최소/최대배팅금이 다르게 적용되며,
                    <br />
                    <br />
                    이용하시는 게임내에서 확인해 주시기 바랍니다.
                    <br />
                    <br />
                    -풍성한골든바카라/라이트닝 종목은 이벤트종료되었습니다. 배팅인정되지않습니다
                    <br />
                    <br />
                    -충전 후 계속해서 올인성 배팅은 허용하지 않습니다.(포인트 악용 및 양방성 이용)
                    <br />
                    <br />
                    -카지노 환전조건은 포인트 미수령시 100% , 포인트 수령시 300% 입니다.
                    <br />
                    보너스 지급받으시는 이벤트에 따라 롤링이 다르게 적용될 수 있습니다.
                    <br />
                    <br />
                    -슬롯 환전조건은 포인트 미수령시 100%, 포인트 수령시 200% 입니다.
                    <br />
                    보너스 지급받으시는 이벤트에 따라 롤링이 다르게 적용될 수 있습니다.
                    <br />
                    <br />
                    &mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;
                    <br />
                    <br />
                    ※ 미니게임 이용 규정
                    <br />
                    <br />
                    <br />
                    # 충전포인트 10% ~<br />
                    <br />
                    배팅횟수 10회 + 200% 롤링 환전가능
                    <br />
                    <br />
                    # 충전포인트 20% ~<br />
                    <br />
                    배팅횟수 10회 + 300% 롤링 환전가능
                    <br />
                    <br />
                    <br />
                    미니게임 특성상 배팅취소는 운영진이 관여할 수 없습니다.
                    <br />
                    신중한 배팅참여바랍니다.
                    <br />
                    <br />
                    <br />
                    ◆ 토큰게임 공식홈페이지
                    <br />
                    <br />
                    <a dir="auto" href="http://tgame365.com/" rel="noopener noreferrer" target="_blank" title="http://tgame365.com">
                        http://tgame365.com
                    </a>
                    &nbsp;&nbsp;결과처리는 공식홈페이지 결과에 따릅니다
                </p>
            </div>
        </div>
    );
};

export default index;
