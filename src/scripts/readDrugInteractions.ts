import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

const excelPath = path.join(__dirname, '../../public/drug-interactions.xlsx');

try {
    const workbook = XLSX.readFile(excelPath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);

    console.log('Available Drug Interactions:');
    console.log('---------------------------');
    
    data.forEach((row: any) => {
        console.log(`Drug 1: ${row.Drug1}`);
        console.log(`Drug 2: ${row.Drug2}`);
        console.log(`Prediction: ${row.Prediction}`);
        console.log('---------------------------');
    });
} catch (error) {
    console.error('Error reading Excel file:', error);
} 