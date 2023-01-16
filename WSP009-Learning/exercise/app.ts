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

interface User {
    username: string;
    password: string;
}

interface Memo {
    content : string;
    image?: string;
}

async function main() {
    await client.connect() // "dial-in" to the postgres server
                           // similar concept to what we are typing in "psql"
    // const user = {
    //   username: '2sexyrexy',
    //   password: 'offuck2',
    // }
    // hardcode for testing

    /* 
    // https://docs.sheetjs.com/docs/api/parse-options/
    // XLSX.readFile(fileName).Sheets[sheetName] !== undefined;
    const userWorksheet = XLSX.readFile("my-workbook.xlsx").Sheets["user"];
    // console.log(userWorksheet);
    // https://docs.sheetjs.com/docs/api/utilities/
    const userList: User[] = XLSX.utils.sheet_to_json(userWorksheet);

    // await client.query(
    //   'INSERT INTO users (username,password) values ($1,$2)',
    //   [user.username,user.password]
    // )

    for (const user of userList) {
      await client.query("INSERT INTO users (username, password, created_at) values ($1,$2, CURRENT_TIMESTAMP)", [
            user.username,
            user.password,
      ]);
    } */
  
    const memoWorksheet = XLSX.readFile("my-workbook.xlsx").Sheets["memo"];
    // console.log(memoWorksheet);
    const memoList: Memo[] = XLSX.utils.sheet_to_json(memoWorksheet);
    // const result = await client.query(
    //   'SELECT * from users where username = $1',
    //   ['gordon']
    // )

    // console.log(result.rows[0].username) // gordon
    for (const memo of memoList) {
      await client.query("INSERT INTO memos (content, created_at) values ($1, CURRENT_TIMESTAMP)", [
            memo.content,
      ]);
      console.log(memo.content)
    }

    await client.end() // close connection with the database
  }

  main()