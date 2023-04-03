import { BadRequestException } from "@nestjs/common";

const ROLES: string[] = ["user", "admin"];
const emailPattern = /[a-z0-9\-_.0]+@[a-z0-9\-_.]+\.[a-z]{2,}/i;
const passwordPattern =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&\^\(\)])[A-Za-z\d@#$!%*?&\^\(\)\.]{8,}$/;

export function checkEmptyInputs(...args: string[]): void {
	for (const arg of args) {
		if (typeof arg !== "number" && arg !== 'boolean' && !arg) {
			throw new BadRequestException("Please complete all mandatory fields");
		} else if (arg === '' || arg === undefined || arg === null) {
			throw new BadRequestException("Please complete all mandatory fields");
		}
	}
}

// Check role and if not found then set as user
export function checkRole(role: string): string {
	if (!role) {
		return (role = "user");
	} else if (!ROLES.includes(role)) {
		throw new BadRequestException(`THe role ${role} does not exist!`);
	}
}

export function checkPasswordPattern(password: string): void {
	if (!passwordPattern.test(password)) {
		throw new BadRequestException(
			"The password must contain at least 8 characters, at least one lower case, one upper case, a number and one special character"
		);
	}
}

export function checkEmailPattern(email: string): void {
	if (!emailPattern.test(email)) {
		throw new BadRequestException("Invalid Email");
	}
}
