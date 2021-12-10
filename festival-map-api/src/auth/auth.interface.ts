export interface JwtPayload {
  sub: string;
  userId: string;
  userName: string;
  // roles: string[];
}

export interface Payload {
  userId: string;
  userName: string;
  // roles: string[];
}
