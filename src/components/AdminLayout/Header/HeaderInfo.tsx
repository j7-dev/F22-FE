import React from 'react';

const HeaderInfo = () => {
    return (
        <div className="overflow-x-auto">
            <div className="flex w-[1300px]">
                <table className="table table-small th-left w-[200px]">
                    <tr>
                        <th className="w-8">total balance</th>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>total point</th>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>total deposit (users)</th>
                        <td>0 (0)</td>
                    </tr>
                    <tr>
                        <th>total withdraw (users)</th>
                        <td>0 (0)</td>
                    </tr>
                    <tr>
                        <th>DPWD</th>
                        <td>0</td>
                    </tr>
                </table>

                <table className="table table-fixed table-small th-left w-[600px] ml-4">
                    <tr>
                        <th className="w-1/4"></th>
                        <th>total</th>
                        <th>live</th>
                        <th>slot</th>
                        <th>games</th>
                        <th>sport</th>
                        <th>igx</th>
                    </tr>
                    <tr>
                        <th className="whitespace-nowrap">valid bet amount (users)</th>
                        <td>0 (0)</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>payout</th>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>win loss</th>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>turnover bonus</th>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                </table>

                <table className="table table-fixed table-small th-left w-[240px] ml-4">
                    <tr>
                        <th className="w-1/4"></th>
                        <th>new</th>
                        <th>pending</th>
                        <th>confirmed</th>
                    </tr>
                    <tr>
                        <th>deposit</th>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>withdraw</th>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>register</th>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>&nbsp;</th>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>

                <table className="table table-small th-left w-[200px] ml-4">
                    <tr>
                        <th>&nbsp;</th>
                        <th>人數</th>
                    </tr>
                    <tr>
                        <th>total users</th>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>online users</th>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>&nbsp;</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>&nbsp;</th>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default HeaderInfo;
