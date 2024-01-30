export type WechatConfig = {
  appid: string;
  appScrect: string;
};

export type LoginResult = {
  session_key: string;
  unionid: string;
  errmsg: string;
  openid: string;
  errcode: number;
};

export type AccessToken = {
  access_token: string;
  expires_in: number;
};
