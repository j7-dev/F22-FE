# SMTBET SPEC

## 🔶 重要觀念
<br><br>

### 🔸 amount type 有兩種
1️⃣ `CASH` - 通过存款获取的点数，相当于现金，用於投注扣款 & 取款

2️⃣ `TURNOVER_BONUS` - 洗码point， 这个是投注产生的mileage，这个是需要一个转换的过程才会变成和 A 和 B 一样的现金

CASH BALANCE - 當前可以用於投注的金額
TURNOVER_BONUS BALANCE - 當前累積洗碼(返水)的點數數量，可以轉換為現金
<br><br>

### 🔸 紅利點數
`COUPON` - 會透過 Transaction `type=COUPON` 來發放到 CASH BALANCE (因為等同現金，且會讓遊戲廠商統一扣款)
<br><br>

---

## 🔷 各項數值定義 & 計算
<br><br>

#### 🔹 DPWD info
TABLE transaction-records `amount_type=CASH` && `currency=KRW`
1. 取得用戶存款金額 Transaction `type=DEPOSIT` && `status=SUCCESS`
2. 取得用戶領過的紅利 Transaction `type=COUPON`
3. 取得用戶領過的存款紅利 Transaction `type=COUPON` && `meta_key=COUPON_TYPE` && `meta_value=DEPOSIT_BONUS`
4. 取得用戶領過的其他優惠紅利 Transaction `type=COUPON` && `meta_key=COUPON_TYPE` && `meta_value=DEPOSIT_BONUS`
5. 取得用戶投注金額 Transaction `type=DEBIT` && `status=SUCCESS`
6. 取得用戶有效投注金額 Transaction `type=DEBIT`  && `status=SUCCESS` ???
是否是扣除取消的 bet records??
7. 取得戶用戶取款金額 Transaction `type=WITHDRAW` && `status=SUCCESS`
8. 取得存取差DPWD  (1. 用戶存款金額) - (7. 戶用戶取款金額)
<br><br>

#### 🔹 洗碼 TURNOVER_BONUS
TABLE transaction-records `amount_type=TURNOVER_BONUS` && `currency=KRW`
1. 取得用戶洗碼金額 Transaction `type=COUPON`
<br><br>

#### 🔹 投注資料 bet records
TABLE bet-records `amount_type=CASH` && `currency=KRW`
1. 取得用戶投注金額 Transaction `type=DEBIT` && `status=SUCCESS`
2. 取得用戶有效投注金額 Transaction `type=DEBIT` && `status=SUCCESS`  同一場遊戲
3. 取得用戶pay out (顯示為負數，需要 * -1)  Transaction `type=CREDIT` && `status=SUCCESS`
4. 取得用戶WINLOSS = (1. 用戶投注金額) - (2. 用戶pay out)
<br><br>

#### 🔹 代理資料
TODO.
<br><br>

### 情境

#### 投注情境

100 - 我用100存款

5% - 存款紅利比例

105 - 我可以用來投注的金額

如果投注了 105 元 Transaction `type=DEBIT`

回款(pay out) 55 元 Transaction `type=CREDIT`，這樣就是輸 50 元

300% - rolling percentage 提款時的有效投注限制金額

315 - 取款的有效投注限制

#### 存款情境

用戶存款時可以選擇要使用哪個存款紅利
每個存款紅利可能有不同的限制
ex:
體育存款紅利，限制只能玩體育，其他不能玩，並且會限制 rolling percentage
電子存款紅利，限制只能玩電子，其他不能玩，並且會限制 rolling percentage
不選擇紅利，就沒有限制 rolling percentage

#### 個人限制條件

每個 存款優惠 deposit_bonus 與 user 是一對多關係
也就是說你在useGetIdentity 時 應該可以拿到存款優惠的資訊

> 🔲當用戶按下存款時，就要發API update user 身上的 deposit_bonus: deposit_bonus_id

如果 user 身上有 deposit_bonus 就代表身上有 "限制條件"

這個限制是由他存款時，選擇哪個存款優惠決定的

1. 🔲提款的有效投注有沒有達到限制金額，如果沒有達到，禁用提款按鈕
限制金額 = rolling percentage * 當時存款金額
2. 🔲被限制只能玩什麼遊戲
3. 🔲直到他的 Balance 為 0 時才會解除限制條件 (這邊後端會判定)
4. 🔲限制解除之前，存款也只能存當時的條件，前端要禁用其他的 BONUS

#### 提款情境

流程:
1. ✅用戶在前台申請提款金額與按鈕
2. 🔲系統要判斷當前用戶的限制情境，如果不能提款就按鈕禁用
3. ✅後台 payment 顯示該用戶的提款申請，狀態為pending
4. ✅Approve 後，該用戶的balance會調整，並且發出站內信


#### 4 註冊 / 登入情境

流程
1. 🔲註冊時如果有URL參數，自動帶入代理資訊
2. ✅註冊時有預設VIP等級
3. ✅一般會員無法存取後台網址


#### 後台登入情境 - ADMIN



#### 後台登入情境 - 總代理

1. 🔲每個代理 & 下線只能看到自己相關的資訊

#### 後台登入情境 - 代理

1. 🔲每個代理只能看到自己相關的資訊


#### 遊戲商維護測試

流程:
1. ✅[後台]設定關閉GameProvider
2. 🔲前台要顯示GameProvider維護中

#### 存款優惠測試

流程:
1. ✅新增一筆存款優惠 type=NORMAL
2. 🔲存款優惠會顯示在前台

TODO
deposit_type 有不同 type，優惠能否共用?

#### 返水優惠測試 amount_type=TURNOVER_BONUS

流程:
1. ✅新增一筆返水優惠，指定特定VIP等級 & 遊戲返水比
2. 🔲顯示正確的返水金額，返水金額會顯示在前台洗碼
3. 🔲超過最大值的返水金額，只會給最大的返水金額
4. 🔲如果沒有最大值，就不限制

洗碼可以轉換成現金，但是要有一個轉換的比例，例如 1:1




o 存取差額 = 存款 – 取款
o winloss = 有效投注 – payout(中獎金額)
o 收益 = winloss – (紅利 + 洗碼)
o 需要檢查：存取差額 應等於 收益
