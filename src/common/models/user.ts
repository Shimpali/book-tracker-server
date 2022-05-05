export interface User {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  isActive?: boolean;
}
