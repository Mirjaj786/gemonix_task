"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URL = process.env.MONGO_URL;
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URL);
        console.log("database con......");
    }
    catch (error) {
        console.error(" db con... faild");
        process.exit(1);
    }
};
exports.connectDB = connectDB;
