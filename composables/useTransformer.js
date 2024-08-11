import { Parser } from 'sql-ddl-to-json-schema'

const parser = new Parser('mysql');


/**
 * Read on for available options.
 */
const options = {};

/**
 * Explore the compact JSON format...
 */
// const compactJsonTablesArray = parser.feed(sql).toCompactJson(parser.results);

/**
 * Or get the JSON Schema if you need to modify it...
 */
// const jsonSchemaDocuments = parser.feed(sql).toJsonSchemaArray(options, compactJsonTablesArray);


export default function useTransformer() {
    const translate = (str) => {
        let sql = str.trim()
        if(sql[sql.length-1]!==";"){
            sql = sql+";"
            console.log(sql)
        }
        const jsonObj = parser.feed(sql).toCompactJson(parser.results);
        const jsonStr = JSON.stringify(jsonObj)
        const schemaArr = parser.feed(sql).toJsonSchemaArray({}, jsonObj)
        const schemaStr = JSON.stringify(schemaArr[0])
        return schemaStr
    }
    return { translate }
}