第一位
前置条件：ID=1，UUID-V4=04173cde-485c-473d-87ea-f79240cd65f7，salt=04173CDE485C473D（同时也是TOTP校验码的盐值），
注册时间=1775396404（秒级UNIX时间戳），TOTP=289493。
得到以下UID：PAAAWTUVDW289493

原理：
提供以下原始参考数据：
账号类型=P（表示患者）
顺序码：001
注册时间戳：1775396404
按位运算（((sequenceNum & 0x1FFFL) << 32) | (epochSecond & 0xFFFFFFFFL)）打包，将顺序码与注册时间戳压缩为6字节数据，顺序码在高位，
时间戳在低位，换算成十进制整数：6070363700。
得到完整的Base32编码：AAAWTUVDWQ
截断为：AAAWTUVDW，作为压缩码，拼接在P后面。
TOTP为：289493
得到最终的UID：PAAAWTUVDW289493

第三十五位
前置条件：ID=35，UUID-V4=a3e46a72-b87e-42bd-9938-4db774d01717，salt=A3E46A72B87E42BD，
注册时间=1775398465，TOTP=022059。
得到以下UID：PAARWTUTOI022059