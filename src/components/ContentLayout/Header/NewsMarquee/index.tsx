import React from // { useState, useRef, useEffect }
'react';
// import styled, { keyframes } from 'styled-components';
import iconSpeaker from '@/assets/images/Icon_Speaker.svg';

//TODO 解決TS問題
// Wrapper
// const WrapperContainer = styled.div`
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     top: 0;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
// `;

// const Wrapper = ({ children }) => {
//     return <WrapperContainer>{children}</WrapperContainer>;
// };

// // Marquee
// const moveLeft = keyframes`
//   from {
//     transform: translateX(0);
//   }
// `;

// const MarqueeContainer = styled.div`
//     position: relative;
//     width: 100%;
//     padding: 10px 0;
//     overflow: hidden;
//     &:hover {
//         animation-play-state: paused;
//     }
//     &::after {
//         position: absolute;
//         content: '';
//         width: 100%;
//         height: 100%;
//         top: 0;
//         left: 0;
//         pointer-events: none;
//     }
// `;

// const MarqueeArea = styled.div`
//     display: inline-block;
//     white-space: nowrap;
//     transform: translateX(-${(props) => props.move}px);
//     animation: ${moveLeft} ${(props) => props.time}s linear infinite ${(props) => (props.toRight ? ' reverse' : '')};
//     animation-play-state: inherit;
// `;

// const MarqueeItem = styled.div`
//     position: relative;
//     display: inline-block;
//     margin-right: 2em;
//     color: #000;
//     font-weight: 700;
//     font-size: 14px;
// `;

// const getFillList = (list, copyTimes = 1) => {
//     const newlist = [];
//     for (let i = 0; i < copyTimes; i++) {
//         newlist.push(...list);
//     }
//     // console.log('newlist', newlist);
//     return newlist;
// };

// const Marquee = ({ list, time, ...props }) => {
//     const marqueeContainer = useRef(null);
//     const marqueeArea = useRef(null);
//     const [marqueeMoveLeft, setMarqueeMoveLeft] = useState(0);
//     const [showList, setShowList] = useState(list);
//     const [realTime, setRealTime] = useState(time);

//     useEffect(() => {
//         const containerWidth = Math.floor(marqueeContainer.current.offsetWidth);
//         const areaWidth = Math.floor(marqueeArea.current.scrollWidth);
//         // 複製次數最小為2(跑馬燈寬度的兩倍以上)
//         const copyTimes = Math.max(2, Math.ceil((containerWidth * 2) / areaWidth));
//         // 單圈移動距離
//         const newMoveLeft = areaWidth * Math.floor(copyTimes / 2);
//         // 一圈實際時間
//         const newRealTime = time * parseFloat((newMoveLeft / containerWidth).toFixed(2));
//         setShowList(getFillList(list, copyTimes));
//         setMarqueeMoveLeft(newMoveLeft);
//         setRealTime(newRealTime);

//         // console.log('containerWidth', containerWidth, 'areaWidth', areaWidth, 'copyTimes', copyTimes, 'newRealTime', newRealTime);
//     }, [list]);

//     return (
//         <MarqueeContainer ref={marqueeContainer} {...props}>
//             <MarqueeArea ref={marqueeArea} move={marqueeMoveLeft} time={realTime}>
//                 {showList.map((item) => {
//                     return <MarqueeItem>{item}</MarqueeItem>;
//                 })}
//             </MarqueeArea>
//         </MarqueeContainer>
//     );
// };

// // Marquee.propTypes = {
// //     list: PropTypes.array,
// //     time: PropTypes.number,
// //     toRight: PropTypes.boolean,
// // };

// // Marquee.defaultProps = {
// //     list: [],
// //     time: 10,
// // };

// // App
// const DATA_LIST = ['Marquee Text Test 1'];
const index: React.FC = () => {
    return (
        <div className="NewsMarquee relative flex items-center gap-2.5 overflow-hidden w-1/3">
            <img src={iconSpeaker} />
            {/* <span className="">Lorem ipsum dolor sit amet consectetur. Auctor rhoncus non pharetra sollicitudin.</span> */}
            <div className="w-[500px]">
                {/* <Wrapper>
                    <Marquee list={DATA_LIST} time={5} />
                </Wrapper> */}
            </div>
        </div>
    );
};

export default index;
