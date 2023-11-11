import React from 'react';
import { useTranslation } from 'react-i18next';

const index: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="md:m-8 p-8 md:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] rounded-2xl bg-white">
            <div className="flex flex-col items-center ">
                <h2 className="font-bold text-5xl mt-5 tracking-tight">{t('Sports Regulations')}</h2>
                <p className="text-neutral-500 text-xl font-semibold mt-3">{t('베팅규정')}</p>
            </div>
            <div className="m-2 space-y-4 font-medium">
                <p>
                    <strong>* </strong>
                    <strong>최대베팅수익금</strong>
                    <strong> (</strong>
                    <strong>경기전</strong>
                    <strong>/</strong>
                    <strong>라이브</strong>
                    <strong>/</strong>
                    <strong>시스템 베팅</strong>
                    <strong>)</strong>
                </p>
                <p>
                    <strong>베팅수익금</strong>
                    <strong>=</strong>
                    <strong>예상당첨금</strong>
                    <strong>-</strong>
                    <strong>베팅금</strong>
                </p>
                <p>위와 같이 최대 베팅수익금은 예상당첨금에서 베팅금을 뺀 금액입니다 폴더별 최대배팅수익금은 아래와 같이 운영됩니다.</p>
                <p>단폴： 경기전 1000만원, 라이브 600만원</p>
                <p>조합： 경기전 2000만원, 라이브 1000만원</p>
                <p>
                    <strong>예시</strong>:
                </p>
                <p>A경기 EPL 첼시VS맨시티 승무패 2.0/3.2/3.0</p>
                <p>B경기 MLB 다저스VS애리조나 승패 1.5/2.5</p>
                <p>베팅내용: 경기전 기준 첼시 승&amp;다저스 승</p>
                <p>조합배당: 3.0,</p>
                <p>최대베팅1000만원 * 배당 3.0 = 예상당첨금 3000만원</p>
                <p>
                    <strong>원금 빼면 최대 수익금</strong>
                    <strong> 2000</strong>
                    <strong>만원</strong>
                </p>
                <p>최대 수익이 2000만원(경기전) 1000만(라이브)을 넘는 조합 베팅을 하더라도 최대수익은 2000만원(경기전) 1000만원(라이브)으로 적용되어 출금됩니다</p>
                <p>조합 배팅, 시스템 배팅에 라이브가 포함되면 최대베팅수익규정은 라이브 배팅기준으로 적용됩니다.</p>
                <p>
                    <strong>최대베팅수익금은 종목별 리그별 및 베팅시점에따라 상이합니다</strong>
                </p>
                <p>
                    <strong>&nbsp;</strong>
                </p>
                <p>
                    <strong>* </strong>
                    <strong>롤링규정</strong>
                    <strong> (</strong>
                    <strong>경기전</strong>
                    <strong>/</strong>
                    <strong>라이브</strong>
                    <strong>/</strong>
                    <strong>시스템 베팅</strong>
                    <strong>)</strong>
                </p>
                <p>단폴: 200%</p>
                <p>조합: 100%</p>
                <p>
                    <strong>&nbsp;</strong>
                </p>
                <p>
                    <strong>* </strong>
                    <strong>최대 배당</strong>
                    <strong> 100</strong>
                    <strong>배</strong>
                    <strong> (</strong>
                    <strong>경기전</strong>
                    <strong>/</strong>
                    <strong>라이브</strong>
                    <strong>/</strong>
                    <strong>시스템 베팅</strong>
                    <strong>)</strong>
                </p>
                <p>100배당이 넘는 조합을 하더라도 최종배당은 100배당으로 적용되어 출금됩니다</p>
                <p>최대 배당이랑 최대 수익금 동시 초과시 최대 수익금 기준으로 적용됩니다</p>
                <p>
                    <strong>* 1.30 </strong>
                    <strong>이하 배당 </strong>
                    <strong>(</strong>
                    <strong>경기전</strong>
                    <strong>/</strong>
                    <strong>라이브</strong>
                    <strong>/</strong>
                    <strong>시스템 베팅</strong>
                    <strong>)</strong>
                </p>
                <p>1.3 이하 배당은 최대수익금 입금 보너스규정 롤링규정관련 폴더수로 원칙상 인정하지 않습니다.</p>
                <p>
                    <strong>예시</strong>
                    <strong>:</strong>
                </p>
                <p>베팅A 배당 2.0 , 베팅B 배당 1.25 두폴 조합베팅 시&nbsp; 위 규정에 의해 단폴 경기로 간주,</p>
                <p>롤링은 200% 최대수익금은 경기전 1000만원 라이브 600만원으로 정산됩니다</p>
                <p>&nbsp;</p>
                <p>
                    <strong>* </strong>
                    <strong>보험 베팅</strong>
                    <strong>/</strong>
                    <strong>축 베팅</strong>
                    <strong>/</strong>
                    <strong>더블찬스 </strong>
                    <strong>(</strong>
                    <strong>경기전</strong>
                    <strong>/</strong>
                    <strong>라이브</strong>
                    <strong>/</strong>
                    <strong>시스템 베팅</strong>
                    <strong>)</strong>
                </p>
                <p>지속적인 패스트 마켓, 캐시아웃, 매치 팔레이, 크로스 베팅, 더블찬스 및 시스템 베팅을 이용한 보험 베팅, 축 베팅 그리고 타사와의 양방 베팅으로 의심될 경우 제재대상이 될 수 있습니다</p>
                <p>운영진 판단 하에 악용으로 간주되면 이유 불문 전액 몰수 처리됩니다.</p>
                <p>
                    <strong>&nbsp;</strong>
                </p>
                <p>
                    <strong>공통약관</strong>
                    <strong>/</strong>
                    <strong>규정</strong>
                </p>
                <ol>
                    <li>경기 시작 전 경기가 중단/취소되거나 정규시간이 종료되기 전에 중단된 경우 24시간 이내에 재개하지 않으면 경기가 취소된 것으로 간주됩니다 게임이 중단된 시점에서 결과가 이미 결정된 베팅은 제외하고 모두 적중특례 처리됩니다. (일부 종목 제외)</li>
                    <li>만약 경기가 기존 날짜 또는 시작시간 이전에 시작되면 변경 시간전의 베팅은 유효하며, 경기 시작후에 베팅은 모두 적중특례 처리됩니다. （라이브 제외）</li>
                    <li>베팅 타입 짝/홀에서 0점은 짝으로 간주합니다. (예: 축구 0:0일 경우 짝)</li>
                    <li>단폴/두폴더 베팅만 이용하시는 분들은 포인트 미지급대상이 될 수 있습니다.&nbsp;</li>
                    <li>사이트 내 악성 배팅 (양방, 걸치기, 두폴더 시간 차 배팅, 입금보너스 떼먹기, 스포츠 베팅 규정위반,)</li>
                </ol>
                <p>이유 불문 바로 몰수 처리됩니다</p>
                <p>
                    <strong>배당 율</strong>
                </p>
                <p>각 스포츠 경기 별 배당율은 경기의 결과에 영향을 미칠 수 있는 요인에 따라 항시 변동되며, 같은 경기에 베팅을 하더라도 베팅 시점에 따라 각각 배당은 다를 수 있습니다.</p>
                <p>
                    <strong>적중특례</strong>
                </p>
                <ol>
                    <li>선수 또는 팀의 이름이 정확하지 않은 경우 (일부 스포츠 제외)</li>
                    <li>잘못된 배당이 제공된 경우</li>
                    <li>경기장 현지 요건 및 기타 사유로 인하여 취소가 되었을 경우</li>
                    <li>오류 및 버그가 생겼을 경우</li>
                    <li>기타 특수한 상황</li>
                    <li>모든 경우에 '적특'이라는 말이 사용되면 다음과 같이 간주합니다:</li>
                </ol>
                <ul>
                    <li>싱글 베팅 - 베팅 금액이 환불됩니다. .</li>
                    <li>조합 베팅 - 예를 들어 트리플이 더블이 되고 더블이 싱글이 됩니다.</li>
                </ul>
                <p>
                    <strong>모든 베팅 타입에서</strong>
                    <strong> (Home)</strong>
                    <strong>은 좌측에 위치한 팀</strong>
                    <strong>, </strong>
                </p>
                <p>
                    <strong>(Away)</strong>
                    <strong>는 우측에 위치한 팀을 의미합니다</strong>
                    <strong>.</strong>
                </p>
                <p>&nbsp;</p>
                <p>
                    <strong>더블찬스</strong>
                    <br />
                    홈팀 or 무승부 &ndash; 경기 결과가 홈팀 승리 또는 무승부일 경우.
                </p>
                <p>무승부 or 원정 팀 &ndash; 경기 결과가 무승부 또는 원정 팀 승리.</p>
                <p>홈팀 or 원정 팀 &ndash; 경기 결과가 홈팀 승리 또는 원정 팀 승리.</p>
                <p>경기가 중립장소에서 진행되는 경우 베팅 목적상 좌측에 나열된 팀이 홈팀으로 간주됩니다.</p>
                <p>&nbsp;</p>
                <p>
                    <strong>조합 베팅</strong>
                </p>
                <p>동시에 여러 경기 및 종목의 결과에 대한 베팅입니다. 동일경기에서 다른 이벤트에 베팅 시 조합 베팅은 비활성화 됩니다. 두 개 이상의 경기(예를 들어, 서로 다른 축구 두 경기)에 베팅할 시, 베팅들을 &ldquo;조합&rdquo;으로 구성할 수 있습니다. 조합 베팅에서 이기려면 조합 베팅에 포함된 경기중, 단 하나의 예측도 엇나가지 않아야 합니다. 조합 베팅의 수익금은 포함된 각각의 배당을 모두 곱한 값(만약 베팅 중 하나가 반환되면, 그 베팅의 배당은 1로 계산)에 베팅 금액을 곱한 값으로 계산됩니다.</p>
                <p>
                    <strong>시스템 베팅</strong>
                </p>
                <p>시스템 베팅이란 여러 조합 배팅을 한번의 베팅에 할 수 있는 것을 말합니다.</p>
                <p>시스템 베팅은 두 개의 숫자가 슬래시로 나누어집니다 (예: 2/4). 첫 번째 숫자는 베팅의 종류를 나타냅니다. (현재의 경우 더블을 나타냅니다.) 그리고 두 번째 숫자는 선택한 이벤트 갯수를 나타냅니다.</p>
                <p>예를 들어 2/4 시스템 베팅은 4개 이벤트를 선택하고 베팅 슬립 위에 있는 &lsquo;시스템 탭&rsquo; 이라는 것을 클릭하면 시스템 베팅 옵션들이 보입니다. 2/4 시스템은 6가지의 두 폴조합으로 만들어졌습니다. 4개의 이벤트를 A, B, C, D라고 했을 때 AB, AC, AD, BC, BD, CD 6개의 두 폴로 베팅 됩니다 그러므로 10000원, 2/4시스템베팅은 60000천원을 지불하셔야 합니다. 최소 2개의 이벤트만 적중해도 수익금을 수령할 수 있습니다, 4개의 이벤트가 전부 적중일시에는 6가지 조합 전부 적중입니다</p>
                <p>
                    <strong>패스트 마켓</strong>
                    <strong>/</strong>
                    <strong>캐시아웃</strong>
                    <strong>/</strong>
                    <strong>매치 팔레이</strong>
                    <strong>/</strong>
                    <strong>크로스 베팅</strong>
                </p>
                <p>상세내용 및 이용약관은 유저페이지 좌측상단 &lt;베팅규칙&gt; 참고바랍니다</p>
                <p>
                    <strong>&nbsp;</strong>
                </p>
                <p>
                    <strong>기타사항</strong>
                </p>
                <p>웹 사이트의 경기 또는 팀 명에 비 영어 이름이 일치하지 않을 경우 공식영어 버전이 우선이 됩니다.</p>
                <p>&nbsp;</p>
                <p>배당 율 변경 규칙 (Odds Changing Rules)</p>
                <p>베팅의 배당율이 변경되는 경우, 배당 율 변경 설정에서 세 가지 옵션을 제공합니다.</p>
                <p>
                    <strong>모든 배당 율 변경 수락</strong>: 시스템이 자동으로 새로운 배당을 수락하고 유저는 프롬프트 메시지를 받지 않습니다.
                </p>
                <p>
                    <strong>더 높은 배당율만 수락</strong>: 새로운 배당율을 수락할지 또는 거부할지 묻는 메시지를 표시합니다.
                </p>
                <p>
                    <strong>새로운 배당율을 수락하지 않음</strong>: 새로운 배당율을 수락할지 또는 거부할지 묻는 메시지를 표시합니다.
                </p>
                <p>&nbsp;</p>
                <p>
                    <strong>종목별 스포츠 룰</strong>
                </p>
                <p>유저페이지 좌측상단 &lt;베팅 규칙&gt; 종목별 규정 참고바랍니다</p>
                <p>&nbsp;</p>
                <p>
                    <strong>업데이트 일시</strong>
                    <strong> 2023-0922</strong>
                </p>
            </div>
        </div>
    );
};

export default index;
