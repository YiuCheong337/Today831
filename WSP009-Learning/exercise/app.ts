import {Client} from 'pg';
import dotenv from 'dotenv';
import XLSX from 'xlsx';

dotenv.config();

export const client = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});

// console.log("process.env.DB_NAME", client.database);
// console.log("process.env.DB_USERNAME", client.user);
// console.log("process.env.DB_PASSWORD", client.password);

interface User{
    username:string;
    password: string;
}

async function main() {
    await client.connect() // "dial-in" to the postgres server
                            // similar concept to what we are typing in "psql"
    
    const user = {
      username: '2sexyrexy',
      password: 'offuck2',
    }

    // https://docs.sheetjs.com/docs/api/parse-options/
    const workbook = XLSX.readFile("my-workbook.xlsx").Sheets["user"];

    // XLSX.readFile(fileName).Sheets[sheetName] !== undefined;

    console.log(workbook);

    // https://docs.sheetjs.com/docs/api/utilities/
    // const userList: User[] = XLSX.utils.sheet_to_json(userWorksheet);

    // await client.query(
    //   'INSERT INTO users (username,password) values ($1,$2)',
    //   [user.username,user.password]
    // )
  
    // const result = await client.query(
    //   'SELECT * from users where username = $1',
    //   ['gordon']
    // )
    // console.log(result.rows[0].username) // gordon
    await client.end() // close connection with the database
  }

  main()