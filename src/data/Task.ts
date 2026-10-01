import fs from "fs";
import path from "path"
import { fileURLToPath } from "url";
import { Task } from "../types/task.types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "task.json");

export const getTask = ():Task[] => {
    const data = fs.readFileSync(filePath, "utf-8");

    return JSON.parse(data);
}

export const saveTask = (task: Task[] | undefined ): void => {
    fs.writeFileSync(
        filePath,
        JSON.stringify(task, null, 2),
        "utf-8"
    );
}