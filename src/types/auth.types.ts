export interface TokenPayload {
    userId: number;
    email: string;
    userType: string;
  }
  
  export interface Tokens {
    accessToken: string;
    refreshToken: string;
  }
  
  export interface RefreshToken {
    id: string;
    user_id: number;
    token: string;
    expires_at: Date;
    created_at: Date;
  }  