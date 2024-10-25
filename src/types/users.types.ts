export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    user_type: string;
    created_at: Date;
  }
  
  export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
    user_type: string;
  }