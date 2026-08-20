// import express from './lib/typedParamsExpress'
import express from 'express'
const app = express()
app._router

app.post('/users/<id:num>', (req, res) => {
	console.log(req.params.id) // number
	res.send('ok')
})

app.route('/u/<id:num>').get((req, res) => {
	console.log(req.params.ide) // Property 'ide' does not exist on type '{ id: number; }'.ts(2339)

	res.send('ok')
})

const router = express.Router()

router.get('/e/<comments>', (req, res) => {
	console.log(req.params)
	res.send('ok')
})

// "Error: Invalid path format in '/aaa/<ifd:number>'. Unsupported parameter type."
router.route('/aaa/<ifd:number>').get((req, res) => {
	console.log(req.params)
	res.send('ok')
})

app.use(router)

app.listen(1234, () => {
	console.log('running 1234')
})
