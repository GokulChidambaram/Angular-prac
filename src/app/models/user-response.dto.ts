export interface UserResponseDto {
 userID: number;
 name: string;
 email: string;
 roleID: number;
 roleName: string;
 department?: string;
 status: string; 
}