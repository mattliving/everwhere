import path from 'path'
import server from '../lib/index'

let app = server(path.resolve(__dirname, '../'))

console.log(app)

export default app