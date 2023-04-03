import { unlink } from "fs/promises";
import * as path from "path";

export const selectOsAndUnlink = async (filePath: string): Promise<void> => {
	const os = process.platform;
	switch (os) {
		case "win32":
			await unlink(
				path.resolve(process.cwd(), "public", "files", filePath)
			);
			break;
		case "linux":
			await unlink(path.resolve(process.cwd(), filePath));
			break;
		default:
			await unlink(
				path.resolve(process.cwd(), "public", "files", filePath)
			);
			break;
	}
};
