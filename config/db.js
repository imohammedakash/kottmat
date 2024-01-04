import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "97357478",
    database: "postgres",
});


class ExecutionScript {

    selectQry = async (qry) => {
        try {
            const client = await pool.connect();
            const result = await client.query(qry);
            client.release();
            return result.rows;
        } catch (err) {
            console.error("Error:", err);
            return false;
        }
    };

    async paramQry(qry, values) {
        try {
            const client = await pool.connect();
            const result = await client.query(qry, values);
            client.release();
            return result.rows; // Or whatever response you need
        } catch (err) {
            console.error("Error:", err);
            throw err;
        }
    }
}

const executionScript = new ExecutionScript();

export { executionScript, Pool }