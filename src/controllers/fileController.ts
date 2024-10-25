import { Request, Response, NextFunction } from 'express';
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { FileService } from '../services/fileReaderService';

export class FileController {
  static async writeFileContent(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.file);
      const filePath = path.join(__dirname, '../../uploads', req.file.filename);
      const workbook = XLSX.readFile(filePath);
      const sheetNames = workbook.SheetNames;
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);

      fs.unlinkSync(filePath);
      // const fileResp = await FileService.retriveFileData(file);
      // if (!fileResp) {
      //   return res.status(404).json({ message: 'File not found' });
      // }
      res.json({"stat":sheetData});
    } catch (error) {
      next(error);
    }
  }
}
