export interface IAuser {
  id: number,
  user_name: string,
  password: string,
  salt?: string,
  email: string,
  create_time?: number,
  last_login_time?: number,
  last_login_ip?: string,
  status?: number,
};