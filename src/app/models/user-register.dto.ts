export interface UserRegisterDto {
 name: string;
 email: string;
 password: string;
 roleID: number;
 department?: string;
}