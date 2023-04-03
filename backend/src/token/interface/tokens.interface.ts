export interface ITokens {
	_id?: string;
	userId: string;
	refreshToken?: string | null;
	resetPasswordToken?: string | null;
	__v?: number;
	createdAt?: Date;
	updatedAt?: Date;
}
