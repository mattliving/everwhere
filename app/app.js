import path from 'path'
import api from './api'
import server from '../lib/index'

let app = server(path.resolve(__dirname, '../'))

export default api(app)
