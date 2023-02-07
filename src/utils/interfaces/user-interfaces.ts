export interface LoginArgs {
  email: string;
  password: string;
}

export interface RegisterArgs {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserArgs {
  email: string;
}
